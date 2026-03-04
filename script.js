// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    const splashBtn = document.getElementById('splash-btn');

    // Function to shoot colorful confetti (Holi style)
    const shootColors = () => {
        const duration = 4 * 1000; // 4 seconds of falling colors
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 150 * (timeLeft / duration);

            // Vibrant Holi Colors: Red, Yellow, Green, Blue, Orange, Purple, Pink, Cyan, Lime
            const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF922B', '#B19CD9', '#FF69B4', '#00FFFF', '#32CD32', '#FF1493'];

            // Left side splash
            confetti(Object.assign({}, defaults, {
                particleCount,
                colors: colors,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));

            // Center splash
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount * 0.5,
                colors: colors,
                origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.1 }
            }));

            // Right side splash
            confetti(Object.assign({}, defaults, {
                particleCount,
                colors: colors,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 200);
    };

    // Auto splash once on load after a slight delay for dramatic effect
    setTimeout(() => {
        shootColors();
    }, 1200);

    // Interactive button event
    splashBtn.addEventListener('click', () => {
        shootColors();

        // Add a scale effect to the button for feedback
        splashBtn.style.transform = 'scale(0.92)';
        setTimeout(() => {
            splashBtn.style.transform = '';
        }, 200);
    });
});
