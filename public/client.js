const socket = io();

let namee;
let textArea = document.getElementById('txt_area');
let messageArea = document.getElementsByClassName('message_area')[0];

do {
    namee = prompt("Please Enter your name");
} while (!namee);

textArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
        sendMessage(e.target.value.trim());
        // textarea.value = '';
        e.target.value = '';
    }
});

function sendMessage(message) {
    let msg = {
        user: namee,
        message: message.trim()
    };

    appendMessage(msg, 'outgoing');

    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    mainDiv.classList.add(type, 'message');

    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `;

    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv);

    messageArea.scrollTop = messageArea.scrollHeight;
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
});


// recieve

// const socket = io()
// let namee;
// let textarea = document.querySelector('#textarea')
// let messageArea = document.querySelector('.message__area')
// do {
//     namee = prompt('Please enter your name: ')
// } while(!namee)

// textarea.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//         sendMessage(e.target.value)
//     }
// })

// function sendMessage(message) {
//     let msg = {
//         user: namee,
//         message: message.trim()
//     }
//     // Append 
//     appendMessage(msg, 'outgoing')
//     textarea.value = ''
//     scrollToBottom()

//     // Send to server 
//     socket.emit('message', msg)

// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }

// // Recieve messages 
// socket.on('message', (msg) => {
//     appendMessage(msg, 'incoming')
//     scrollToBottom()
// })

// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }
