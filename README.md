# SMTracker - Social Media Time Tracker

**SMTracker** is a **real-time web application** that empowers users to monitor and manage their time spent on social media platforms. With smart tracking, alerts, and a clean dashboard, it's perfect for anyone looking to build healthier digital habits.

---

## 🚀 Features

- ✅ **Real-time Social Media Tracking** — Monitors time spent on selected websites in the background.
- ✅ **User Notifications** — Sends banner alerts and plays sound when a user exceeds their time limit.
- ✅ **Responsive & Fixed Sidebar UI** — Clean navigation layout that adapts across devices.
- ✅ **Intuitive Dashboard** — Displays records with website names, time duration, and dates.
- ✅ **Manual Deletion** — Easily remove tracking records with role-based access.
- ✅ **Admin Authorization** — Only admin users can delete records securely.
- ✅ **Modern Design** — Built with **Next.js 14**, **React**, and **Tailwind CSS** for a sleek and fast user experience.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL (using `mysql2`)
- **Authentication**: HTTP-only cookies (role-based access)
- **Notifications**: Browser APIs + Custom audio alerts

---

## 📦 Project Structure Highlights

- 🔐 Secure API routes with role-based deletion (`admin` only)
- 🧭 Fixed sidebar for large screens and responsive hamburger menu for mobile
- 🎯 Modular components (`Sidebar`, `HeroSec`, `AppLists`, etc.)

---

## ⚙️ Installation & Setup

### ✅ Prerequisites
Ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### 1️⃣ Clone the repository

git clone https://github.com/your-username/SMTracker.git
cd SMTracker
2️⃣ Install dependencies

npm install
3️⃣ Set up environment variables
Create a .env file at the root with the following:

DATABASE_URL=mysql://user:password@localhost:3306/smtracker_db
NEXT_PUBLIC_API_URL=http://localhost:5000
JWT_SECRET=your_super_secret_key
4️⃣ Start the development servers
Frontend:

npm run dev
Backend:

npm run start:server
🖥️ How to Use
Open the application and grant browser notification permissions.

Navigate the web as usual — SMTracker runs in the background.

Receive alerts when your session exceeds the time limit.

Log into the dashboard to view tracked data or remove records (if you're an admin).

Mobile users can access a responsive layout with a hamburger menu.

🔐 Admin Access
Only users with role admin can delete tracking records.

Role verification is done securely via cookies and server-side middleware.

🧠 Future Enhancements
 Add full user authentication with JWT & sessions

 Weekly/monthly analytics dashboard

 User-configurable time limits

 Dark mode & theme switcher

 Chrome extension integration

📸 Screenshots
Coming soon… ![Screenshot (10)](https://github.com/user-attachments/assets/7f1f2b95-306e-4eda-bf6a-23f670daf709)
![Screenshot (22)](https://github.com/user-attachments/assets/b9b8775c-6337-43fb-93f8-07df09f22653)


🤝 Contributing
Pull requests are welcome! If you find a bug or want to improve the app, feel free to fork and contribute.

📜 License
This project is licensed under the MIT License.

⭐ Like the Project?
If this app helped you or inspired you, consider giving it a ⭐ on GitHub!

