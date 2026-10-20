"""Encode just the material regions already sampled by music.css, losslessly."""
from pathlib import Path
from PIL import Image, ImageChops

root = Path(__file__).resolve().parents[1]
folder = root / "assets" / "images"
source = Image.open(folder / "music-reference.png").convert("RGB")
regions = {
    "music-back.webp": (47, 45, 420, 90),
    "music-side.webp": (25, 5, 47, 348),
    "music-rail.webp": (10, 5, 25, 350),
    "music-floor.webp": (48, 348, 92, 379),
}
total = 0
for name, box in regions.items():
    crop = source.crop(box)
    target = folder / name
    crop.save(target, "WEBP", lossless=True, method=6, exact=True)
    with Image.open(target) as decoded:
        assert ImageChops.difference(crop, decoded.convert("RGB")).getbbox() is None
    total += target.stat().st_size
    print(f"{name}: {target.stat().st_size} bytes; decoded pixels identical")
print(f"Combined: {total} bytes (original: {(folder / 'music-reference.png').stat().st_size})")
