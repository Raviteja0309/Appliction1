const express = require('express');
const cors = require('cors')
const app1 = express();
const app2 = express();
const { MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017/';
const port1 = 9000;
const port2 = 9999;

//Async function creation to connect with database
async function connectToDatabase () {
    const client = new MongoClient(url);

    try{
        await client.connect();

        const db = client.db('Login-Signup');
        return db;
    }
    catch(error){
        console.log(error);
    }
}

//Posting Data to Mongodb Database --> Start
app1.use(express.json());
app1.use(express.urlencoded({extended:true}));

app1.use(cors());

app1.get('/', async(req,res) => {
    
})

app1.post('/',async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const db = await connectToDatabase();
    const collection = db.collection('SignupData');
    const collection1 = db.collection('LoginData');
    try{
        const enteredEmail = await collection.findOne({email});
        const enteredPassword = await collection.findOne({password});
        if(!enteredEmail){
            res.status(401).json({message : 'User doesnot exist', emailExists : false, passwordCorrect : false});
        }
        else if(!enteredPassword){
            res.status(401).json({message:'Incorrect password', emailExists:true, passwordCorrect:false});
        }
        else{
            const loginTime = new Date();
            await collection1.insertOne({email , password, time : loginTime});
            res.status(200).json({message:'Login Successfull', emailExists:true, passwordCorrect:true});
        }
    }
    catch(error){
        console.log(error);
    }
});

app1.post('/signup',async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const db = await connectToDatabase();
    const collection = db.collection('SignupData');
    try{
        const existingEmail = await collection.findOne({email});
        if(existingEmail){
            res.status(404).send('Email already exist');
        }else{
            await collection.insertOne({email, password});
            res.send('<h1>Data saved to signup database</h1>');
        }
    }
    catch(error){
        console.log(error);
    }
});
//Posting Data to Mongodb Database --> End
app1.delete('/deletemyrecord', async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;

    const db = await connectToDatabase();
    const collection = db.collection('SignupData');
    try{
        const deleteEmail = await collection.findOne({email});
        const deletepassword = await collection.findOne({password})
        if(!deleteEmail){
            res.status(401).json({message:'The record you want to delete doesnot exist', emailExists:false, passwordCorrect:true})
        }
        else if(!deletepassword){
            res.status(401).json({message:'Incorrect Password, Record cannot be delete', emailExists:true, passwordCorrect:false})
        }
        else{
            await collection.deleteOne({email, password});
            res.status(200).json({message:'Record deleted successfully', emailExists:true, passwordCorrect:true})
        }
    }
    catch(error){
        console.log(error);
    }
});

app1.put('/resetpassword', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const db = await connectToDatabase();
    const collection = db.collection('SignupData');

    try {
        const enteredEmail = await collection.findOne({ email });
        
        if (!enteredEmail) {
            res.status(401).json({ message: 'User does not exist', emailExists: false });
        } else {
            const filter = { email: enteredEmail.email };
            const update = { $set: { password: password } };
            const result = await collection.updateOne(filter, update);
            if (result.modifiedCount === 1) {
                res.status(200).json({ message: 'Password Updated Successfully', emailExists: true });
            } else {
                res.status(401).json({ message: 'Password update failed', emailExists: true });
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


//Database Table Creation --> Start
app2.get('/', (req, res) => {
    res.send('/LoginData for Login Data Table /n /SignupData for Signup Data Table');
})

app2.get('/LoginData', async(req, res) => {
    try{
        const db = await connectToDatabase();

    let loginCollection = db.collection('LoginData');
    let loginResult = await loginCollection.find({}).toArray();

    let logindata = '<h1>LoginData</h1><table border="1" cellspacing="0" cellpadding="5"><tr><th style="background-color: yellow; font-size:24px">Email</th><th style="background-color: yellow; font-size:24px">Password</th><th style="background-color: yellow; font-size:24px">Time</th></tr>';
    loginResult.forEach((record) => {
        logindata += `<tr><td style="background-color: lightblue;">${record.email}</td><td>${record.password}</td><td>${record.time}</td></tr>`;
    });
    logindata += '</table>';
    
    res.send(logindata);
  } catch (error) {
    console.log(error);
  }   
});

app2.get('/SignupData', async(req,res) => {
    try{
        const db = await connectToDatabase();

    let signupCollection = db.collection('SignupData');
    let signupResult = await signupCollection.find({}).toArray();

    let signupdata = '<h1>SignupData</h1><table border="1" cellspacing="0" cellpadding="5"><tr><th style="background-color: yellow; font-size:24px">Id</th><th style="background-color: yellow; font-size:24px">Email</th><th style="background-color: yellow; font-size:24px">Password</th></tr>';
    signupResult.forEach((record) => {
        signupdata += `<tr><td>${record._id}</td><td style="background-color: lightblue;">${record.email}</td><td>${record.password}</td></tr>`;
    });
    signupdata += '</table>';

    res.send(signupdata);
    }catch(error){
        console.log(error);
    }
});
//Database Table Creation --> End
  

//Editing the table values --> Start

//Database Server
app2.listen(port2, () => {
  console.log(`Database Server is running at port ${port2}`);
});

//Mongodb Server
app1.listen(port1, () => {
  console.log(`Server is running at port ${port1}`);

});


