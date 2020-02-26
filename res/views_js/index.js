var socket = io.connect('http://192.168.0.39:8095')

var jokeText = document.getElementById('joke')
var jokeButton = document.getElementById('new_joke')

socket.emit('joke', '')

jokeButton.onclick = (e) => {
    socket.emit('joke', '')
}

socket.on('joke', (message) => {
    jokeText.innerText = message
})