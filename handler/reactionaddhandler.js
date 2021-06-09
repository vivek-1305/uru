const command = require("../commands/command");
module.exports = async function (reaction, user) {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!reaction.message.guild) return;
  command.roleadd(reaction, user);
};
