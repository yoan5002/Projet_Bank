document.addEventListener("DOMContentLoaded", function () {
    const verifyOtpForm = document.getElementById("verify-otp-form");
    const message = document.getElementById("message");
    const email = localStorage.getItem("email");
  
    if (!email) {
      message.textContent = "Erreur : Aucun email trouvé.";
      return;
    }
  
    verifyOtpForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const otp = document.getElementById("otp").value.trim();
  
      if (!otp) {
        message.textContent = "Veuillez entrer le code OTP.";
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp })
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          message.textContent = result.error || "Code incorrect.";
          return;
        }
  
        console.log(" OTP vérifié. Token reçu :", result.token);
  
        // Stocker le token
        localStorage.setItem("token", result.token);
        localStorage.removeItem("email");
  
        // Vérification
        if (!localStorage.getItem("token")) {
          console.error(" Le token n'a pas été stocké !");
          message.textContent = "Erreur critique : le token n'a pas pu être sauvegardé.";
          return;
        }
  
        // Redirection
        console.log(" Redirection vers le dashboard avec token :", result.token);
        window.location.href = "http://localhost:5174";
  
      } catch (error) {
        console.error("Erreur lors de la vérification :", error);
        message.textContent = "Erreur lors de la vérification.";
      }
    });
  });
  