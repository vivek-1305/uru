const jikanjs = require("jikanjs");
const Discord = require("discord.js");
module.exports = function (message, action, prefix) {
  var subType = message.content.slice(prefix.length + action.length + 1);
  subType = subType.toLowerCase();
  if (
    subType == "anime" ||
    subType == "manga" ||
    subType == "characters" ||
    subType == "people"
  ) {
    jikanjs
      .loadTop(subType)
      .then((response) => {
        const embed = new Discord.MessageEmbed();
        embed.setColor("#FFB6C1");
        embed.setAuthor(`Top ${subType} list :`, message.guild.iconURL());
        embed.setThumbnail(
          `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
        );
        embed.setImage(`${response.top[0].image_url}`);
        if (subType === "anime") {
          for (var i = 0; i < 10; i++) {
            embed.addField(
              `${response.top[i].rank}. ${response.top[i].title}`,
              `**Score : **${response.top[i].score} **Episodes : **${response.top[i].episodes}\n`
            );
          }
        }
        if (subType === "manga") {
          for (var i = 0; i < 10; i++) {
            embed.addField(
              `${response.top[i].rank}. ${response.top[i].title}`,
              `**Score : **${response.top[i].score} **Volumes : **${response.top[i].volumes}\n`
            );
          }
        }
        if (subType === "people") {
          for (var i = 0; i < 10; i++) {
            embed.addField(
              `${response.top[i].rank}. ${response.top[i].title}`,
              `**Favorites : **${response.top[i].favorites}\n`
            );
          }
        }
        if (subType === "characters") {
          for (var i = 0; i < 10; i++) {
            embed.addField(
              `${response.top[i].rank}. ${response.top[i].title}`,
              `**Score : **${response.top[i].animeography[0].name} **Favorites : **${response.top[i].favorites}\n`
            );
          }
        }
        embed.setFooter(
          `Requested by : ${message.author.username}`,
          message.author.displayAvatarURL()
        );
        message.channel.send(embed);
      })
      .catch((err) => {
        console.log(err);
        message.channel.send(
          "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat*  . Please try again."
        );
      });
  } else message.channel.send("Wrong Command format!");
};
