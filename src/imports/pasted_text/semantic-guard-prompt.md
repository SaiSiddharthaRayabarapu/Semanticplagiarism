You are a senior frontend engineer building a hackathon-ready React application.

PROJECT:
Semantic Plagiarism Detector

GOAL:
Build a polished, modern frontend for a semantic plagiarism detection system.

IMPORTANT:
I am responsible ONLY for the frontend.
Do NOT build the NLP/backend.
Use dummy JSON data for now.
The backend API will be connected later.

TECH STACK:
- React
- Vite
- Tailwind CSS
- React Router if useful
- Lucide React icons
- Recharts for charts
- JavaScript/JSX, NOT TypeScript
- No backend
- No database

DESIGN:
Create a professional AI/SaaS dashboard suitable for a hackathon demo.

Visual style:
- Modern
- Clean
- Premium
- Minimal
- Academic/AI product feel
- Dark navy/slate theme with subtle gradients
- White/light text
- Cards with rounded corners
- Subtle borders
- Good spacing
- Responsive on laptop and mobile
- Smooth hover transitions
- Avoid excessive animations
- Make the interface look production-ready, not like a basic student project.

APPLICATION NAME:
SemanticGuard

TAGLINE:
"Detect plagiarism by meaning, not just words."

MAIN USER FLOW:

1. UPLOAD SCREEN
2. ANALYSIS LOADING STATE
3. DASHBOARD
4. SECTION ANALYSIS
5. EVIDENCE VIEWER
6. AI EXPLANATION

==================================================
SCREEN 1 — UPLOAD
==================================================

Create a landing/upload screen.

Header:

SemanticGuard
Semantic plagiarism detection powered by semantic similarity

Main centered card:

"Analyze Your Documents"

Two upload areas:

SOURCE DOCUMENT
"Upload the original/source document"

Accepted:
PDF, DOCX, TXT

SUBMITTED DOCUMENT
"Upload the document you want to check"

Accepted:
PDF, DOCX, TXT

Each upload area should support:
- drag and drop
- click to browse
- file name display after selection
- file size
- remove file button
- upload icon

Analyze button:

"Analyze Documents"

The button should be disabled until both files are selected.

For now, clicking Analyze should NOT call an API.

Instead:
- show a professional loading screen for approximately 1.5–2 seconds
- then navigate to Dashboard
- use dummy data

Loading screen text:

"Analyzing documents..."
"Extracting text"
"Generating semantic embeddings"
"Comparing document meaning"
"Identifying suspicious passages"

Show a progress indicator.

==================================================
SCREEN 2 — DASHBOARD
==================================================

Create a dashboard with a top navbar.

Navbar:

SemanticGuard

Navigation:
Overview
Sections
Evidence

Right side:
"New Analysis"

Dashboard title:

"Plagiarism Analysis"

Subtitle:
"Semantic comparison between source and submitted document"

Top summary cards:

1. SEMANTIC SIMILARITY
78%

2. EXACT OVERLAP
14%

3. SUSPICIOUS PASSAGES
11

4. RISK LEVEL
HIGH

Risk badge:
HIGH

Use different visual indicators for:
LOW
MEDIUM
HIGH

Create a large overall similarity card.

Display:

Semantic Similarity
78%

"High semantic overlap detected"

Add a circular/radial progress visualization using Recharts or CSS.

Below it show:

Semantic overlap
78%

Exact textual overlap
14%

Difference
8%

Create a "Risk Assessment" card.

Example:

HIGH RISK

"The submitted document contains multiple passages that preserve
the meaning and structure of the source document despite significant
wording changes."

Confidence:
92%

==================================================
SECTION ANALYSIS
==================================================

On Dashboard include a section analysis card.

Title:
"Section Analysis"

Subtitle:
"Semantic similarity by document section"

Display:

Introduction       21%
Literature Review  67%
Methodology        89%
Results             42%
Conclusion          76%

Use horizontal progress bars.

Color/highlight sections with high similarity.

Anything >= 80% should show a warning indicator.

