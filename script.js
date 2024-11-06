document.addEventListener('DOMContentLoaded', () => {
    gsap.from('.welcome-section', {
        duration: 1,
        y: -100,
        opacity: 0,
        ease: "power3.out"
    });

    gsap.from('.category-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out"
    });
    const cursorLarge = document.querySelector('.cursor--large');
    const cursorSmall = document.querySelector('.cursor--small');
    
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let velocityX = 0;
    let velocityY = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isHovering = false;
    let hoverPosition = { x: 0, y: 0 };
    
    const springStrength = 0.9;
    const friction = 0.7;
    const maxStretch = 55;
  
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursorSmall.style.left = mouseX + 'px';
      cursorSmall.style.top = mouseY + 'px';
  
      const mouseSpeedX = Math.abs(mouseX - lastMouseX);
      const mouseSpeedY = Math.abs(mouseY - lastMouseY);
      const mouseSpeed = Math.min(Math.sqrt(mouseSpeedX**2 + mouseSpeedY**2) * 0.05, 1);
      
      const stretchX = 1 + (mouseSpeedX * 0.02);
      const stretchY = 1 + (mouseSpeedY * 0.02);
      
      if (!isHovering) {
        cursorLarge.style.transform = `translate(-50%, -50%) scale(${Math.min(stretchX, maxStretch)}, ${Math.min(stretchY, maxStretch)})`;
      }
  
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    });
  
    function animate() {
      if (!isHovering) {
        const dx = mouseX - currentX;
        const dy = mouseY - currentY;
        
        velocityX += dx * springStrength;
        velocityY += dy * springStrength;
        
        velocityX *= friction;
        velocityY *= friction;
        
        currentX += velocityX;
        currentY += velocityY;
        
        cursorLarge.style.left = currentX + 'px';
        cursorLarge.style.top = currentY + 'px';
      } else {
        cursorLarge.style.left = hoverPosition.x + 'px';
        cursorLarge.style.top = hoverPosition.y + 'px';
      }
      
      requestAnimationFrame(animate);
    }
  
    animate();
  
    const navLinks = document.querySelectorAll('.navigation a');
    const otherElements = document.querySelectorAll('button, [role="button"], .toggleMenu, .theme-label');
    
    navLinks.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const rect = element.getBoundingClientRect();
            const padding = 2;
            isHovering = true;
            cursorLarge.classList.add('hover');
            cursorLarge.style.width = (rect.width + padding * 2) + 'px';
            cursorLarge.style.height = (rect.height + padding * 2) + 'px';
            cursorLarge.style.borderRadius = '15px';
            hoverPosition.x = rect.left + rect.width/2;
            hoverPosition.y = rect.top + rect.height/2 - 3;
            cursorLarge.style.left = hoverPosition.x + 'px';
            cursorLarge.style.top = hoverPosition.y + 'px';
            cursorLarge.style.transform = 'translate(-50%, -50%)';
        });
        
        element.addEventListener('mouseleave', () => {
            isHovering = false;
            cursorLarge.classList.remove('hover');
            cursorLarge.style.width = '40px';
            cursorLarge.style.height = '40px';
            cursorLarge.style.borderRadius = '50%';
            mouseX = cursorSmall.offsetLeft;
            mouseY = cursorSmall.offsetTop;
            currentX = mouseX;
            currentY = mouseY;
        });
    });
  
    otherElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            const rect = element.getBoundingClientRect();
            const padding = 2;
            isHovering = true;
            cursorLarge.classList.add('hover');
            cursorLarge.style.width = (rect.width + padding * 2) + 'px';
            cursorLarge.style.height = (rect.height + padding * 2) + 'px';
            cursorLarge.style.borderRadius = getComputedStyle(element).borderRadius;
            hoverPosition.x = rect.left + rect.width/2;
            hoverPosition.y = rect.top + rect.height/2;
            cursorLarge.style.left = hoverPosition.x + 'px';
            cursorLarge.style.top = hoverPosition.y + 'px';
            cursorLarge.style.transform = 'translate(-50%, -50%)';
        });

        
        element.addEventListener('mouseleave', () => {
            isHovering = false;
            cursorLarge.classList.remove('hover');
            cursorLarge.style.width = '40px';
            cursorLarge.style.height = '40px';
            cursorLarge.style.borderRadius = '50%';
            mouseX = cursorSmall.offsetLeft;
            mouseY = cursorSmall.offsetTop;
            currentX = mouseX;
            currentY = mouseY;
        });
    });
  
    const toggleMenu = document.querySelector('.toggleMenu');
    const navigation = document.querySelector('.navigation');
    toggleMenu.addEventListener('click', () => {
        toggleMenu.classList.toggle('active');
        navigation.classList.toggle('active');
    });
  
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            themeToggle.checked = true;
        }
    }
  
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
  
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const text = typingText.textContent;
        typingText.textContent = '';
        let i = 0;
  
        function typeWriter() {
            if (i < text.length) {
                typingText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
  
        typeWriter();
    }
  
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
  
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});