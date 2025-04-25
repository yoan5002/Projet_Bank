document.addEventListener("DOMContentLoaded", function () {
    console.log(" auth.js chargé avec succès !");

    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");

    //  Inscription (Sign Up)
    if (registerForm) {
        registerForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            console.log(" Tentative d'inscription...");

            const nameField = document.getElementById("register-name");
            const emailField = document.getElementById("register-email");
            const passwordField = document.getElementById("register-password");
            const message = document.getElementById("register-message");

            if (!nameField || !emailField || !passwordField) {
                console.error(" Champs d'inscription non trouvés !");
                return;
            }

            const name = nameField.value.trim();
            const email = emailField.value.trim();
            const password = passwordField.value.trim();

            if (!name || !email || !password) {
                message.textContent = " Veuillez remplir tous les champs.";
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/auth/register", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password })
                });

                console.log(" Réponse API (inscription):", response);

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.error(" Erreur d'inscription :", errorResult);
                    message.textContent = errorResult.error || "Erreur lors de l'inscription.";
                    return;
                }

                const result = await response.json();
                message.textContent = result.message;
                alert(" Inscription réussie. Redirection vers la connexion.");
                window.location.href = "index.html"; // Redirection vers la page de connexion

            } catch (error) {
                console.error(" Erreur lors de l'inscription :", error);
                message.textContent = " Erreur lors de l'inscription.";
            }
        });
    }

    // Connexion et envoi d'OTP
    if (loginForm) {
        loginForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            console.log(" Tentative de connexion...");

            const emailField = document.getElementById("login-email");
            const passwordField = document.getElementById("login-password");
            const message = document.getElementById("login-message");

            if (!emailField || !passwordField) {
                console.error(" Champs email ou mot de passe non trouvés !");
                return;
            }

            const email = emailField.value.trim();
            const password = passwordField.value.trim();

            if (!email || !password) {
                message.textContent = " Veuillez entrer vos identifiants.";
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email, password })
                });

                console.log(" Réponse API (connexion):", response);

                if (!response.ok) {
                    const errorResult = await response.json();
                    console.error(" Erreur de connexion :", errorResult);
                    message.textContent = errorResult.error || "Email ou mot de passe incorrect.";
                    return;
                }

                const result = await response.json();
                message.textContent = result.message;

                localStorage.setItem("email", email);
                alert(" Un code OTP a été envoyé à votre email.");
                
                //  Redirection immédiate après l'envoi du code OTP
                window.location.href = "verify-otp.html";

            } catch (error) {
                console.error("Erreur de connexion :", error);
                message.textContent = " Erreur de connexion.";
            }
        });
    } else {
        console.error(" Formulaire de connexion non trouvé !");
    }
});
