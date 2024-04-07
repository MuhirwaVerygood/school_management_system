const hashPassword = require("../utils/hash");
const client = require("../utils/pgConnection")
async function addUser(req,res){
    const {name, email, password, isAdmin  }= req.body ;
    client.query("SELECT * FROM users where email = $1",[email], async function(err,result){
        const hashedPassword = await hashPassword(password)
        if(err)throw err;
        if(result.rows.length > 0)return res.status(409).json({message:"The user with that email already exists"})
        client.query("INSERT INTO users (name,email, password, isAdmin) VALUES($1,$2,$3,$4)" ,[name, email,hashedPassword, isAdmin],function(err,results){
        if(err)throw err;
        return res.status(200).json({message:"User added successfully"})
    })
    })  
}


async function updateUser(req,res){
    const {name, email, password, isAdmin} = req.body;
    const id = req.params.id;
    const harsh =await hashPassword(password)
    client.query("SELECT * FROM users WHERE email = $1", [email], function(err, results){
        if(err)throw err;
        if(results.rows.length >0 )return res.status(409).json({message:"The user with that email already exists"})
        client.query("UPDATE users SET name = $1 , email = $2 , password = $3, isAdmin=$4 where id= $5", [name, email, harsh, isAdmin, id], function(err, results){
    if(err)throw err;
    return res.status(200).json({message:"User updated successfully"})
    })
    })
}

async function deleteUser(req,res){
    const id = req.params.id;
    client.query("SELECT * FROM users WHERE id= $1", [id], function(err, results){
        if(err)throw err;
        if(results.rows.length ==0)return res.status(404).json({message:"The user with that id does not exist"});
        client.query("DELETE  FROM users where id = $1", [id], function(err, results){
            if(err)throw err;
            return res.status(200).json({message:"User deleted successfully"})
        })
    })
}

async function getAllUsers(req,res){
    client.query("SELECT * FROM users", function(err,results){
        if(err)throw err;
        if(results.rows.length ==0)return res.status(400).json({message:"Empty user list"})
        return res.status(200).send(results.rows)
    })
}


module.exports = {addUser, updateUser, deleteUser ,getAllUsers}