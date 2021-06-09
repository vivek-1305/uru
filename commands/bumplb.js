const Discord = require("discord.js");
const bump = require("../models/bump.js");
module.exports = function (message) {
  bump
    .find({})
    .sort({ bumps: "desc" })
    .then(async (result) => {
      const embed = new Discord.MessageEmbed();
      embed.setColor("#FFB6C1");
      embed.setAuthor("Leaderboard");
      embed.setDescription(`**${message.guild.name}**\n`);
      embed.setThumbnail(message.guild.iconURL());
      for (var x = 0; x < Math.min(10, result.length); x++) {
        embed.addField(
          `#${x + 1}   ${result[x].name} `,
          "bumps : `" + `${result[x].bumps}` + "`\n"
        );
      }
      embed.setFooter(
        `Requested by : ${message.author.username}`,
        message.author.displayAvatarURL()
      );
      message.channel.send(embed);
    })
    .catch((err) => {
      console.log(err);
      message.channel.send("oops error encountered!");
    });
};
