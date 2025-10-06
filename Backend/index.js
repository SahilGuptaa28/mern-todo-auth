import e from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from 'cors';
import { ObjectId } from "mongodb";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";
const app = e();


app.use(e.json());
app.use(cors({
   origin:'http://localhost:5174',
   credentials: true
}));
app.use(cookieParser());
//API FOR CREATE A TODO TASK
app.post('/add-task',verifyJWTToken, async (req, res) => {
   const db = await connection();
   const collection = await db.collection(collectionName);
   const result = await collection.insertOne(req.body);
   if (result) {
      res.send({ message: "New Task Added", success: true, result })
   } else {
      res.send({ message: "Task Not Added", success: false, result })
   }

})
// API FOR LIST ALL THE TODO TASKS
app.get('/tasks', verifyJWTToken,async (req, res) => {
   const db = await connection();
   const collection = await db.collection(collectionName);
   const result = await collection.find({}).toArray();
   if (result) {
      res.send({ message: "Task list fetched", success: true, result })
   } else {
      res.send({ message: "Error try again", success: false, result })
   }
})

function verifyJWTToken(req,res,next){
const token  = req.cookies['token'];
jwt.verify(token,'Google',(error,decoded)=>{
   if(error){
     return res.send({
      msg:"Invalid token",
      success:false
     })
   }
   next()
  
})

}

//API FOR SHOW THE CURRENT CONTENT IN THE UPDATED FORM
app.get('/task/:id', verifyJWTToken, async (req, res) => {
   const db = await connection();
   const collection = await db.collection(collectionName);
   const id = req.params.id
   const result = await collection.findOne({ _id: new ObjectId(id) });
   if (result) {
      res.send({ message: "Task fetched", success: true, result })
   } else {
      res.send({ message: "Error try again", success: false, result })
   }
})
//API FOR UPDATE A TODO TASK
app.put('/update-task', verifyJWTToken, async (req, res) => {
   const db = await connection();
   const collection = await db.collection(collectionName);
   const { _id, ...fields } = req.body;
   const update = { $set: fields }
   const result = await collection.updateOne({ _id: new ObjectId(_id) }, update)
   if (result) {
      res.send({ message: "Task updated", success: true, result })
   } else {
      res.send({ message: "Error try again", success: false, result })
   }

})

//API FOR DELETE A TODO TASK
app.delete('/delete/:id',verifyJWTToken, async (req, res) => {
   const db = await connection();
   const id = req.params.id;
   const collection = await db.collection(collectionName);
   const result = await collection.deleteOne({ _id: new ObjectId(id) });
   if (result) {
      res.send({ message: "Task deleted", success: true, result })
   } else {
      res.send({ message: "Error try again", success: false, result })
   }

})

app.delete('/delete-multiple',verifyJWTToken, async (req, res) => {
   const db = await connection();
   const ids = req.body;
   const deletTasksIds = ids.map((item) => new ObjectId(item))
   const collection = await db.collection(collectionName);
   const result = await collection.deleteMany({ _id: { $in: deletTasksIds } });
   if (result) {
      res.send({ message: "Tasks deleted", success: true })
   } else {
      res.send({ message: "Error try again", success: false })
   }

})
app.post('/signup', async (req, res) => {
   const userData = req.body;
   if (userData.email && userData.password) {
      const db = await connection();
      const collection = db.collection("users");
      const result = await collection.insertOne(userData);
      if (result) {
         jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
            res.send({
               success: true,
               message: "Sign Up done",
               token
            })
         })
      } else {
         res.send({
            success: false,
            message: "Sign Up not done",
         })


      }

   }
})
app.post('/login', async (req, res) => {
   const userData = req.body;
   if (userData.email && userData.password) {
      const db = await connection();
      const collection = db.collection("users");
      const result = await collection.findOne({ email: userData.email, password: userData.password });
      if (result) {
         jwt.sign(userData, 'Google', { expiresIn: '5d' }, (error, token) => {
            res.send({
               success: true,
               message: "Login done",
               token
            })
         })
      } else {
         res.send({
            success: false,
            message: "Login not done",

         })



      }

   }


})
app.listen(3200);