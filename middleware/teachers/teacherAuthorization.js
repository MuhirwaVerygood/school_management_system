const teacherAuthorization = async(req,res,next)=>{
    if(!req.user.isTeacher)return res.send.status(200).send("Not authorized");
    next();
}

module.exports =teacherAuthorization