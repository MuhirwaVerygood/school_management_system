const userAuthorization = async(req,res,next)=>{
    if(!req.user.isAdmin)return res.send.status(200).send("Not authorized");
    next();
}

module.exports =userAuthorization