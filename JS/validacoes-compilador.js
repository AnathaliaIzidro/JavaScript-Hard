(function() {
    const validateButton = document.getElementById('validate-code');
    const codeInput = document.getElementById('code-input');
    const validationResult = document.getElementById('validation-result');

    validateButton.addEventListener('click', () => {
        const codigo = codeInput.value;
        const isValid = validarAgrupamento(codigo);

        if (isValid) {
            validationResult.textContent = 'Agrupamento correto!';
            validationResult.style.color = '#4CAF50';
        } else {
            validationResult.textContent = 'Agrupamento incorreto!';
            validationResult.style.color = '#ff5252';
        }
    });

    // Função de validação já fornecida anteriormente
    function validarAgrupamento(codigo) {
        const stack = [];
        const pares = {
            '(': ')',
            '{': '}',
            '[': ']'
        };

        for (let char of codigo) {
            if (pares[char]) {
                stack.push(char);
            } else if (Object.values(pares).includes(char)) {
                const ultimo = stack.pop();
                if (pares[ultimo] !== char) return false;
            }
        }

        return stack.length === 0;
    }
})();
