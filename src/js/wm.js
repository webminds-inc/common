(function (w, d, $) {

	/* Need jQuery */
	if (typeof $ == 'undefined') {
		if (typeof console != 'undefined') {
			console.log('Please include jQuery!');
		}
		return;
	}

	var jsdelivr = 'https://cdn.jsdelivr.net/';
	/* load lightbox2 cdn */
	$(function () {
		if ($('[data-lightbox]').length) {
			var lb_cdn = jsdelivr + 'npm/lightbox2@2';
			$('<link />', {
				'rel': 'stylesheet',
				'href': lb_cdn + '/dist/css/lightbox.min.css'
			}).appendTo('head');
			$.getScript(lb_cdn + '/dist/js/lightbox.min.js');
		}
	});

	$(function () {
		/* paypal input */
		$('[name=paypal]').on('change', function () {
			if (Number($(this).val())) {
				$('.hide-paypal').hide();
				$('.show-paypal').show();
				$('.hide-paypal input').prop('required', false);
			} else {
				$('.hide-paypal').show();
				$('.show-paypal').hide();
				$('.hide-paypal input').prop('required', true);
			}
		});

		/* bootstrap form validation */
		$('.needs-validation').on('submit', function (e) {
			if (!this.checkValidity()) {
				e.preventDefault();
				e.stopPropagation();
				$(this).addClass('was-validated');
			} else {
				$(this).removeClass('was-validated');
			}
		});
		$('a[data-bs-toggle=modal], a[data-toggle=modal]').on('click', function () {
			$('.was-validated').removeClass('was-validated');
		});

		/* bootstrap tooltips */
		try {
			$('[data-bs-toggle="tooltip"], [data-toggle="tooltip"]').tooltip();
		} catch (e) { };

		/* fix bootstrap accordion */
		function updateCard() {
			var hash = w.location.hash;
			if (hash) {
				$('.card .collapse').removeClass('show');
				var $card = $(hash).parents('.card');
				$card.find('.collapse').addClass('show');
			}
		}
		$(w).on('load', function () {
			updateCard();

			if (!!($ && history.pushState)) {
				$('.card [data-bs-toggle="collapse"], .card [data-toggle="collapse"]').on('click', function () {
					if ($(this).parent().attr('id')) {
						history.pushState({}, '', '#' + $(this).parent().attr('id'));
					}
				});
			}
		}).on('hashchange', function () {
			updateCard();
		});

		/* resize slider */
		function debounce(func, wait, immediate) {
			var timeout;
			return function () {
				var context = this, args = arguments;
				var later = function () {
					timeout = null;
					if (!immediate) func.apply(context, args);
				};
				var callNow = immediate && !timeout;
				clearTimeout(timeout);
				timeout = setTimeout(later, wait);
				if (callNow) func.apply(context, args);
			};
		};
		var resizeSlider = debounce(function () {
			$('.carousel').each(function () {
				var items = $('.carousel-item', this);
				items.css('height', 'auto');
				var maxHeight = Math.max.apply(null,
					items.map(function () {
						return $(this).outerHeight()
					}).get());
				items.css('height', maxHeight + 'px');
			});
		}, 250);
		$(w).on('load resize orientationchange', resizeSlider);
	});
})(window, document, jQuery);
