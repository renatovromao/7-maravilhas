document.addEventListener("DOMContentLoaded", () => {

    /* Fade-in */
    document.querySelectorAll(".fade-item").forEach((el, i) => {
        setTimeout(() => el.classList.add("show"), i * 120);
    });

    const cards = document.querySelectorAll(".game-card");
    const zones = document.querySelectorAll(".drop-zone");
    const feedback = document.getElementById("feedback");
    const continueBtn = document.getElementById("continueBtn");

    let correctCount = 0;
    const totalCards = cards.length;

    let selectedCard = null;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    /* =========================
       DESKTOP — DRAG & DROP
    ========================= */
    if (!isTouch) {
        cards.forEach(card => {
            card.addEventListener("dragstart", () => {
                card.classList.add("dragging");
            });

            card.addEventListener("dragend", () => {
                card.classList.remove("dragging");
            });
        });

        zones.forEach(zone => {
            zone.addEventListener("dragover", e => {
                e.preventDefault();
                zone.classList.add("hover");
            });

            zone.addEventListener("dragleave", () => {
                zone.classList.remove("hover");
            });

            zone.addEventListener("drop", e => {
                e.preventDefault();
                zone.classList.remove("hover");

                const card = document.querySelector(".dragging");
                if (!card) return;

                handleDrop(card, zone);
            });
        });
    }

    /* =========================
       MOBILE — TAP + TAP
    ========================= */
    if (isTouch) {
        cards.forEach(card => {
            card.addEventListener("click", () => {
                if (card.classList.contains("correct")) return;

                cards.forEach(c => c.classList.remove("selected"));
                card.classList.add("selected");
                selectedCard = card;
            });
        });

        zones.forEach(zone => {
            zone.addEventListener("click", () => {
                if (!selectedCard) return;
                handleDrop(selectedCard, zone);
                selectedCard.classList.remove("selected");
                selectedCard = null;
            });
        });
    }

    /* =========================
       LÓGICA COMUM
    ========================= */
    function handleDrop(card, zone) {
        const correctZone = card.dataset.target;
        const zoneType = zone.dataset.zone;

        if (correctZone === zoneType) {
            zone.appendChild(card);
            card.setAttribute("draggable", "false");
            card.classList.add("correct");
            card.classList.remove("selected");

            correctCount++;

            if (correctCount === totalCards) {
                const overlay = document.getElementById("successOverlay");

                feedback.innerText = "Construir é ajustar sem perder o essencial.";
                feedback.className = "mb-2 fw-semibold text-success";

                // Mostra overlay
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
        } else {
            card.classList.add("shake");
            feedback.innerText = "Nem tudo se encaixa de imediato. Ajuste.";
            feedback.className = "mb-2 fw-semibold text-danger";

            setTimeout(() => {
                card.classList.remove("shake");
                feedback.innerText = "";
            }, 800);
        }
    }

});
