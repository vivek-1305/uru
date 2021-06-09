const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
const mongoose = require("mongoose");
const handler = require("./handler/handler");
const token = process.env['token']
const MONGODB = process.env['MONGODB']

mongoose
  .connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => {
    console.log(err);
  });

client.once("ready", () => {
  console.log("uru is ready! <3");
});

client.on("message", handler.commandhandler);

client.on("messageReactionAdd", async (reaction, user) => {
  handler.reactionaddhandler(reaction, user);
});

client.on("messageReactionRemove", async (reaction, user) => {
  handler.reactionremovehandler(reaction, user);
});

client.login(token);
