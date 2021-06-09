const jikanjs = require("jikanjs");
const Discord = require("discord.js");
module.exports = function (message, action, prefix) {
  var charId;
  var index = -1;
  let charSearchResult = {
    anime: ["none", "none", "none", "none", "none"],
    manga: ["none", "none", "none", "none", "none"],
    vAc: ["none", " "],
  };
  const charName = message.content.slice(prefix.length + action.length + 1);
  if (charName.length > 2) {
    jikanjs
      .search(`character`, charName)
      .then((response) => {
        embed = new Discord.MessageEmbed();
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
          if (typeof response.results[i].anime[0] != "undefined")
            charSearchResult.anime[i] = response.results[i].anime[0].name;
          if (typeof response.results[i].manga[0] != "undefined")
            charSearchResult.manga[i] = response.results[i].manga[0].name;
          embed.addField(
            `${i + 1}.${response.results[i].name}`,
            `**Anime : **${charSearchResult.anime[i]}      **Manga : **${charSearchResult.manga[i]}`
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
            charId = response.results[index].mal_id;
            jikanjs
              .loadCharacter(charId)
              .then((response) => {
                var aboutString = response.about.replace(/\\n\r/g, " ");
                if (aboutString.length > 1650)
                  aboutString = aboutString.slice(0, 1650);
                const embed = new Discord.MessageEmbed();
                embed.setColor("#FFB6C1");
                embed.setAuthor(`Character Info :`, message.guild.iconURL());
                if (charId == 41891) response.name = "Inari's Waifu";
                embed.setTitle(`Name :  ${response.name}`);
                embed.setThumbnail(
                  `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
                );
                if (typeof response.name_kanji != "undefined")
                  embed.addField(
                    "Japanese Name : ",
                    `${charSearchResult.japName}`,
                    true
                  );
                embed.addField(
                  "Member Favorites : ",
                  `${response.member_favorites}`,
                  true
                );
                if (typeof response.animeography[0] != "undefined")
                  embed.addField(
                    "Anime : ",
                    `${charSearchResult.animeG}`,
                    true
                  );
                if (typeof response.mangaography[0] != "undefined")
                  embed.addField(
                    "Manga : ",
                    `${charSearchResult.mangaG}`,
                    true
                  );
                if (typeof response.voice_actors[0] != "undefined")
                  charSearchResult.vAc[0] = response.voice_actors[0].name;
                if (typeof response.voice_actors[1] != "undefined")
                  charSearchResult.vAc[1] = response.voice_actors[1].name;
                embed.addField(
                  "Voice Actors : ",
                  `${charSearchResult.vAc[0]}, ${charSearchResult.vAc[1]}`,
                  true
                );
                embed.addField("MAL Link : ", `${response.url}`, true);
                embed.setDescription(`**About : **${aboutString}`);
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
                  "Oops, there seems to be some sort of error with either of the MAL API or the bot or the user input ~~or everything~~.   *pat pat* . Please try again."
                );
              });
          } else {
            message.channel.send(`Wrong Input!`);
          }
        });
      })
      .catch((err) => {
        console.error(err); // in case a error happens
        message.channel.send(
          "Oops, there seems to be some sort of error with either of the MAL API or the bot or the user input ~~or everything~~.   *pat pat*  . Please try again."
        );
      });
  } else message.channel.send("The search query must have at least 3 letters");
};
