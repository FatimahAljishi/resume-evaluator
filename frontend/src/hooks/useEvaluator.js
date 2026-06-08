import { useState } from "react";

export default function useEvaluator() {
  const [jobDesc, setJobDesc] = useState("");
  const [prompt, setPrompt] = useState("");
  const [resume, setResume] = useState(null);
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
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
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setResult("Here is the simulated response.");
    }, 2000);
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
