/**
 * loading.js - Script untuk animasi loading screen
 */

document.addEventListener('DOMContentLoaded', function() {
    // Animasi loading screen
    const loadingScreen = document.querySelector('.logo-intro');
    const loadingDuration = 2500; // Durasi loading dalam ms

    if (loadingScreen) {
        // Menambahkan animasi partikel
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            // Memberikan posisi acak untuk partikel
            const randomPosition = () => {
                const angle = Math.random() * Math.PI * 2; // Random angle in radians
                const distance = 30 + Math.random() * 50; // Distance from center
                const x = Math.cos(angle) * distance;
                const y = Math.sin(angle) * distance;
                return { x, y };
            };

            const position = randomPosition();
            particle.style.transform = `translate(${position.x}px, ${position.y}px)`;
            
            // Memberikan delay acak untuk animasi
            particle.style.animationDelay = `${Math.random() * 2}s`;
        });

        // Fade out loading screen setelah durasi tertentu
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            
            // Menghapus loading screen dari DOM setelah animasi selesai
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 1000); // Durasi animasi fade-out
        }, loadingDuration);
    }
});