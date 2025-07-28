// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

document.addEventListener('DOMContentLoaded', () => {
    // --- Magic Pattern Initialization ---
    if (typeof MagicPattern !== 'undefined') {
        MagicPattern.init({
            apiKey: 'mp_live_3ZaGwuk8WW1NX4e3Xu3ApmFV',
            selector: '#magic-pattern-canvas',
            patternType: 'dots',
            colors: ['#4A69BD', '#FFC107', '#6A4DE5'],
            animationSpeed: 1,
            opacity: 0.2,
        });
    } else {
        console.error('Magic Pattern SDK not loaded. Dynamic background will not appear. Using static image fallback.');
        const heroSection = document.getElementById('hero');
        heroSection.style.background = 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6))'; // Keep overlay
        // Ensure the image is visible if Magic Pattern fails
        document.getElementById('hero-background-image').style.opacity = 0.8;
        document.getElementById('hero-background-image').style.zIndex = -1;
    }

    // --- Initial GSAP States (Elements hidden before animation) ---
    gsap.set('body', { opacity: 0 });
    gsap.set('.header', { y: -100, opacity: 0 });
    gsap.set('.nav-menu li', { y: -20, opacity: 0 });
    
    // Hero elements initial 3D states
    gsap.set('.gsap-hero-h1', { y: 50, opacity: 0, rotationX: -90, transformOrigin: "center center -100" });
    gsap.set('.gsap-hero-p', { y: 30, opacity: 0, rotationX: -90, transformOrigin: "center center -50" });
    gsap.set('.gsap-hero-btn', { y: 20, opacity: 0, rotationX: -90, transformOrigin: "center center -20" });

    // Section elements initial 3D states
    gsap.set('.gsap-section-heading', { y: 30, opacity: 0, rotationX: -90, transformOrigin: "center bottom" });
    gsap.set('.gsap-card', { y: 80, opacity: 0, scale: 0.8, rotationY: -90, transformOrigin: "left center" });
    gsap.set('.gsap-about-p', { y: 20, opacity: 0 });
    gsap.set('.gsap-about-list li', { y: 20, opacity: 0 });
    gsap.set('.gsap-section-p', { y: 20, opacity: 0 });
    gsap.set('.gsap-section-button', { y: 20, opacity: 0 });
    gsap.set('.gsap-form-container', { y: 50, opacity: 0, rotationX: -90, transformOrigin: "center bottom" });
    gsap.set('.footer', { y: 50, opacity: 0 });
    gsap.set('#cookie-banner', { y: 100, opacity: 0 });

    // Image initial states
    gsap.set('#hero-background-image', { scale: 1.1, opacity: 0, y: 0 }); // Hero background image starts larger/faded
    gsap.set('.gsap-image-banner img', { scale: 1.1, opacity: 0.5, y: 0 }); // Banners start slightly scaled
    gsap.set('.gsap-workspace-img', { scale: 0.8, opacity: 0, rotationY: 90 }); // Workspace images start rotated
    gsap.set('.portfolio-background-image', { scale: 1.1, opacity: 0 });
    gsap.set('.testimonials-background-image', { scale: 1.1, opacity: 0 });
    gsap.set('.blog-background-image', { scale: 1.1, opacity: 0 });
    gsap.set('.cta-background-image', { scale: 1.1, opacity: 0 });
    gsap.set('.contact-background-image', { scale: 1.1, opacity: 0 });


    // --- Page Load Intro Animation (Header & Hero) ---
    const introTl = gsap.timeline({ defaults: { ease: "power2.out" } });
    introTl
        .to('body', { opacity: 1, duration: 0.5 })
        .to('body', { backgroundPosition: '100% 0%', duration: 60, repeat: -1, ease: "none" }, 0)
        .fromTo('.header', { y: -100, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" })
        .fromTo('.logo img', { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6 }, "<0.2")
        .fromTo('.nav-menu li', { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }, "<0.2")
        .to('.gsap-hero-h1', { y: 0, opacity: 1, rotationX: 0, duration: 1.2, ease: "elastic.out(1, 0.5)" }, "<0.3")
        .to('.gsap-hero-p', { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out" }, "<0.2")
        .to('.gsap-hero-btn', { y: 0, opacity: 1, rotationX: 0, duration: 0.8, stagger: 0.15, ease: "back.out(1.7)" }, "<0.2")
        .to('#hero-background-image', { opacity: 0.8, scale: 1, duration: 1.5, ease: "power2.out" }, "<0.1");


    // --- ScrollTrigger Animations for Sections ---

    // Function to create common section animations with 3D reveal
    function createSectionAnimation(triggerElement, headingSelector, contentSelector, buttonSelector = null, backgroundImageSelector = null) {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                start: 'top 75%',
                toggleActions: 'play none none none',
                // markers: true, // For debugging scroll triggers
            }
        });
        if (backgroundImageSelector) {
            tl.to(backgroundImageSelector, { opacity: 0.1, scale: 1, duration: 1.5, ease: "power2.out" }, 0); // Background image animates first
        }
        tl.to(headingSelector, { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out" })
            .to(contentSelector, { y: 0, opacity: 1, scale: 1, rotationY: 0, rotationX: 0, duration: 1, stagger: 0.15, ease: "back.out(1.7)" }, "<0.2");
        if (buttonSelector) {
            tl.to(buttonSelector, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.3");
        }
    }

    // About Section (specific content selectors)
    gsap.timeline({
        scrollTrigger: {
            trigger: '#about',
            start: 'top 75%',
            toggleActions: 'play none none none',
        }
    })
    .to('.about-image-banner img', { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0)
    .to('#about .gsap-section-heading', { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out" }, "<0.2")
    .to('.gsap-about-p', { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out" }, "<0.3")
    .to('.gsap-about-list li', { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" }, "<0.4");


    // Services Section
    gsap.timeline({
        scrollTrigger: {
            trigger: '#services',
            start: 'top 75%',
            toggleActions: 'play none none none',
        }
    })
    .to('.services-image-banner img', { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 0)
    .to('#services .gsap-section-heading', { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out" }, "<0.2")
    .to('.services-list-container ul li', { y: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1, stagger: 0.15, ease: "back.out(1.7)" }, "<0.3");

    // Our Workspace Section
    gsap.timeline({
        scrollTrigger: {
            trigger: '#workspace',
            start: 'top 75%',
            toggleActions: 'play none none none',
        }
    })
    .to('#workspace .gsap-section-heading', { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out" })
    .to('.gsap-workspace-img', { y: 0, opacity: 1, scale: 1, rotationY: 0, duration: 1, stagger: 0.15, ease: "back.out(1.7)" }, "<0.2");


    createSectionAnimation('#portfolio', '#portfolio .gsap-section-heading', '.case-study-card', null, '.portfolio-background-image');
    createSectionAnimation('#testimonials', '#testimonials .gsap-section-heading', '.testimonial-card', null, '.testimonials-background-image');
    createSectionAnimation('#blog', '#blog .gsap-section-heading', '.blog-post-card', '#blog .gsap-section-button', '.blog-background-image');

    // CTA Section
    gsap.timeline({
        scrollTrigger: {
            trigger: '.cta-section',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    })
    .to('.cta-background-image', { opacity: 0.8, scale: 1, duration: 1.5, ease: "power2.out" }, 0)
    .to('.cta-section .gsap-section-heading', { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out" }, "<0.2")
    .to('.cta-section .gsap-section-p', { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" }, "<0.3")
    .to('.cta-section .gsap-section-button', { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }, "<0.4");

    // Contact Form Section
    gsap.timeline({
        scrollTrigger: {
            trigger: '#contact-form',
            start: 'top 75%',
            toggleActions: 'play none none none'
        }
    })
    .to('.contact-background-image', { opacity: 0.1, scale: 1, duration: 1.5, ease: "power2.out" }, 0)
    .to('#contact-form .gsap-section-heading', { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "power3.out" }, "<0.2")
    .to('.gsap-form-container', { y: 0, opacity: 1, rotationX: 0, duration: 1, ease: "back.out(1.7)" }, "<0.3");

    // Footer
    gsap.timeline({
        scrollTrigger: {
            trigger: '.footer',
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    })
    .to('.footer', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });


    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu li a');

    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                gsap.to(window, { duration: 1, scrollTo: targetElement, ease: "power2.inOut" });
            }
        });
    });

    // --- Lazy Loading Images (Basic Intersection Observer) ---
    const lazyImages = document.querySelectorAll('img');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.remove('lazy-load');
                observer.unobserve(img);
            }
        });
    }, observerOptions);

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });

    // --- Update Current Year in Footer ---
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Cookie Consent Banner Logic (Enhanced with GSAP) ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptCookiesBtn = document.getElementById('accept-cookies');
    const COOKIE_NAME = 'aspire_cookie_consent';

    if (!localStorage.getItem(COOKIE_NAME)) {
        setTimeout(() => {
            gsap.to(cookieBanner, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                onStart: () => { cookieBanner.style.display = 'flex'; }
            });
        }, 1500);
    }

    acceptCookiesBtn.addEventListener('click', () => {
        localStorage.setItem(COOKIE_NAME, 'true');
        gsap.to(cookieBanner, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            onComplete: () => { cookieBanner.style.display = 'none'; }
        });
    });

    // --- GSAP Hover Animations ---
    function applyHoverEffect(element, scale = 1.05, y = -5, boxShadow = 'var(--shadow-strong)') {
        if (element) {
            element.addEventListener('mouseenter', () => {
                gsap.to(element, {
                    duration: 0.3,
                    y: y,
                    scale: scale,
                    boxShadow: boxShadow,
                    ease: "power2.out"
                });
            });
            element.addEventListener('mouseleave', () => {
                gsap.to(element, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    boxShadow: 'var(--shadow-light)', /* Reset to light shadow */
                    ease: "power2.out"
                });
            });
        }
    }

    // Apply hover to specific elements
    document.querySelectorAll('.service-card, .case-study-card, .testimonial-card, .blog-post-card, .services-list-container ul li').forEach(card => {
        applyHoverEffect(card, 1.01, -8, '0 12px 30px rgba(0, 0, 0, 0.12)');
    });

    document.querySelectorAll('.btn').forEach(button => {
        gsap.set(button, { clearProps: "transform,boxShadow" }); 
        
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                duration: 0.2,
                y: -2,
                scale: 1.02,
                boxShadow: '0 6px 20px rgba(74, 105, 189, 0.3)',
                ease: "power1.out"
            });
        });
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                duration: 0.2,
                y: 0,
                scale: 1,
                boxShadow: 'var(--shadow-light)',
                ease: "power1.out"
            });
        });
        // Add click/active press effect
        button.addEventListener('mousedown', () => {
            gsap.to(button, { duration: 0.1, scale: 0.98, y: 0, ease: "power1.in" });
        });
        button.addEventListener('mouseup', () => {
            gsap.to(button, { duration: 0.1, scale: 1, y: 0, ease: "power1.out" });
        });
    });

    gsap.to(document.querySelector('.logo img'), { scale: 1.05, repeat: -1, yoyo: true, duration: 2, ease: "power1.inOut" });

    document.querySelectorAll('.nav-menu li a').forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, { duration: 0.2, scale: 1.05, color: 'var(--accent-color)', ease: "power1.out" });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(link, { duration: 0.2, scale: 1, color: 'var(--text-dark)', ease: "power1.out" });
        });
    });

    document.querySelectorAll('.social-links a').forEach(socialLink => {
        socialLink.addEventListener('mouseenter', () => {
            gsap.to(socialLink, { duration: 0.2, scale: 1.2, y: -2, ease: "power1.out" });
        });
        socialLink.addEventListener('mouseleave', () => {
            gsap.to(socialLink, { duration: 0.2, scale: 1, y: 0, ease: "power1.out" });
        });
    });

    // --- Mouse Parallax Effect for Hero Content ---
    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const heroBgImage = document.getElementById('hero-background-image');

    if (heroSection && heroContent) {
        heroSection.addEventListener('mousemove', (e) => {
            const rect = heroSection.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;

            const sensitivityX = 0.03;
            const sensitivityY = 0.03;

            const parallaxX = mouseX * sensitivityX;
            const parallaxY = mouseY * sensitivityY;
            const parallaxZ = Math.sqrt(mouseX * mouseX + mouseY * mouseY) * 0.01;

            gsap.to(heroContent, {
                x: parallaxX,
                y: parallaxY,
                z: parallaxZ,
                rotationY: parallaxX / 15,
                rotationX: -parallaxY / 15,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true
            });
            // Parallax for background image (subtle opposite direction)
            gsap.to(heroBgImage, {
                x: -mouseX * 0.01,
                y: -mouseY * 0.01,
                duration: 0.8,
                ease: "power2.out",
                overwrite: true
            });
        });

        heroSection.addEventListener('mouseleave', () => {
            gsap.to(heroContent, {
                x: 0,
                y: 0,
                z: 0,
                rotationY: 0,
                rotationX: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
            gsap.to(heroBgImage, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "elastic.out(1, 0.5)"
            });
        });
    }

    // --- Mouse Follower Animation ---
    const mouseFollower = document.getElementById('mouse-follower');
    if (mouseFollower) {
        gsap.set(mouseFollower, { xPercent: -50, yPercent: -50 });

        window.addEventListener('mousemove', (e) => {
            gsap.to(mouseFollower, {
                duration: 0.4,
                x: e.clientX,
                y: e.clientY,
                ease: "power2.out",
                overwrite: true
            });

            if (gsap.getProperty(mouseFollower, "opacity") === 0) {
                gsap.to(mouseFollower, { opacity: 1, duration: 0.5 });
            }
        });

        window.addEventListener('mouseleave', () => {
            gsap.to(mouseFollower, { opacity: 0, duration: 0.5 });
        });
    }
});
