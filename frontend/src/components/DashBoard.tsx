"use client";
import { useEffect, useState } from "react";
import API from "../utils/api";
import { FaHourglassHalf, FaRegCalendarAlt } from "react-icons/fa";
import { EarthLock } from "lucide-react";

interface TrackingRecord {
  id: number;
  website: string;
  duration: number;
  created_at: string;
}

const DashboardPage = () => {
  const [records, setRecords] = useState<TrackingRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [alerts, setAlerts] = useState<string[]>([]);

  useEffect(() => {
    const fetchRecords = async (): Promise<void> => {
      try {
        const { data } = await API.get<TrackingRecord[]>("/records");
        setRecords(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(`Error fetching records: ${err.message}`);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchRecords();
  }, []);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.warn("Notifications are blocked.");
        }
      });
    }
  }, []);

  useEffect(() => {
    const checkTimeLimit = () => {
      records.forEach((record) => {
        if (record.duration >= 60) {
          showNotification(record.website);
          addAlert(record.website);
        }
      });
    };

    const interval = setInterval(checkTimeLimit, 60000);
    return () => clearInterval(interval);
  }, [records]);

  const showNotification = (website: string) => {
    if (Notification.permission === "granted") {
      new Notification("Time Limit Exceeded", {
        body: `You've been on ${website} for over an hour!`,
        icon: "/alert-icon.png",
      });
    }
    const sound = new Audio("/alertS.mp3");
    sound.play();
  };

  const addAlert = (website: string) => {
    if (!alerts.includes(website)) {
      setAlerts((prevAlerts) => [...prevAlerts, website]);
    }
  };

  const removeAlert = (website: string) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert !== website));
  };

  const handleRemRecs = async (id: number) => {
    try {
      await API.delete(`/records/${id}`);
      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      console.error("Failed to delete record:", error);
    }
  };

  return (
    <section className="py-12 px-6 bg-gray-100 min-h-screen">
      {alerts.length > 0 && (
        <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-4 shadow-md z-50">
          {alerts.map((alert, index) => (
            <div key={index} className="flex justify-between items-center px-6">
              <span>⚠️ You&apos;ve been on {alert} for over an hour!</span>
              <button
                onClick={() => removeAlert(alert)}
                className="ml-4 px-3 py-1 bg-white text-red-600 rounded-md hover:bg-gray-200 transition"
              >
                Dismiss
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        📊 Tracking Data
      </h2>

      {loading && (
        <p className="text-center text-lg font-semibold">Loading...</p>
      )}
      {error && <p className="text-center text-red-500 text-lg">{error}</p>}

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 md:px-8 w-full bg-gradient-col py-8">
        {records.map((record) => (
          <li
            key={record.id}
            className="p-6 bg-white shadow-lg rounded-xl border border-gray-200 flex flex-col items-start space-y-3"
          >
            <p className="text-base font-medium text-gray-700 flex items-center">
              <EarthLock className="text-red-900 mr-2" />
              <span className="font-semibold text-gray-900">Website:</span>{" "}
              {record.website}
            </p>
            <p className="text-base font-medium text-gray-700 flex items-center">
              <FaRegCalendarAlt className="text-red-900 mr-2" />
              <span className="font-semibold text-gray-900">Date:</span>{" "}
              {new Date(record.created_at).toLocaleString()}
            </p>
            <p className="text-base font-medium text-gray-700 flex items-center">
              <FaHourglassHalf className="text-red-900 mr-2" />
              <span className="font-semibold text-gray-900">
                Duration:
              </span>{" "}
              {record.duration} min
            </p>

            <button
              onClick={() => handleRemRecs(record.id)}
              className="mt-4 px-5 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md transition hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default DashboardPage;
