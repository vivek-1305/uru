const jikanjs = require("jikanjs");
const Discord = require("discord.js");
module.exports = function (message, action, prefix) {
  var day = message.content.slice(prefix.length + action.length + 1);
  day = day.toLowerCase();
  if (
    day == "monday" ||
    day == "tuesday" ||
    day == "wednesday" ||
    day == "thursday" ||
    day == "friday" ||
    day == "saturday" ||
    day == "sunday"
  ) {
    jikanjs
      .loadSchedule(day)
      .then((response) => {
        if (day === "monday") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(`Monday's schedule :`, message.guild.iconURL());
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.monday[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.monday.length); i++) {
            response.monday[i].airing_start = response.monday[
              i
            ].airing_start.slice(11, 16);
            embed.addField(
              `${i + 1}.${response.monday[i].title}`,
              `Airing at : ${response.monday[i].airing_start} (GMT+6)`
            );
          }
          embed.setFooter(
            `Requested by : ${message.author.username}`,
            message.author.displayAvatarURL()
          );
          message.channel.send(embed);
        }
        if (day === "tuesday") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(`Tuesday's schedule :`, message.guild.iconURL());
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.tuesday[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.tuesday.length); i++) {
            response.tuesday[i].airing_start = response.tuesday[
              i
            ].airing_start.slice(11, 16);
            embed.addField(
              `${i + 1}.${response.tuesday[i].title}`,
              `Airing at : ${response.tuesday[i].airing_start} (GMT+6)`
            );
          }
          embed.setFooter(
            `Requested by : ${message.author.username}`,
            message.author.displayAvatarURL()
          );
          message.channel.send(embed);
        }
        if (day === "wednesday") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(`Wednesday's schedule :`, message.guild.iconURL());
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.wednesday[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.wednesday.length); i++) {
            response.wednesday[i].airing_start = response.wednesday[
              i
            ].airing_start.slice(11, 16);
            embed.addField(
              `${i + 1}.${response.wednesday[i].title}`,
              `Airing at : ${response.wednesday[i].airing_start} (GMT+6)`
            );
          }
          embed.setFooter(
            `Requested by : ${message.author.username}`,
            message.author.displayAvatarURL()
          );
          message.channel.send(embed);
        }
        if (day === "thursday") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(`Thursday's schedule :`, message.guild.iconURL());
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.thursday[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.thursday.length); i++) {
            response.thursday[i].airing_start = response.thursday[
              i
            ].airing_start.slice(11, 16);
            embed.addField(
              `${i + 1}.${response.thursday[i].title}`,
              `Airing at : ${response.thursday[i].airing_start} (GMT+6)`
            );
          }
          embed.setFooter(
            `Requested by : ${message.author.username}`,
            message.author.displayAvatarURL()
          );
          message.channel.send(embed);
        }
        if (day === "friday") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(`Friday's schedule :`, message.guild.iconURL());
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.friday[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.friday.length); i++) {
            response.friday[i].airing_start = response.friday[
              i
            ].airing_start.slice(11, 16);
            embed.addField(
              `${i + 1}.${response.friday[i].title}`,
              `Airing at : ${response.friday[i].airing_start} (GMT+6)`
            );
          }
          embed.setFooter(
            `Requested by : ${message.author.username}`,
            message.author.displayAvatarURL()
          );
          message.channel.send(embed);
        }
        if (day === "saturday") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(`Saturday's schedule :`, message.guild.iconURL());
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.saturday[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.saturday.length); i++) {
            response.saturday[i].airing_start = response.saturday[
              i
            ].airing_start.slice(11, 16);
            embed.addField(
              `${i + 1}.${response.saturday[i].title}`,
              `Airing at : ${response.saturday[i].airing_start} (GMT+6)`
            );
          }
          embed.setFooter(
            `Requested by : ${message.author.username}`,
            message.author.displayAvatarURL()
          );
          message.channel.send(embed);
        }
        if (day === "sunday") {
          const embed = new Discord.MessageEmbed();
          embed.setColor("#FFB6C1");
          embed.setAuthor(`Sunday's schedule :`, message.guild.iconURL());
          embed.setThumbnail(
            `https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png`
          );
          embed.setImage(`${response.sunday[0].image_url}`);
          for (var i = 0; i < Math.min(10, response.sunday.length); i++) {
            response.sunday[i].airing_start = response.sunday[
              i
            ].airing_start.slice(11, 16);
            embed.addField(
              `${i + 1}.${response.sunday[i].title}`,
              `Airing at : ${response.sunday[i].airing_start} (GMT+6)`
            );
          }
          embed.setFooter(
            `Requested by : ${message.author.username}`,
            message.author.displayAvatarURL()
          );
          message.channel.send(embed);
        }
      })
      .catch((err) => {
        console.log(err);
        message.channel.send(
          "Oops, there seems to be some sort of error with either the MAL API or the bot or the user input ~~or everything~~.   *pat pat*  . Please try again."
        );
      });
  } else {
    message.channel.send("Wrong Command format!");
  }
};
