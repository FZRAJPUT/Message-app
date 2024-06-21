const express = require('express');
const { connect } = require('http2');
const app = express();
var path = require('path');
const http = require('http').createServer(app);



const PORT = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static('public'));

http.listen(PORT, ()=>{
    console.log(`Listening on ${PORT}`);
});

app.get('/',(req,res)=>{
    res.render('index');
});


// socket


const io = require('socket.io')(http);


io.on('connection', (socket)=>{
    console.log('connected');
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);
    })
});