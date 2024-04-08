const { client } = require("../utils/connection");
const { validateSchools } = require("../utils/validation");
function addSchool(req,res){
    const {error} = validateSchools(req.body);
    if(error) return res.status(400).json({error:error.details[0].message})
    const {schoolName, schoolDescription, schoolMoto, country, province, district, sector, cell,village,schoolEmail} = req.body;
    client.query("SELECT * FROM schools where school_email=$1",[schoolEmail],function(err,results){
        if(err)throw err;
        if(results.rows.length > 0)return res.status(409).json({message:"The school with that email already exists"})
        
        client.query(
            "INSERT INTO schools(school_name, school_motto, school_description, school_email, country,province,district,sector,cell,village) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
            [schoolName,schoolMoto, schoolDescription,schoolEmail,country,province,district,sector,cell,village], 
        function(err,results){
            if(err)throw err;
            return res.status(201).json({message:"School added successfully", results: results.rows[0]})
        })
    })

}

function deleteSchool(req,res){
    const schoolId = req.params.id;
    client.query("SELECT * FROM schools where id=$1",[schoolId],function(err,results){
        if(err)throw err;
        if(results.rows.length ==0)return res.status(404).json({message:"School not found"})
        if(results.rowCount() > 0){
            client.query("DELETE FROM schools WHERE id=$1",[schoolId],function(err,data){
                if(err)throw err;
                return res.status(200).json({message:"Student deleted successfully"})
            })
        }
    })

}

function updateSchool(req,res){
    const schoolId = req.params.id;
    const {error} = validateSchools(req.body);
    if(error) return res.status(400).json({error:error.details[0].message})
    const {schoolName, schoolDescription, schoolMoto, country, province, district, sector, cell,village,schoolEmail} = req.body;
    client.query("SELECT * FROM schools where id = $1 ", [schoolId], function(err,data){
        if(err) throw err;
        if(data.rows.length ==0)return res.status(404).json({message:"School with that id not found"});
        if(data.rows.length > 0){    
        client.query(
            "UPDATE schools set school_name=$1,school_motto=$2,school_description=$3,school_email=$4,country=$5,province=$6,district=$7,sector=$8,cell=$9,village=$10 where id=$11",
            [schoolName,schoolMoto, schoolDescription,schoolEmail,country,province,district,sector,cell,village, schoolId], 
        function(err,results){
            if(err)throw err;
            return res.status(201).json({message:"School updated successfully", results: results.rows[0]})
        })
        }
    })
}

function findSchools(req,res){
client.query("SELECT * FROM schools", function(err,results){
    if(err)throw err;
    return res.status(200).send(results.rows[0]);
} )
}

function getSchoolById(req,res){
    const schoolId= req.params.id;
    client.query("SELECT * FROM schools where id=$1", [schoolId],function(err,schools){
        if(err) throw err;
        if(schools.rows.length ==0)return res.status(404).json({message:"School with that id not found"})
        return res.status(200).send(schools.rows)
    })
}

function getSchoolByEmail(req,res){
    const schoolEmail = req.params.email;
    client.query("SELECT * FROM schools where school_email=$1", [schoolEmail],function(err,schools){
        if(err) throw err;
        if(schools.rows.length ==0)return res.status(404).json({message:"School with that email not found"})
        return res.status(200).send(schools.rows)
    })
}
module.exports = {addSchool, updateSchool, deleteSchool, findSchools, getSchoolById, getSchoolByEmail}