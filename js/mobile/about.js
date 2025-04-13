// Script khusus untuk menangani tampilan skills di mobile
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah layar mobile
    const isMobile = window.innerWidth <= 767;
    
    if (isMobile) {
        // Tangani animasi progress bar di mobile
        setTimeout(function() {
            const progressBars = document.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const progressValue = bar.getAttribute('data-progress');
                bar.style.width = progressValue + '%';
            });
        }, 500);
        
        // Tambahkan indikator scroll jika skills section overflow
        const skillsWrapper = document.querySelector('.skills-wrapper');
        if (skillsWrapper) {
            // Cek apakah ada overflow horizontal
            if (skillsWrapper.scrollWidth > skillsWrapper.clientWidth) {
                // Tambahkan teks petunjuk scroll
                const scrollHint = document.createElement('div');
                scrollHint.className = 'scroll-hint';
                scrollHint.textContent = 'Scroll horizontally to see more →';
                scrollHint.style.textAlign = 'right';
                scrollHint.style.fontSize = '0.8rem';
                scrollHint.style.color = '#c1a71a';
                scrollHint.style.marginTop = '5px';
                scrollHint.style.opacity = '0.8';
                
                // Tambahkan setelah judul section
                const skillsHeader = document.querySelector('.skills-header');
                if (skillsHeader) {
                    skillsHeader.parentNode.insertBefore(scrollHint, skillsHeader.nextSibling);
                    
                    // Fadeout hint setelah beberapa detik
                    setTimeout(() => {
                        scrollHint.style.transition = 'opacity 1s ease';
                        scrollHint.style.opacity = '0';
                    }, 5000);
                }
            }
        }
        
        // Tangani interaksi skill item di mobile
        const skillItems = document.querySelectorAll('.skill-item');
        skillItems.forEach(item => {
            item.addEventListener('touchstart', function() {
                this.classList.add('touch-active');
            });
            
            item.addEventListener('touchend', function() {
                this.classList.remove('touch-active');
            });
        });
    }
    
    // Tangani resize window
    window.addEventListener('resize', function() {
        const newIsMobile = window.innerWidth <= 767;
        
        // Jika berganti dari desktop ke mobile atau sebaliknya
        if (newIsMobile !== isMobile) {
            // Reload halaman untuk menerapkan style yang sesuai
            window.location.reload();
        }
    });
});