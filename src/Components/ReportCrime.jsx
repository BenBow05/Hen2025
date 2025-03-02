import { GoogleGenerativeAI } from "@google/generative-ai";
import AddressAutocomplete from "./AddressAutoComplete";
import "../styles/report.css";
import React, { useState } from "react";
import * as crimeService from "../Services/CrimeService"

const API_KEY = "KEY_HERE";
const genAI = new GoogleGenerativeAI(API_KEY);

async function analyzeCrime(crimeDescription) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `
  Analyze the following crime description and provide a severity rating from 1 to 10, where 1 is the least severe and 10 is the most severe. Also, give one sentence providing specific safety advice.

  Crime Description: ${crimeDescription}

  Output Format (JSON). Do not return anything except this format. If you cannot judge a description, return 0 for both fields:
  {
    "severityRating": "put rating here",
    "safetyAdvice": "put safety advice here"
  }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    let text = await response.text();
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return JSON.parse(text);
  } catch (error) {
    console.error("Error during AI analysis:", error);
    return { severityRating: 0, safetyAdvice: "No advice available" };
  }
}

function ReportCrime() {
  const [crimeDescription, setCrimeDescription] = useState("");
  const [ratingResult, setRatingResult] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleInputChange = (event) => {
    setCrimeDescription(event.target.value);
  };

  const handleSubmit = async () => {
    if (!crimeDescription || !selectedLocation) {
      alert("Please enter a crime description and select a location.");
      return;
    }

    const result = await analyzeCrime(crimeDescription);

    const reportData = {
      severity: result.severityRating || 0,
      description: crimeDescription,
      location: selectedLocation,
      safetyMeasures: result.safetyAdvice || "No advice available",
    };

    crimeService.createCrime(reportData);
    setRatingResult(reportData);
  };

  return (
    <div className="reportDiv">
      <h1>Report a Local Crime</h1>

      <input
        placeholder="What happened?"
        className="reportInput"
        value={crimeDescription}
        onChange={handleInputChange}
      />

      <AddressAutocomplete onSelect={(place) => setSelectedLocation(place.formatted_address)} />

      <button onClick={handleSubmit} disabled={!crimeDescription || !selectedLocation}>
        Report
      </button>

      {ratingResult && (
        <div className="reportResult">
          <h3>Report Summary</h3>
          <p><strong>Severity:</strong> {ratingResult.severity}</p>
          <p><strong>Description:</strong> {ratingResult.description}</p>
          <p><strong>Location:</strong> {ratingResult.location}</p>
          <p><strong>Safety Measures:</strong> {ratingResult.safetyMeasures}</p>
        </div>
      )}
    </div>
  );
}

export default ReportCrime;
