from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from backend.validators import validate_files
from backend.report import build_report
from nlp.detector import analyze_documents

app=FastAPI(title="Semantic Plagiarism Detector",description="Semantic plagiarism detection API",version="1.0.0")
app.add_middleware(CORSMiddleware,allow_origins=["http://localhost:5173","http://127.0.0.1:5173"],allow_credentials=True,allow_methods=["*"],allow_headers=["*"])

@app.get("/")
def root(): return {"message":"Semantic Plagiarism Detector API","status":"running"}
@app.get("/health")
def health(): return {"status":"ok"}

@app.post("/analyze")
async def analyze(source:UploadFile=File(...),submitted:UploadFile=File(...)):
    if not source.filename: raise HTTPException(400,"Source document is missing.")
    if not submitted.filename: raise HTTPException(400,"Submitted document is missing.")
    try:
        sd=await source.read(); td=await submitted.read()
        validate_files(source.filename,len(sd),submitted.filename,len(td))
        return build_report(analyze_documents(sd,td,source.filename,submitted.filename))
    except ValueError as e: raise HTTPException(400,str(e))
    except Exception as e:
        print(f"ANALYSIS ERROR: {e}")
        raise HTTPException(500,"Document analysis failed.")
