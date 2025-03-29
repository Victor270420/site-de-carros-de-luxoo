document.addEventListener('DOMContentLoaded', () => {
    // Elementos do slider
    const slides = document.querySelectorAll('.car-slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevButton = document.querySelector('.nav-button.prev');
    const nextButton = document.querySelector('.nav-button.next');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    let currentSlide = 0;
    const totalSlides = slides.length;

    
    // Função para atualizar o slide atual
    const updateSlide = (index) => {
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    };

    // Função para ir para o próximo slide
    const nextSlide = () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide(currentSlide);
    };

    // Função para ir para o slide anterior
    const prevSlide = () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(currentSlide);
    };

    // Event listeners para os botões de navegação
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Event listeners para os indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // Menu mobile toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const spans = menuToggle.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Navegação com teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
        }
    });

    // Auto play do slider (opcional)
    const autoPlayInterval = 10000; // 5 segundos
    let autoPlayTimer = setInterval(nextSlide, autoPlayInterval);

    // Parar auto play quando o usuário interagir
    const resetAutoPlay = () => {
        clearInterval(autoPlayTimer);
        autoPlayTimer = setInterval(nextSlide, autoPlayInterval);
    };

    // Event listeners para resetar o auto play
    nextButton.addEventListener('click', resetAutoPlay);
    prevButton.addEventListener('click', resetAutoPlay);
    indicators.forEach(indicator => {
        indicator.addEventListener('click', resetAutoPlay);
    });

    // Smooth scroll para links de navegação
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    document.getElementById('play-button').addEventListener('click', function() {
        const audio = document.getElementById('engine-sound');
        audio.play();
    });
}); 