Methodology:
89%
HIGH SIMILARITY

Conclusion:
76%
MODERATE-HIGH

Add:
"View detailed section analysis →"

==================================================
SIMILARITY BREAKDOWN CHART
==================================================

Create a bar chart using Recharts.

Sections:
Introduction
Literature Review
Methodology
Results
Conclusion

Values:
21
67
89
42
76

Y axis:
Similarity %

X axis:
Section

Add a threshold reference line at 80%.

==================================================
SCREEN 3 — SECTION ANALYSIS
==================================================

Create a dedicated section analysis screen.

Header:

"Section Analysis"

"Compare semantic similarity across document sections."

Display cards/table:

Section | Similarity | Risk | Suspicious Passages

Introduction | 21% | Low | 0
Literature Review | 67% | Medium | 3
Methodology | 89% | High | 4
Results | 42% | Low | 1
Conclusion | 76% | Medium | 3

Clicking a section should open/show its evidence.

Create a visual similarity meter for each section.

High similarity:
>= 80%

Medium:
50–79%

Low:
< 50%

==================================================
SCREEN 4 — EVIDENCE VIEWER
==================================================

This is one of the most important screens.

Create a side-by-side comparison.

LEFT:
SOURCE DOCUMENT

RIGHT:
SUBMITTED DOCUMENT

Example data:

SOURCE:

"Machine learning algorithms can predict equipment
failures before they occur, allowing organizations
to perform preventive maintenance."

SUBMISSION:

"ML techniques can forecast machinery failures
in advance, enabling companies to carry out
maintenance before breakdowns happen."

Highlight matching/similar semantic portions.

Do NOT rely only on exact word matching.

Visually indicate semantic matches.

At the top:

Suspicious Passage 3 of 11

Similarity:
91%

Relationship:
PARAPHRASE

Confidence:
HIGH

Navigation:

← Previous
Next →

Create multiple dummy suspicious passages.

Example:

Passage 1:
Similarity 91%
Relationship: PARAPHRASE

Passage 2:
Similarity 87%
Relationship: RESTRUCTURED PARAPHRASE

Passage 3:
Similarity 84%
Relationship: SEMANTIC OVERLAP

Passage 4:
Similarity 78%
Relationship: RELATED CONTENT

Allow the user to click different passages.

==================================================
SCREEN 5 — AI EXPLANATION
==================================================

Create a polished AI explanation panel.

Title:

"Why Was This Flagged?"

Example:

"The passages use substantially different wording but
preserve the same underlying meaning. Both describe the
use of machine learning to predict equipment failures
before they occur and use that prediction to support
preventive maintenance."

Display:

Relationship:
PARAPHRASE

Confidence:
HIGH

Semantic similarity:
91%

Exact word overlap:
18%

Meaning preserved:
YES

Structural similarity:
HIGH

Create a "Key Similarities" list:

• Same prediction objective
• Same equipment failure context
• Same preventive maintenance outcome
• Similar logical sequence

Also show:

"AI Interpretation"

"Although only 18% of the words overlap directly,
the two passages communicate nearly the same idea."

==================================================
DUMMY DATA
==================================================

Create:

src/data/dummyData.js

Export an object:

