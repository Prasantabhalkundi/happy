document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader Logic ---
    const preloader = document.getElementById('preloader');

    // Simulate mobile app loading
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }, 1000); // slightly faster for mobile attention span


    // --- 2. Mobile Intro Reveal Screen ---
    const introScreen = document.getElementById('intro-screen');
    const greetingCard = document.getElementById('greeting-card');

    introScreen.addEventListener('click', () => {
        // Slide up smoothly like a mobile curtain
        introScreen.style.transform = 'translateY(-100vh)';
        introScreen.style.opacity = '0';

        setTimeout(() => {
            introScreen.style.display = 'none';
            // Reveal the main mobile card
            greetingCard.classList.add('visible');
            // Trigger automatic mobile confetti
            shootColors(100);
        }, 600);
    });


    // --- 3. Mobile Optimized Confetti Engine ---
    const shootColors = (baseParticleCount = 100) => {
        // Reduce particle counts slightly for better mobile rendering performance
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 50, zIndex: 99 };
        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = baseParticleCount * (timeLeft / duration);
            const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF922B', '#B19CD9', '#FF69B4', '#00FFFF', '#32CD32'];

            // Focus on center/top bursts for mobile vertical aspect ratio
            confetti(Object.assign({}, defaults, {
                particleCount,
                colors: colors,
                origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 } // wide spread across full mobile width
            }));

            // Second burst
            confetti(Object.assign({}, defaults, {
                particleCount: particleCount * 0.5,
                colors: colors,
                origin: { x: randomInRange(0.3, 0.7), y: Math.random() - 0.1 }
            }));
        }, 250);
    };


    // --- 4. Interactive Mobile Buttons ---
    const splashBtn = document.getElementById('splash-btn');
    splashBtn.addEventListener('click', () => {
        shootColors(150); // Burst on tap
    });

    // Native Web Share API - PERFECT for mobile!
    const shareBtn = document.getElementById('share-btn');
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'Premium Happy Holi',
                text: 'Wait until you tap to reveal this! Happy Holi! 🎨✨',
                url: window.location.href // Buyer changes this to their live domain
            }).catch((error) => console.log('Error sharing', error));
        } else {
            // Fallback for devices without native share
            navigator.clipboard.writeText(window.location.href);

            // Visual feedback on mobile
            const originalText = shareBtn.innerHTML;
            shareBtn.innerHTML = '<i class="fa-solid fa-check"></i> Link Copied!';
            setTimeout(() => {
                shareBtn.innerHTML = originalText;
            }, 2000);
        }
    });


    // --- 5. Mobile Audio Toggle ---
    const musicBtn = document.getElementById('music-btn');
    let isPlaying = false;

    musicBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        const icon = musicBtn.querySelector('i');

        if (isPlaying) {
            musicBtn.classList.add('playing');
            icon.classList.remove('fa-music');
            icon.classList.add('fa-pause');
            // Audio play logic goes here (e.g. audio.play())
        } else {
            musicBtn.classList.remove('playing');
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-music');
            // Audio pause logic goes here (e.g. audio.pause())
        }
    });

    // Note: Removed desktop 3D mouse tracking as this code is entirely optimized for Mobile-first View.
});
