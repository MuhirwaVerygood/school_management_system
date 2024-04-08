const express = require('express');
const { findStudents, addStudent, deleteStudent, updateStudent } = require('../controllers/studentControllers');
const studentRoute = express.Router();
studentRoute.get("/getStudents",findStudents)
studentRoute.post("/addStudent", addStudent)
studentRoute.delete("/deleteStudent/:id", deleteStudent)
studentRoute.put("/updateStudent/:id", updateStudent)
module.exports = studentRoute