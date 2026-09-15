from backend.schemas import PlagiarismResult

def calculate_verdict(score):
    if score < 30: return "Low Similarity"
    if score < 70: return "Moderate Similarity"
    return "High Similarity"

def build_report(raw):
    if not isinstance(raw,dict) or "overall_similarity" not in raw: raise ValueError("Invalid NLP result.")
    result=PlagiarismResult(**{
        "overall_similarity":float(raw["overall_similarity"]),
        "match_rate":float(raw.get("match_rate",0)),
        "verdict":calculate_verdict(float(raw["overall_similarity"])),
        "sections":raw.get("sections",[]),
        "matches":raw.get("matches",[]),
        "statistics":raw.get("statistics",{}),
    })
    return result.model_dump()
