(function() {
    class Explorador {
        constructor(nome) {
            this.nome = nome;
            this.nivel = 1;
            this.experiencia = 0;
            this.ranque = 'Novato';
            this.explorou = [];
        }

        explorar(planeta) {
            if (this.explorou.includes(planeta.id)) {
                return { sucesso: false, mensagem: `Você já explorou o ${planeta.nome}.` };
            }

            const dados = this.rolarDados();
            let sucesso = false;
            let mensagem = '';

            if (planeta.hostilidade === 'pacifico' && dados >= 5) sucesso = true;
            if (planeta.hostilidade === 'neutro' && dados >= 7) sucesso = true;
            if (planeta.hostilidade === 'hostil' && dados >= 9) sucesso = true;
            if (dados === 2 && planeta.hostilidade === 'hostil') {
                this.morrer();
                return { sucesso: false, mensagem: `${this.nome} morreu na exploração do ${planeta.nome}.` };
            }

            if (sucesso) {
                this.explorou.push(planeta.id);
                this.ganharExperiencia(planeta);
                mensagem = `Exploração bem-sucedida no ${planeta.nome}! Você ganhou ${this.getPontosExperiencia(planeta.hostilidade)} pontos de experiência.`;
            } else {
                mensagem = `Falha na exploração do ${planeta.nome}.`;
            }

            return { sucesso, mensagem };
        }

        rolarDados() {
            return Math.floor(Math.random() * 6 + 1) + Math.floor(Math.random() * 6 + 1);
        }

        ganharExperiencia(planeta) {
            let pontos = this.getPontosExperiencia(planeta.hostilidade);
            this.experiencia += pontos;
            this.atualizarNivel();
        }

        getPontosExperiencia(hostilidade) {
            if (hostilidade === 'pacifico') return 15;
            if (hostilidade === 'neutro') return 20;
            if (hostilidade === 'hostil') return 50;
            return 0;
        }

        atualizarNivel() {
            const nivelExperiencia = 100 + 10 * (this.nivel - 1);
            while (this.experiencia >= nivelExperiencia) {
                this.experiencia -= nivelExperiencia;
                this.nivel++;
                this.atualizarRanque();
            }
            this.atualizarInterface();
        }

        atualizarRanque() {
            if (this.nivel <= 9) this.ranque = 'Novato';
            else if (this.nivel <= 29) this.ranque = 'Explorador';
            else if (this.nivel <= 49) this.ranque = 'Veterano';
            else if (this.nivel <= 79) this.ranque = 'Elite';
            else if (this.nivel <= 98) this.ranque = 'Mestre';
            else this.ranque = 'Lenda';
        }

        morrer() {
            console.log(`${this.nome} morreu.`);
            alert(`${this.nome} morreu na exploração espacial!`);
        }

        atualizarInterface() {
            document.getElementById('explorer-level').textContent = this.nivel;
            document.getElementById('explorer-experience').textContent = this.experiencia;
            document.getElementById('explorer-ranque').textContent = this.ranque;
        }
    }

    const explorador = new Explorador('John');

    const exploreForm = document.getElementById('explore-form');
    const planetSelect = document.getElementById('planet-select');
    const explorationResult = document.getElementById('exploration-result');

    exploreForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const planetaData = planetSelect.value;
        if (!planetaData) {
            explorationResult.textContent = 'Por favor, selecione um planeta.';
            explorationResult.style.color = '#ff5252';
            return;
        }
        const planeta = JSON.parse(planetaData);
        const resultado = explorador.explorar(planeta);
        explorationResult.textContent = resultado.mensagem;
        explorationResult.style.color = resultado.sucesso ? '#4CAF50' : '#ff5252';
    });
})();
