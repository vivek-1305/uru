const bump = require("../models/bump.js");
module.exports = function (message) {
  var usermention = message.embeds[0].description.split(",")[0];
  var userid = usermention.substr(2, usermention.length - 3);
  bump.findOne({ id: userid }).then((result) => {
    if (result) {
      var username = message.guild.members.cache.get(userid).displayName;
      bump
        .updateOne(
          { id: userid },
          { $set: { bumps: result.bumps + 1, name: username } }
        )
        .then((usermodel) => {
          if (result.reminder == 0) return;
          message.channel.send(
            "Thanks for bumping, we will remind you to bump again in 2 hours!.You can use `uru bumpoff` to turn these reminders off"
          );
          //7200000 = 2 hours
          setTimeout(function () {
            message.channel.send(
              `${usermention}, hey it's time to bump again!`
            );
          }, 7200000);
        })
        .catch((err) => {
          console.log(err);
          message.channel.send("oops error encountered!");
        });
    } else {
      var username = message.guild.members.cache.get(userid).displayName;
      const newuser = new bump({
        id: userid,
        name: username,
        bumps: 1,
        reminder: 1,
      });
      newuser
        .save()
        .then(() => {
          message.channel.send(
            "Thanks for bumping, we will remind you to bump again in 2 hours!.You can use `uru bumpoff` to turn these reminders off"
          );
          //7200000 = 2 hours
          setTimeout(function () {
            message.channel.send(
              `${usermention}, hey it's time to bump again!`
            );
          }, 7200000);
        })
        .catch((err) => {
          console.log(err);
          message.channel.send("oops error encountered!");
        });
    }
  });
};
