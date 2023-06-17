const express = require("express");
const { Server } = require("socket.io");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Zigy Live Display Form",
      version: "1.0.0",
      description:
        "API for live form display, assignment for Zigy Applicaiton process.",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./index.js"],
};

const specs = swaggerJsDoc(options);

const app = express();

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const http = require("http");

app.use(cors());

const server = http.createServer(app);
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
/**
 * @swagger
 * components:
 *  schemas:
 *    ROOM_PAYLOAD:
 *      type: string
 *      description: Room ID for the user to join the room
 *      required: true
 *      example: room_1
 *    SEND_MESSAGE_PAYLOAD:
 *      type: object
 *      required:
 *        - room
 *        - message
 *      properties:
 *        room :
 *          type: string
 *          description: Room ID to send the message to
 *        message :
 *          type: string
 *          description: Message text to be sent
 *      example:
 *        room: room_1
 *        message: John Doe
 *
 */
io.on("connection", (socket) => {
  // console.log(`User connected ${socket.id}`);
  /**
   * @swagger
   * tags:
   *  name: Join Room
   *  description: Joining a room.
   */
  /**
   * @swagger
   * /join_room:
   *  get:
   *    summary: join_room event - user joined a room
   *    tags: [Join Room]
   *    responses:
   *      200:
   *        description: User joined the room
   *        content:
   *          application/json:
   *            type: string
   *            description: ok
   *
   *
   *  post:
   *    summary: join_room event - allows user to join a room
   *    tags: [Join Room]
   *    parameters:
   *      $ref: '#/components/schemas/ROOM_PAYLOAD'
   *    responses:
   *      200:
   *        description: User sending request to join the room
   *        content:
   *          application/json:
   *            ref: '#/components/schemas/ROOM_PAYLOAD'
   *
   */
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User ${socket.id} joined room ${data}`);
  });

  /**
   * @swagger
   * tags:
   *  name: Send Message
   *  description: Sending a message to the room.
   */
  /**
   * @swagger
   * /send_message:
   *  get:
   *    summary: send_message event - allows user to get a message from the room
   *    tags: [Send Message]
   *    responses:
   *      200:
   *        description: User received a message
   *        content:
   *          application/json:
   *            type: object
   *            $ref: '#/components/schemas/SEND_MESSAGE_PAYLOAD'
   *
   *
   *  post:
   *    summary: join_room event - allows user to send a message to the room
   *    tags: [Send Message]
   *    parameters:
   *      $ref: '#/components/schemas/SEND_MESSAGE_PAYLOAD'
   *    responses:
   *      200:
   *        description: User sent a message
   *        content:
   *          application/json:
   *            type: object
   *            $ref: '#/components/schemas/SEND_MESSAGE_PAYLOAD'
   *
   *
   */
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

server.listen(PORT, () => {
  console.log(`SERVER IS RUNNING on port:${PORT}`);
});
