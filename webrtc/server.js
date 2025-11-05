// // import express from "express";
// // import http from "http";
// // import { Server } from "socket.io";
// // import path from "path";
// // import { fileURLToPath } from "url";
// // const __dirname = path.dirname(fileURLToPath(import.meta.url));
// // const app = express();
// // const server = http.createServer(app);
// // const io = new Server(server);
// // app.use(express.static(__dirname + "/public"));
// // io.on("connection", (socket) => {
// //   console.log("Client connected:", socket.id);

// //   socket.on("offer", (offer) => {
// //     socket.broadcast.emit("offer", offer);
// //   });

// //   socket.on("answer", (answer) => {
// //     socket.broadcast.emit("answer", answer);
// //   });

// //   socket.on("candidate", (candidate) => {
// //     socket.broadcast.emit("candidate", candidate);
// //   });

// //   socket.on("disconnect", () => {
// //     console.log("Client disconnected:", socket.id);
// //   });
// // });

// // const PORT = 3000;
// // server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// import express from "express";
// import http from "http";
// import { Server } from "socket.io";
// import path from "path";
// import { fileURLToPath } from "url";

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   },
//   pingTimeout: 60000,
//   pingInterval: 25000
// });
// app.use(express.static(__dirname + "/public"));
// let agent = null;
// let admins = new Set();
// io.on("connection", (socket) => {
//   console.log("Client connected:", socket.id);
//   socket.on("register-agent", () => {
//     console.log("Agent registered:", socket.id);
//     agent = socket.id;
//     socket.join("agent");
//     socket.to("admins").emit("agent-online");
//   });
//   socket.on("register-admin", () => {
//     console.log("Admin registered:", socket.id);
//     admins.add(socket.id);
//     socket.join("admins");
//     if (agent) {
//       socket.emit("agent-online");
//       io.to(agent).emit("admin-joined", socket.id);
//     }
//   });
//   socket.on("offer", (data) => {
//     console.log("Offer received from agent, forwarding to admin:", data.to);
//     io.to(data.to).emit("offer", {
//       offer: data.offer,
//       from: socket.id
//     });
//   });
//   socket.on("answer", (data) => {
//     console.log("Answer received from admin, forwarding to agent");
//     io.to(agent).emit("answer", {
//       answer: data.answer,
//       from: socket.id
//     });
//   });
//   socket.on("candidate", (data) => {
//     if (data.to) {
//       io.to(data.to).emit("candidate", {
//         candidate: data.candidate,
//         from: socket.id
//       });
//     } else {
//       socket.broadcast.emit("candidate", {
//         candidate: data.candidate,
//         from: socket.id
//       });
//     }
//   });
//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//     if (socket.id === agent) {
//       agent = null;
//       io.to("admins").emit("agent-offline");
//     }
//     if (admins.has(socket.id)) {
//       admins.delete(socket.id);
//     }
//   });
// });

// const PORT = 3000;
// server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
  pingTimeout: 60000,
  pingInterval: 25000
});

app.use(express.static(__dirname + "/public"));

// Track connected clients
let agent = null;
let admins = new Set();

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  // Register as agent
  socket.on("register-agent", () => {
    console.log("Agent registered:", socket.id);
    agent = socket.id;
    socket.join("agent");
    
    // Notify all admins that agent is online
    socket.to("admins").emit("agent-online");
  });

  // Register as admin
  socket.on("register-admin", () => {
    console.log("Admin registered:", socket.id);
    admins.add(socket.id);
    socket.join("admins");
    
    // If agent is already connected, notify this admin
    if (agent) {
      socket.emit("agent-online");
      // Request agent to send offer
      io.to(agent).emit("admin-joined", socket.id);
    }
  });

  socket.on("offer", (data) => {
    console.log("Offer received from agent, forwarding to admin:", data.to);
    io.to(data.to).emit("offer", {
      offer: data.offer,
      from: socket.id
    });
  });

  socket.on("answer", (data) => {
    console.log("Answer received from admin, forwarding to agent");
    io.to(agent).emit("answer", {
      answer: data.answer,
      from: socket.id
    });
  });

  socket.on("candidate", (data) => {
    if (data.to) {
      io.to(data.to).emit("candidate", {
        candidate: data.candidate,
        from: socket.id
      });
    } else {
      // Broadcast to all except sender (fallback)
      socket.broadcast.emit("candidate", {
        candidate: data.candidate,
        from: socket.id
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
    
    if (socket.id === agent) {
      agent = null;
      // Notify all admins that agent is offline
      io.to("admins").emit("agent-offline");
    }
    
    if (admins.has(socket.id)) {
      admins.delete(socket.id);
    }
  });
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));