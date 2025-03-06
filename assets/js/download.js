// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Get the year for the footer copyright
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Initialize Lucide icons
  lucide.createIcons();
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
  
  // Carousel for books
  const booksContainer = document.getElementById('books-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  
  if (booksContainer && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', function() {
      booksContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });
    
    nextBtn.addEventListener('click', function() {
      booksContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
  }
  
  // Video player functionality
  const videoOverlay = document.querySelector('.video-overlay');
  const playButton = document.querySelector('.play-button');
  const videoFrame = document.getElementById('video-frame');
  
  if (videoOverlay && playButton && videoFrame) {
    playButton.addEventListener('click', function() {
      // Add autoplay parameter to URL
      let videoSrc = videoFrame.src;
      if (!videoSrc.includes('autoplay=1')) {
        videoFrame.src = videoSrc + (videoSrc.includes('?') ? '&' : '?') + 'autoplay=1';
      }
      // Hide overlay
      videoOverlay.classList.add('hidden');
    });
  }
});
