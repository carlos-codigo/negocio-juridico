// Aguarda DOM pronto
document.addEventListener("DOMContentLoaded", () => {
  const screen = document.getElementById("screen");
  const sound  = document.getElementById("sound");

  if (!screen) { console.error("screen não encontrado"); return; }

  // Começa sempre em modo de espera
  resetScreen();

  
  // Ouve Firebase (aceita string antiga ou objeto novo)
  db.ref("command").on("value", snap => {
    const val = snap.val();
    if (!val) return;

    if (typeof val === "string") {
      handleCommand(val, {});
    } else if (val && typeof val === "object" && val.cmd) {
      handleCommand(val.cmd, val);
    }
  });

  function handleCommand(cmd, data){
    switch(cmd){
      case "start":
        updateBig("🔊 APRESENTAÇÃO INICIADA");
        play("start.mp3");
        break;

      case "case":
        showCase(data.title || "Caso", data.text || "");
        break;

      case "hint":
        showOverlay("💡 Dica", data.text || "", 5000);
        break;

      case "law":
        showOverlay("📜 Fundamento legal", data.text || "", 7000);
        break;

      case "suspense":
        showOverlay("🎭 Suspense", "Reflitam antes de responder…", 3000);
        play("coracao.mp3");
        break;

      case "valid":
        feedback("✅ LÍCITO", "#0a4");
        play("valido.mp3");
        break;

      case "invalid":
        feedback("❌ ILÍCITO", "#a00");
        play("erro.mp3");
        break;

      case "assinatura":
        showOverlay("🖊 Assinatura", "Formalização do negócio jurídico.", 2500);
        play("assinatura.mp3");
        break;

      case "vicio":
        feedback("⚠ VÍCIO DE VONTADE", "#775500", true);
        play("sirene.mp3");
        break;

      // 🌟 Novo comando DES — Explicação detalhada (Caso 10)
      case "des":
        showDes();
        play("sirene.mp3");
        break;

      case "reset":
        resetScreen();
        break;

      case "encerrar":
        updateBig("🔚 APRESENTAÇÃO ENCERRADA");
        play("final.mp3");
        break;
    }
  }

  // ===== UI helpers =====
  function resetScreen(){
    screen.style.background = "#000";
    screen.style.animation = "none";
    screen.innerHTML = `
      <div class="content pulse glow">
        <h1>⚖ NEGÓCIO JURÍDICO INTERATIVO</h1>
        <p>Aguardando o apresentador iniciar...</p>
      </div>
    `;
  }

  function updateBig(text){
    screen.style.background = "#111";
    screen.style.animation = "none";
    screen.innerHTML = `<div class="content"><h1>${text}</h1></div>`;
  }

  function showCase(title, text){
    screen.style.background = "#0b0b0b";
    screen.style.animation = "none";
    screen.innerHTML = `
      <div class="content" style="gap:12px">
        <h1>${title}</h1>
        <p style="max-width:900px; line-height:1.6; font-size:1.1rem">${escapeHtml(text)}</p>
      </div>
    `;
  }

  function feedback(text, color, blink=false){
    screen.style.background = color;
    screen.innerHTML = `<div class="content"><h1>${text}</h1></div>`;
    screen.style.animation = blink ? "blink .22s infinite" : "none";
  }

  function showOverlay(title, body, ms=4000){
    const wrap = document.createElement("div");
    wrap.style.position = "fixed";
    wrap.style.left = "50%";
    wrap.style.top = "8%";
    wrap.style.transform = "translateX(-50%)";
    wrap.style.zIndex = "9999";
    wrap.style.background = "rgba(15,23,42,.92)";
    wrap.style.color = "#fef3c7";
    wrap.style.border = "1px solid #d4af37";
    wrap.style.borderRadius = "12px";
    wrap.style.padding = "14px 16px";
    wrap.style.maxWidth = "92vw";
    wrap.style.boxShadow = "0 10px 28px rgba(0,0,0,.45)";
    wrap.innerHTML = `
      <div style="font-weight:700; margin-bottom:6px">${title}</div>
      <div style="opacity:.95">${escapeHtml(body)}</div>
    `;
    document.body.appendChild(wrap);
    setTimeout(()=> wrap.remove(), ms);
  }

  // ===== Novo método DES =====
  function showDes(){
    const html = `
      <div style="
        max-width:900px;margin:60px auto;padding:30px;
        background:rgba(15,23,42,.85);border:1px solid #d4af37;
        border-radius:16px;box-shadow:0 0 25px rgba(255,215,0,.4);
        text-align:center;color:#fef3c7;animation:flashBorder 1.5s infinite alternate;
      ">
        <h2 style="color:#ffd166;text-shadow:0 0 10px #ffdd88;">⚠ VÍCIO DE VONTADE DETECTADO</h2>
        <p style="line-height:1.6;font-size:1.1rem;margin-top:12px;">
          O contrato apresentado parece correto à primeira vista, mas contém um detalhe que compromete sua validade jurídica:
          <strong>a dispensa de assinatura e testemunhas</strong> e a previsão de que ele seria válido "por meio eletrônico ou verbal".
        </p>
        <p style="line-height:1.6;font-size:1.1rem;">
          Isso significa que <em>a vontade das partes não foi expressa de forma segura</em>, configurando um
          <strong>vício de vontade</strong> conforme os artigos 138 a 147 do Código Civil.
        </p>
        <p style="line-height:1.6;font-size:1.1rem;">
          Embora o objeto e as partes sejam lícitos, a forma escolhida gera incerteza e permite que uma das partes alegue erro ou dolo na manifestação da vontade.
          O contrato, portanto, é <strong>anulável</strong> e não nulo — um vício sutil, mas grave na prática jurídica.
        </p>
        <p style="color:#ffd166;font-weight:600;">💡 Moral: nem todo contrato aparente é válido; a forma também é uma garantia da vontade livre.</p>
      </div>
    `;

    screen.style.animation = "none";
    screen.innerHTML = html;

    // Piscar vermelho e dourado
    let blink = true;
    const interval = setInterval(() => {
      screen.style.backgroundColor = blink ? "#3b0000" : "#0b1220";
      blink = !blink;
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      screen.style.backgroundColor = "#0b1220";
    }, 20000);
  }

  function play(file){
    if (!sound) return;
    sound.src = file;
    sound.play().catch(()=>{});
  }

  function escapeHtml(s){
    return (s||"").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }
});

// ===== Painel legado (botões antigos ainda funcionam) =====
function sendCommand(cmd){ db.ref("command").set(cmd); }

