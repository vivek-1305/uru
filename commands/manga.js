const jikanjs = require("jikanjs");
const Discord = require("discord.js");
module.exports = function (message, action, prefix) {
  var mangaId;
  var index = -1;
  let mangaException = {
    writer: ["none", "none"],
  };
  const mangaName = message.content.slice(prefix.length + action.length + 1);
  if (mangaName.length > 2) {
    jikanjs
      .search(`manga`, mangaName)
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
          time: 20000,
          max: 1,
        });
        collectorName.on("collect", (m) => {
          index = parseInt(m.content) - 1;
          if (index != -1) {
            mangaId = response.results[index].mal_id;
            jikanjs
              .loadManga(mangaId)
              .then((response) => {
                const embed = new Discord.MessageEmbed();
                embed.setColor("#FFB6C1");
                embed.setAuthor(`Manga Info :`, message.guild.iconURL());
                embed.setTitle(`Title :  ${response.title}`);
                embed.setThumbnail(
                  `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
                );
                embed.addField(
                  "Japanese Title : ",
                  `${response.title_japanese}`,
                  true
                );
                embed.addField("Score : ", `${response.score}`, true);
                embed.addField("Rank : ", `#${response.rank}`, true);
                embed.addField(
                  "Popularity : ",
                  `#${response.popularity}`,
                  true
                );
                embed.addField(
                  "Member Favorites : ",
                  `${response.favorites}`,
                  true
                );
                if (typeof response.authors[0] != "undefined")
                  mangaException.writer[0] = response.authors[0].name;
                if (typeof response.authors[1] != "undefined")
                  mangaException.writer[1] = response.authors[1].name;
                embed.addField(
                  "Author : ",
                  `${mangaException.writer[0]}, ${mangaException.writer[1]}`,
                  true
                );
                embed.addField("Volumes : ", `${response.volumes}`, true);
                embed.addField("Chapters : ", `${response.chapters}`, true);
                embed.addField(
                  "Genres : ",
                  `${response.genres[0].name}, ${response.genres[1].name}`,
                  true
                );
                embed.addField("Status : ", `${response.status}`, true);
                embed.addField(
                  "Published from : ",
                  `${response.published.string}`,
                  true
                );
                embed.addField("MAL Link : ", `${response.url}`, true);
                if (response.synopsis != null) {
                  if (
                    response.synopsis.length > 1650 &&
                    response.synopsis != null
                  ) {
                    response.synopsis = response.synopsis.slice(0, 1650);
                    embed.setDescription(`**Synopsis : **${response.synopsis}`);
                  }
                }
                embed.setImage(`${response.image_url}`);
                embed.setFooter(
                  `Requested by : ${message.author.username}`,
                  message.author.displayAvatarURL()
                );

                message.channel.send(embed);
              })
              .catch((err) => {
                console.error(err); // in case a error happens
                message.channel.send(
                  "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat* . Please try again."
                );
              });
          } else {
            message.channel.send(`OwO Wrong Input!`);
          }
        });
      })
      .catch((err) => {
        console.error(err); // in case a error happens
        message.channel.send(
          "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat*  . Please try again."
        );
      });
  } else {
    message.channel.send("The search query must have at least 3 letters");
  }
};
