const Discord = require("discord.js");
const fetch = require("node-fetch");
module.exports = function (message) {
  const actor = message.author;
  fetch("https://nekos.life/api/v2/img/smug")
    .then(async (res) => {
      const img = await res.json();
      const embed = new Discord.MessageEmbed();
      embed.setDescription(`heh`);
      embed.setImage(img.url);
      embed.setColor("B7E9F7");
      embed.setFooter(
        `Requested by: ${actor.username} | Powered by nekos.life`,
        message.author.displayAvatarURL({ size: 32 })
      );
      message.channel.send(embed);
    })
    .catch((err) => {
      console.error(err); // in case an error occurs
      message.channel.send("T_T error!");
    });
};
