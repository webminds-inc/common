
!function(i, c, o, n) {
	i.head.appendChild(
		n = i.createElement('link'),
		n.rel = 'stylesheet',
		n.href = c + 'css/svg-with-js.min.css'
	);
	
	[
		'brands/',
		'regular/',
		'solid/'
	].forEach(function(v, f, j) {
		for (
			n = i.querySelectorAll('i.fa' + v[j = 0]);
			f = n[j++];
			f && !i[f = f[0]] && (
				o = i[f] = new XMLHttpRequest(),
				o.u = f,
				o.open('GET', c + 'svgs/' + v + f.substr(3) + '.svg', !0),
				o.onload = function() {
					for (t = this;
						 t.status == 200 &&
						(v = i.querySelector('i.' + t.u));
						v.parentNode.removeChild(v)
					) 
						v.insertAdjacentHTML(
							'afterend',
							t.responseText.replace(
								/(<svg)/i,
								'$1 fill="currentColor" class="svg-inline--fa ' + t.u + '"'
							)
						)
				},
				o.send()
			)
		)
			f = /fa-[^ "]+/.exec(f.className)
	})
}(
	document,
	'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.14.0/'
);
