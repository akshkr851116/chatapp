const io=require("socket.io")(8000,{
    cors:"http://localhost:5500"
})
const users={}
io.on("connection",(socket)=>{
    socket.on("user-joined",(name)=>{
    users[socket.id] = name
    console.log(users)
    
    socket.broadcast.emit("new-user-joined",name )
})
    socket.on("send",(message)=>{
        socket.broadcast.emit("receive",{message:message,name:users[socket.id]})
    })
    socket.on("disconnect",()=>{
        socket.broadcast.emit("user-left", users[socket.id])
        delete users[socket.id]
    })
    
})

