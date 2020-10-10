const { Chatroom } = require("./models/chatroom.models");
const { User } = require("./models/user.models");

const openSocket =async  (io) =>{
    io.on('connection',(socket)=>{
        //socket.disconnect();
        console.log('Connection successful');
    
        socket.on('join',({user},callback)=>{
            joinRoom(socket,io,user,callback)
        });
       
    });
};

const joinRoom = async (socket,io,user,callback) =>{
    var chatroom = user.chatroom;
    var username = user.username;
    try {
        const userList = await getUsersInChatroom(username,chatroom);
        const chatroomDoc = await Chatroom.find({'roomName':chatroom});
        console.log(chatroomDoc);        
        if(userList.length>1 && chatroomDoc[0].chats.length>0){
            socket.emit('chats',{'chats':chatroomDoc[0].chats});
        }
        socket.join(chatroom);
        socket.emit('welcomeMessage',{'message':`Welcome to ${chatroom}!`,'sender':false});
        socket.broadcast.to(chatroom).emit('newUserJoined',{"message":`${username} user has joined the chatroom`,'sender':false});
        io.to(chatroom).emit('roomData',{
            room:chatroom,
            users:userList
        });

        socket.on('sendMessage', (message,callback)=>{
            io.to(chatroom).emit('message',message);
            chatroomDoc[0].chats.push(message);
            chatroomDoc[0].save();
            callback();
        });
    
        socket.on('locationHandle',(message,callback)=>{
            io.emit('locationHandleReceive',message);
            chatroomDoc[0].chats.push(message);
            chatroomDoc[0].save();
            callback();
        });
    
        socket.on('disconnect', () => {
            console.log('gone');
            
                io.to(chatroom).emit('someoneLeft',{'message':`${username} has left the chatroom!`,'sender':false});
                socket.disconnect();  
            
        });

        callback();
    } catch (error) {
        callback(error);   
    }
}

const getUsersInChatroom = async (username,chatroom) => {
    const users = await User.find({chatroom});
    console.log(users);
    const userList = users.map(user =>user.username);
    if(users.length===1){
        try {
            const chatroomDoc = new Chatroom({
                'roomName':chatroom
            });
            await chatroomDoc.save();
            return [username];
        } catch (error) {
            return userList
        }
    }
    return userList;
}

const getChats = async (roomname) =>{
    const chatroom = await Chatroom.find({roomname});
    return chatroom.chats;
}

module.exports = {
    openSocket
}