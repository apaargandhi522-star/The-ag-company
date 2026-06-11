document.addEventListener('DOMContentLoaded', () => {
    /* =========================================
       1. LOADER
    ========================================= */
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 1000);

    /* =========================================
       2. CUSTOM CURSOR
    ========================================= */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 150, fill: "forwards" });
        });

        const hoverElements = document.querySelectorAll('a, button, .video-placeholder');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.width = '60px';
                cursorOutline.style.height = '60px';
                cursorOutline.style.backgroundColor = 'rgba(37, 99, 235, 0.1)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.width = '40px';
                cursorOutline.style.height = '40px';
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
    }

    /* =========================================
       3. DARK / LIGHT MODE THEME
    ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* =========================================
       4. MOBILE NAVIGATION
    ========================================= */
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    /* =========================================
       5. STICKY HEADER & ACTIVE LINKS
    ========================================= */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    /* =========================================
       6. SCROLL REVEAL ANIMATIONS
    ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                if (entry.target.classList.contains('stat-card')) {
                    const counter = entry.target.querySelector('.counter');
                    const target = +counter.getAttribute('data-target');
                    let count = 0;
                    const increment = target / 40; 
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = Math.ceil(count);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* =========================================
       7. TESTIMONIAL SLIDER
    ========================================= */
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const cards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    
    const updateSlider = () => {
        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = parseFloat(window.getComputedStyle(track).gap) || 32; 
        const moveAmount = cardWidth + gap;
        
        const cardsToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
        const maxIndex = cards.length - cardsToShow;
        
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        track.style.transform = `translateX(-${currentIndex * moveAmount}px)`;
    };

    nextBtn.addEventListener('click', () => {
        const cardsToShow = window.innerWidth > 1024 ? 3 : window.innerWidth > 768 ? 2 : 1;
        if (currentIndex < cards.length - cardsToShow) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener('resize', updateSlider);

    /* =========================================
       8. BACK TO TOP BUTTON
    ========================================= */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* =========================================
       9. FORM SUBMISSION
    ========================================= */
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Sent Successfully!';
            contactForm.reset();
            
            setTimeout(() => {
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
});