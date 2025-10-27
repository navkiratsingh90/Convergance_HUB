🌐 DevNautics


🔥 Project Overview

DevConnect is an advanced MERN stack web application designed to connect developers, facilitate collaborations, and enhance community-driven project development. The platform enables users to:

🤝 Connect and interact with other developers.

💬 Join and participate in discussions.

📅 Receive invitations for events and hackathons.

🚀 Collaborate on advanced projects.

🏆 Engage in daily coding faceoffs using Judge0 API.

🔄 Enjoy real-time chatting with Socket.IO.

☁️ Store files and media securely on Cloudinary.

📧 Receive notifications and verification emails via Nodemailer.

⚡ Features

User Profiles – Personalized user pages with bio, skills, and contributions.

Discussion Groups – Create, join, or leave discussion communities.

Event Invitations – Participate in events and challenges.

Collaborative Projects – Team up for building projects with peers.

Daily Faceoffs – Solve coding challenges powered by Judge0 API.

Endless Chatting – Real-time messaging with Socket.IO.

Cloud Storage – Upload and manage media through Cloudinary.

Email Notifications – Receive alerts, invitations, and verification emails.

🛠️ Tech Stack
Frontend	Backend	Database	Other Tools
React.js ⚛️	Node.js 🟢	MongoDB 🍃	Socket.IO 💬
Tailwind CSS 🎨	Express.js 🚀		Cloudinary ☁️
			Nodemailer ✉️
			Judge0 API 🏆
🚀 Getting Started

Clone the repository

git clone https://github.com/navkiratsingh90/devconnect.git
cd devconnect


Install dependencies

npm install


Setup environment variables
Create a .env file in the root:

MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your Secret Key>
CLOUDINARY_CLOUD_NAME=<Your Cloud Name>
CLOUDINARY_API_KEY=<Your API Key>
CLOUDINARY_API_SECRET=<Your API Secret>
EMAIL_USER=<Your Email>
EMAIL_PASS=<Your Email Password>


Run the application

npm run dev
