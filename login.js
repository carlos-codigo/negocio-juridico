function login() {
  const senha = document.getElementById("senha").value;
  const erro = document.getElementById("erro");

  if (senha === "1234") {
    localStorage.setItem("auth", "ok");
    window.location.href = "control.html";
  } else {
    erro.innerText = "Senha incorreta!";
    erro.style.opacity = 1;

    // Efeito de erro: tremer a tela
    document.querySelector(".login-box").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".login-box").classList.remove("shake");
    }, 500);
  }
}
