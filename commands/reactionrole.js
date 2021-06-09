const mongoose = require("mongoose");
const reactionRole = require("../models/reactionrole.js");
module.exports = function (message, Discord) {
  if (!message.member.hasPermission("MANAGE_ROLES")) return;
  rr = message.content.slice(7).split(" ");
  if (rr[0] == "list") {
    reactionRole.find().then((result) => {
      const embed = new Discord.MessageEmbed();
      embed.setDescription(`List of Reaction roles:`);
      embed.setColor("B7E9F7");
      for (var i = 0; i < Math.min(25, result.length); i++) {
        embed.addField(`${i + 1}.`, `${result[i].messageid}`, true);
      }
      embed.setFooter(
        `Requested by: ${message.author.username}`,
        message.author.displayAvatarURL({ size: 32 })
      );
      message.channel.send(embed);
    });
  }
  if (rr[0] == "remove") {
    reactionRole
      .deleteMany({ messageid: rr[1] })
      .then((result) => {
        message.channel.send("Deleted Successfully!");
      })
      .catch((err) => {
        console.log(err);
        message.channel.send("Deletion failed!");
      });
  }
  if (rr[0] == "add") {
    messageid = rr[1];
    emoji = [];
    role = [];
    for (var i = 2; i < rr.length; i += 1) {
      if (i % 2 == 0)
        emoji.push(
          rr[i].substr(
            rr[i].lastIndexOf(":") + 1,
            rr[i].length - rr[i].lastIndexOf(":") - 2
          )
        );
      else role.push(rr[i].substr(3, rr[i].length - 4));
    }
    if (emoji.length != role.length) return;
    const newreactionrole = new reactionRole({
      _id: mongoose.Types.ObjectId(),
      messageid: messageid,
      onlyone: 0,
      emoji: emoji,
      role: role,
    });
    newreactionrole
      .save()
      .then((result) => {
        message.channel.send("Reaction role Added!");
      })
      .catch((err) => {
        console.log(err);
        message.channel.send("Failed!");
      });
  }
  if (rr[0] == "addone") {
    messageid = rr[1];
    emoji = [];
    role = [];
    for (var i = 2; i < rr.length; i += 1) {
      if (i % 2 == 0)
        emoji.push(
          rr[i].substr(
            rr[i].lastIndexOf(":") + 1,
            rr[i].length - rr[i].lastIndexOf(":") - 2
          )
        );
      else role.push(rr[i].substr(3, rr[i].length - 4));
    }
    if (emoji.length != role.length) return;
    const newreactionrole = new reactionRole({
      _id: mongoose.Types.ObjectId(),
      messageid: messageid,
      onlyone: 1,
      emoji: emoji,
      role: role,
    });
    newreactionrole
      .save()
      .then((result) => {
        message.channel.send("Reaction role Added!");
      })
      .catch((err) => {
        console.log(err);
        message.channel.send("Failed!");
      });
  }
};
