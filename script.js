const form = document.getElementById("my-form");

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const jobDesc = document.getElementById("job-desc").value;
  const fileInput = document.getElementById("resume");
  if (jobDesc.trim() === "") {
    document.getElementById("results").textContent =
      "Please enter a job description.";
    return;
  }
  if (fileInput.files.length === 0) {
    document.getElementById("results").textContent =
      "Please upload a PDF resume.";
    return;
  }
  const prompt = document.getElementById("prompt").value;
  const fileName = fileInput.files[0].name;
  document.getElementById("results").textContent =
    `Evaluating ${fileName} against the job description...`;
});
