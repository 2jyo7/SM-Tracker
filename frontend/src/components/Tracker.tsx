"use client";
import { useEffect, useState } from "react";
import API from "../utils/api";

const Tracker = () => {
  const [currentWebsite, setCurrentWebsite] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const userId = 1; // Replace with actual user ID (e.g., from auth state)

  // Function to get the active website URL
  const getCurrentWebsite = () => {
    if (typeof window !== "undefined") {
      const website = window.location.hostname; // Gets the website domain
      setCurrentWebsite(website);
    }
  };

  // Function to send tracking data to backend
  const sendTrackingData = async () => {
    if (!currentWebsite) return;

    try {
      await API.post("/addRecord", {
        userId,
        website: currentWebsite,
        duration,
      });

      console.log(`Sent data: ${currentWebsite} - ${duration} mins`);
    } catch (error) {
      console.error("Error sending tracking data:", error);
    }
  };

  useEffect(() => {
    getCurrentWebsite(); // Get website when component mounts

    // Track duration every minute
    const interval = setInterval(() => {
      setDuration((prevDuration) => prevDuration + 1);
    }, 60000); // 1 min interval

    // Send data every 5 minutes
    const sendInterval = setInterval(() => {
      sendTrackingData();
    }, 300000); // 5 min interval

    return () => {
      clearInterval(interval);
      clearInterval(sendInterval);
    };
  }, [currentWebsite]);

  console.log(currentWebsite, duration);

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Tracking Website</h2>
      <p>
        <strong>Website:</strong> {currentWebsite || "Loading..."}
      </p>
      <p>
        <strong>Duration:</strong> {duration} min
      </p>
    </div>
  );
};

export default Tracker;
