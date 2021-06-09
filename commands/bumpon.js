const bump = require("../models/bump.js");
module.exports = function (message) {
  bump
    .updateOne({ id: message.author.id }, { $set: { reminder: 1 } })
    .then(() => {
      message.channel.send(
        "Reminders turned on! Use `uru bumpoff` to deactivate them again."
      );
    })
    .catch((err) => {
      console.log(err);
      message.channel.send("oops encountered an error");
    });
};
