// Add this function to convert the blob to a Base64 data URL
function blobToDataURL(blob) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

// Add this function to display the blob as an image
async function displayBlobAsImage(blob) {
  const dataURL = await blobToDataURL(blob);

  // Get the image element
  const imageElement = document.getElementById("resultImage");

  // Set the src attribute to the data URL
  imageElement.src = dataURL;
}

// ... (The rest of the code remains the same)
async function query(data) {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/dream-textures/texture-diffusion",
    {
      headers: { Authorization: "HF KEY" },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.blob();
  return result;
}

document.getElementById("query").addEventListener("click", () => {
  query({ "inputs": "pbr, rock" }).then((response) => {
    // Use image
    displayBlobAsImage(response);
  });
});
