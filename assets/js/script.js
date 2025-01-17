/* Section 4: Latest Message */

const apiKey = 'AIzaSyCqwV1X-j8uMr0Xc9sVHiLEJ0fAu8rWzQM';
const channelId = 'UC6NNvr65ty4w5upcG-Paa6g';

async function fetchLatestVideo() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=1`
    );
    const data = await response.json();
    const videoId = data.items[0]?.id?.videoId;

    if (videoId) {
      const videoContainer = document.getElementById('video-container');
      videoContainer.innerHTML = `
        <iframe width="560" height="315" 
          src="https://www.youtube.com/embed/${videoId}" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    } else {
      document.getElementById('video-container').innerText =
        'No videos found.';
    }
  } catch (error) {
    console.error('Error fetching the latest video:', error);
    document.getElementById('video-container').innerText =
      'Failed to load video.';
  }
}

fetchLatestVideo();