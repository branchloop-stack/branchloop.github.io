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
            
            const emailValue = document.getElementById('email') ? document.getElementById('email').value : '';
            const messageValue = document.getElementById('message') ? document.getElementById('message').value : '';
            const nameInput = document.getElementById('name');
            const nameValue = nameInput ? nameInput.value : 'Sin Nombre';

            // Usando FormSubmit para enviar correo real sin backend
            fetch('https://formsubmit.co/ajax/branchloop@gmail.com', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    Nombre: nameValue,
                    Correo: emailValue,
                    Mensaje: messageValue
                })
            })
            .then(response => response.json())
            .then(data => {
                btn.innerText = originalText;
                btn.disabled = false;
                form.reset();
                typeWriterEffect(statusDiv, '> TRANSMISIÓN EXITOSA. CONTACTO ESTABLECIDO CON LA CENTRAL (BRANCHLOOP@GMAIL.COM). FIN DE MENSAJE.', 40);
            })
            .catch(error => {
                btn.innerText = originalText;
                btn.disabled = false;
                typeWriterEffect(statusDiv, '> ERROR CRÍTICO DE TRANSMISIÓN. FALLO AL ENVIAR CORREO.', 40);
            });
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

    // Mouse glow effect
    const glow = document.querySelector('.mouse-glow');
    if (glow) {
        window.addEventListener('mousemove', (e) => {
            glow.style.setProperty('--mouse-x', e.clientX + 'px');
            glow.style.setProperty('--mouse-y', e.clientY + 'px');
        });
    }

    // Animaciones de scroll para los contenedores (Interseccion Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const cards = document.querySelectorAll('.topic-card');
    cards.forEach((card) => {
        observer.observe(card);
    });

    // Animación de scroll para el fondo (Parallax effect)
    const bg = document.getElementById('parallax-bg');
    if (bg) {
        window.addEventListener('scroll', function () {
            let offset = window.pageYOffset;
            bg.style.transform = "translateY(" + (offset * 0.4) + "px)";
        });
    }
});
