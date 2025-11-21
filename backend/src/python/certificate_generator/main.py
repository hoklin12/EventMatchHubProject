import base64
import os
import sys
import json
from urllib.request import urlopen
import requests # type: ignore
import io
from PIL import Image, ImageDraw, ImageFont, UnidentifiedImageError  # type: ignore

# Ensure stdout/stderr use UTF-8 to avoid Windows encoding errors (e.g., emojis)
try:
    # Python 3.7+
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')
except Exception:
    try:
        import io as _io
        sys.stdout = _io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
        sys.stderr = _io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    except Exception:
        # If we cannot reconfigure, proceed and avoid non-encodable characters in prints
        pass
# --- Configuration Loading (Remains the same) ---
# Resolve config path relative to this script so it works when spawned
CONFIG_FILE_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "..",
    "config",
    "config.json",
)
CONFIG_FILE_PATH = os.path.normpath(CONFIG_FILE_PATH)
try:
    with open(CONFIG_FILE_PATH, 'r') as f:
        CONFIG = json.load(f)
except FileNotFoundError:
    print(json.dumps({"status": "error", "message": f"Configuration file not found at '{CONFIG_FILE_PATH}'"}), file=sys.stderr)
    sys.exit(1)
except json.JSONDecodeError:
    print(json.dumps({"status": "error", "message": f"Invalid JSON format in '{CONFIG_FILE_PATH}'"}), file=sys.stderr)
    sys.exit(1)


PATHS = CONFIG['paths']
SETTINGS = CONFIG['generation_settings']
FONT_MAP = CONFIG['font_map']

def isBase64(sb):
        try:
                if isinstance(sb, str):
                        # If there's any unicode here, an exception will be thrown and the function will return false
                        sb_bytes = bytes(sb, 'ascii')
                elif isinstance(sb, bytes):
                        sb_bytes = sb
                else:
                        raise ValueError("Argument must be string or bytes")
                return base64.b64encode(base64.b64decode(sb_bytes)) == sb_bytes
        except Exception:
                return False

def convert_pt_to_px(pt_size, dpi):
    """Converts point size (pt) to pixel size (px) based on DPI."""
    if dpi <= 0:
        return pt_size
    return int(pt_size * (dpi / 72))

def fetch_image_data(source_path):
    """Fetches image data either from a local path or a URL."""
    
    #convert base 64 to image
    if isBase64(source_path):
        print("-> Decoding image from base64 string.", file=sys.stderr)
        return io.BytesIO(base64.b64decode(source_path))
    
    if(source_path is None) or (source_path.strip() == ""):
        print("WARNING: No image source provided.", file=sys.stderr)
        return None
    
    if source_path.lower().startswith('http://') or source_path.lower().startswith('https://'):
        print(f"-> Downloading image from URL: {source_path}", file=sys.stderr)
        try:
            response = requests.get(source_path, stream=True)
            response.raise_for_status() # Raises an HTTPError for bad responses (4xx or 5xx)
            return io.BytesIO(response.content)
        except requests.exceptions.RequestException as e:
            print(f"ERROR downloading image from URL: {e}", file=sys.stderr)
            return None
    else:
        # Local file path
        if not os.path.exists(source_path):
            print(f"WARNING: Local image file not found: {source_path}", file=sys.stderr)
            return None
        return source_path

