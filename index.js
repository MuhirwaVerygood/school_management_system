const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');  
const dotenv = require('dotenv');
const { connection } = require('./utils/connection');
const userRoute = require('./routes/userRoutes');
const teacherRoute = require('./routes/teacherRoutes');
const marksRoute = require('./routes/marksRoutes');
const courseRoute = require('./routes/courseRoutes');
const app= express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())
dotenv.config()
connection()






app.use("/api/v1/users", userRoute )
app.use("/api/v1/teachers", teacherRoute )
app.use("/api/v1/marks", marksRoute )
app.use("/api/v1/courses", courseRoute )



const port = process.env.PORT || 3400
app.listen(port, function(){
    console.log("The server is running on port",port);
})