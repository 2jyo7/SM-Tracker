let activeTab = "";
let startTime = Date.now();
let userId = null;

getUserId();

// Example of getting user info
async function getUserId() {
  try {
    const response = await fetch("http://localhost:4200/api/me", {
      credentials: "include", // 👈 Important: sends the cookie!
    });

    const data = await response.json();
    userId = data.id;
    console.log("Logged-in User ID:", userId);
  } catch (err) {
    console.error("Failed to get user ID:", err);
  }
}

// Track tab activation
chrome.tabs.onActivated.addListener(async (activeInfo) => {
  try {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    trackWebsite(tab.url);
  } catch (err) {
    console.error("Error getting active tab:", err);
  }
});

// Track tab updates (when user loads a new page)
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    trackWebsite(tab.url);
  }
});

// Detect when the browser loses focus (when the user switches apps or minimizes)
chrome.windows.onFocusChanged.addListener(() => {
  if (activeTab) {
    trackWebsite(activeTab);
  }
});

// Function to track website usage
async function trackWebsite(url) {
  if (!url || !url.startsWith("http")) return; // Ignore invalid URLs

  const newTab = new URL(url).hostname;
  const endTime = Date.now();
  const duration = Math.floor((endTime - startTime) / 60000); // Convert to minutes

  // ✅ Only send data if the tab actually changed & duration is valid
  if (activeTab && activeTab !== newTab && duration > 0) {
    console.log(`Tracking: ${activeTab} - ${duration} min`);

    try {
      const response = await fetch("http://127.0.0.1:4200/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId, // ✅ Replace this function with actual user retrieval logic
          website: activeTab,
          duration: duration,
        }),
      });

      const data = await response.json();
      console.log("✅ Data sent successfully:", data);
    } catch (err) {
      console.error("❌ Failed to send data:", err);
    }
  }

  // Update the active tab and reset the timer
  activeTab = newTab;
  startTime = Date.now();
}

// Dummy function to get userId (Replace with actual user authentication logic)
// function getUserId() {
//   return 13; // Replace with actual user ID retrieval method
// }
