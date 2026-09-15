from pathlib import Path
from pypdf import PdfReader
from docx import Document

def extract_text(file_path: str) -> str:
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    ext = path.suffix.lower()

    if ext == ".txt":
        return path.read_text(encoding="utf-8")

    if ext == ".pdf":
        reader = PdfReader(str(path))
        parts = []
        for page in reader.pages:
            text = page.extract_text()
            if text:
                parts.append(text)
        return "\n".join(parts)

    if ext == ".docx":
        document = Document(str(path))
        return "\n".join(p.text for p in document.paragraphs if p.text.strip())

    raise ValueError("Unsupported file type. Use PDF, DOCX, or TXT.")