def generate_certificate(input_data):
    """Generates the certificate image by placing fields (text or image) based on metadata."""
    
    OUTPUT_DIR = PATHS['output_dir']
    DESIGN_DPI = SETTINGS['design_dpi']
    Y_OFFSET_ADJUSTMENT = SETTINGS['y_offset_adjustment']
    
    # Load Metadata
    meta = input_data.get("metadata", {})

    template_source = meta.get("template")
    if isinstance(template_source, str) and template_source.lower().startswith(("http://", "https://")):
        try:
            resp = urlopen(template_source)
            INPUT_IMAGE_PATH = io.BytesIO(resp.read())
        except Exception as e:
            print(f"ERROR downloading template image from URL: {e}", file=sys.stderr)
            return
    else:
        INPUT_IMAGE_PATH = template_source

    METADATA_JSON_PATH = urlopen(meta.get("metadata"))
    try:
        METADATA_JSON = json.load(METADATA_JSON_PATH)
    except FileNotFoundError:
        print(f"Error: Metadata file not found at '{METADATA_JSON_PATH}'.", file=sys.stderr)
        sys.exit(1)
    
    # Sample Input Data (QR code is now a URL)
    user = input_data.get("userData", {})
    User_Data = {
        "participant_name": user.get("participant_name"),
        "organizer_name": user.get("organizer_name"),
        "description": user.get("description"),
        "date_certified": user.get("date_certified"),
        "valid_through": user.get("valid_through"),
        "certificate_id": user.get("certificate_id"),
        "qr_code": user.get("qr_code"),
        "signature": user.get("signature"), 
        "organizer_directer": user.get("organizer_directer"),
        "organizer_role": user.get("organizer_role"),
    }

    
    try:
        img = Image.open(INPUT_IMAGE_PATH).convert("RGBA")
    except FileNotFoundError:
        print(f"Error: Input image not found at '{INPUT_IMAGE_PATH}'.", file=sys.stderr)
        return
    except Exception as e:
        print(f"Error opening input image: {e}", file=sys.stderr)
        return

    # --- 1. DETERMINE SCALING FACTOR ---
    img_width, img_height = img.size
    metadata_ref_width = METADATA_JSON['width']
    
    scale_factor = img_width / metadata_ref_width

    if scale_factor != 1.0:
        print(f"Scaling coordinates by factor: {scale_factor:.2f}", file=sys.stderr)

    draw = ImageDraw.Draw(img)
    
    for field_key, field_meta in METADATA_JSON['fields'].items():
        
        if field_key not in User_Data:
            continue
            
        try:
            # --- 3. COORDINATE SCALING ---
            x_original = field_meta['x']
            y_original = field_meta['y']
            width_original = field_meta['width'] 
            
            x_scaled = x_original * scale_factor
            y_scaled = y_original * scale_factor
            width_scaled = width_original * scale_factor
            
            # --- IMAGE HANDLING (Now supports URL or local path) ---
            if field_key in ["qr_code", "signature"]:
                image_source = User_Data[field_key]
                
                image_data_source = fetch_image_data(image_source)
                if image_data_source is None:
                    continue
                
                try:
                    field_img = Image.open(image_data_source)
                    field_img = field_img.convert("RGBA")
                except UnidentifiedImageError:
                    print(f"ERROR: cannot identify image file for field '{field_key}'", file=sys.stderr)
                    continue
                except Exception as e:
                    print(f"ERROR opening image for field '{field_key}': {e}", file=sys.stderr)
                    continue
                
                # Determine target size
                if 'height' in field_meta:
                    height_scaled = field_meta['height'] * scale_factor
                else:
                    # Calculate height based on maintaining aspect ratio
                    aspect_ratio = field_img.height / field_img.width
                    height_scaled = width_scaled * aspect_ratio

                target_size = (int(width_scaled), int(height_scaled))
                
                # Resize the input image
                field_img_resized = field_img.resize(target_size)

                # Determine paste position 
                paste_x = int(x_scaled)
                paste_y = int(y_scaled + Y_OFFSET_ADJUSTMENT) 

                img.paste(field_img_resized, (paste_x, paste_y), field_img_resized)
                
                print(f"Placed image: {field_key} (Size: {target_size}) at ({paste_x}, {paste_y})", file=sys.stderr)
                continue
            
            # --- TEXT HANDLING ---
            
            text_to_draw = User_Data[field_key]
            pt_size = float(field_meta.get('font_size', 12)) 
            pixel_size = convert_pt_to_px(pt_size, DESIGN_DPI)
            
            font_family_name = field_meta.get('font_family')
            font_weight = field_meta.get('weight', 'regular')
            
            font_path_to_use = FONT_MAP.get(font_family_name, {}).get(font_weight)
            
            if not font_path_to_use:
                print(f"ERROR: Font combination '{font_family_name}'/'{font_weight}' is not mapped. Skipping {field_key}.", file=sys.stderr)
                continue

            try:
                font = ImageFont.truetype(font_path_to_use, pixel_size)
            except IOError:
                print(f"WARNING: Required font file '{font_path_to_use}' not found. Using default font for {field_key}.", file=sys.stderr)
                font = ImageFont.load_default()
            
            color = field_meta.get('font_color', "#000000")
            alignment = field_meta.get('text_align', 'left')
            
            x_draw = x_scaled
            y_draw = y_scaled + Y_OFFSET_ADJUSTMENT 
            anchor_point = "ls" 

            if alignment == 'center':
                x_center = x_scaled + (width_scaled / 2)
                x_draw = x_center
                anchor_point = "ms" 
            
            # Draw the text
            draw.text(
                (x_draw, y_draw), 
                text_to_draw, 
                fill=color, 
                font=font, 
                anchor=anchor_point,
                align=alignment
            )
            
            # print(f"Placed text: {field_key} (PT: {pt_size:.2f} -> PX: {pixel_size}): at Scaled X,Y ({x_draw:.2f}, {y_draw:.2f})", file=sys.stderr)

        except Exception as e:
            print(f"An unexpected error occurred while processing {field_key}: {e}", file=sys.stderr)
            
    # Instead of saving, write to BytesIO
    output_buffer = io.BytesIO()
    img.save(output_buffer, format="PNG")
    output_buffer.seek(0)
    
    # Convert to base64
    img_base64 = base64.b64encode(output_buffer.getvalue()).decode("utf-8")
    return img_base64

if __name__ == "__main__":
    try:
        raw = sys.stdin.read()
        if not raw.strip():
            print(json.dumps({"status": "error", "message": "No input received"}), file=sys.stderr)
            sys.exit(1)

        input_data = json.loads(raw)

        result = generate_certificate(input_data)

        # Return structured JSON on stdout so the caller can read output path
        print(json.dumps({
            "status": "success",
            "image": result
        }))

    except Exception as e:
        print(json.dumps({
            "status": "error",
            "message": str(e)
        }), file=sys.stderr)
        sys.exit(1)
