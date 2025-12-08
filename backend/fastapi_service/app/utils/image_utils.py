import base64
import io
import os
import requests
from PIL import Image


def is_base64(data: str) -> bool:
    try:
        base64.b64decode(data, validate=True)
        return True
    except Exception:
        return False


def convert_pt_to_px(pt: float, dpi: int):
    return int(pt * (dpi / 72)) if dpi > 0 else int(pt)


def fetch_image(source):
    if not source:
        return None

    # BASE64 input
    if is_base64(source):
        try:
            decoded = base64.b64decode(source)
            return Image.open(io.BytesIO(decoded))
        except:
            return None

    # URL input
    if source.startswith(("http://", "https://")):
        try:
            resp = requests.get(
                source,
                timeout=10,
                allow_redirects=True,
                headers={"User-Agent": "Mozilla/5.0"}
            )
            resp.raise_for_status()
            return Image.open(io.BytesIO(resp.content))
        except:
            return None

    # File path
    if os.path.exists(source):
        try:
            return Image.open(source)
        except:
            return None

    return None
