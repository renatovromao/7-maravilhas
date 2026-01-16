document.addEventListener("DOMContentLoaded", () => {

    /* Fade-in */
    document.querySelectorAll(".fade-item").forEach((el, i) => {
        setTimeout(() => el.classList.add("show"), i * 120);
    });

    const cards = document.querySelectorAll(".memory-card");
    const instruction = document.getElementById("instruction");
    const feedback = document.getElementById("feedback");
    const continueBtn = document.getElementById("continueBtn");
    const overlay = document.getElementById("successOverlay");

    let firstCard = null;
    let lockBoard = true;
    let matches = 0;

    /* Embaralhar */
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * cards.length);
    });

    /* Revelação inicial */
    cards.forEach(card => card.classList.add("flip"));

    setTimeout(() => {
        cards.forEach(card => card.classList.remove("flip"));
        lockBoard = false;
        instruction.innerText = "Agora, confie no que você já viu.";
    }, 4000);

    cards.forEach(card => {
        card.addEventListener("click", () => {
            if (lockBoard || card === firstCard || card.classList.contains("matched")) return;

            card.classList.add("flip");

            if (!firstCard) {
                firstCard = card;
                return;
            }

            lockBoard = true;

            if (firstCard.dataset.value === card.dataset.value) {
                firstCard.classList.add("matched");
                card.classList.add("matched");
                matches++;
                firstCard = null;
                lockBoard = false;

                if (matches === 3) {
                    feedback.innerText = "Estabilidade é reconhecer, respeitar e permanecer.";
                    feedback.className = "mt-4 fw-semibold text-success";

                    overlay.classList.remove("d-none");
                    setTimeout(() => overlay.classList.add("show"), 50);

                    setTimeout(() => {
                        overlay.classList.remove("show");
                        setTimeout(() => {
                            overlay.classList.add("d-none");
                            continueBtn.classList.remove("d-none");
                        }, 600);
                    }, 2500);
                }

            } else {
                setTimeout(() => {
                    firstCard.classList.remove("flip");
                    card.classList.remove("flip");
                    firstCard = null;
                    lockBoard = false;
                }, 1000);
            }
        });
    });

});
