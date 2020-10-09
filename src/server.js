const express = require('express');
const socketio = require('socket.io');
const path = require('path')
const http = require('http');
const { User } = require('./models/user.models');
const { initDb } = require('./db');
const cors = require('cors');
const { openSocket } = require('./socket');
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
const server = http.createServer(app);
const io = socketio(server);
const jwt = require("jsonwebtoken");


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../chatroom-client/build')));
  
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, '../chatroom-client/build', 'index.html'));
    });
  }


app.use(cors());
initDb();


server.listen(port,()=>{
    console.log('Server up n runnin..')
});
openSocket(io);


/* app.get('/',auth,async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}); */

app.post('/chatroomSession',async (req,res)=>{
    try {
        const token = req.headers.authorization.replace('Bearer ','');
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});
        if(!user)
            throw new Error('User not found');
        console.log(user);
        res.status(200).send({user,token});
    } catch (error) {
        res.status(400).send(error);
    }
});

app.post('/joinroom',async (req,res)=>{
    console.log(req.body);
    var user;
    const existingUser = await User.findOne(req.body);
    if(existingUser)
        user = existingUser;
    else
        user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(200).send({user,token});
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/deleteUser',async (req,res)=>{
    try {
        const user = await User.findOne(req.body);
    if(user){
        user.deleteOne(req.body);
    }
    res.status(200).send({
        message:req.body.username+"Left room"
    });
    } catch (error) {
        res.status(400).send(error);
    }
})


