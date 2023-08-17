// pages/index.tsx
import { useState } from 'react';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  // Convert blob to Base64 data URL
  const blobToDataURL = (blob) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  // Display the blob as an image
  const displayBlobAsImage = async (blob) => {
    const dataURL = await blobToDataURL(blob);
    console.log('Image URL:', dataURL);
    setImageSrc(dataURL);
  }

    // Call the My HuggingFace API
    const query = async (data) => {
        const response = await fetch('/api/huggingface', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            });
    const result = await response.blob();
    return result;
  }


  const query2 = async (data) => { // Fixed here
    const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

    const result = await response.text()
    return result;
  }

  
  // handle input text
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  }





    // Handle button click
    const callOpenAI = () => {
      query2("only reply with a one word answer. Name a single material used in " + inputValue)
      .then((responseFromQuery2) => {
          console.log('OpenAI Response:', responseFromQuery2);
          return query({ "inputs": "pbr " + responseFromQuery2 });
      })
      .then((responseFromQuery) => {
          displayBlobAsImage(responseFromQuery);
      })
      .catch((error) => {
          console.error('Error:', error);
      });
  }

  return (
    <div>
      <h1>Image Generator</h1>
      <input type="text" value={inputValue} onChange={handleInputChange} placeholder="Enter text here" />
      <button onClick={callOpenAI}>Generate</button>
      {imageSrc && <img src={imageSrc} alt="Generated Image" />}
    </div>
  )
}
