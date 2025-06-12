export function showRiskResult(check) {
    const container = document.querySelector('.result-container');
    const percentage = container.querySelector('.result-percentage');
    const label = container.querySelector('.result-risk-label');
    /*
    const icon = container.querySelector('.result-icon-green');
    const confirmation = container.querySelector('.save-confirmation');
    */
  
    const riskCategory = check.riskCategory?.toLowerCase?.() || "low";
    const riskMap = {
        low: {
          text: "Risiko Rendah",
          background: "#d1fae5", // hijau muda
          border: "#047857",     // hijau tua (lebih jelas)
          color: "#065f46",      // font hijau gelap
        },
        medium: {
          text: "Risiko Sedang",
          background: "#fef3c7", // kuning muda
          border: "#f59e0b",     // kuning
          color: "#92400e",      // font kuning gelap
        },
        high: {
          text: "Risiko Tinggi",
          background: "#fee2e2", // merah muda
          border: "#ef4444",     // merah
          color: "#991b1b",      // font merah gelap
        },
      };
      
  
    const risk = riskMap[riskCategory];
    percentage.textContent = `${check.risk}%`;

  label.textContent = risk.text;
  label.style.backgroundColor = risk.background;
  label.style.border = `2px solid ${risk.border}`;
  label.style.color = risk.color; // ✅ Set font color
    
    

    container.style.display = "block";
  }
  