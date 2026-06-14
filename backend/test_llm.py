from llm import evaluate_resume

result = evaluate_resume(
    job_description="We are looking for a Python developer with FastAPI experience.",
    prompt="Focus on technical skills only.",
    resume_text="John has 3 years of Python experience and has built REST APIs using Flask.",
)
print(result)