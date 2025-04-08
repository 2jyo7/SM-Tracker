"use client";
import { useEffect, useState, useCallback } from "react";
import { FaHourglassHalf, FaRegCalendarAlt } from "react-icons/fa";
import { EarthLock } from "lucide-react";
import API from "@/utils/api";

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
  const [alerts, setAlerts] = useState<number[]>([]);

  const fetchRecords = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await API.get<TrackingRecord[]>("/records");
      setRecords(data);
    } catch (err) {
      console.error("Error fetching records:", err);
      setError("Failed to fetch records. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const checkTimeLimit = useCallback(() => {
    records.forEach((record) => {
      if (record.duration >= 60 && !alerts.includes(record.id)) {
        showNotification(record);
        setAlerts((prev) => [...prev, record.id]);
      }
    });
  }, [records, alerts]);

  useEffect(() => {
    const interval = setInterval(checkTimeLimit, 60000);
    return () => clearInterval(interval);
  }, [checkTimeLimit]);

  const showNotification = (record: TrackingRecord) => {
    if (
      Notification.permission === "granted" &&
      document.visibilityState === "visible"
    ) {
      new Notification("Time Limit Exceeded", {
        body: `You've been on ${record.website} for over ${record.duration} minutes!`,
        icon: "/alert-icon.png",
      });
    }
    const sound = new Audio("/alertS.mp3");
    sound.play().catch((err) => console.error("Error playing sound:", err));
  };

  const removeAlert = (id: number) => {
    setAlerts((prev) => prev.filter((alert) => alert !== id));
  };

  const handleRemRecs = async (id: number) => {
    try {
      await API.delete(`/records/${id}`);
      fetchRecords();
    } catch (err) {
      console.error("Failed to delete record:", err);
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 md:px-8 bg-gray-100 min-h-screen transition-all flex w-full justify-center">
      <div className="max-w-7xl mx-auto">
        {alerts.length > 0 && (
          <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-sm sm:text-base p-4 shadow-md z-50">
            {alerts.map((alertId) => {
              const record = records.find((r) => r.id === alertId);
              if (!record) return null;
              return (
                <div
                  key={alertId}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-2 sm:px-6"
                >
                  <span>
                    ⚠️ You&apos;ve been on {record.website} for over an hour!
                  </span>
                  <button
                    onClick={() => removeAlert(alertId)}
                    className="px-3 py-1 bg-white text-red-600 rounded-md hover:bg-gray-200 transition"
                  >
                    Dismiss
                  </button>
                </div>
              );
            })}
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
          📊 Tracking Data
        </h2>

        {loading && (
          <p className="text-center text-lg font-semibold">Loading...</p>
        )}
        {error && <p className="text-center text-red-500 text-lg">{error}</p>}

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full py-6">
          {records.map((record) => (
            <li
              key={record.id}
              className="p-5 bg-white shadow-md rounded-xl border border-gray-200 flex flex-col items-start space-y-3"
            >
              <p className="text-sm sm:text-base font-medium text-gray-700 flex items-center">
                <EarthLock className="text-red-900 mr-2" />
                <span className="font-semibold text-gray-900">
                  Website:
                </span>{" "}
                {record.website}
              </p>
              <p className="text-sm sm:text-base font-medium text-gray-700 flex items-center">
                <FaRegCalendarAlt className="text-red-900 mr-2" />
                <span className="font-semibold text-gray-900">Date:</span>{" "}
                {new Date(record.created_at).toLocaleString()}
              </p>
              <p className="text-sm sm:text-base font-medium text-gray-700 flex items-center">
                <FaHourglassHalf className="text-red-900 mr-2" />
                <span className="font-semibold text-gray-900">
                  Duration:
                </span>{" "}
                {record.duration} min
              </p>

              <button
                onClick={() => handleRemRecs(record.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-sm transition hover:bg-red-600 text-sm sm:text-base"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default DashboardPage;
