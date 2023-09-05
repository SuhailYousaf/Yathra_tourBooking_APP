const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'sakdfnsadklfnasdgsdfgsdgfg';

const Users=require('../modelsss/user')
const Tour=require('../modelsss/tour')



exports.userRegister = async (req, res) => {
    const { firstname, email, number, password } = req.body;
    console.log("registerrrrvhjvjhvj...."+req.body.email)
    try { 
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ error: 'Agent registration failed', message: 'Email already exists' });
        }

        const UserDoc = await Users.create({
            firstname,
            email,
            number,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        
        const token = jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtSecret, {
            expiresIn: '1h',
        });
        console.log("completed registeration..........")
        res.status(201).json({ UserDoc, token });
        
    } catch (e) {
        res.status(422).json({ error: 'Agent registration failed', message: e.message });
    }
};



exports.userLogin = async (req, res) => {
    console.log("hai111");
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    
    try {
        const UserDoc = await Users.findOne({ email });
        console.log(UserDoc);
        
        if (UserDoc) {
            const passok = bcrypt.compareSync(password, UserDoc.password);
            console.log(passok);
            
            if (passok)
             {
                jwt.sign({ email: UserDoc.email, id: UserDoc._id }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    console.log("done");
                    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', UserDoc,token });
                    console.log(token);
                });
                console.log("ok");
            }

            else {
                res.status(401).json({ message: 'Invalid credentials' }); // Send a JSON response for invalid password
            }
        } else {
            res.status(404).json({ message: 'User does not exist' }); // Send a JSON response for user not found
        }
    } catch (err) {
        res.status(500).json({ message: 'An error occurred' }); // Send a JSON response for general error
    }
};


exports.listTours=async (req,res)=>{
    try{
        const tours=await Tour.find()
        res.status(200).json(tours)
    }catch(error){
        res.status(404).json({message:"something went wrong" })
    }
}

exports.getTour=async (req,res)=>{
    const {id}=req.params;
    try{
        console.log("Single View"+id)
        const tour=await Tour.findById(id)
        console.log("Single View"+tour)
        res.status(200).json(tour)
       
    }catch(error){
        res.status(404).json({message:"something went wrong" })
    }
};
