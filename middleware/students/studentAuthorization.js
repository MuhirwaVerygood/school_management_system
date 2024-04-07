const studentAuthorization = async(req,res,next)=>{
    if(!req.user.isStudent)return res.send.status(200).send("Not authorized");
    next();
}

module.exports =studentAuthorization