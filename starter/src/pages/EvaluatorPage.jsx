export default function EvaluatorPage() {
  return (
    <main>
      <form id="my-form" action="/submit-resume" method="post">
        <label for="job-desc">Job Description:</label>
        <textarea
          name="job-desc"
          id="job-desc"
          placeholder="Write job description here"
        ></textarea>

        <label for="prompt">Prompt:</label>
        <textarea
          name="prompt"
          id="prompt"
          placeholder="Enter your prompt here"
        ></textarea>

        <label for="resume">Upload Resume:</label>
        <input type="file" id="resume" name="resume" accept=".pdf" />
        <br />
        <br />
        <button type="submit">Evaluate Resume</button>
      </form>

      <div id="results" className="results">
        Results will appear here
      </div>
    </main>
  );
}
