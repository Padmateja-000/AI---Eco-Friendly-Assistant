function getRecommendation() {
  const input = document.getElementById("productInput").value.trim();
  const resultsDiv = document.getElementById("results");

  if (!input) {
    resultsDiv.innerHTML = "<p>Please enter a product name.</p>";
    return;
  }

  // Simulate AI processing
  const ecoScore = Math.floor(Math.random() * 100) + 1;
  let message = "";

  if (ecoScore > 80) {
    message = "Excellent eco-friendly choice!";
  } else if (ecoScore > 50) {
    message = "Moderately sustainable. Consider better alternatives.";
  } else {
    message = "Not eco-friendly. Try a greener product.";
  }

  resultsDiv.innerHTML = `
    <div class="result-card">
      <h3>Results for "${input}"</h3>
      <p><strong>Eco Score:</strong> ${ecoScore}/100</p>
      <p>${message}</p>
    </div>
  `;
}
