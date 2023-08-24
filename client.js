// because the server is running on 8000 port

const socket=io('http://localhost:8000');


// this const is for the actions done in form 
const form=document.getElementById('formbhai');
// this si for storing the message written in the txtarea
const messageinput=document.getElementById('inputmes');
// this is for where to put the message in the appendFile.(the container )
const messagecontainer=document.getElementById('messpart');

// now we add append here to add the updates like mr x joioned the chat and also the mssages being sent in the chat room 
const append =(message,position)=>{
    // we create div for append all the updates and message 
    const messageElement =socument.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add('position');
    messagecontainer.append(messageElement);
}

// now we add an event listener for the submit so that when someone sends the message it is listened to 

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    // data is stored in message 
    const message = messageinput.value;
    // so that you can see your message 
    append(`You:${message}`,'right');
    // to notify socket that we have snd this message 
    socket.emit('send',message);
    // after the message has been sent.we need the textarea cleared
    messageinput.value='';
    // the audio will play only if there is a text on the left side 
    if(position=='left'){
    audio.play();}

})


// now we will emit an event 
const name1 = prompt('Enter your name to join the chat');
// we created this event which is used in index.js
socket.emit('new-user-joined', name1)

// this is for when a user joines the chats room 
socket.on('user-joined',data =>{
append(`${name1} joined the chat`,'right');
})

// this handles the receive event and siaplsy the message 
socket.on('receive',data =>{
    append(`${data.name1}:${data.message}`,'left');
    })

// whens ome one disconnects 
    socket.on('left',name1 =>{
        append(`${data.name1} left the chat `,'left');
        })

        // this here is all of it for basic send and recive of messages now after this we add the notification sound 
// -------------------------------------------------------

var audio =new Audio('notification-sound-7062.mp3');
// we append this 