document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("introModal");
  const closeBtn = document.querySelector(".close");
  const introForm = document.getElementById("introForm");
  const introOutput = document.getElementById("introOutput");
  const generateBtn = document.getElementById("generateBtn");
  const launchBotBtn = document.getElementById("launchBot");
  const getStartedBtns = document.querySelectorAll(".get-started");

  // Open modal
  function openModal(e) {
    e.preventDefault();
    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  }

  getStartedBtns.forEach(btn => btn.addEventListener("click", openModal));
  if (launchBotBtn) launchBotBtn.addEventListener("click", openModal);

  // Close modal
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Form submit
  introForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const role = document.getElementById("role").value.trim();
    const style = document.getElementById("style").value;

    // Show loading
    introOutput.style.display = "block";
    introOutput.classList.add("show", "loading");
    introOutput.innerHTML = "Generating your introduction with AI…";
    generateBtn.disabled = true;
    generateBtn.textContent = "Generating…";

    try {
      const response = await fetch("http://localhost:3000/api/generate-intro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, role, style }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate intro");
      }

      // Show the result clearly
      introOutput.classList.remove("loading");
      introOutput.innerHTML = `
        <strong>Your Introduction:</strong><br><br>
        ${data.intro}
      `;
      introOutput.style.display = "block";

      console.log("Generated intro:", data.intro); // for debugging
    } catch (err) {
      console.error(err);
     introOutput.classList.remove("loading");
introOutput.innerHTML = `
  <strong>Your Introduction:</strong><br><br>
  <div style="margin-top: 8px;">${data.intro}</div>
`;
introOutput.style.display = "block";
introOutput.classList.add("show");
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = "Generate Intro";
    }
  });
});