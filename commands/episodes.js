const jikanjs = require("jikanjs");
const Discord = require("discord.js");
module.exports = function (message, action, prefix) {
  var animeId;
  var index = -1;
  const animeName = message.content.slice(prefix.length + action.length + 1);
  if (animeName.length > 2) {
    jikanjs
      .search(`anime`, animeName)
      .then((response) => {
        const embed = new Discord.MessageEmbed();
        embed.setColor("#FFB6C1");
        embed.setAuthor("Search Results:", message.guild.iconURL());
        embed.setTitle("Please reply with a number from the list given below");
        embed.setImage(`${response.results[0].image_url}`);
        embed.setThumbnail(
          `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
        );
        embed.setFooter(
          `Requested by : ${message.author.username}`,
          message.author.displayAvatarURL()
        );
        for (var i = 0; i < Math.min(10, response.results.length); i++) {
          embed.addField(
            `${i + 1}.${response.results[i].title}`,
            `**Type : **${response.results[i].type}      **MAL Id : **${response.results[i].mal_id}`
          );
        }
        message.channel.send(embed);
        var inputCount = 0;
        const filter = (m) =>
          m.author.id === message.author.id && inputCount == 0;
        const collectorName = message.channel.createMessageCollector(filter, {
          time: 15000,
          max: 1,
        });
        collectorName.on("collect", (m) => {
          index = parseInt(m.content) - 1;
          if (index != -1) {
            animeId = response.results[index].mal_id;
            var showAnimeName = response.results[index].title;
            var showAnimeImg = response.results[index].image_url;
            jikanjs
              .loadAnime(animeId, "episodes")
              .then((response) => {
                const embed = new Discord.MessageEmbed();
                embed.setColor("#FFB6C1");
                embed.setAuthor(`Episode List :`, message.guild.iconURL());
                embed.setTitle(`Title :  ${showAnimeName}`);
                for (
                  var i = 0;
                  i < Math.min(response.episodes.length, 15);
                  i++
                ) {
                  embed.addField(
                    `Episode : ${i + 1}`,
                    `**English Title : **${response.episodes[i].title}\n**Japanese Title : **${response.episodes[i].title_japanese}`
                  );
                }
                embed.setThumbnail(
                  `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
                );
                embed.setImage(`${showAnimeImg}`);
                embed.setFooter(
                  `Requested by : ${message.author.username}`,
                  message.author.displayAvatarURL()
                );
                message.channel.send(embed);
              })
              .catch((err) => {
                console.error(err); // in case a error happens
                message.channel.send(
                  "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat*  . Please try again."
                );
              });
          } else message.channel.send(`OwO Wrong Input!`);
        });
      })
      .catch((err) => {
        console.error(err); // in case a error happens
        message.channel.send(
          "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat*  . Please try again."
        );
      });
  } else message.channel.send("The search query must have at least 3 letters");
};
