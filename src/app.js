const express = require('express')
const { Server } = require('socket.io')

const app = express()
//vamos a deployar entonces no hardcodeo el puerto
const PORT= process.env.PORT || 8080
const server = app.listen(PORT, ()=>console.log(`Server up on port ${PORT}`))

//enlace entre servidor express y servidor de soket
const io = new Server(server)

let log =[]

app.use(express.static('./src/public'))

/* io.on('connection', ()=> console.log('New client connecter'))
 */

//broadcast avisa a todos

io.on('connection', socket => {
    //para enviarle notif al que se está conectando
    //la data que reciba del usuario la console logueo
    socket.on('message', data => {
        log.push(data)
        io.emit('log', log)

    })
    //solo le envío historial y notif a los demás clientes de que alguien ingresó cuando el nuevo ponga el nickname
    socket.on('registered', data => {
        socket.broadcast.emit('newUser', data)
        socket.emit('log', log)
    })

})