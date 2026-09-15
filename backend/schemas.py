from typing import Any, Dict, List
from pydantic import BaseModel, Field

class SectionResult(BaseModel):
    name: str
    similarity: float = Field(ge=0, le=100)
    matched_source_section: str | None = None

class MatchResult(BaseModel):
    id: int
    source_text: str
    submitted_text: str
    similarity: float = Field(ge=0, le=100)
    match_type: str = "sentence"

class PlagiarismResult(BaseModel):
    overall_similarity: float = Field(ge=0, le=100)
    match_rate: float = Field(ge=0, le=100)
    verdict: str
    sections: List[SectionResult] = Field(default_factory=list)
    matches: List[MatchResult] = Field(default_factory=list)
    statistics: Dict[str, Any] = Field(default_factory=dict)
