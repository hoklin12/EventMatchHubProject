import json, os

def load_config():
    config_path = os.path.join(
        os.path.dirname(__file__),
        "..",
        "config",
        "config.json"
    )
    config_path = os.path.normpath(config_path)

    with open(config_path, "r") as f:
        return json.load(f)
