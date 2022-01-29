const WEB_SOCKET_SERVER = 'wss://websocket-echo.glitch.me'
const STATUS = {
    0: 'CONNECTING',
    1: 'OPEN',
    2: 'CLOSING',
    3: 'CLOSED'
}

const socket = new WebSocket(WEB_SOCKET_SERVER)


const statusElement = document.getElementById('status')
statusElement.innerText = STATUS[socket.readyState]

/**
 * ? WEBSOCKET EVENTS
 */
// Fired when a connection with a WebSocket is opened. Also available via the onopen property.
socket.addEventListener("open", (event) => {
    statusElement.innerText = STATUS[event.target.readyState]
})
// Fired when data is received through a WebSocket. Also available via the onmessage property.
socket.addEventListener('message', (event) => {
    const messageElement = document.getElementById('messages')
    messageElement.innerHTML += event.data + '<br/>' 
})

socket.addEventListener('close', (event) => {
    statusElement.innerText = STATUS[event.target.readyState]
})

/**
 * ? FORMS
 */
const chatForm = document.getElementById('chat-form')
const connectionForm = document.getElementById('close-form')

chatForm.addEventListener('submit' , event => {
    event.preventDefault()
    const message = document.getElementById('message')
    socket.send(message.value)
    message.value = ''
})


connectionForm.addEventListener('submit' , event => {
    event.preventDefault()
    // Closes the connection.
    socket.close()
})
