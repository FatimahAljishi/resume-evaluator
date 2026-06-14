import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


def evaluate_resume(
    job_description: str,
    prompt: str,
    resume_text: str,
) -> str:
    """
    Sends the job description, prompt, and resume text to OpenAI.
    Returns the evaluation as a string.
    """

    system_prompt = """
    You are an expert HR assistant. When given a job description and a resume, evaluate how well the candidate matches the requirements. Structure your response as: (1) Match Score (0-10), (2) Key Strengths, (3) Gaps, (4) Overall Recommendation.
    """

    user_message = f"""
    JOB DESCRIPTION:
    {job_description}

    ADDITIONAL INSTRUCTIONS:
    {prompt}

    RESUME:
    {resume_text}
    """

    response = openai_client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {
                "role": "system",
                "content": system_prompt,
            },
            {
                "role": "user",
                "content": user_message,
            },
        ],
        max_tokens=500,
    )

    return response.choices[0].message.content