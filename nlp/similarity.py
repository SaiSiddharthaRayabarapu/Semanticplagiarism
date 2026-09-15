import numpy as np
from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(source_embeddings, submission_embeddings):

    if source_embeddings is None or submission_embeddings is None:
        return np.empty((0, 0), dtype=float)

    return cosine_similarity(
        submission_embeddings,
        source_embeddings
    )


def find_matches(
    source_sentences,
    submission_sentences,
    similarity_matrix,
    threshold=0.75,
    match_type="sentence"
):

    matches = []

    if similarity_matrix.size == 0:
        return matches

    for submission_index, row in enumerate(similarity_matrix):

        source_index = int(np.argmax(row))

        score = float(row[source_index])

        if score >= threshold:

            matches.append({
                "source_text": source_sentences[source_index],
                "submitted_text": submission_sentences[submission_index],
                "similarity": round(score, 3),
                "match_type": match_type
            })

    matches.sort(
        key=lambda x: x["similarity"],
        reverse=True
    )

    return matches