var prefix = process.env['prefix']
prefix = prefix.concat(" ");
const command = require("../commands/command");
const Discord = require("discord.js");
module.exports = function (message) {
  if (message.author.id == 302050872383242240) {
    command.bump(message);
  }
  if (!message.content.startsWith(prefix)) {
    return;
  } else {
    const arg = message.content.slice(prefix.length).split(/ +/);
    const action = arg.shift().toLowerCase();

    if (action === "hug") {
      command.hug(message);
    } else if (action === "pat") {
      command.pat(message);
    } else if (action === "cuddle") {
      command.cuddle(message);
    } else if (action === "poke") {
      command.poke(message);
    } else if (action === "slap") {
      command.slap(message);
    } else if (action === "kiss") {
      command.kiss(message);
    } else if (action === "smug") {
      command.smug(message);
    } else if (action === "tickle") {
      command.tickle(message);
    } else if (action === "meow") {
      command.meow(message);
    } else if (action === "rr") {
      command.reactionrole(message, Discord);
    } else if (action === "anime") {
      command.anime(message, action, prefix);
    } else if (action === "char") {
      command.char(message, action, prefix);
    } else if (action === "episodes") {
      command.episodes(message, action, prefix);
    } else if (action === "help") {
      command.help(message, prefix);
    } else if (action === "manga") {
      command.manga(message, action, prefix);
    } else if (action === "schedule") {
      command.schedule(message, action, prefix);
    } else if (action === "season") {
      command.season(message, action, prefix);
    } else if (action === "top") {
      command.top(message, action, prefix);
    } else if (action === "user") {
      command.user(message, action, prefix);
    } else if (action === "bumpoff") {
      command.bumpoff(message);
    } else if (action === "bumpon") {
      command.bumpon(message);
    } else if (action === "bumplb") {
      command.bumplb(message);
    } 
  }
};
