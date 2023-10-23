//@ts-nocheck
import type { Request, Response } from "express";
import express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { v4 as uuid } from 'uuid';
import { ConnectRoomRequest } from "./models";

const app = express();
const server = http.createServer(app);
const port = 3000;

const io = require('socket.io')(server);

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req: Request, res: Response) => {
  res.redirect(`/${uuid()}`)
})

app.get('/:room', (req: ConnectRoomRequest, res: Response) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId)

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(port, () => {
  console.log(
    `Server running at http://localhost:${port}`
  );
});