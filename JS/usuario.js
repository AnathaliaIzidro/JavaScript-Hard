(function() {
    const form = document.getElementById('user-form');
    const usernameInput = document.getElementById('username');
    const feedback = document.getElementById('feedback');
    const registrationResult = document.getElementById('registration-result');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = usernameInput.value.trim();
        const isValid = validarUsuario(username);

        if (isValid) {
            registrationResult.textContent = `Usuário "${username}" registrado com sucesso!`;
            registrationResult.style.color = '#4CAF50';
            form.reset();
            feedback.textContent = '';
        } else {
            registrationResult.textContent = `Nome de usuário "${username}" inválido ou já existe.`;
            registrationResult.style.color = '#ff5252';
        }
    });

    usernameInput.addEventListener('input', () => {
        const username = usernameInput.value.trim();
        if (username === '') {
            feedback.textContent = '';
            return;
        }
        const isValid = validarUsuario(username);
        if (isValid) {
            feedback.textContent = 'Nome de usuário válido.';
            feedback.style.color = '#4CAF50';
        } else {
            feedback.textContent = 'Nome de usuário inválido ou já existente.';
            feedback.style.color = '#ff5252';
        }
    });

    // Função de validação já fornecida anteriormente
    function validarUsuario(usuario) {
        const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,30}[a-zA-Z0-9]$/;

        if (!regex.test(usuario)) return false;

        if (!/[a-zA-Z]/.test(usuario) || !/[0-9]/.test(usuario) || !/_/.test(usuario)) {
            return false;
        }

        const usuariosRegistrados = ['erick_14', 'pam_ls2', 'VICTOR_99A'];
        if (usuariosRegistrados.includes(usuario)) return false;

        return true;
    }
})();
