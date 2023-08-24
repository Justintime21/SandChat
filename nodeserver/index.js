// node server that will handle the socket io

const io = require('socket.io')(8000);

// this is for the users that are/join in the appliccation
const users={};


// this means . when the io is on establish a connection with the socket and run this function 
io.on('connection', socket =>{
    // if we get a user-joined event then the user socket id will become its name 
    socket.on('new-user-joined', name1 =>{
        console.log('New-User', name1);
        users[socket.id]=name1;
        // broadcaste.emit will emit(show) all the users except the person who joined
        socket.broadcast.emit('user-joined', name1);
    });
    // when the send event is done then run this function
    socket.io('send',message =>{
        // broadcaste the message to all except the sender 
        socket.broadcast.emit('receive',{message:message, name1:users[socket.id]})
    });

    socket.io('disconnect',message =>{
        // broadcaste that this user has left the chatroom 
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})

