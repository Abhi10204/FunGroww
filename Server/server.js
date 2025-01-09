const express = require("express");
const app = express();
const router = require("./router/auth-router")
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");
const jobRouter = require("./router/job-router");  


//cors handling
const corsOptions ={
    origin:"http://localhost:5173",
    methods: "GET,POST,PUT, DELETE, PATCH, HEAD",
    credentials: true,
} 
app.use(cors(corsOptions));

app.use(express.json()); 
app.use("/api/auth",router);
app.use("/api", jobRouter);
app.use(errorMiddleware);

const PORT = 5000;

connectDB().then(()=>{
app.listen(PORT,()=>{
    console.log(`Server is running at port: ${PORT}`);
}) 
});