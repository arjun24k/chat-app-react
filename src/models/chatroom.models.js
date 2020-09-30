const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
    roomName: { 
        type: String,
        trim:true,
        unique:true
    },
    members:{
        type:[String],
        trim:true
    },
    chats:{
        type:[]
    }
});


const Chatroom = mongoose.model('chatrooms',ChatroomSchema);

module.exports ={
    Chatroom
}