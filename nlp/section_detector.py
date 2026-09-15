import re


COMMON_HEADINGS = {
    "abstract",
    "introduction",
    "background",
    "literature review",
    "related work",
    "methodology",
    "methods",
    "materials and methods",
    "implementation",
    "experiments",
    "results",
    "discussion",
    "conclusion",
    "conclusions",
    "future work",
    "references",
}


def is_heading(line: str) -> bool:
    """
    Heuristic heading detector.
    """

    line = line.strip()

    if not line:
        return False

    lower = line.lower().strip(":.")

    # Known academic headings
    if lower in COMMON_HEADINGS:
        return True

    # Numbered headings:
    # 1 Introduction
    # 2. Methodology
    # 3 Results
    if re.match(r"^\d+(\.\d+)*[\s.)-]+[A-Za-z]", line):
        return True

    # Short ALL-CAPS heading
    if (
        len(line.split()) <= 8
        and line.isupper()
        and any(char.isalpha() for char in line)
    ):
        return True

    return False


def detect_sections(text: str):
    """
    Detect sections based on document headings.

    Returns:
    [
        {
            "name": "Introduction",
            "text": "..."
        }
    ]
    """

    if not text or not text.strip():
        return []

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    sections = []
    current_name = "Document"
    current_lines = []

    for line in lines:

        if is_heading(line):

            if current_lines:
                sections.append({
                    "name": current_name,
                    "text": " ".join(current_lines).strip()
                })

            current_name = line
            current_lines = []

        else:
            current_lines.append(line)

    # Add final section
    if current_lines:
        sections.append({
            "name": current_name,
            "text": " ".join(current_lines).strip()
        })

    # If no real headings were found
    if not sections:
        return [{
            "name": "Document",
            "text": text.strip()
        }]

    return sections