"""Adapter exposing Person 1's NLP engine to the Person 3 API."""
from pathlib import Path
from tempfile import TemporaryDirectory

from .document_parser import extract_text
from .text_processor import clean_text, split_sentences, create_chunks
from .semantic_engine import generate_embeddings
from .similarity import calculate_similarity, find_matches
from .section_detector import detect_sections

DEFAULT_THRESHOLD = 0.75


def _section_score(source_text, submission_text):
    source_sentences = split_sentences(source_text)
    submission_sentences = split_sentences(submission_text)
    if not source_sentences or not submission_sentences:
        return 0.0
    source_embeddings = generate_embeddings(source_sentences)
    submission_embeddings = generate_embeddings(submission_sentences)
    matrix = calculate_similarity(source_embeddings, submission_embeddings)
    return round(float(matrix.max(axis=1).mean()) * 100, 2)


def _normalize_match(match, idx):
    score = max(0.0, min(100.0, float(match.get('similarity', 0)) * 100)) if float(match.get('similarity', 0)) <= 1 else max(0.0, min(100.0, float(match.get('similarity', 0))))
    return {
        'id': idx + 1,
        'source_text': match.get('source_text', ''),
        'submitted_text': match.get('submitted_text', ''),
        'similarity': round(score, 2),
        'match_type': match.get('match_type', 'sentence'),
    }


def analyze_documents(source_data: bytes, submitted_data: bytes, source_filename: str, submitted_filename: str, threshold=DEFAULT_THRESHOLD):
    with TemporaryDirectory() as td:
        source_path = Path(td) / Path(source_filename).name
        submitted_path = Path(td) / Path(submitted_filename).name
        source_path.write_bytes(source_data)
        submitted_path.write_bytes(submitted_data)

        try:
            source_text = clean_text(extract_text(str(source_path)))
        except Exception as e:
            raise ValueError(f'Could not read source document: {e}')
        try:
            submitted_text = clean_text(extract_text(str(submitted_path)))
        except Exception as e:
            raise ValueError(f'Could not read submission document: {e}')

    if not source_text:
        raise ValueError('Source document is empty or contains no readable text.')
    if not submitted_text:
        raise ValueError('Submission document is empty or contains no readable text.')

    source_sentences = split_sentences(source_text)
    submitted_sentences = split_sentences(submitted_text)
    if not source_sentences or not submitted_sentences:
        raise ValueError('Could not identify sentences in one or both documents.')

    source_embeddings = generate_embeddings(source_sentences)
    submitted_embeddings = generate_embeddings(submitted_sentences)
    matrix = calculate_similarity(source_embeddings, submitted_embeddings)
    best_scores = matrix.max(axis=1)
    overall = round(float(best_scores.mean()) * 100, 2)
    matched_count = int((best_scores >= threshold).sum())
    match_rate = round(matched_count / len(submitted_sentences) * 100, 2)

    sentence_matches = find_matches(source_sentences, submitted_sentences, matrix, threshold, 'sentence')
    source_chunks = create_chunks(source_sentences, 3)
    submitted_chunks = create_chunks(submitted_sentences, 3)
    chunk_matches = []
    if source_chunks and submitted_chunks:
        se = generate_embeddings(source_chunks)
        te = generate_embeddings(submitted_chunks)
        cm = calculate_similarity(se, te)
        chunk_matches = find_matches(source_chunks, submitted_chunks, cm, threshold, 'chunk')

    seen=set(); normalized=[]
    for m in sorted(sentence_matches + chunk_matches, key=lambda x:x.get('similarity',0), reverse=True):
        key=(m.get('source_text',''),m.get('submitted_text',''))
        if key not in seen:
            seen.add(key); normalized.append(_normalize_match(m, len(normalized)))

    source_sections=detect_sections(source_text)
    submission_sections=detect_sections(submitted_text)
    sections=[]
    for ss in submission_sections:
        best=0.0; best_name=None
        for so in source_sections:
            score=_section_score(so['text'], ss['text'])
            if score>best: best,best_name=score,so['name']
        sections.append({'name':ss['name'],'similarity':best,'matched_source_section':best_name})

    return {
        'overall_similarity': overall,
        'match_rate': match_rate,
        'sections': sections,
        'matches': normalized,
        'statistics': {
            'source_sentences': len(source_sentences),
            'submission_sentences': len(submitted_sentences),
            'matched_sentences': matched_count,
            'source_chunks': len(source_chunks),
            'submission_chunks': len(submitted_chunks),
            'threshold': threshold,
        }
    }
