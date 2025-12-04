import base64
import io
import json
from urllib.request import urlopen
from PIL import Image, ImageDraw, ImageFont, UnidentifiedImageError

from app.utils.config_loader import load_config
from app.utils.image_utils import fetch_image, convert_pt_to_px

CONFIG = load_config()
PATHS = CONFIG['paths']
SETTINGS = CONFIG['generation_settings']
FONT_MAP = CONFIG['font_map']

def generate_certificate_service(input_data):
    meta = input_data["metadata"]
    user = input_data["userData"]

    # Load template image (base64, URL, path)
    template_src = meta.get("template")
    if template_src.startswith("http://") or template_src.startswith("https://"):
        template_data = urlopen(template_src).read()
        template = io.BytesIO(template_data)
    else:
        template = template_src

    metadata_json_url = meta.get("metadata")
    metadata_json = json.load(urlopen(metadata_json_url))

    img = Image.open(template).convert("RGBA")
    draw = ImageDraw.Draw(img)

    ref_width = metadata_json["width"]
    scale_factor = img.width / ref_width

    for key, field in metadata_json["fields"].items():
        if key not in user:
            continue

        value = user[key]
        x = field["x"] * scale_factor
        y = field["y"] * scale_factor
        width = field["width"] * scale_factor

        # --- IMAGE FIELDS ---
        if key in ["qr_code", "signature"]:
            img_src = fetch_image(value)
            if img_src is None:
                continue

            try:
                field_img = Image.open(img_src).convert("RGBA")
            except UnidentifiedImageError:
                continue

            # Resize
            if "height" in field:
                height = field["height"] * scale_factor
            else:
                height = width * (field_img.height / field_img.width)

            field_img = field_img.resize((int(width), int(height)))

            img.paste(field_img, (int(x), int(y)), field_img)
            continue

        # --- TEXT FIELDS ---
        pt_size = float(field.get("font_size", 12))
        px_size = convert_pt_to_px(pt_size, SETTINGS["design_dpi"])

        font_family = field.get("font_family")
        weight = field.get("weight", "regular")

        font_path = FONT_MAP.get(font_family, {}).get(weight)
        try:
            font = ImageFont.truetype(font_path, px_size)
        except:
            font = ImageFont.load_default()

        color = field.get("font_color", "#000")
        align = field.get("text_align", "left")

        anchor = "ls"
        if align == "center":
            x += width / 2
            anchor = "ms"

        draw.text((x, y), value, font=font, fill=color, anchor=anchor)

    # Export → base64
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    buffer.seek(0)
    return base64.b64encode(buffer.getvalue()).decode()
