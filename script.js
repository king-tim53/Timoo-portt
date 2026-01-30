// 1. AOS Animation Init
AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
  
  // 2. Preloader Logic
  window.addEventListener("load", function() {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  });
  
  // 3. Custom Cursor Logic
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");
  
  window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;
    
    if(cursorDot && cursorOutline) {
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;
      
      // Animate outline with slight delay for smooth effect
      cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    }
  });
  
  // 4. Typewriter Effect
  class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
      this.txtElement = txtElement;
      this.words = words;
      this.txt = '';
      this.wordIndex = 0;
      this.wait = parseInt(wait, 10);
      this.type();
      this.isDeleting = false;
    }
  
    type() {
      const current = this.wordIndex % this.words.length;
      const fullTxt = this.words[current];
  
      if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  
      let typeSpeed = 150;
  
      if(this.isDeleting) {
        typeSpeed /= 2;
      }
  
      if(!this.isDeleting && this.txt === fullTxt) {
        typeSpeed = this.wait;
        this.isDeleting = true;
      } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        typeSpeed = 500;
      }
  
      setTimeout(() => this.type(), typeSpeed);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const txtElement = document.querySelector('.txt-type');
    if(txtElement) {
      const words = JSON.parse(txtElement.getAttribute('data-words'));
      const wait = txtElement.getAttribute('data-wait');
      new TypeWriter(txtElement, words, wait);
    }
  });
  
  // 5. Navbar Scroll, Back to Top & Progress Bar
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');
  const progressBar = document.getElementById("progressBar");
  
  window.onscroll = () => {
    // Navbar & BackToTop
    if (window.scrollY > 50) {
      navbar.classList.add('bg-dark');
      backToTop.classList.add('active');
    } else {
      navbar.classList.remove('bg-dark');
      backToTop.classList.remove('active');
    }
  
    // Scroll Progress Bar
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrolled + "%";
  };

  // Optional Hackathon Hover Effect
const hackCard = document.querySelector('.hackathon-featured-card');
if(hackCard) {
    hackCard.addEventListener('mouseenter', () => {
        document.querySelector('.sprint-timer').style.transform = 'scale(1.1) rotate(5deg)';
    });
    hackCard.addEventListener('mouseleave', () => {
        document.querySelector('.sprint-timer').style.transform = 'scale(1) rotate(0deg)';
    });
}

/* --- GRADMATE LAUNCH COUNTDOWN --- */
(function() {
  // 1. Set the Launch Date (March 25, 2026)
  const launchDate = new Date("March 25, 2026 00:00:00").getTime();

  // 2. Update the count down every 1 second
  const timerInterval = setInterval(function() {

      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the launch date
      const distance = launchDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Helper function to add leading zero (e.g. "5" -> "05")
      const formatTime = (time) => time < 10 ? `0${time}` : time;

      // Display the result in the elements (Check if element exists first)
      const dayEl = document.getElementById("gm-days");
      if (dayEl) {
          dayEl.innerText = formatTime(days);
          document.getElementById("gm-hours").innerText = formatTime(hours);
          document.getElementById("gm-minutes").innerText = formatTime(minutes);
          document.getElementById("gm-seconds").innerText = formatTime(seconds);
      }

      // If the count down is finished
      if (distance < 0) {
          clearInterval(timerInterval);
          if(dayEl) {
              document.querySelector('.gradmate-countdown').innerHTML = 
                  '<h5 class="text-primary fw-bold mb-0">WE ARE LIVE! 🚀</h5>';
          }
      }
  }, 1000);
})();


/* --- GRADMATE AUTOMATIC SLIDER --- */
(function() {
  const slides = document.querySelectorAll('.gradmate-slide');
  const intervalTime = 2000; // 2 seconds
  let currentSlide = 0;

  // Only run if slides exist
  if(slides.length > 0) {
      setInterval(() => {
          // 1. Remove 'active' class from current image
          slides[currentSlide].classList.remove('active');

          // 2. Calculate next index (loop back to 0 if at end)
          currentSlide = (currentSlide + 1) % slides.length;

          // 3. Add 'active' class to next image
          slides[currentSlide].classList.add('active');
      }, intervalTime);
  }
})();