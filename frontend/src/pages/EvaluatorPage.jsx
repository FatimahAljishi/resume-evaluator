import { useState } from "react";
import useEvaluator from "../hooks/useEvaluator";

export default function EvaluatorPage() {
  const {
    jobDesc,
    setJobDesc,
    prompt,
    setPrompt,
    setResume,
    status,
    errorMessage,
    result,
    handleSubmit,
  } = useEvaluator();

  return (
    <main>
      <form
        onSubmit={handleSubmit}
        id="my-form"
        action="/submit-resume"
        method="post"
      >
        <label htmlFor="job-desc">Job Description:</label>
        <textarea
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          name="job-desc"
          id="job-desc"
          placeholder="Write job description here"
        ></textarea>

        <label htmlFor="prompt">Prompt:</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          name="prompt"
          id="prompt"
          placeholder="Enter your prompt here"
        ></textarea>

        <label htmlFor="resume">Upload Resume:</label>
        <input
          onChange={(e) => setResume(e.target.files[0] || null)}
          type="file"
          id="resume"
          name="resume"
          accept=".pdf"
        />
        <br />
        <br />
        <button type="submit" disabled={status === "loading"}>
          Evaluate Resume
        </button>
      </form>

      <div id="results" className="results">
        {status === "error" && <p className="error">{errorMessage}</p>}
        {status === "success" && <p>{result}</p>}
        {status === "loading" && <p>Evaluating...</p>}
        {status === "idle" && <p>Results will appear here</p>}
      </div>
    </main>
  );
}