analysisData = {

overallSimilarity: 78,

exactOverlap: 14,

suspiciousPassages: 11,

riskLevel: "HIGH",

confidence: 92,

sections: [

{
name: "Introduction",
similarity: 21,
risk: "LOW",
suspiciousPassages: 0
},

{
name: "Literature Review",
similarity: 67,
risk: "MEDIUM",
suspiciousPassages: 3
},

{
name: "Methodology",
similarity: 89,
risk: "HIGH",
suspiciousPassages: 4
},

{
name: "Results",
similarity: 42,
risk: "LOW",
suspiciousPassages: 1
},

{
name: "Conclusion",
similarity: 76,
risk: "MEDIUM",
suspiciousPassages: 3
}

],

passages: [

{
id: 1,
similarity: 91,
relationship: "PARAPHRASE",
confidence: "HIGH",

source:
"Machine learning algorithms can predict equipment failures before they occur, allowing organizations to perform preventive maintenance.",

submission:
"ML techniques can forecast machinery failures in advance, enabling companies to carry out maintenance before breakdowns happen.",

explanation:
"The wording is substantially different, but both passages describe using machine learning to predict equipment failures before they occur and support preventive maintenance.",

keySimilarities: [
"Same prediction objective",
"Same equipment failure context",
"Same preventive maintenance outcome"
]

},

{
id: 2,
similarity: 87,
relationship: "RESTRUCTURED PARAPHRASE",
confidence: "HIGH",

source:
"Data preprocessing removes noise and transforms raw data into a format suitable for model training.",

submission:
"Before training the model, raw datasets are cleaned and transformed to eliminate irrelevant noise.",

explanation:
"Both passages describe cleaning and transforming raw data before machine learning model training."
},

{
id: 3,
similarity: 84,
relationship: "SEMANTIC OVERLAP",
confidence: "HIGH",

source:
"Deep learning models are capable of identifying complex patterns in large datasets.",

submission:
"Neural networks can discover complicated relationships when trained on substantial amounts of data.",

explanation:
"The wording differs considerably, but both passages communicate that neural models discover complex patterns from large datasets."
}

]

}

==================================================
COMPONENT REQUIREMENTS
==================================================

Create reusable components:

Navbar
FileUpload
ScoreCard
RiskBadge
SimilarityGauge
SimilarityChart
SectionTable
ProgressBar
EvidenceViewer
PassageCard
AIExplanation
LoadingAnalysis

Do not duplicate UI code unnecessarily.

==================================================
NAVIGATION
==================================================

Use React Router or clean state-based navigation.

Routes:

/
/dashboard
/sections
/evidence

The Upload screen is "/".

Dashboard is "/dashboard".

Section analysis is "/sections".

Evidence viewer is "/evidence".

Navbar should work across pages.

==================================================
RESPONSIVENESS
==================================================

Desktop:
Use a two-column layout where appropriate.

Mobile:
Stack the evidence panels vertically.

Make sure:
- buttons remain usable
- charts resize
- cards don't overflow
- text wraps correctly

==================================================
UX DETAILS
==================================================

Add:
- loading states
- hover states
- disabled states
- empty states
- file validation
- clear error messages
- smooth page transitions
- "New Analysis" button

File validation:
Allowed:
.pdf
.docx
.txt

Maximum file size:
10 MB

If invalid:
show an inline error.

==================================================
BACKEND INTEGRATION PREPARATION
==================================================

IMPORTANT:

Do not hardcode the UI so that connecting the backend later is difficult.

Create a service:

src/services/api.js

with:

analyzeDocuments(sourceFile, submissionFile)

For now it should return the dummy analysisData.

Structure it so that later we can replace:

return analysisData

with:

fetch("/api/analyze", ...)

without changing the UI components.

The UI should consume data through props/state rather than directly depending on hardcoded values.

==================================================
DEMO MODE
==================================================

Add a small "Demo Data" indicator somewhere unobtrusive.

The application must work completely without a backend.

The judge should be able to:

1. Upload/select two dummy files
2. Click Analyze
3. See loading animation
4. See dashboard
5. Navigate to sections
6. Open evidence
7. Switch suspicious passages
8. Read AI explanation

==================================================
CODE QUALITY
==================================================

Use clean component architecture.

Avoid:
- giant App.jsx
- duplicated components
- inline giant datasets
- unnecessary dependencies
- backend code
- authentication
- database
- complicated state management

Use React state/hooks.

Keep the project easy for another developer to understand.

==================================================
FINAL REQUIREMENT
==================================================

After generating the application:

1. Make sure all imports work.
2. Make sure npm install works.
3. Make sure npm run dev works.
4. Fix all compile errors.
5. Make sure all pages are reachable.
6. Make sure dummy data flows correctly.
7. Make sure Analyze works without a backend.
8. Make sure the UI looks polished.

Do not stop at creating files.
Actually implement the complete frontend.