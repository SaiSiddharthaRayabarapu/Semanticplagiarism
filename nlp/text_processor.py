import re
import nltk
from nltk.tokenize import sent_tokenize


def _ensure_tokenizer():
    try:
        sent_tokenize("Test sentence.")
    except LookupError:
        try:
            nltk.download("punkt", quiet=True)
            nltk.download("punkt_tab", quiet=True)
        except Exception:
            pass


def clean_text(text: str) -> str:
    if not text:
        return ""

    text = text.replace("\x00", " ")
    text = re.sub(r"\s+", " ", text)

    return text.strip()


def split_sentences(text: str):
    if not text or not text.strip():
        return []

    _ensure_tokenizer()

    try:
        return [
            sentence.strip()
            for sentence in sent_tokenize(text)
            if sentence.strip()
        ]
    except LookupError:
        return [
            sentence.strip()
            for sentence in re.split(r"(?<=[.!?])\s+", text)
            if sentence.strip()
        ]


def create_chunks(sentences, chunk_size=3):
    """
    Combine every 3 sentences into a semantic chunk.
    """

    if chunk_size < 1:
        raise ValueError("chunk_size must be >= 1")

    chunks = []

    for i in range(0, len(sentences), chunk_size):
        chunk = " ".join(sentences[i:i + chunk_size])

        if chunk.strip():
            chunks.append(chunk)

    return chunks