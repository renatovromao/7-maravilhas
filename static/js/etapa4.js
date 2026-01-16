document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------
       Fade-in inicial
    ----------------------------- */
    document.querySelectorAll(".fade-item").forEach((el, i) => {
        setTimeout(() => {
            el.classList.add("show");
        }, i * 120);
    });

    /* -----------------------------
       Elementos
    ----------------------------- */
    const nodes = document.querySelectorAll(".path-node");
    const lines = document.querySelectorAll(".path-line");
    const finalText = document.getElementById("finalText");
    const continueBtn = document.getElementById("continueBtn");
    const overlay = document.getElementById("successOverlay");

    let currentStep = 1;

    /* -----------------------------
       Lógica do caminho
    ----------------------------- */
    nodes.forEach((node, index) => {
        node.addEventListener("click", () => {
            const step = parseInt(node.dataset.step, 10);

            // Só permite clicar no passo correto
            if (step !== currentStep) return;

            // Ativa o nó
            node.classList.add("active");

            // Ativa a linha anterior, se existir
            if (index > 0 && lines[index - 1]) {
                lines[index - 1].classList.add("active");
            }

            currentStep++;

            // Finalização
            if (currentStep > nodes.length) {
                finalizarEtapa();
            }
        });
    });

    /* -----------------------------
       Finalização da etapa
    ----------------------------- */
    function finalizarEtapa() {

        // Mostra a frase final
        finalText.classList.remove("d-none");

        // Mostra overlay com os dois GIFs
        overlay.classList.remove("d-none");

        setTimeout(() => {
            overlay.classList.add("show");
        }, 50);

        // Após animação, libera botão continuar
        setTimeout(() => {
            continueBtn.classList.remove("d-none");
        }, 2800);
    }

});
