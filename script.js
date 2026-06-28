// script.js (corrigido)
// - Evita criar botão duplicado
// - Usa nome de variável consistente (btn)
// - Usa addEventListener('scroll')
// - Executa após DOMContentLoaded

document.addEventListener('DOMContentLoaded', () => {
	// Rolagem suave manual para âncoras do menu
	document.querySelectorAll('#menu-navegacao a').forEach(link => {
		link.addEventListener('click', function(e) {
			const href = this.getAttribute('href');
			if (href && href.startsWith('#')) {
				e.preventDefault();
				const alvo = document.querySelector(href);
				if (alvo) {
					const targetY = alvo.getBoundingClientRect().top + window.pageYOffset;
					smoothScrollTo(targetY, 600);
				}
			}
		});
	});

	function smoothScrollTo(target, duration) {
		const start = window.pageYOffset;
		const distance = target - start;
		let startTime = null;
		function animation(currentTime) {
			if (!startTime) startTime = currentTime;
			const timeElapsed = currentTime - startTime;
			const run = ease(timeElapsed, start, distance, duration);
			window.scrollTo(0, run);
			if (timeElapsed < duration) requestAnimationFrame(animation);
		}
		function ease(t, b, c, d) {
			t /= d / 2;
			if (t < 1) return c / 2 * t * t + b;
			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		}
		requestAnimationFrame(animation);
	}

	// Seleciona o botão existente; cria apenas se não existir
	let btn = document.getElementById('btn-topo');
	if (!btn) {
		btn = document.createElement('button');
		btn.id = 'btn-topo';
		btn.title = 'Voltar ao topo';
		btn.innerText = '↑';
		document.body.appendChild(btn);
	}

	// Inicialmente oculto
	btn.style.display = 'none';

	// Mostrar/ocultar botão ao rolar e destacar seções
	window.addEventListener('scroll', () => {
		const scrolled = window.pageYOffset || document.documentElement.scrollTop;
		if (scrolled > 200) {
			btn.style.display = 'block';
		} else {
			btn.style.display = 'none';
		}

		document.querySelectorAll('section').forEach(sec => {
			const rect = sec.getBoundingClientRect();
			if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 4) {
				sec.classList.add('destaque');
			} else {
				sec.classList.remove('destaque');
			}
		});
	});

	// Clique do botão
	btn.addEventListener('click', () => {
		smoothScrollTo(0, 600);
	});
});
