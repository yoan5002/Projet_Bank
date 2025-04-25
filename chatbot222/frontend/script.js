const chatIcon = document.getElementById("chat-icon");
const chatBox = document.getElementById("chat-box");
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");

chatIcon.onclick = () => {
  chatBox.classList.toggle("hidden");
  if (!chatBox.classList.contains("hidden")) {
    userInput.focus();
  }
};

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  // Affiche le message utilisateur
  addMessage("user", message);
  userInput.value = "";

  // Crée un élément de message vide pour le bot
  const botMsg = addMessage("bot", "...");
  botMsg.classList.add("typing");

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error("Erreur réseau");

    const data = await res.json();

    // Efface le texte de saisie progressive
    botMsg.classList.remove("typing");
    botMsg.textContent = "";

    typeEffect(botMsg, data.response);

  } catch (err) {
    botMsg.classList.remove("typing");
    botMsg.textContent = "cd Une erreur est survenue. Vérifie ton serveur Flask.";
  }
}

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return msg;
}

// Animation de texte lettre par lettre
function typeEffect(element, text, delay = 20) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < text.length) {
      element.textContent += text[i];
      i++;
      chatMessages.scrollTop = chatMessages.scrollHeight;
    } else {
      clearInterval(interval);
    }
  }, delay);
}
