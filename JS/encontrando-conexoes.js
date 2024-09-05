(function() {
    const findButton = document.getElementById('find-connections');
    const connectionData = document.getElementById('connection-data').textContent;
    const connectionsResult = document.getElementById('connections-result');

    findButton.addEventListener('click', () => {
        let obj;
        try {
            obj = JSON.parse(connectionData);
        } catch (e) {
            connectionsResult.textContent = 'Dados JSON inválidos.';
            connectionsResult.style.color = '#ff5252';
            return;
        }

        const conexoes = encontrarConexoes(obj);
        if (conexoes.length === 0) {
            connectionsResult.textContent = 'Nenhuma conexão encontrada.';
            connectionsResult.style.color = '#ff5252';
        } else {
            connectionsResult.innerHTML = '<ul>' + conexoes.map(conn => `<li>ID: ${conn._id}, Label: ${conn.label}</li>`).join('') + '</ul>';
            connectionsResult.style.color = '#4CAF50';
        }
    });

    // Função de encontrar conexões já fornecida anteriormente
    function encontrarConexoes(obj) {
        const resultados = [];

        function explorar(obj) {
            if (obj && typeof obj === 'object') {
                if (obj.connection && obj.connection._id && obj.connection.label) {
                    resultados.push({
                        _id: obj.connection._id,
                        label: obj.connection.label
                    });
                }
                if (Array.isArray(obj.connections)) {
                    obj.connections.forEach(conn => explorar(conn));
                }
                Object.values(obj).forEach(valor => explorar(valor));
            }
        }

        explorar(obj);
        return resultados;
    }
})();
