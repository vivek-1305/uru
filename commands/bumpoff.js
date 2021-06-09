const bump = require("../models/bump.js");
module.exports = function (message) {
  bump
    .updateOne({ id: message.author.id }, { $set: { reminder: 0 } })
    .then(() => {
      message.channel.send(
        "Reminders turned off! Use `uru bumpon` to activate them again."
      );
    })
    .catch((err) => {
      console.log(err);
      message.channel.send("oops encountered an error");
    });
};
