function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}
function loadScript(scriptName) {
    const script = document.createElement('script');
    script.src = `js/${scriptName}`;
    document.body.appendChild(script);
}