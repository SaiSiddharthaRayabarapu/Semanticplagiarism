import { analysisData } from "../data/dummyData";

export async function analyzeDocuments(sourceFile, submissionFile) {
  // Simulate network latency — swap this block for a real fetch() call later:
  // const res = await fetch("/api/analyze", {
  //   method: "POST",
  //   body: formData,
  // });
  // return res.json();
  await new Promise((resolve) => setTimeout(resolve, 1800));
  return {
    ...analysisData,
    sourceFile: sourceFile?.name ?? analysisData.sourceFile,
    submittedFile: submissionFile?.name ?? analysisData.submittedFile,
  };
}
