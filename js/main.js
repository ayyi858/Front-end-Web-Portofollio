/**
 * main.js - Script utama untuk website portfolio Ahmad Syarif Hidayatullah
 */

document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi AOS (Animate on Scroll)
    AOS.init({
        duration: animationConfig.defaultDuration,
        once: false,
        mirror: false
    });
    
    // Loading screen
    const handleLoadingScreen = () => {
        if (animationConfig.loadingScreen.enabled) {
            const loadingScreen = document.querySelector('.logo-intro');
            if (loadingScreen) {
                setTimeout(() => {
                    loadingScreen.classList.add('fade-out');
                }, animationConfig.loadingScreen.duration);
            }
        }
    };
    
    // Typed.js untuk animasi teks
    const initTypedAnimation = () => {
        if (animationConfig.typingAnimation) {
            const typedElement = document.querySelector('.typed-text');
            if (typedElement) {
                new Typed(typedElement, {
                    strings: ['Ahmad Syarif Hidayatullah'],
                    typeSpeed: 80,
                    backSpeed: 60,
                    loop: false
                });
            }
        }
    };
    
    // Toggle Menu Mobile
    const setupMobileMenu = () => {
        const burger = document.querySelector('.burger');
        const navLinks = document.querySelector('.nav-links');
        
        if (burger && navLinks) {
            burger.addEventListener('click', () => {
                // Toggle Nav
                navLinks.classList.toggle('nav-active');
                
                // Toggle Burger Animation
                burger.classList.toggle('toggle');
                
                // Animate Links
                const navItems = document.querySelectorAll('.nav-links li');
                navItems.forEach((link, index) => {
                    if (navLinks.classList.contains('nav-active')) {
                        link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                    } else {
                        link.style.animation = '';
                    }
                });
            });
        }
    };
    
    // Deteksi halaman aktif & perubahan header
    const setupNavigation = () => {
        const navLinks = document.querySelectorAll('.nav-links .nav-link');
        const mainNav = document.getElementById('main-nav');
        const contactBtn = document.querySelector('.contact-btn');
        
        // Deteksi halaman aktif berdasarkan scroll
        const handleScroll = () => {
            const sections = document.querySelectorAll('section');
            let currentPage = '';
            
            let scrollPosition = window.scrollY + 200; // offset untuk deteksi lebih akurat
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentPage = sectionId;
                    
                    // Update body class
                    document.body.className = '';
                    document.body.classList.add(`page-${currentPage}`);
                    
                    // Update active state di menu
                    navLinks.forEach(link => {
                        const linkPage = link.getAttribute('href').substring(1);
                        if (linkPage === currentPage) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                    
                    // Update header style berdasarkan halaman
                    updateHeaderStyle(currentPage);
                }
            });
        };
        
        // Fungsi untuk mengubah style header
        const updateHeaderStyle = (page) => {
            // Default ke 'home' jika page tidak valid
            const pageStyle = headerConfig.headerColors[page] ? page : 'home';
            
            // Ubah warna background header
            if (mainNav) {
                mainNav.style.backgroundColor = headerConfig.headerColors[pageStyle];
            }
            
            // Ubah style untuk contact button
            if (contactBtn) {
                contactBtn.style.backgroundColor = headerConfig.contactButtonStyle[pageStyle].background;
                contactBtn.style.color = headerConfig.contactButtonStyle[pageStyle].textColor;
            }
        };
        
        // Event listeners
        window.addEventListener('scroll', handleScroll);
        
        // Set initial active page
        setTimeout(handleScroll, 100);
        
        // Smooth scroll untuk link navigasi
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navLinks = document.querySelector('.nav-links');
                    const burger = document.querySelector('.burger');
                    if (navLinks.classList.contains('nav-active')) {
                        navLinks.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                    }
                }
            });
        });
    };
    
    // Portfolio filtering
    const setupPortfolioFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Get filter value
                const filterValue = btn.getAttribute('data-filter');
                
                // Filter items
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                        
                        // Restart animation
                        item.classList.remove('aos-animate');
                        setTimeout(() => {
                            item.classList.add('aos-animate');
                        }, 10);
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    };
    
    // Form validation
    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                // Basic validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                if (!name || !email || !message) {
                    alert('Mohon isi semua field yang diperlukan.');
                    return;
                }
                
                // Form submission logic would go here
                // ...
                
                // Reset form after submission
                contactForm.reset();
                alert('Pesan Anda telah terkirim. Terima kasih!');
            });
        }
    };
    
    // Scroll to top button
    const setupScrollTopButton = () => {
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    scrollTopBtn.classList.add('show');
                } else {
                    scrollTopBtn.classList.remove('show');
                }
            });
            
            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    };
    
    // Initialize everything
    handleLoadingScreen();
    initTypedAnimation();
    setupMobileMenu();
    setupNavigation();
    setupPortfolioFilters();
    setupContactForm();
    setupScrollTopButton();
});