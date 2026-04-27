💼 Job Tracker
A full-stack web application to track your job applications — with resume upload, AI integration, and analytics!

🚀 Features

🔐 User Authentication (Register / Login)
📋 Job Applications CRUD (Create, Read, Update, Delete)
📄 Resume Upload
🤖 AI Integration (Hugging Face)
📊 Dashboard & Analytics
🔒 JWT-based secure sessions


🛠️ Tech Stack
LayerTechnologyFrontend-React.js ,Backend-Node.js + ExpressDatabasePostgreSQL + Prisma ORMAuthJWT + bcryptjsAIHugging Face APIFile UploadMulter

📁 Project Structure
job-tracker/
├── frontend/          # React app
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   └── package.json
│
├── backend/           # Node.js + Express
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middleware/
│   └── server.js
│
└── .env

⚙️ Setup & Installation
Prerequisites

Node.js (v18+)
PostgreSQL (v14+)
npm


1. Clone the Repository
bashgit clone https://github.com/your-username/job-tracker.git
cd job-tracker

2. Backend Setup
bashcd backend
npm install
Create a .env file inside the backend folder:
envPORT=5000
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@localhost:5432/jobtracker"
JWT_SECRET="any_random_secret_string"
HUGGINGFACE_API_KEY="your_huggingface_token"

⚠️ Replace YOUR_PASSWORD with your PostgreSQL password


3. Database Setup
bash# First create a database named 'jobtracker' in pgAdmin, then run:
npx prisma migrate dev --name init

4. Run the Backend Server
bashnpm run dev
Server will run at: http://localhost:5000

5. Frontend Setup
bashcd ../frontend
npm install
npm start
Frontend will run at: http://localhost:3000

🗺️ Development Roadmap
StepFeatureStatus1Backend Setup✅ Done2Database + Models🔄 In Progress3Auth (Login/Register)⏳ Pending4Frontend UI⏳ Pending5Job Applications CRUD⏳ Pending6Resume Upload⏳ Pending7AI Integration⏳ Pending8Dashboard & Analytics⏳ Pending9Deployment⏳ Pending

📡 API Endpoints
MethodEndpointDescriptionPOST/api/auth/registerRegister a new userPOST/api/auth/loginLogin userGET/api/jobsGet all job applicationsPOST/api/jobsAdd a new applicationPUT/api/jobs/:idUpdate an applicationDELETE/api/jobs/:idDelete an applicationPOST/api/resume/uploadUpload resume

🤝 Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

📝 License
MIT License — free to use! 😊
