// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== NAVEGACIÓN MÓVIL =====
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle del menú hamburguesa
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animar las barras del hamburger
        const bars = hamburger.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            if (hamburger.classList.contains('active')) {
                if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                if (index === 1) bar.style.opacity = '0';
                if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            }
        });
    });

    // Cerrar menú al hacer click en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Resetear hamburger
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'none';
                bar.style.opacity = '1';
            });
        });
    });

    // ===== NAVEGACIÓN SUAVE Y ACTIVA =====
    const sections = document.querySelectorAll('section[id]');
    
    // Función para actualizar el enlace activo
    function updateActiveLink() {
        let current = '';
        const scrollPosition = window.pageYOffset + 150; // Ajuste para mejor detección
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Escuchar el scroll para actualizar enlaces activos
    window.addEventListener('scroll', updateActiveLink);

    // ===== ANIMACIONES DE SCROLL =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animar barras de habilidades
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
                
                // Animar estadísticas
                if (entry.target.classList.contains('about')) {
                    animateStats();
                }
            }
        });
    }, observerOptions);

    // Observar todas las secciones
    sections.forEach(section => {
        observer.observe(section);
    });

    // ===== ANIMACIÓN DE BARRAS DE HABILIDADES =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });
    }

    // ===== ANIMACIÓN DE ESTADÍSTICAS =====
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const originalText = stat.textContent;
            const finalNumber = parseInt(originalText);
            
            // Si es un número válido, animar
            if (!isNaN(finalNumber)) {
                let currentNumber = 0;
                const increment = finalNumber / 50;
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        currentNumber = finalNumber;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(currentNumber) + '+';
                }, 40);
            } else {
                // Si es texto, solo aplicar una animación de fade-in
                stat.style.opacity = '0';
                stat.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    stat.style.transition = 'all 0.6s ease';
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, 200);
            }
        });
    }

    // ===== EFECTO PARALLAX SUTIL (OPTIMIZADO) =====
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroHeight = hero ? hero.offsetHeight : 0;
        
        // Solo aplicar parallax cuando estamos en la sección hero
        if (hero && scrolled < heroHeight) {
            const parallaxSpeed = scrolled * 0.3;
            hero.style.transform = `translateY(${parallaxSpeed}px)`;
        } else if (hero) {
            hero.style.transform = 'translateY(0)';
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // ===== CONFIGURACIÓN EMAILJS =====
    // Inicializar EmailJS con tu Public Key
    // IMPORTANTE: Debes reemplazar "TU_PUBLIC_KEY_AQUI" con tu Public Key real de EmailJS
    // Ve a tu dashboard de EmailJS → Account → General → Public Key
    emailjs.init("giy0rllLAGnynVB-0");
    
    // ===== FORMULARIO DE CONTACTO CON EMAILJS =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Validación básica
            if (!name || !email || !subject || !message) {
                showNotification('Por favor, completa todos los campos.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Por favor, ingresa un email válido.', 'error');
                return;
            }
            
            // Mostrar estado de envío
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
            
            // Parámetros para EmailJS - DEBEN coincidir con tu template
            // Basado en la configuración mostrada en la imagen
            const templateParams = {
                from_name: name,        // {{from_name}} en el template
                from_email: email,      // {{from_email}} en el template  
                subject: subject,       // {{subject}} en el template
                message: message,       // {{message}} en el template
                reply_to: email,        // {{reply_to}} en el template
                to_email: 'jbelich89@gmail.com'  // Email destino fijo
            };
            
            // Debug: Mostrar parámetros que se envían
            console.log('Enviando con estos parámetros:', templateParams);
            console.log('Service ID:', 'service_on3v3xs');
            console.log('Template ID:', 'template_3397tpk');
            
            // Enviar email usando EmailJS
            emailjs.send('service_on3v3xs', 'template_3397tpk', templateParams)
                .then(function(response) {
                    console.log('Email enviado exitosamente!', response.status, response.text);
                    showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
                    contactForm.reset();
                }, function(error) {
                    console.error('Error completo:', error);
                    console.error('Status:', error.status);
                    console.error('Text:', error.text);
                    
                    let errorMessage = 'Error al enviar el mensaje. ';
                    if (error.status === 400) {
                        errorMessage += 'Verifica la configuración de EmailJS.';
                    } else if (error.status === 401) {
                        errorMessage += 'Problema de autenticación.';
                    } else {
                        errorMessage += 'Inténtalo de nuevo.';
                    }
                    
                    showNotification(errorMessage, 'error');
                })
                .finally(function() {
                    // Restaurar botón
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // ===== FUNCIONES AUXILIARES =====
    
    // Validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Mostrar notificaciones
    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos de la notificación
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(400px);
            transition: transform 0.3s ease-in-out;
            max-width: 300px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        `;
        
        // Color según el tipo
        if (type === 'success') {
            notification.style.background = 'linear-gradient(135deg, #10B981, #059669)';
        } else if (type === 'error') {
            notification.style.background = 'linear-gradient(135deg, #EF4444, #DC2626)';
        }
        
        // Agregar al DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover después de 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }

    // ===== EFECTOS ADICIONALES =====
    
    // Efecto de typing en el título principal
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efecto typing al cargar la página
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 1000);
    }

    // ===== SMOOTH SCROLL PARA NAVEGACIÓN =====
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Ajuste dinámico del offset según la sección
                let offset = 80; // Default para navbar
                if (targetId === '#sobre-mi') {
                    offset = 60; // Menos offset para "Sobre mí"
                }
                
                const offsetTop = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== CAMBIO DE NAVBAR AL HACER SCROLL (OPTIMIZADO) =====
    let navbarTicking = false;
    
    function updateNavbar() {
        const navbar = document.querySelector('.navbar');
        
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = 'none';
        }
        
        navbarTicking = false;
    }
    
    window.addEventListener('scroll', function() {
        updateActiveLink(); // Mantener la función de enlaces activos
        
        if (!navbarTicking) {
            requestAnimationFrame(updateNavbar);
            navbarTicking = true;
        }
    });


    // ===== PRELOADER (OPCIONAL) =====
    function createPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--black);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10001;
            transition: opacity 0.5s ease;
        `;
        
        preloader.innerHTML = `
            <div style="
                width: 50px;
                height: 50px;
                border: 3px solid var(--light-gray);
                border-top: 3px solid var(--primary-gold);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            "></div>
        `;
        
        // Agregar animación de spin
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(preloader);
        
        // Remover preloader cuando la página esté cargada
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(preloader);
                }, 500);
            }, 1000);
        });
    }

    // Activar preloader
    createPreloader();

    // ===== LAZY LOADING PARA IMÁGENES (SI SE AGREGAN) =====
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    console.log('🚀 Portafolio cargado correctamente!');
});
