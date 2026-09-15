export const analysisData = {
  overallSimilarity: 78,
  exactOverlap: 14,
  suspiciousPassages: 11,
  riskLevel: "HIGH",
  confidence: 92,
  sourceFile: "source_document.pdf",
  submittedFile: "submitted_thesis.pdf",

  sections: [
    { name: "Introduction", similarity: 21, risk: "LOW", suspiciousPassages: 0 },
    { name: "Literature Review", similarity: 67, risk: "MEDIUM", suspiciousPassages: 3 },
    { name: "Methodology", similarity: 89, risk: "HIGH", suspiciousPassages: 4 },
    { name: "Results", similarity: 42, risk: "LOW", suspiciousPassages: 1 },
    { name: "Conclusion", similarity: 76, risk: "MEDIUM", suspiciousPassages: 3 },
  ],

  passages: [
    {
      id: 1,
      similarity: 91,
      relationship: "PARAPHRASE",
      confidence: "HIGH",
      section: "Methodology",
      source:
        "Machine learning algorithms can predict equipment failures before they occur, allowing organizations to perform preventive maintenance and reduce costly downtime across manufacturing operations.",
      submission:
        "ML techniques can forecast machinery failures in advance, enabling companies to carry out maintenance before breakdowns happen and minimize expensive production interruptions.",
      explanation:
        "The wording is substantially different, but both passages describe using machine learning to predict equipment failures before they occur and support preventive maintenance to reduce operational costs.",
      keySimilarities: [
        "Same prediction objective",
        "Same equipment failure context",
        "Same preventive maintenance outcome",
        "Similar logical sequence",
      ],
      exactWordOverlap: 18,
      meaningPreserved: true,
      structuralSimilarity: "HIGH",
    },
    {
      id: 2,
      similarity: 87,
      relationship: "RESTRUCTURED PARAPHRASE",
      confidence: "HIGH",
      section: "Methodology",
      source:
        "Data preprocessing removes noise and transforms raw data into a format suitable for model training, ensuring that irrelevant or duplicate records are eliminated prior to feature extraction.",
      submission:
        "Before training the model, raw datasets are cleaned and transformed to eliminate irrelevant noise and remove duplicate entries, making the data ready for feature engineering.",
      explanation:
        "Both passages describe cleaning and transforming raw data before machine learning model training, following the same procedural logic.",
      keySimilarities: [
        "Same preprocessing objective",
        "Same noise removal step",
        "Same sequencing before model training",
      ],
      exactWordOverlap: 22,
      meaningPreserved: true,
      structuralSimilarity: "HIGH",
    },
    {
      id: 3,
      similarity: 84,
      relationship: "SEMANTIC OVERLAP",
      confidence: "HIGH",
      section: "Literature Review",
      source:
        "Deep learning models are capable of identifying complex patterns in large datasets, outperforming traditional statistical methods in image classification and natural language tasks.",
      submission:
        "Neural networks can discover complicated relationships when trained on substantial amounts of data, surpassing conventional statistical approaches in vision and language benchmarks.",
      explanation:
        "The wording differs considerably, but both passages communicate that neural models discover complex patterns from large datasets and outperform classical statistics.",
      keySimilarities: [
        "Same model capability claim",
        "Same dataset scale requirement",
        "Same comparison to classical methods",
      ],
      exactWordOverlap: 11,
      meaningPreserved: true,
      structuralSimilarity: "MEDIUM",
    },
    {
      id: 4,
      similarity: 78,
      relationship: "RELATED CONTENT",
      confidence: "MEDIUM",
      section: "Conclusion",
      source:
        "The experimental results demonstrate that the proposed framework achieves a 94.2% accuracy rate, surpassing all baseline models evaluated in this study.",
      submission:
        "Our findings show that the presented system reaches 94.2% accuracy, which is higher than every baseline we compared it against in our experiments.",
      explanation:
        "Both passages report the same specific accuracy figure and the same conclusion about baseline comparison, indicating direct reuse of results.",
      keySimilarities: [
        "Identical accuracy figure (94.2%)",
        "Same baseline comparison claim",
        "Same conclusion framing",
      ],
      exactWordOverlap: 31,
      meaningPreserved: true,
      structuralSimilarity: "HIGH",
    },
    {
      id: 5,
      similarity: 73,
      relationship: "SEMANTIC OVERLAP",
      confidence: "MEDIUM",
      section: "Literature Review",
      source:
        "Transfer learning enables models pre-trained on large corpora to be fine-tuned for domain-specific tasks with limited labeled data.",
      submission:
        "Models trained on massive datasets can be adapted to specialized applications even when annotated examples are scarce, a technique known as transfer learning.",
      explanation:
        "Both passages describe transfer learning as adapting large pre-trained models to domain-specific tasks with limited labeled data.",
      keySimilarities: [
        "Same definition of transfer learning",
        "Same mention of limited labeled data",
        "Same domain specialization concept",
      ],
      exactWordOverlap: 14,
      meaningPreserved: true,
      structuralSimilarity: "MEDIUM",
    },
  ],
};
