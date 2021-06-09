const reactionRole = require("../models/reactionrole.js");
module.exports = function (reaction, user) {
  reactionRole.findOne({ messageid: reaction.message.id }).then((result) => {
    if (!result) return;
    index = -1;
    for (var x = 0; x < result.emoji.length; x++) {
      if (result.emoji[x] == reaction.emoji.id) index = x;
    }
    if (index === -1) return;
    if (!result.role[index]) return;
    reaction.message.guild.members.cache
      .get(user.id)
      .roles.remove(result.role[index])
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  });
};
