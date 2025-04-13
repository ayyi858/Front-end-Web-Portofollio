// JavaScript untuk Skills Section

document.addEventListener('DOMContentLoaded', function() {
    // Animasi Progress Bar
    setTimeout(function() {
        // Pilih semua progress bar
        const progressBars = document.querySelectorAll('.skill-progress');
        
        // Untuk setiap progress bar
        progressBars.forEach(function(bar) {
            // Dapatkan nilai progress dari atribut data
            const progressValue = bar.getAttribute('data-progress');
            
            // Atur lebar sesuai dengan nilai progress
            bar.style.width = progressValue + '%';
        });
    }, 500);
    
    // Intersection Observer untuk animasi saat scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                // Tambahkan animasi untuk skill items di dalam kategori ini
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animate');
                    }, index * 100); // Delay antar item untuk efek cascade
                });
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe semua kategori skill
    document.querySelectorAll('.skills-category').forEach(category => {
        observer.observe(category);
    });
    
    // Hover effect untuk skill items
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Animasi untuk icon
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1.1)';
            
            // Animasi untuk progress bar
            const progressBar = this.querySelector('.skill-progress');
            progressBar.style.boxShadow = '0 0 15px rgba(241, 217, 89, 0.7)';
        });
        
        item.addEventListener('mouseleave', function() {
            // Reset animasi
            const icon = this.querySelector('.skill-icon');
            icon.style.transform = 'scale(1)';
            
            // Reset animasi untuk progress bar
            const progressBar = this.querySelector('.skill-progress');
            progressBar.style.boxShadow = '';
        });
    });
});
// Modifikasi fungsi untuk menambahkan tombol My Skill
window.addEventListener('DOMContentLoaded', function() {
    // Deteksi apakah perangkat mobile
    const isMobile = window.innerWidth <= 767;
    
    // Hanya tambahkan tombol My Skill jika dalam mode mobile
    if (isMobile) {
        addMySkillButton();
    }
});

// Tambahkan event listener untuk resize window
window.addEventListener('resize', function() {
    const isMobile = window.innerWidth <= 767;
    
    // Tambahkan atau hapus tombol My Skill berdasarkan ukuran layar
    if (isMobile) {
        // Jika mobile dan belum ada tombol, tambahkan
        if (!document.querySelector('.my-skill-button')) {
            addMySkillButton();
        }
    } else {
        // Jika desktop dan ada tombol, hapus
        const mySkillButton = document.querySelector('.my-skill-button');
        if (mySkillButton) {
            mySkillButton.remove();
        }
    }
});

// Fungsi untuk menambahkan tombol My Skill
function addMySkillButton() {
    const eduWorkSection = document.querySelector('.edu-work-section');
    if (eduWorkSection && !document.querySelector('.my-skill-button')) {
        const mySkillButton = document.createElement('a');
        mySkillButton.className = 'my-skill-button';
        mySkillButton.href = '#skills';
        mySkillButton.textContent = 'My Skill';
        eduWorkSection.appendChild(mySkillButton);
        
        // Tambahkan event listener untuk smooth scroll
        mySkillButton.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#skills').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
}