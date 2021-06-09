const jikanjs = require("jikanjs");
const Discord = require("discord.js");
module.exports = function (message, action, prefix) {
  const year = message.content.slice(
    prefix.length + action.length + 1,
    prefix.length + action.length + 5
  );
  var season = message.content.slice(prefix.length + action.length + 6);
  season = season.toLowerCase();
  var yearnumber = parseInt(year);
  if (yearnumber > 1960 && yearnumber < 2022) {
    if (
      season == "summer" ||
      season == "spring" ||
      season == "fall" ||
      season == "winter"
    ) {
      jikanjs
        .loadSeason(year, season)
        .then((response) => {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(
            `${year} ${season} anime list :`,
            message.guild.iconURL()
          );
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.anime[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.anime.length); i++) {
            embed.addField(
              `${i + 1}. ${response.anime[i].title}`,
              `**Episode Count : **${response.anime[i].episodes}    **Score : **${response.anime[i].score}`
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
          message.channel.send(
            "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat*  . Please try again."
          );
        });
    } else message.channel.send(`Wrong Input`);
  } else message.channel.send(`Wrong Input`);
};
