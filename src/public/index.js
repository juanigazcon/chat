const socket = io()
console.log('Hola Mundo')
//toma el valor de lo ingresado en el formulario
let user

Swal.fire({
    title:"Log In",
    input: "text",
    text: "Enter your nick:",
    allowOutsideClick: false,
    inputValidator: value => !value && "You need to enter a nickname"
}).then(response=> {
    user = response.value
    socket.emit('registered', user)   
})


let chatBox = document.getElementById('chatBox')
//envío mensaje con dos valores, el usuario y el mensaje que está en el input
//ahora lo recibo en el servidor
chatBox.addEventListener('keyup', e => {
    if(e.key ==="Enter") {
        if(chatBox.value.trim().length>0){
        socket.emit('message', {user, message: chatBox.value.trim()})
        chatBox.value = ""
        }
    }
})


//cuando recibo sobre etiquetado como newUser 
//del server, mando alerta
socket.on('newUser', (data)=> {
    Swal.fire({
        icon: "success",
        text: `New user ${data} connected`,
        toast: true,
        position: "top-right"
    })
})

socket.on('log', data =>{
    let log = document.getElementById('log')
    let messages = ""
    //con strigify porque es un objeto
    data.forEach(message => messages += `${message.user} dice: ${message.message} <br> `)
    log.innerHTML = messages    
}

)