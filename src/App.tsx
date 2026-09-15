import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Sections from "./pages/Sections";
import Evidence from "./pages/Evidence";

export default function App() {
  const [analysisData, setAnalysisData] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Upload onAnalysisComplete={setAnalysisData} />} />
        <Route path="/dashboard" element={<Dashboard data={analysisData} />} />
        <Route path="/sections" element={<Sections data={analysisData} />} />
        <Route path="/evidence" element={<Evidence data={analysisData} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
