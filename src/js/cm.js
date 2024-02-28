(function () {
	window.isNumeric = function (str) {
		if (typeof str != "string") return false;
		return !isNaN(str) && !isNaN(parseFloat(str));
	};

	window.getValue = function (selector, parent = document) {
		var el = parent.querySelector(selector);
		return el ? (isNumeric(el.value) ? Number(el.value) : el.value) : "";
	};

	window.setValue = function (selector, value, parent = document) {
		parent.querySelectorAll(selector).forEach(function (input) {
			input.value = value;
		});
	};

	window.isChecked = function (selector, parent = document) {
		var el = parent.querySelector(selector);
		return el ? el.checked : false;
	};

	window.setTextContent = function (selector, value, parent = document) {
		parent.querySelectorAll(selector).forEach(function (el) {
			el.textContent = value;
		});
	};

	window.getTextContent = function (selector, parent = document) {
		var el = parent.querySelector(selector);
		return el ? el.textContent : "";
	};

	window.setHTMLContent = function (selector, value, parent = document) {
		parent.querySelectorAll(selector).forEach(function (el) {
			el.innerHTML = value;
		});
	};

	window.setShow = function (selector, parent = document) {
		parent.querySelectorAll(selector).forEach(function (el) {
			el.classList.remove("d-none");
		});
	};

	window.setHide = function (selector, parent = document) {
		parent.querySelectorAll(selector).forEach(function (el) {
			el.classList.add("d-none");
		});
	};

	window.setRequired = function (selector, value = true, parent = document) {
		parent.querySelectorAll(selector).forEach(function (el) {
			el.required = value;
		});
	};

	window.showHideBillingInfo = function () {
		var paypal = getValue('[name="paypal"]:checked');
		var cd =
			isChecked('[type="checkbox"][name="cd"]') ||
			getValue('[type="hidden"][name="cd"]') == 1 ||
			false;
		if (paypal) {
			if (cd == true) {
				setShow(".hide-paypal.cd-required");
				setRequired(".hide-paypal.cd-required input");
				setHide(".hide-paypal:not(.cd-required)");
				setRequired(".hide-paypal:not(.cd-required) input", false);
			} else {
				setHide(".hide-paypal");
				setRequired(".hide-paypal input", false);
			}
		} else {
			setShow(".hide-paypal");
			setRequired(".hide-paypal input");
		}
	};

	window.clearSelectBox = function (name) {
		document
			.querySelectorAll('select[name="' + name + '"]')
			.forEach(function (select) {
				while (select.options.length) {
					select.remove(0);
				}
			});
	};

	window.compare = function (a, b) {
		if (a === b) {
			return 0;
		}
		var a_components = a.split(".");
		var b_components = b.split(".");
		var len = Math.min(a_components.length, b_components.length);
		for (var i = 0; i < len; i++) {
			if (parseInt(a_components[i]) > parseInt(b_components[i])) {
				return 1;
			}
			if (parseInt(a_components[i]) < parseInt(b_components[i])) {
				return -1;
			}
		}
		if (a_components.length > b_components.length) {
			return 1;
		}
		if (a_components.length < b_components.length) {
			return -1;
		}
		return 0;
	};

	document
		.querySelectorAll('[name="paypal"], [name="cd"]')
		.forEach(function (input) {
			input.addEventListener("change", showHideBillingInfo);
		});

	function normalizeSlideHeights() {
		document.querySelectorAll(".carousel").forEach(function (el) {
			var maxHeight = 0;
			var items = el.querySelectorAll(".carousel-item");
			items.forEach(function (item) {
				item.style.minHeight = 0;
				maxHeight = Math.max(maxHeight, item.offsetHeight);
			});
			items.forEach(function (item) {
				item.style.minHeight = maxHeight + "px";
			});
		});
	}

	"load resize orientationchange".split(/\s+/).forEach(function (evt) {
		window.addEventListener(evt, normalizeSlideHeights);
	});

	/* Cookie warning */
	if (typeof window.cookieconsent != "undefined") {
		window.cookieconsent.initialise({
			theme: "edgeless",
			palette: {
				popup: {
					background: "#212529",
					text: "#fff",
					link: "#fff",
				},
				button: {
					background: "#1b4a8c",
					text: "#fff",
				},
			},
			content: {
				href: "/cookies.php",
			},
		});
	}

	/* bootstrap tooltips */
	if (typeof bootstrap != "undefined") {
		var tooltipTriggerList = [].slice.call(
			document.querySelectorAll('[data-bs-toggle="tooltip"]')
		);
		tooltipTriggerList.map(function (tooltipTriggerEl) {
			return new bootstrap.Tooltip(tooltipTriggerEl);
		});
	}

	document
		.querySelectorAll("a[data-bs-toggle=modal]")
		.forEach(function (link) {
			link.addEventListener("click", function () {
				document
					.querySelectorAll(".was-validated")
					.forEach(function (form) {
						form.classList.remove("was-validated");
					});
			});
		});

	document.querySelectorAll(".video-holder button").forEach(function (btn) {
		btn.addEventListener("click", function (evt) {
			var this_btn = evt.currentTarget;
			var parent_target = this_btn.parentNode.parentNode;
			var iframe = document.createElement("iframe");
			iframe.src = this_btn.value;
			iframe.width = 560;
			iframe.height = 315;
			iframe.frameBorder = 0;
			iframe.allow =
				"accelerometer;autoplay;encrypted-media;gyroscope;picture-in-picture";
			iframe.allowFullscreen = true;

			parent_target.innerHTML = "";
			parent_target.appendChild(iframe);
		});
	});
})();
