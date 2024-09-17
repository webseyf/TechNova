document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('#nav-menu a'); // Select all nav links
  menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
  });
  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active'); // Close menu
    });
  });
  window.addEventListener('scroll', function () {
    const navbar = document.getElementById('nav-container');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
});


//testimonial
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.testimonial-slider');
  const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const prevButton = document.querySelector('.prev-slide');
  const nextButton = document.querySelector('.next-slide');
  const pagination = document.querySelector('.slider-pagination');
  let index = 0;
  let slideWidth;

  // Clone first and last slides for seamless looping
  const cloneSlides = () => {
    const firstSlide = slides[0].cloneNode(true);
    const lastSlide = slides[slides.length - 1].cloneNode(true);
    slider.appendChild(firstSlide);
    slider.insertBefore(lastSlide, slides[0]);
    slides.push(firstSlide, lastSlide); // Update slides array with clones
  };

  // Set the width for each slide and the slider container
  const setSlideWidth = () => {
    slideWidth = slider.clientWidth / (slides.length - 2); // Calculate width based on visible slides
    slider.style.width = `${slideWidth * slides.length}px`;
    slides.forEach(slide => slide.style.width = `${slideWidth}px`);
  };

  // Show the slide at index `i`
  const showSlide = (i) => {
    if (i === slides.length - 1) { // Loop back to the first slide
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${-(slides.length - 2) * 100}%)`;
      index = 0;
    } else if (i === -1) { // Loop to the last slide
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${-(slides.length - 1) * 100}%)`;
      index = slides.length - 3;
    } else {
      slider.style.transition = 'transform 0.5s ease-in-out';
      slider.style.transform = `translateX(${-(i + 1) * 100}%)`;
    }

    // Update pagination dots
    document.querySelectorAll('.slider-pagination span').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  };

  // Create pagination dots
  slides.slice(1, -1).forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => {
      index = i;
      showSlide(index);
    });
    pagination.appendChild(dot);
  });

  prevButton.addEventListener('click', () => {
    index = (index - 1 + slides.length - 2) % (slides.length - 2);
    showSlide(index);
  });

  nextButton.addEventListener('click', () => {
    index = (index + 1) % (slides.length - 2);
    showSlide(index);
  });

  // Automatically move to the next slide every 5 seconds
  let sliderInterval = setInterval(() => {
    index = (index + 1) % (slides.length - 2);
    showSlide(index);
  }, 5000);

  // Pause slider on hover
  slider.addEventListener('mouseover', () => {
    clearInterval(sliderInterval);
  });

  slider.addEventListener('mouseout', () => {
    sliderInterval = setInterval(() => {
      index = (index + 1) % (slides.length - 2);
      showSlide(index);
    }, 5000);
  });

  // Initialize
  cloneSlides();
  setSlideWidth();
  showSlide(index);

  // Adjust slide width on window resize
  window.addEventListener('resize', () => {
    setSlideWidth();
    showSlide(index); // Maintain the current slide after resizing
  });
});

//faq
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const activeItem = document.querySelector('.faq-item.active');
    if (activeItem && activeItem !== button.parentNode) {
      activeItem.classList.remove('active');
    }
    button.parentNode.classList.toggle('active');
  });
});

document.getElementById('newsletter-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevents the default form submission
})





