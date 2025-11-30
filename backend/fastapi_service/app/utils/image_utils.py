import base64, os, io, requests
from PIL import Image

def is_base64(data: str) -> bool:
    try:
        base64.b64decode(data)
        return True
    except Exception:
        return False

def convert_pt_to_px(pt: float, dpi: int):
    return int(pt * (dpi / 72)) if dpi > 0 else int(pt)

def fetch_image(source):
    if not source:
        return None

    if is_base64(source):
        return io.BytesIO(base64.b64decode(source))

    if source.startswith("http://") or source.startswith("https://"):
        resp = requests.get(source)
        resp.raise_for_status()
        return io.BytesIO(resp.content)

    if os.path.exists(source):
        return source

    return None
