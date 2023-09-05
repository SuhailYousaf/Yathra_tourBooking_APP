const jwt = require('jsonwebtoken');
const jwtSecret = 'sakdfnsadklfnasdgsdfgsdgfg';
const Admin = require('../modelsss/admin')
const bcrypt = require('bcryptjs');
const bcryptSalt = bcrypt.genSaltSync(10);
const Users = require('../modelsss/user');
const Tour=require('../modelsss/tour')
const User =require('../modelsss/user')



exports.adminRegister = async (req, res) => {
    console.log('heeeeeeeeeeeeeeeeeeeee')
    const { name, email, number, password } = req.body;
    try {
        const AdminDoc = await Admin.create({
            name,
            email,
            number,
            password: bcrypt.hashSync(password, bcryptSalt)

        })
        res.json(AdminDoc);
        console.log('jjjjjjjjjjjjjjjjjj')
    }
    catch (e) {
        res.status(422).json(e)
    }
}


exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const AdminDoc = await Admin.findOne({ email });

        if (AdminDoc) {
            if (password === AdminDoc.password) {
                jwt.sign({ email: AdminDoc.email, id: AdminDoc._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    console.log("done");
                    res.cookie('token', token).json(AdminDoc);
                });
                console.log("ok");
            } else {
                res.status(401).json({ message: 'Invalid credentials' }); // Send a JSON response for invalid password
            }
        } else {
            res.status(404).json({ message: 'Admin not found' }); // Send a JSON response for admin not found
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred' }); // Send a JSON response for general error
    }
};



exports.getUsers = async (req, res) => {
    const userData = await Users.find()
    res.json(userData)
}

exports.getAgents = async (req, res) => {
    const agentData = await Agent.find()
    res.json(agentData)
}

exports.createTour = async (req, res) => {
    const tour = req.body;
    console.log("req.agentId:"); // Log agentId just to make sure it's present
    const newTour = new Tour({
        ...tour,
        Creator: req.adminId,
        createdAt: new Date().toISOString(),
    });

    try {
        console.log("New tour:", newTour); // Log the new tour object
        await newTour.save();
        res.status(201).json(newTour);
    } catch (error) {
        console.error("Error creating tour:", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

exports.getTours=async (req,res)=>{
    try{
        
        const tours=await Tour.find()
        res.status(200).json(tours)
       
    }catch(error){
        res.status(404).json({message:"something went wrong" })
    }
};


exports.getUsers=async (req,res)=>{
    try{
        console.log("users")
        const users=await User.find()
        res.status(200).json(users)
        
    }catch(error){
        res.status(404).json({message:"something went wrong" })
    }
}