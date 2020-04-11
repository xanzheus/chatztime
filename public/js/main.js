const chatForm = document.getElementById('chat-form');
const chattMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Mengambil username dari url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();

// join chatroom
socket.emit('joinRoom', {username, room})

// mendapatkan user dan room
socket.on('roomUsers', ({room, users}) =>{
    outputRoomName(room);
    outputUsers(users);
})

// Pesan Dari Server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down
    chattMessages.scrollTop = chattMessages.scrollHeight;
});

// Pesan Submit
chatForm.addEventListener('submit', (e) => {

    e.preventDefault();

    // Menampilkan pesan yang diambil dari form id:msg
    const msg = e.target.elements.msg.value;


    // Emit pesan ke server
    socket.emit('chatMessage', msg);

    // Menghapus input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;


});

// Output pesan ke DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
    <p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
       ${message.text}
    </p>
    `;
    document.querySelector('.chat-messages').appendChild(div);
}

// menambahkan nama room
function outputRoomName(room){
    roomName.innerText = room;
}

// Menambahkan users
function outputUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}