// set up togglers (i.e choosing fonts)
(function () {
  const togglers = [...document.querySelectorAll("[data-expander-toggle]")];

  togglers.forEach((toggler) => {
    const toggleAttributeValue = toggler.getAttribute("data-expander-toggle");
    const toggleTarget = document.getElementById(toggleAttributeValue);

    toggler.addEventListener("click", (e) => {
      if (!toggler.classList.contains("active")) {
        toggler.classList.add("active");
        toggler.setAttribute("aria-expanded", "true");
        toggleTarget.classList.add("active");
      } else if (toggler.classList.contains("active")) {
        toggler.classList.remove("active");
        toggler.setAttribute("aria-expanded", "false");
        toggleTarget.classList.remove("active");
      }
    });
  });
})();

// selecting page font
(function () {
  const mainFontBtn = document.querySelector(
    "[data-expander-toggle='font-flyout']"
  );
  const mainFontBtnText = document.querySelector("#font-button-text");
  const fontSelectorButtons = [
    ...document.querySelectorAll("[ font-selector]"),
  ];

  let bodyclass = "";
  loadPageFont();

  fontSelectorButtons.forEach((btn) => {
    const font = btn.value;

    btn.addEventListener("click", (e) => {
      setupFonts(font);
      localStorage.setItem("pageFont", font);
    });
  });

  function loadPageFont() {
    const storedFont = localStorage.getItem("pageFont");
    const firstFont = document.querySelector("[font-selector]").value;
    storedFont === null ? setupFonts(firstFont) : setupFonts(storedFont);
  }
  function setupFonts(font) {
    mainFontBtn.value = font;
    mainFontBtnText.textContent = font;

    if (font === "Sans Serif") {
      bodyclass = "sans";
    } else if (font === "Serif") {
      bodyclass = "serif";
    } else if (font === "Mono") {
      bodyclass = "mono";
    }

    document.body.setAttribute("class", bodyclass);
  }
})();

// utility functions
