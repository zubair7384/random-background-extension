<script>
	let imageUrl = '';
  
	// Fetch a random image from Unsplash
	async function fetchRandomImage() {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?client_id=nU0j9pbSQFwheAw05UgncWNdjgfzmjzh-GXXrrHst-M`
      );
      const data = await response.json();
      console.log('API Response:', data); // Log the response here
      imageUrl = data.urls.full; // Use the URL for the full-size image
    } catch (error) {
      console.error('Error fetching image:', error); // Log any errors
    }
  }
//   console.log(data,'data')
	// Fetch the image when the app loads
	fetchRandomImage();
  </script>
  
  <style>
	:global(body) {
	  margin: 0;
	  padding: 0;
	  overflow: hidden;
	  font-family: sans-serif;
	}
  
	.refresh-btn {
	  position: absolute;
	  top: 10px;
	  right: 10px;
	  background-color: rgba(0, 0, 0, 0.7);
	  color: white;
	  border: none;
	  padding: 10px 20px;
	  cursor: pointer;
	  border-radius: 5px;
	  font-size: 16px;
	}
  </style>
  
  <div class="background" style="background-image: url('{imageUrl}'); height: 100vh; width: 100vw; background-size: cover; background-position: center;">
	<button class="refresh-btn" on:click={fetchRandomImage}>Refresh</button>
  </div>
  