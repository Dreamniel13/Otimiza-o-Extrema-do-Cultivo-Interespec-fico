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
// Rolagem suave para âncoras do menu


// Botão de voltar ao topo
const btnTopo = document.createElement('button');
btnTopo.id = 'btn-topo';
btnTopo.title = 'Voltar ao topo';
btnTopo.innerText = '↑';
document.body.appendChild(btnTopo);

const btn = document.getElementById('btn-topo');
btn.style.display = 'none';
window.onscroll = function() {
	// Mostrar botão ao rolar
	if (document.documentElement.scrollTop > 200) {
		btn.style.display = 'block';
	} else {
		btn.style.display = 'none';
	}
	// Destacar seção visível
	document.querySelectorAll('section').forEach(sec => {
		const rect = sec.getBoundingClientRect();
		if (rect.top < window.innerHeight/2 && rect.bottom > window.innerHeight/4) {
			sec.classList.add('destaque');
		} else {
			sec.classList.remove('destaque');
		}
	});
};
btn.onclick = function() {
	smoothScrollTo(0, 600);
};
