// Copyright Year
    document.getElementById("year").textContent = new Date().getFullYear();

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