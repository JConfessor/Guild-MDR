document.addEventListener("DOMContentLoaded", function () {
  const elements = document.querySelectorAll(".slide-in, .section-fade");

  function handleScroll() {
    elements.forEach((element) => {
      const position = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (position < windowHeight - 50) {
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        element.style.opacity = "1";
        element.style.transform = "translateX(0)";
      } else {
        element.style.opacity = "0";
        element.style.transform = "translateX(-100px)";
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Verifica se já está visível ao carregar a página
});
