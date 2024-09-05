(function() {
    const calculateButton = document.getElementById('calculate-fib');
    const fibInput = document.getElementById('fibonacci-input');
    const fibResult = document.getElementById('fib-result');

    calculateButton.addEventListener('click', () => {
        const n = parseInt(fibInput.value);
        if (isNaN(n) || n < 0 || n > 100) {
            fibResult.textContent = 'Por favor, insira um número entre 0 e 100.';
            fibResult.style.color = '#ff5252';
            return;
        }
        const result = fibonacci(n);
        fibResult.textContent = `Fibonacci(${n}) = ${result}`;
        fibResult.style.color = '#4CAF50';
    });

    // Função de Fibonacci com memoização já fornecida anteriormente
    function fibonacci(n) {
        const memo = {};

        function fib(n) {
            if (n in memo) return memo[n];
            if (n <= 1) return n;

            memo[n] = fib(n - 1) + fib(n - 2);
            return memo[n];
        }

        return fib(n);
    }
})();
