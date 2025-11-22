document.addEventListener('DOMContentLoaded', () => {
    // Initialize Particles.js
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#ffffff' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: false },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00f3ff',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false,
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Typing Effect
    const textElement = document.querySelector('.typing-effect');
    if (textElement) {
        const text = textElement.textContent;
        textElement.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                textElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Typing speed
            }
        }
        
        // Start typing after a slight delay
        setTimeout(typeWriter, 500);
    }

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Cookie Consent Logic
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const openSettingsBtn = document.getElementById('open-cookie-settings');

    // Function to update GTM/GA consent
    function updateConsent(granted) {
        if (typeof gtag === 'function') {
            gtag('consent', 'update', {
                'ad_storage': granted ? 'granted' : 'denied',
                'ad_user_data': granted ? 'granted' : 'denied',
                'ad_personalization': granted ? 'granted' : 'denied',
                'analytics_storage': granted ? 'granted' : 'denied'
            });
        }
        // Save preference
        localStorage.setItem('cookieConsent', granted ? 'accepted' : 'rejected');
    }

    // Check existing consent
    const savedConsent = localStorage.getItem('cookieConsent');
    
    if (savedConsent === 'accepted') {
        updateConsent(true);
    } else if (savedConsent === 'rejected') {
        updateConsent(false);
    } else {
        // Show banner if no choice made yet
        if (cookieBanner) {
            setTimeout(() => {
                cookieBanner.classList.remove('hidden');
                // Force reflow
                void cookieBanner.offsetWidth;
                cookieBanner.classList.add('visible');
            }, 1000);
        }
    }

    // Handle Accept
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            updateConsent(true);
            if (cookieBanner) cookieBanner.classList.remove('visible');
        });
    }

    // Handle Reject
    if (rejectBtn) {
        rejectBtn.addEventListener('click', () => {
            updateConsent(false);
            if (cookieBanner) cookieBanner.classList.remove('visible');
        });
    }

    // Handle Re-opening Settings
    if (openSettingsBtn) {
        openSettingsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (cookieBanner) {
                cookieBanner.classList.remove('hidden');
                // Force reflow
                void cookieBanner.offsetWidth;
                cookieBanner.classList.add('visible');
            }
        });
    }
});