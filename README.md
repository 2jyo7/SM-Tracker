# SMTracker - Social Media Time Tracker

SMTracker is a **real-time web application** that helps users monitor their social media usage and get notified when they exceed predefined time limits. The app tracks browser activity, displays usage statistics, and provides alerts when a user spends too much time on social media websites.

---

## 🚀 Features

✅ **Real-time Social Media Tracking** - Automatically logs time spent on tracked websites.
✅ **User Notifications** - Alerts users when they exceed the time limit with in-app banners & sound notifications.
✅ **Intuitive Dashboard** - Displays tracked records, including website, duration, and date.
✅ **Data Persistence** - Stores tracking history using a MySQL database.
✅ **Easy Deletion** - Users can remove tracking records manually.
✅ **Modern UI** - Built with Next.js and Tailwind CSS for a sleek design.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL (`mysql2` package)
- **Notifications**: Browser Notifications & Custom Audio Alerts

---

## 🔧 Installation & Setup

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

### 1️⃣ Clone the repository:
```sh
 git clone https://github.com/your-username/SMTracker.git
 cd SMTracker
```

### 2️⃣ Install dependencies:
```sh
 npm install
```

### 3️⃣ Set up environment variables:
Create a `.env` file and add the following:
```env
DATABASE_URL=mysql://user:password@localhost:3306/smtracker_db
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 4️⃣ Start the development server:
```sh
 npm run dev
```

### 5️⃣ Start the backend server:
```sh
 npm run start:server
```

---

## 🖥️ Usage

1. **Open the app** and allow notification permissions.
2. **Track usage** automatically when browsing social media.
3. **Receive alerts** via banners and sound when exceeding the 1-hour limit.
4. **View and manage records** from the dashboard.

---

## 📸 Screenshots

Coming soon...

---

## 📌 Future Enhancements

- [ ] Add user authentication (Login/Signup)
- [ ] Provide analytics on weekly/monthly usage trends
- [ ] Implement dark mode support

---

## 🤝 Contributing

Feel free to fork this project and submit a pull request with improvements!

---

## 📜 License

This project is licensed under the MIT License.

---

## ⭐ Show Some Love
If you like this project, give it a ⭐ on GitHub!

