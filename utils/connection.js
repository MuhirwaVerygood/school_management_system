const {Client}  = require("pg")
require("dotenv").config()
const client = new Client({
    user:process.env.USER,
    host:process.env.HOST,
    database:process.env.DATABASE,
    password: process.env.PASSWORD,
    port:process.env.DATABASE_PORT
})

function connection(){
    client.connect().then(function(){
        console.log("Connected to the database successfully");
    }).catch(function(error){
        console.log("Faced an error:  ", error);
    })
}

module.exports = {client, connection}