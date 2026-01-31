document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("video-artista");

    if (!video) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    video.play();
                } else {
                    video.pause();
                }
            });
        },
        {
            threshold: 0.6
        }
    );

    observer.observe(video);
});
