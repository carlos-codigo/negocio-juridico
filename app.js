// Aguarda DOM carregar antes de executar qualquer coisa
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ App iniciado, DOM carregado");

  const screen = document.getElementById("screen");
  const sound = document.getElementById("sound");

  if (!screen) {
    console.error("❌ ERRO: elemento #screen não encontrado.");
    return;
  }

  resetScreen(); // Sempre inicia modo de espera no carregamento

  // Escuta os comandos do Firebase
  db.ref("command").on("value", snapshot => {
    const cmd = snapshot.val();
    if (!cmd) return;
    console.log("📡 Comando recebido:", cmd);
    handleCommand(cmd);
  });

  function handleCommand(cmd) {
    switch(cmd) {
      case "start":
        updateScreen("🔊 APRESENTAÇÃO INICIADA", "#111");
        play("start.mp3");
        break;

      case "valid":
        updateScreen("✅ NEGÓCIO JURÍDICO VÁLIDO", "#0a4");
        play("valido.mp3");
        break;

      case "invalid":
        updateScreen("❌ NEGÓCIO JURÍDICO INVÁLIDO", "#a00");
        play("erro.mp3");
        break;

      case "assinatura":
        updateScreen("🖊 CONTRATO ASSINADO", "#111");
        play("assinatura.mp3");
        break;

      case "vicio":
        updateScreen("⚠ VÍCIO DE VONTADE DETECTADO", "#550");
        play("coracao.mp3");
        blink();
        break;

      case "encerrar":
        updateScreen("🔚 APRESENTAÇÃO ENCERRADA", "#000");
        play("final.mp3");
        break;

        case "inicio":
        updateScreen("⚖ NEGÓCIO JURÍDICO INTERATIVO", "#000");
        play("inicio.mp3");
        break;

      case "reset":
        resetScreen();
        break;
    }
  }

  function updateScreen(text, color) {
    screen.style.background = color;
    screen.style.animation = "none";
    screen.innerHTML = `<h1>${text}</h1>`;
  }

  function blink() {
    screen.style.animation = "blink 0.2s infinite";
  }

  function play(file) {
    if (!sound) return;
    sound.src = file;
    sound.play().catch(err => console.warn("🔇 Falha ao tocar som:", err));
  }

});

// ======== FUNÇÃO DO PAINEL =========
function sendCommand(cmd) {
  db.ref("command").set(cmd);
}

// ======== TELA INICIAL / RESET =========
function resetScreen() {
  const screen = document.getElementById("screen");
  screen.style.background = "#000";
  screen.style.animation = "none";
  screen.innerHTML = `
    <div class="content pulse glow">
      <h1>⚖ NEGÓCIO JURÍDICO INTERATIVO</h1>
      <p>Aguardando o apresentador iniciar...</p>
    </div>
  `;
}

