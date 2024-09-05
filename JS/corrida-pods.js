(function() {
    const startButton = document.getElementById('start-race');
    const raceResult = document.getElementById('race-result');
    const pods = document.querySelectorAll('.pod');

    startButton.addEventListener('click', () => {
        raceResult.textContent = '';
        pods.forEach(pod => {
            pod.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            pods.forEach(pod => {
                const distance = Math.floor(Math.random() * 500) + 100;
                pod.style.transform = `translateX(${distance}px)`;
            });
        }, 100);

        // Determinar o vencedor após 2 segundos
        setTimeout(() => {
            let maxDistance = 0;
            let winner = '';
            pods.forEach(pod => {
                const distance = parseInt(pod.style.transform.replace('translateX(', '').replace('px)', ''));
                if (distance > maxDistance) {
                    maxDistance = distance;
                    winner = pod.textContent;
                }
            });
            raceResult.textContent = `Vencedor: ${winner}`;
        }, 2000);
    });
})();
