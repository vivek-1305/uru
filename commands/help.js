const Discord = require("discord.js");
module.exports = function (message, prefix) {
  const embed = new Discord.MessageEmbed();
  embed.setColor("#FFB6C1");
  embed.setAuthor("Help has arrived!", message.guild.iconURL());
  embed.setDescription(
    "Here is the list of commands uru can do at this stage\nUru uses Jikan API(An unofficial MAL API) and nekos.life API. \nThe bot may crash from time to time as I am still workinh on some parts, so dont bully it too much <3"
  );
  embed.setThumbnail(
    `https://images-ext-2.discordapp.net/external/ASIjmAsd0MMOb_oUsLtlqvZrLV_SgNikx1UuDULLhpM/%3Fsize%3D256/https/cdn.discordapp.com/avatars/845938835140378654/5423183b04c4e1f57030c48f47aec0c5.png?width=205&height=205`
  );
  embed.addField("prefix : ", `${prefix}`);
  embed.addField(
    "Actions : ",
    "`pat` `hug` `cuddle` `kiss` `slap` `tickle` `meow` `poke` `smug` "
  );
  embed.addField(
    "MyAnimeList : ",
    "`anime` `manga` `char` `episodes` `schedule` `top` `season` `user`"
  );
  embed.addField("Reaction Roles : ", "`rr add` `rr list` `rr remove`");
  embed.setImage(
    "https://cdn.discordapp.com/attachments/778279491780739122/778589467664842793/b9763d398d581a8a2916ea94682c8c4c.gif"
  );
  embed.setFooter(
    `Requested by : ${message.author.username}`,
    message.author.displayAvatarURL()
  );
  message.channel.send(embed);
};
