const Joi = require('joi');

function validateSchools(req){
const schema = Joi.object({
    schoolName: Joi.string().required(),
    schoolDescription: Joi.string().required(),
    schoolMoto: Joi.string().required(),
    country:Joi.string().required(),
    province: Joi.string().required(),
    district: Joi.string().required(),
    sector: Joi.string().required(),
    cell:Joi.string().required(),
    village: Joi.string().required(),
    schoolEmail: Joi.string().required()
})

const { error, value } = schema.validate(req);
return { error, value };
}


function validateUser(req){
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required(),
        isAdmin: Joi.bool().required()
    })
    const { error, value } = schema.validate(req);
    return { error, value };
}

function validateTeacher(req){
    const schema = Joi.object({
        firstname: Joi.string().required(),
        schoolId:Joi.number().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(50).required(),
        isTeacher: Joi.bool().required(),     
    })
    
    const { error, value } = schema.validate(req);
return { error, value };
}

function validateStudent(req){
    const schema = Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        classId:Joi.number().required(),
        password: Joi.string().min(6).max(50).required(),
        isStudent: Joi.bool().required()
    })
    const { error, value } = schema.validate(req);
    return { error, value };
}


function validateCourses(req){
    const schema = Joi.object({
        name: Joi.string().required(),
        classId: Joi.string().required(),
        teacherId: Joi.number().required()
    })
    const { error, value } = schema.validate(req);
    return { error, value };
}


function validateMarks(req){
    const schema = Joi.object({
        studentId: Joi.number().required(),
        classId: Joi.number().required(),
        courseId: Joi.number().required(),
        marks:Joi.number().required(),
        comment: Joi.number().required()
    })
    const { error, value } = schema.validate(req);
    return { error, value };
}
module.exports = {validateStudent, validateTeacher,validateUser, validateCourses,validateMarks, validateSchools}