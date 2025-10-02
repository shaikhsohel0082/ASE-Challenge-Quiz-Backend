# 📚 Online Quiz Application - Backend
This is the backend service for the **Online Quiz Application**, built using Node.js, Express, and MongoDB , Mongoose.  

## ⚙️ Installation & Setup
1. Clone the repository: 
```
 git clone https://github.com/shaikhsohel0082/ASE-Challenge-Quiz-Backend.git

```
Run
```
cd ASE-Challenge-Quiz-Backend
```

2. Install dependencies:
```
npm install
```
3. Create a `.env` file in the root and add:
```
PORT=5000
MONGO_URL=YOUR_MONGODO_URL
```
4. Start the server:
```
node server.js
```

## API Endpoints

1. To Add question in database.
```
POST /question/addQuestion
```
2. To get all questions.
```
GET /question/getAllQuestions
```
3. To get score.
```
POST /question/getScore
```

## 📂 Project Structure
```
backend
│── controller    # Business logic for handling requests
│── models        # Mongoose schemas and models
│── routes        # API routes
│── server.js     # Application entry point
```


