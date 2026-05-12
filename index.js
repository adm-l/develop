const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
let validate = (req,res,next) =>{
   const token = req.headers.authorization
   if(!token){
       return res.status(401).send('Unauthorized')
   } 
  try {
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token expired, please login again' });
        } else {
            return res.status(401).json({ error: 'Invalid token' });
        }
    }
}
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP"
  });
});
app.get('/',(req, res) => {
    res.send('Hello World');
});

app.get("/users",(req, res) => {
    res.json({users:[{id:1,name:"John"},{id:2,name:"Jane"}]})
});

app.post('/login',(req, res) => {
    const token = jwt.sign({userId:1},'secretkey',{expiresIn:'20s'})
    res.json({token})
});

app.get("/user",validate,(req,res)=>{
    res.json({message:"User data",user:req.user})
})
// 404 handler (must be AFTER all routes)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});