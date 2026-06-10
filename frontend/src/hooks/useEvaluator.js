import { useState } from "react";
import client from "../api/client";

export default function useEvaluator() {
  const [jobDesc, setJobDesc] = useState("");
  const [prompt, setPrompt] = useState("");
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);
  const [result, setResult] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (jobDesc.trim() === "") {
      setStatus("error");
      setErrorMessage("Job description is required");
      return;
    }

    if (resume === null) {
      setStatus("error");
      setErrorMessage("Please upload a resume");
      return;
    }

    try {
      setStatus("loading");
      setErrorMessage("");

      const response = await client.post("/evaluate", {
        job_description: jobDesc,
        prompt: prompt,
      });

      setResult(response.data.result);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.response?.data?.detail || "Evaluation failed");
    }
  }
  return {
    jobDesc,
    setJobDesc,
    prompt,
    setPrompt,
    resume,
    setResume,
    status,
    errorMessage,
    result,
    handleSubmit,
  };
}
