const express = require('express');
const { addSchool, findSchools , deleteSchool, updateSchool, getSchoolByEmail, getSchoolById} = require('../controllers/schoolControllers');
const schoolRoute = express.Router();
schoolRoute.get("/getSchools",findSchools)
schoolRoute.post("/addSchool", addSchool)
schoolRoute.delete("/deleteSchool/:id", deleteSchool)
schoolRoute.put("/updateSchool/:id", updateSchool)
schoolRoute.get("/getSchoolByEmail/:email",getSchoolByEmail)
schoolRoute.get("/getSchoolById/:id",getSchoolById)
module.exports = schoolRoute;
