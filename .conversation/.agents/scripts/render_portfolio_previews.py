from pathlib import Path
import fitz
from PIL import Image, ImageOps, ImageDraw

ROOT = Path("attached_assets")
OUT = Path(".agents/outputs/pdf-previews")
OUT.mkdir(parents=True, exist_ok=True)
documents = [
    ("resume", ROOT / "1_Resume_of_Shahriar_Zaman_1793017049256.pdf"),
    ("portfolio", ROOT / "1.Shahriar's_Portfolio_Rc_[Rd]_organized_1793017057771.pdf"),
]

for label, path in documents:
    doc = fitz.open(path)
    tiles = []
    for index, page in enumerate(doc):
        pix = page.get_pixmap(matrix=fitz.Matrix(0.55, 0.55), alpha=False)
        image_path = OUT / f"{label}-page-{index + 1:02}.png"
        pix.save(image_path)
        image = Image.open(image_path).convert("RGB")
        image.thumbnail((350, 250))
        tile = Image.new("RGB", (370, 290), "white")
        tile.paste(image, ((370 - image.width) // 2, 8))
        ImageDraw.Draw(tile).text((12, 266), f"{label.title()} — page {index + 1}", fill="black")
        tiles.append(tile)

    columns = 3 if label == "portfolio" else 1
    rows = (len(tiles) + columns - 1) // columns
    sheet = Image.new("RGB", (columns * 370, rows * 290), "#e6e8eb")
    for i, tile in enumerate(tiles):
        sheet.paste(tile, ((i % columns) * 370, (i // columns) * 290))
    sheet.save(OUT / f"{label}-contact-sheet.jpg", quality=88)
    print(f"{label}: {doc.page_count} pages -> {OUT / f'{label}-contact-sheet.jpg'}")

portfolio = fitz.open(documents[1][1])
gallery = Path(".agents/outputs/portfolio-gallery")
gallery.mkdir(parents=True, exist_ok=True)
selected_pages = [1, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 16, 17, 18, 19, 20, 22, 23, 24, 25, 26]
for page_number in selected_pages:
    page = portfolio[page_number - 1]
    pix = page.get_pixmap(matrix=fitz.Matrix(1.5, 1.5), alpha=False)
    image = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
    image.save(gallery / f"portfolio-page-{page_number:02}.webp", "WEBP", quality=82, method=6)
print(f"Optimized portfolio visuals: {len(selected_pages)} pages -> {gallery}")
