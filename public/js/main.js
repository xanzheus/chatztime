const chatForm = document.getElementById('chat-form');

const socket = io();


socket.on('message', message => {
    console.log(message);
});

// Pesan Submit
chatForm.addEventListener('submit', (e) => {

    e.preventDefault();

    // Menampilkan pesan yang diambil dari form id:msg
    const msg = e.target.elements.msg.value;


    // Emit pesan ke server
    socket.emit('chatMessage', msg);

});