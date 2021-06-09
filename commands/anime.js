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
          time: 20000,
          max: 1,
        });
        collectorName.on("collect", (m) => {
          index = parseInt(m.content) - 1;
          if (index != -1) {
            animeId = response.results[index].mal_id;
            jikanjs
              .loadAnime(animeId)
              .then((response) => {
                const embed = new Discord.MessageEmbed();
                embed.setColor("#FFB6C1");
                embed.setAuthor(`Anime Info :`, message.guild.iconURL());
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
                embed.addField(
                  "Episode Count : ",
                  `${response.episodes}`,
                  true
                );
                embed.addField(
                  "Genres : ",
                  `${response.genres[0].name}, ${response.genres[1].name}`,
                  true
                );
                embed.addField("Status : ", `${response.status}`, true);
                embed.addField(
                  "Aired from : ",
                  `${response.aired.string}`,
                  true
                );
                embed.addField("Rating : ", `${response.rating}`, true);
                if (typeof response.studios[0] != "undefined")
                  embed.addField(
                    "Studio : ",
                    `${response.studios[0].name}`,
                    true
                  );
                if (typeof response.producers[0] != "undefined")
                  embed.addField(
                    "Producer : ",
                    `${response.producers[0].name}`,
                    true
                  );
                if (typeof response.licensors[0] != "undefined")
                  embed.addField(
                    "Licensor : ",
                    `${response.licensors[0].name}`,
                    true
                  );
                if (typeof response.broadcast != "undefined")
                  embed.addField(
                    "Broadcasted at : ",
                    `${response.broadcast}`,
                    true
                  );
                if (typeof response.opening_themes[0] != "undefined") {
                  if (response.opening_themes[0].length > 100) {
                    response.opening_themes[0] =
                      response.opening_themes[0].slice(0, 100);
                  }
                  embed.addField(
                    "Opening Theme : ",
                    `${response.opening_themes[0]}`,
                    true
                  );
                }
                if (typeof response.ending_themes[0] != "undefined") {
                  if (response.ending_themes[0].length > 100) {
                    response.ending_themes[0] = response.ending_themes[0].slice(
                      0,
                      100
                    );
                  }
                  embed.addField(
                    "Ending Theme : ",
                    `${response.ending_themes[0]}`,
                    true
                  );
                }
                embed.addField("MAL Link : ", `${response.url}`, true);
                if (response.synopsis != null) {
                  if (response.synopsis.length > 1650) {
                    response.synopsis = response.synopsis.slice(0, 1650);
                  }
                  embed.setDescription(`**Synopsis : **${response.synopsis}`);
                }
                embed.setImage(`${response.image_url}`);
                embed.setFooter(
                  `Requested by : ${message.author.username}`,
                  message.author.displayAvatarURL()
                );

                message.channel.send(embed);
              })
              .catch((err) => {
                console.error(err); // in case an error occurs
                message.channel.send(
                  "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat* . Please try again."
                );
              });
          } else message.channel.send(`Wrong Input!`);
        });
      })
      .catch((err) => {
        console.error(err); // in case an error occurs
        message.channel.send(
          "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat* . Please try again."
        );
      });
  } else message.channel.send("The search query must have at least 3 letters");
};
