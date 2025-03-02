import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "";
const genAI = new GoogleGenerativeAI(API_KEY);

async function analyzeCrime(crimeDescription) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
  Analyze the following crime description and provide a severity rating from 1 to 10, where 1 is the least severe and 10 is the most severe. Also, give one sentence providing specific safety advice.

  Crime Description: ${crimeDescription}

  Output Format (JSON).  Do not return anything except this format.  If you cannot judge a description, return 0 for both fields:
  {
    "severityRating": "put rating here",
    "safetyAdvice": "put safetey advice here"
  }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    const text = response.text();
    console.log(text);

    
  } catch (error) {
    console.error("error during requesting server response:", error);
    return {severityRating: "", safetyAdvice: ""};
  }
}

import React, { useState } from 'react';

function AnalyzeCrime() {
  const [crimeDescription, setCrimeDescription] = useState('');
  const [ratingResult, setRatingResult] = useState(null);

  const handleInputChange = (event) => {
    setCrimeDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const result = await analyzeCrime(crimeDescription);
    setRatingResult(result);
  };

  return (
    <div>
      <h1>Report an Crime</h1>
      <input
        placeholder="Enter crime description"
        value={crimeDescription}
        onChange={handleInputChange}
      />
      <br></br>
      <button onClick={handleSubmit}>Analyze Crime</button>
      
    </div>
  );
}

export default AnalyzeCrime;