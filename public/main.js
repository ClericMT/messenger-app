
let socket = io();

let messages = document.getElementById('messages');
let form = document.getElementById('form');
let input = document.getElementById('input');
let username = document.getElementById('username');
let world = document.getElementById('world');
let userName;

const setup = () => {
    localStorage.getItem("userID") ? 
    userName = localStorage.getItem("userID") : userName = parseInt(Math.random()*10000);
}

world.innerHTML = 'World'

form.addEventListener('submit', function(e) {
e.preventDefault();
if (input.value) {
    socket.emit('chat message', input.value);
    input.value = '';
}
});

username.addEventListener('submit', function(e) {
    e.preventDefault();
    if (usrinput.value) {
        socket.emit('new username', usrinput.value);
        usrinput.value = '';
    }
});

socket.on('chat message', function(msg) {
    let item = document.createElement('li');
    item.textContent = `# ${userName}: ${msg}`;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});


socket.on('new username', function(usr) {
    localStorage.setItem("userID", usr);
    userName = localStorage.getItem("userID");
    console.log(userName)
});

setup();








