document.addEventListener("DOMContentLoaded", function () {

    /* -------- Fade-in -------- */
    const fadeItems = document.querySelectorAll(".fade-item");
    fadeItems.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add("show");
        }, index * 150);
    });

    /* -------- Jogo -------- */
    const options = document.querySelectorAll(".option");
    const feedback = document.getElementById("feedback");
    const continueBtn = document.getElementById("continueBtn");
    const successImage = document.getElementById("successImage");

    options.forEach(option => {
        option.addEventListener("click", function () {

            const isCorrect = this.dataset.correct === "true";

            // Reset visual
            feedback.className = "mb-2 fw-semibold";

            if (isCorrect) {
                options.forEach(btn => btn.disabled = true);

                this.classList.remove("btn-outline-secondary");
                this.classList.add("btn-success");

                feedback.innerText = "Quando você escolhe olhar de verdade, a jornada começa.";
                feedback.classList.add("text-success");

                // Overlay animado
                const overlay = document.getElementById("successOverlay");
                overlay.classList.remove("d-none");

                setTimeout(() => {
                    overlay.classList.add("show");
                }, 50);

                // Esconde overlay e libera continuar
                setTimeout(() => {
                    overlay.classList.remove("show");

                    setTimeout(() => {
                        overlay.classList.add("d-none");
                        continueBtn.classList.remove("d-none");
                    }, 600);

                }, 2500);
            }
            else {
                const errorOverlay = document.getElementById("errorOverlay");

                // Visual do botão
                this.classList.remove("btn-outline-secondary");
                this.classList.add("btn-danger", "shake");

                feedback.innerText = "Nem tudo que aparece cria conexão.";
                feedback.classList.add("text-danger");

                // Mostra overlay de erro
                errorOverlay.classList.remove("d-none");

                setTimeout(() => {
                    errorOverlay.classList.add("show");
                }, 50);

                // Remove shake após animação
                setTimeout(() => {
                    this.classList.remove("shake");
                }, 400);

                // Esconde overlay e libera nova tentativa
                setTimeout(() => {
                    errorOverlay.classList.remove("show");

                    setTimeout(() => {
                        errorOverlay.classList.add("d-none");

                        this.classList.remove("btn-danger");
                        this.classList.add("btn-outline-secondary");
                        feedback.innerText = "";
                    }, 500);

                }, 1200);
            }
        });
    });

});
