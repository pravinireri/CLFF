// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });
  
  // Navbar background on scroll
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        mobileMenu.classList.remove('active');
      }
    });
  });
  
  // Books carousel navigation
  const booksContainer = document.getElementById('books-container');
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');
  
  if (booksContainer && prevButton && nextButton) {
    prevButton.addEventListener('click', () => {
      booksContainer.scrollBy({
        left: -300,
        behavior: 'smooth'
      });
    });
    
    nextButton.addEventListener('click', () => {
      booksContainer.scrollBy({
        left: 300,
        behavior: 'smooth'
      });
    });
  }

  // Latest Video
const channelId = 'UCRuGL0Y3BNP1DlcW_TWgGOQ';
const apiKey = 'AIzaSyA1rRSuwkQ2nP7XFQptMQh2kZG86orPZyU';

async function fetchLatestVideo() {
  try {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&maxResults=1`);
    const data = await response.json();

    if (data.items.length > 0) {
      const latestVideo = data.items[0];
      const videoId = latestVideo.id.videoId;
      const videoUrl = `https://www.youtube.com/embed/${videoId}`;

      document.getElementById('video-frame').src = videoUrl;
    } else {
      console.error('No videos found for the channel.');
    }
  } catch (error) {
    console.error('Error fetching latest video:', error);
  }
}

window.onload = fetchLatestVideo;
  
  // Video player functionality
  const videoOverlay = document.querySelector('.video-overlay');
  const playButton = document.querySelector('.play-button');
  const videoFrame = document.getElementById('video-frame');
  
  if (playButton && videoOverlay && videoFrame) {
    playButton.addEventListener('click', () => {
      // Update video src to autoplay
      const videoSrc = videoFrame.src;
      videoFrame.src = videoSrc.includes('?') 
        ? videoSrc.replace('?controls=0', '?autoplay=1&controls=1') 
        : videoSrc + '?autoplay=1&controls=1';
      
      // Hide overlay
      videoOverlay.classList.add('hidden');
    });
  }
});