# API Contract

`POST /analyze` accepts multipart form-data fields `source` and `submitted`.

Response fields: `overall_similarity`, `match_rate`, `verdict`, `sections`, `matches`, `statistics`.

Supported files: PDF, DOCX, TXT. Max 10 MB each.
