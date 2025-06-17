// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  lucide.createIcons();
  
  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Mobile menu toggle with Safari touch support
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  mobileMenuButton.addEventListener('click', (e) => {
    e.preventDefault();
    mobileMenu.classList.toggle('active');
    // Add aria attribute for accessibility
    mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('active'));
  });
  
  // Close menu when clicking outside (Safari touch support)
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
      mobileMenu.classList.remove('active');
      mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Navbar background on scroll with Safari smooth scrolling support
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    // Safari scroll performance optimization
    if (Math.abs(lastScrollY - window.scrollY) > 5) {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
      lastScrollY = window.scrollY;
    }
  }, { passive: true });
  
  // Smooth scrolling for anchor links with Safari polyfill
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Safari-compatible smooth scroll
        if ('scrollBehavior' in document.documentElement.style) {
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        } else {
          // Fallback for older Safari
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: targetPosition,
            behavior: 'auto'
          });
        }
        
        // Close mobile menu if open
        mobileMenu.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      }
    });
  });
  
  // Books carousel navigation with Safari touch support
  const booksContainer = document.getElementById('books-container');
  const prevButton = document.getElementById('prev-btn');
  const nextButton = document.getElementById('next-btn');
  
  if (booksContainer && prevButton && nextButton) {
    // Add touch event support for Safari iOS
    booksContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    booksContainer.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    let touchStartX = 0;
    
    function handleTouchStart(e) {
      touchStartX = e.touches[0].clientX;
    }
    
    function handleTouchMove(e) {
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;
      if (Math.abs(diff) > 50) {
        booksContainer.scrollBy({
          left: diff > 0 ? 300 : -300,
          behavior: 'smooth'
        });
      }
    }
    
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

  // Latest Video with Safari-compatible implementation
  const channelId = 'UCRuGL0Y3BNP1DlcW_TWgGOQ';
  const apiKey = 'AIzaSyA1rRSuwkQ2nP7XFQptMQh2kZG86orPZyU';
  const videoFrame = document.getElementById('video-frame');

  // Safari-specific video initialization
  function initVideoPlayer() {
    if (videoFrame) {
      // Safari requires these attributes for proper embedding
      videoFrame.setAttribute('allowfullscreen', '');
      videoFrame.setAttribute('frameborder', '0');
      videoFrame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
      
      // Load a default video first to prevent Safari issues
      videoFrame.src = 'https://www.youtube.com/embed?listType=user_uploads&list=' + channelId;
      
      // Then try to fetch the latest video
      fetchLatestVideo();
    }
  }

  async function fetchLatestVideo() {
    try {
      const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&order=date&part=snippet&maxResults=1`);
      
      // Safari-specific fetch error handling
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const latestVideo = data.items[0];
        const videoId = latestVideo.id.videoId;
        
        // Safari-compatible embed URL with proper parameters
        const videoUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&playsinline=1`;
        
        // Only update if different to prevent Safari reload issues
        if (videoFrame.src !== videoUrl) {
          videoFrame.src = videoUrl;
        }
      }
    } catch (error) {
      console.error('Error fetching latest video:', error);
      // Maintain the existing video if there's an error
    }
  }

  // Initialize video player after slight delay for Safari
  setTimeout(initVideoPlayer, 100);
  
  // Video player functionality with Safari touch support
  const videoOverlay = document.querySelector('.video-overlay');
  const playButton = document.querySelector('.play-button');
  
  if (playButton && videoOverlay && videoFrame) {
    // Add touch support for Safari iOS
    playButton.addEventListener('touchend', (e) => {
      e.preventDefault();
      handlePlayButtonClick();
    }, { passive: false });
    
    playButton.addEventListener('click', (e) => {
      e.preventDefault();
      handlePlayButtonClick();
    });
    
    function handlePlayButtonClick() {
      // Safari-compatible video activation
      const videoSrc = videoFrame.src;
      const newSrc = videoSrc.includes('?') 
        ? videoSrc.replace(/(\?|&)autoplay=0/, '$1autoplay=1') + '&playsinline=1'
        : videoSrc + '?autoplay=1&playsinline=1';
      
      // Only update if different to prevent Safari issues
      if (videoFrame.src !== newSrc) {
        videoFrame.src = newSrc;
      }
      
      // Hide overlay with Safari transition support
      videoOverlay.style.transition = 'opacity 0.3s ease';
      videoOverlay.style.opacity = '0';
      
      setTimeout(() => {
        videoOverlay.classList.add('hidden');
        videoOverlay.style.opacity = '';
      }, 300);
    }
  }
});

/* Hero Loop */
document.addEventListener('DOMContentLoaded', function() {
  const heroVideo = document.querySelector('.hero-video');
  
  // Ensure video loops (fallback for some browsers)
  if(heroVideo) {
    heroVideo.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    }, false);
    
    // Safari requires this for proper looping
    heroVideo.setAttribute('loop', '');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // Modal elements
  const modal = document.getElementById('join-modal');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const modalClose = modal.querySelector('.modal-close');
  const joinButton = document.querySelector('.btn-primary'); // The existing "Join Us" button
  const body = document.body;

  // Store the last focused element for accessibility
  let lastFocusedElement = null;

  // Open modal function
  function openModal() {
    lastFocusedElement = document.activeElement;
    modal.classList.add('active');
    body.classList.add('modal-open');
    modal.setAttribute('aria-hidden', 'false');
    
    // Focus the close button for accessibility
    setTimeout(() => {
      modalClose.focus();
    }, 100);
    
    // Trap focus within modal
    trapFocus();
  }

  // Close modal function
  function closeModal() {
    modal.classList.remove('active');
    body.classList.remove('modal-open');
    modal.setAttribute('aria-hidden', 'true');
    
    // Return focus to the last focused element
    if (lastFocusedElement) {
      lastFocusedElement.focus();
    }
    
    // Remove focus trap
    removeFocusTrap();
  }

  // Focus trap functionality for accessibility
  let focusableElements = [];
  let firstFocusableElement = null;
  let lastFocusableElement = null;

  function trapFocus() {
    focusableElements = modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    firstFocusableElement = focusableElements[0];
    lastFocusableElement = focusableElements[focusableElements.length - 1];

    modal.addEventListener('keydown', handleTabKey);
  }

  function removeFocusTrap() {
    modal.removeEventListener('keydown', handleTabKey);
  }

  function handleTabKey(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      // Shift + Tab
      if (document.activeElement === firstFocusableElement) {
        e.preventDefault();
        lastFocusableElement.focus();
      }
    } else {
      // Tab
      if (document.activeElement === lastFocusableElement) {
        e.preventDefault();
        firstFocusableElement.focus();
      }
    }
  }

  // Event listeners
  if (joinButton) {
    joinButton.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }

  // Close modal when clicking overlay
  modalOverlay.addEventListener('click', closeModal);

  // Close modal when clicking close button
  modalClose.addEventListener('click', closeModal);

  // Close modal with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Touch support for mobile devices
  let touchStartY = 0;
  
  modal.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  modal.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const touchDiff = touchStartY - touchY;
    
    // Close modal if swiping down significantly
    if (touchDiff < -100) {
      closeModal();
    }
  }, { passive: true });

  // Prevent image context menu on long press (mobile)
  const modalImage = modal.querySelector('.modal-image');
  modalImage.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (modal.classList.contains('active')) {
        // Recalculate modal positioning if needed
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.transform = 'scale(1) translateY(0)';
      }
    }, 100);
  });
});