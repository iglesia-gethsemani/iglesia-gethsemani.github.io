#!/usr/bin/env python3
"""Prepara el boletín trifold semanal para el sitio.

Uso:
  python scripts/build-bulletin.py <boletin.pdf> <AAAA-MM-DD> [etiqueta]

Requiere pymupdf y pillow. Toma solo las dos primeras páginas del PDF
(cara exterior y cara interior); la hoja de instrucciones no se publica.
"""

import json
import pathlib
import sys

import pymupdf
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
PDF_DIR = ROOT / 'public' / 'docs' / 'boletin'
PANEL_DIR = ROOT / 'public' / 'images' / 'bulletin'
DATA_FILE = ROOT / 'src' / 'data' / 'bulletin.json'
DPI = 220
FACES = ('outside', 'inside')
POSITIONS = ('left', 'center', 'right')


def reset_directory(directory: pathlib.Path) -> None:
    directory.mkdir(parents=True, exist_ok=True)
    for old in directory.iterdir():
        if old.is_file():
            old.unlink()


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)

    source, date = sys.argv[1], sys.argv[2]
    label = sys.argv[3] if len(sys.argv) > 3 else None
    document = pymupdf.open(source)
    if document.page_count < 2:
        sys.exit('El boletín necesita al menos dos páginas (exterior e interior).')

    reset_directory(PDF_DIR)
    reset_directory(PANEL_DIR)

    pdf_name = f'boletin-{date}.pdf'
    public_pdf = pymupdf.open()
    public_pdf.insert_pdf(document, from_page=0, to_page=1)
    public_pdf.save(PDF_DIR / pdf_name, garbage=4, deflate=True)

    panels = {}
    size = (0, 0)
    for page_index, face in enumerate(FACES):
        pixmap = document[page_index].get_pixmap(dpi=DPI, alpha=False)
        sheet = Image.frombytes('RGB', (pixmap.width, pixmap.height), pixmap.samples)
        third = sheet.width / 3
        for column, position in enumerate(POSITIONS):
            panel = sheet.crop((round(column * third), 0, round((column + 1) * third), sheet.height))
            name = f'{date}-{face}-{position}.webp'
            panel.save(PANEL_DIR / name, 'WEBP', quality=82, method=6)
            panels[f'{face}{position.capitalize()}'] = f'/images/bulletin/{name}'
            size = panel.size

    DATA_FILE.write_text(
        json.dumps(
            {
                'date': date,
                'label': label,
                'pdf': f'/docs/boletin/{pdf_name}',
                'panelWidth': size[0],
                'panelHeight': size[1],
                'panels': panels,
            },
            ensure_ascii=False,
            indent=2,
        )
        + '\n'
    )
    print(f'Boletín {date}: {PDF_DIR / pdf_name} y {len(panels)} paneles {size[0]}×{size[1]}')


if __name__ == '__main__':
    main()
