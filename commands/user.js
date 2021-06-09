const jikanjs = require("jikanjs");
const Discord = require("discord.js");
module.exports = function (message, action, prefix) {
  let userExcept = {
    anime: "not set",
    char: "not set",
    manga: "not set",
    person: "not set",
  };
  const userName = message.content.slice(prefix.length + action.length + 1);
  jikanjs
    .loadUser(userName)
    .then((response) => {
      if (typeof response.favorites.anime[0] != "undefined")
        userExcept.anime = response.favorites.anime[0].name;
      if (typeof response.favorites.manga[0] != "undefined")
        userExcept.manga = response.favorites.manga[0].name;
      if (typeof response.favorites.characters[0] != "undefined")
        userExcept.char = response.favorites.characters[0].name;
      if (typeof response.favorites.people[0] != "undefined")
        userExcept.person = response.favorites.people[0].name;
      if (response.birthday != null)
        response.birthday = response.birthday.slice(0, 10);
      if (response.joined != null)
        response.joined = response.joined.slice(0, 10);
      const embed = new Discord.MessageEmbed();
      embed.setColor("#FFB6C1");
      embed.setAuthor(`User Info :`, message.guild.iconURL());
      embed.setTitle(`Username : ${response.username}`);
      embed.setThumbnail(
        `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
      );
      embed.addField("Gender : ", `${response.gender}`, true);
      embed.addField("Birthday : ", `${response.birthday}`, true);
      embed.addField("Location : ", `${response.location}`, true);
      embed.addField("Favorite Anime : ", `${userExcept.anime}`, true);
      embed.addField("Favorite Manga : ", `${userExcept.manga}`, true);
      embed.addField("Favorite Character : ", `${userExcept.char}`, true);
      embed.addField("Favorite Person : ", `${userExcept.person}`, true);
      embed.addField("Join Date : ", `${response.joined}`, true);
      embed.addField("MAL Link : ", `${response.url}`, true);
      if (response.image_url != null) embed.setImage(`${response.image_url}`);
      embed.setFooter(
        `Requested by : ${message.author.username}`,
        message.author.displayAvatarURL()
      );
      embed.setDescription(
        `**Anime Stats : **\nWatching : ${response.anime_stats.watching} \nCompleted : ${response.anime_stats.completed} \nOn hold : ${response.anime_stats.on_hold} \nDropped : ${response.anime_stats.dropped} \nEpisodes Watched : ${response.anime_stats.episodes_watched}\n**Manga Stats : **\nReading : ${response.manga_stats.reading} \nCompleted : ${response.manga_stats.completed} \nOn hold : ${response.manga_stats.on_hold} \nDropped : ${response.manga_stats.dropped} \nChapters Read : ${response.manga_stats.chapters_read}`
      );
      message.channel.send(embed);
    })
    .catch((err) => {
      console.error(err); // in case a error happens
      message.channel.send(
        "Oops, there seems to be some sort of error. Please check the username again or maybe it's the API acting all dumb dumb"
      );
    });
};
