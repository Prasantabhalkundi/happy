document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader Logic ---
    const preloader = document.getElementById('preloader');

    // Simulate loading time for premium feel
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800); // Wait for fade out
    }, 1200);


    // --- 2. Intro Reveal Screen ---
    const introScreen = document.getElementById('intro-screen');
    const greetingCard = document.getElementById('greeting-card');

    introScreen.addEventListener('click', () => {
        // Slide up the curtain
        introScreen.style.transform = 'translateY(-100vh) scale(0.9)';
        introScreen.style.opacity = '0';

        setTimeout(() => {
            introScreen.style.display = 'none';
            // Reveal the card
            greetingCard.classList.add('visible');
            // Trigger an automatic spectacular confetti explosion!
            shootColors(150);
        }, 800);
    });


    // --- 3. Advanced Confetti Engine ---
    const shootColors = (baseParticleCount = 150) => {
        const duration = 3.5 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 35, spread: 360, ticks: 60, zIndex: 99 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = baseParticleCount * (timeLeft / duration);
            const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF922B', '#B19CD9', '#FF69B4', '#00FFFF', '#32CD32', '#FF1493'];

            // Left side
            confetti(Object.assign({}, defaults, {
                particleCount,
                colors: colors,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));

            // Center big splash
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount * 0.5,
                colors: colors,
                origin: { x: randomInRange(0.4, 0.6), y: Math.random() - 0.1 }
            }));

            // Right side
            confetti(Object.assign({}, defaults, {
                particleCount,
                colors: colors,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));
        }, 200);
    };


    // --- 4. Interactive Buttons ---
    const splashBtn = document.getElementById('splash-btn');
    splashBtn.addEventListener('click', () => {
        // Massive burst on button click
        shootColors(250);
    });

    // Native Web Share API integration (Professional Feature)
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Premium Happy Holi wishes!',
                text: 'Checkout this beautiful Happy Holi greeting.',
                url: window.location.href
            }).catch((error) => console.log('Error sharing', error));
        } else {
            alert('Share feature requires hosting on HTTPS.');
        }
    });


    // --- 5. Mock Audio Controller ---
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        const icon = musicBtn.querySelector('i');

        if (isPlaying) {
            musicBtn.classList.add('playing');
            icon.classList.remove('fa-music');
            icon.classList.add('fa-pause'); /* Switch to pause icon */
            // Implementation note for buyer: add audio.play() here
        } else {
            musicBtn.classList.remove('playing');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-music');
            // Implementation note for buyer: add audio.pause() here
        }
    });


    // --- 6. Immersive 3D Tilt Effect ---
    // Make the physical card tilt based on mouse position to give it a premium 3D feel
    const cardContainer = document.querySelector('.main-container');
    const card = document.getElementById('greeting-card');

    // Check if device supports hover (typically false for mobile) to avoid buggy mobile behavior
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

    if (!isTouchDevice) {
        document.addEventListener('mousemove', (e) => {
            // Only tilt if the intro screen is gone and card is visible
            if (!card.classList.contains('visible')) return;

            // Calculate mouse position relative to center of screen
            let xAxis = (window.innerWidth / 2 - e.pageX) / 30; // 30 is the damping factor; higher = less tilt
            let yAxis = (window.innerHeight / 2 - e.pageY) / 30;

            // Apply 3D transform
            card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });

        // Snap back to 0 when mouse leaves
        document.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
            card.style.transition = 'transform 0.5s ease, opacity 1s ease';

            // Remove the transition so it tracks mouse smoothly again later
            setTimeout(() => {
                card.style.transition = 'opacity 1s ease';
            }, 500);
        });
    }
});
