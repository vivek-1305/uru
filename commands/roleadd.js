const reactionRole = require("../models/reactionrole.js");
module.exports = function (reaction, user) {
  reactionRole.findOne({ messageid: reaction.message.id }).then((result) => {
    if (!result) return;
    index = -1;
    if (result.onlyone == 1) {
      for (var z = 0; z < result.role.length; z++) {
        if (
          reaction.message.guild.members.cache
            .get(user.id)
            .roles.cache.has(result.role[z])
        ) {
          reaction.message.guild.members.cache
            .get(user.id)
            .roles.remove(result.role[z]);
          findreaction = reaction.message.reactions.cache.find(
            (reaction) => reaction.emoji == result.emoji[z]
          );
          findreaction.users.remove(user.id);
        }
      }
    }
    for (var x = 0; x < result.emoji.length; x++) {
      if (result.emoji[x] == reaction.emoji.id) index = x;
    }
    if (index === -1) return;
    if (!result.role[index]) return;
    reaction.message.guild.members.cache
      .get(user.id)
      .roles.add(result.role[index])
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  });
};
