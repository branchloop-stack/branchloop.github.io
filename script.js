document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                targetEl.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll header background change on home page
    const homeHeader = document.querySelector('body.home .header');
    if (homeHeader) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                homeHeader.classList.add('scrolled');
            } else {
                homeHeader.classList.remove('scrolled');
            }
        });
    }

    // Form submission simulation with vintage terminal effect
    const form = document.querySelector('.contact-form');
    const statusDiv = document.getElementById('form-status');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit');
            const originalText = btn.innerText;
            
            btn.innerText = 'PROCESANDO...';
            btn.disabled = true;
            statusDiv.innerHTML = '';
            
            // Simulate network delay and terminal output typing effect
            setTimeout(() => {
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
                
                typeWriterEffect(statusDiv, '> TRANSMISIÓN EXITOSA. RECIBIDO EN LA BASE DE DATOS PRINCIPAL. FIN DE MENSAJE.', 50);
            }, 1500);
        });
    }

    // Typewriter effect function
    function typeWriterEffect(element, text, speed) {
        element.style.color = 'var(--accent)';
        element.style.marginTop = '1rem';
        element.style.fontFamily = "'Inconsolata', monospace";
        
        element.innerHTML = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.innerHTML += '<span class="blink">_</span>';
            }
        }
        
        type();
    }

    // Audio on button clicks
    const buttonSound = new Audio('tonos/buttonsound.mp3');
    const buttonPressed = new Audio('tonos/button-pressed.mp3');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const soundClone = buttonSound.cloneNode();
            soundClone.volume = 0.5;
            soundClone.play().catch(err => console.log('Audio play failed:', err));
        });
    });

    document.querySelectorAll('button, .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const soundClone = buttonPressed.cloneNode();
            soundClone.volume = 0.5;
            soundClone.play().catch(err => console.log('Audio play failed:', err));
        });
    });
});

