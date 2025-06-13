// Dark Mode Toggle with GSAP
document.addEventListener('DOMContentLoaded', function() {
  // Elements
  const toggle = document.querySelector('.toggle-scene');
  const dummy = document.querySelector('.toggle-scene__dummy');
  const hit = document.querySelector('.toggle-scene__hit');
  const coro = document.querySelector('.toggle-scene__coro');
  
  // State
  const STATE = {
    ON: localStorage.getItem('theme') === 'dark' || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches && 
         !localStorage.getItem('theme'))
  };
  
  // Initialize
  function initTheme() {
    document.documentElement.setAttribute('data-theme', STATE.ON ? 'dark' : 'light');
    if (STATE.ON) {
      dummy.style.display = "none";
      hit.style.display = "block";
    } else {
      dummy.style.display = "block";
      hit.style.display = "none";
    }
  }
  
  // Animation Timeline
  const CORD_TL = gsap.timeline({
    paused: true,
    onStart: () => {
      STATE.ON = !STATE.ON;
      document.documentElement.setAttribute('data-theme', STATE.ON ? 'dark' : 'light');
      localStorage.setItem('theme', STATE.ON ? 'dark' : 'light');
      
      gsap.set([dummy, hit], { display: "none" });
      gsap.set(coro, { display: "block" });
      
      // Optional click sound
      if (typeof Audio !== 'undefined') {
        const clickSound = new Audio('https://assets.codepen.io/605876/click.mp3');
        clickSound.volume = 0.3;
        clickSound.play();
      }
    },
    onComplete: () => {
      gsap.set(coro, { display: "none" });
      gsap.set([dummy, hit], { 
        display: "block",
        onComplete: () => {
          if (STATE.ON) {
            gsap.set(dummy, { display: "none" });
          } else {
            gsap.set(hit, { display: "none" });
          }
        }
      });
    }
  });
  
  // Set up animation
  CORD_TL
    .fromTo(coro, 
      { strokeDashoffset: 283 },
      { strokeDashoffset: 0, duration: 0.5 }
    )
    .to(coro,
      { strokeDashoffset: -283, duration: 0.5 },
      "+=0.1"
    );
  
  // Event listener
  if (toggle) {
    toggle.addEventListener('click', () => {
      CORD_TL.restart();
    });
  }
  
  // Initialize theme
  initTheme();
});