// Tambahkan script ini ke file JavaScript Anda (misalnya di js/main.js)
// atau tambahkan sebagai <script> baru di setiap halaman

document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk smooth scroll ke elemen dengan ID tertentu
    function smoothScrollToElement(targetId) {
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            // Gunakan smooth scroll behavior
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Tangkap semua link dengan href yang berisi hashtag (#)
    const smoothScrollLinks = document.querySelectorAll('a[href*="#"]');
    
    // Tambahkan event listener untuk setiap link
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Dapatkan target ID dari href (misalnya "contact.html#contact-form" -> "contact-form")
            const href = this.getAttribute('href');
            
            // Cek apakah link mengarah ke halaman yang sama atau halaman berbeda
            if (href.includes('#')) {
                const targetPage = href.split('#')[0];
                const targetId = href.split('#')[1];
                
                // Jika berada di halaman yang sama (atau href hanya berisi #target)
                if (targetPage === '' || targetPage === window.location.pathname.split('/').pop()) {
                    e.preventDefault();
                    smoothScrollToElement(targetId);
                }
                // Jika link mengarah ke halaman lain dengan anchor, tambahkan parameter ke sessionStorage
                // untuk diproses setelah halaman baru dimuat
                else {
                    sessionStorage.setItem('scrollToElement', targetId);
                }
            }
        });
    });
    
    // Saat halaman dimuat, cek apakah ada target untuk di-scroll
    const scrollToElementId = sessionStorage.getItem('scrollToElement');
    if (scrollToElementId) {
        // Hapus item dari sessionStorage agar tidak terpicu lagi pada refresh
        sessionStorage.removeItem('scrollToElement');
        
        // Gunakan setTimeout untuk memastikan halaman sudah sepenuhnya dimuat
        setTimeout(() => {
            smoothScrollToElement(scrollToElementId);
        }, 500);
    }
    
    // Jika ada hash di URL (misalnya example.com/page.html#section-id)
    if (window.location.hash) {
        const targetId = window.location.hash.substring(1);
        
        // Gunakan setTimeout untuk memastikan halaman sudah sepenuhnya dimuat
        setTimeout(() => {
            smoothScrollToElement(targetId);
        }, 500);
    }
});