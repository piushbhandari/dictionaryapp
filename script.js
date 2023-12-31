// set up togglers (i.e choosing fonts)
(function () {
	const togglers = [...document.querySelectorAll("[data-expander-toggle]")];

	togglers.forEach((toggler) => {
		const toggleAttributeValue = toggler.getAttribute(
			"data-expander-toggle"
		);
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

// theme switcher

(function () {
	const themeSwitcher = document.querySelector("[data-theme]");

	const storedTheme = localStorage.getItem("pageTheme");

	if (storedTheme !== null) {
		setupThemes(storedTheme);
	}

	themeSwitcher.addEventListener("click", (e) => {
		const currentTheme = themeSwitcher.getAttribute("data-theme");
		setupThemes(currentTheme);
	});

	function setupThemes(theme) {
		if (theme === "light") {
			document.body.setAttribute("id", "dark");
			themeSwitcher.setAttribute("data-theme", "dark");
		} else if (theme === "dark") {
			document.body.setAttribute("id", "light");
			themeSwitcher.setAttribute("data-theme", "light");
		}

		localStorage.setItem("pageTheme", theme);
	}
})();

// dictionary api: https://api.dictionaryapi.dev/api/v2/entries/en/<word>
// source: https://dictionaryapi.dev/

(function () {
	const searchInput = document.querySelector("#dictionary-search");
	const searchButton = document.querySelector("#search-btn");
	const errMsg = document.querySelector("#error-msg");
	const errorBox = document.querySelector("#error-box");
	const resultBox = document.querySelector("#result-box");

	const baseApiUrl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
	let currentInputValue = "";
	let apiUrl = "";

	const storedWord = localStorage.getItem("word");

	if (storedWord !== null) {
		apiUrl = `${baseApiUrl}${storedWord}`;
		startFetch(apiUrl);
	}

	searchButton.addEventListener("click", (e) => {
		currentInputValue = searchInput.value;
		const isFormValid = validateForm();

		if (isFormValid) {
			apiUrl = `${baseApiUrl}${currentInputValue}`;
			localStorage.setItem("word", currentInputValue);
			startFetch(apiUrl);
		}
	});

	function validateForm() {
		let isValidated = false;
		if (!currentInputValue.trim().length) {
			errMsg.textContent = "Whoops, can’t be empty…";
			setupStyles(true);
		} else {
			``;
			setupStyles(false);
			isValidated = true;
		}

		return isValidated;
	}

	function setupStyles(flag) {
		if (flag) {
			errMsg.classList.add("error");
			searchInput.classList.add("error");
		} else {
			errMsg.classList.remove("error");
			searchInput.classList.remove("error");
		}
	}

	async function startFetch(apiUrl) {

   
		const data = await getData(apiUrl);
    
		if (data === undefined) {
      console.log('empty!')
      errorBox.classList.add('show')
      resultBox.classList.add('hide')
		} else {
      console.log(apiUrl);
      console.log(currentInputValue);
      console.log(data);
		}
 
	}

	async function getData(apiUrl) {
		try {
			const res = await fetch(apiUrl);
			const json = await res.json();

			if (res.status === 404) {
				throw new Error("YOU SHALL NOT PASS!");
			} else {
				return json;
			}
		} catch (error) {
			console.log("Something went wrong!");
			console.warn(error);
		}
	}
})();
