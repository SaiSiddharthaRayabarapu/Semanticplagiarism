from pathlib import Path
ALLOWED_EXTENSIONS={".pdf",".docx",".txt"}
MAX_FILE_SIZE=10*1024*1024

def validate_file(filename,file_size):
    if not filename: raise ValueError("File name is missing.")
    if Path(filename).suffix.lower() not in ALLOWED_EXTENSIONS: raise ValueError("Unsupported file type. Please upload a PDF, DOCX, or TXT file.")
    if file_size==0: raise ValueError(f"{filename} is empty.")
    if file_size>MAX_FILE_SIZE: raise ValueError(f"{filename} is too large. Maximum file size is 10 MB.")

def validate_files(source_filename,source_size,submitted_filename,submitted_size):
    validate_file(source_filename,source_size); validate_file(submitted_filename,submitted_size)
