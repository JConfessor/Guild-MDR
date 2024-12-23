// Função para copiar códigos e manipular o header
function copyCode(elementId) {
  const code = document.getElementById(elementId).textContent;
  navigator.clipboard.writeText(code).then(() => {
    alert("Código copiado: " + code);
  });
}

// Função para ajustar o header ao rolar a página
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Função para ajustar a rolagem suave com offset
document.querySelectorAll("a.nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    // Obtém o ID da seção alvo
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    // Verifica se o elemento existe antes de continuar
    if (targetElement) {
      // Define o offset (ajuste o valor conforme necessário)
      const offset = 100; // Esse valor é a distância do topo

      // Calcula a posição do elemento em relação ao topo
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;

      // Subtrai o offset para ajustar a rolagem
      const offsetPosition = elementPosition - offset;

      // Faz a rolagem suave até a posição ajustada
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      console.error("Elemento não encontrado:", targetId);
    }
  });
});

// Função para aplicar animação de fade-in ao rolar a página
function handleScrollFadeIn() {
  const fadeInElements = document.querySelectorAll(
    ".fade-in, .section-fade-in"
  );

  fadeInElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom >= 0) {
      element.classList.add("visible");
    }
  });
}

// Executa a função ao rolar a página
window.addEventListener("scroll", handleScrollFadeIn);

// Fechar o menu hamburguer após selecionar uma seção
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", function () {
    const navbarCollapse = document.querySelector(".navbar-collapse");
    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
    bsCollapse.hide();
  });
});

// Executa o fade-in nos elementos ao carregar a página
window.addEventListener("DOMContentLoaded", handleScrollFadeIn);

// Função para carregar e exibir códigos do JSON
async function loadCodigos() {
  try {
    const response = await fetch("codigos.json");
    const codigos = await response.json();

    const tbody = document.getElementById("codigos-tbody");
    tbody.innerHTML = "";

    codigos.forEach((item, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${item.data}</td>
        <td id="code${index}">${item.codigo}</td>
        <td>${item.descricao}</td>
        <td>
          <button class="btn btn-sm btn-primary" onclick="copyCode('code${index}')">Copiar</button>
        </td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar os códigos:", error);
  }
}

// Chama a função ao carregar a página
window.addEventListener("DOMContentLoaded", loadCodigos);

// Função para carregar e exibir perguntas do JSON
async function loadPerguntas() {
  try {
    const response = await fetch("perguntas.json");
    const perguntas = await response.json();

    const tbody = document.getElementById("simulado-tbody");
    tbody.innerHTML = ""; // Limpa o conteúdo da tabela

    // Salva as perguntas para filtrar
    window.allPerguntas = perguntas;

    perguntas.forEach((item) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.pergunta}</td>
        <td>${item.resposta}</td>
      `;
      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Erro ao carregar as perguntas:", error);
  }
}

// Função para filtrar perguntas na tabela
function filterPerguntas() {
  const searchTerm = document
    .getElementById("searchPergunta")
    .value.toLowerCase();
  const filteredPerguntas = window.allPerguntas.filter((item) =>
    item.pergunta.toLowerCase().includes(searchTerm)
  );

  const tbody = document.getElementById("simulado-tbody");
  tbody.innerHTML = ""; // Limpa a tabela

  filteredPerguntas.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.pergunta}</td>
      <td>${item.resposta}</td>
    `;
    tbody.appendChild(row);
  });
}

// Carrega as perguntas ao carregar a página
window.addEventListener("DOMContentLoaded", loadPerguntas);
