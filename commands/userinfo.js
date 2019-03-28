const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
  var userinfoembed = new Discord.RichEmbed()
  .setAuthor(message.author.username, message.author.avatarURL)
  .setDescription("This displays some basic information regarding your user.")
  .setColor("RANDOM")
  .addField("General", "**Username** - " + message.author.username + "\n" + "**ID** - " + message.author.id, true)
  .addField("Technical", "**Permissions** - " + message.member.permissions + "\n" + "**Kickable?** - " + message.member.kickable, true)
  .setFooter("Requested by " + message.author.username)
  .setTimestamp()
  message.channel.send(userinfoembed);
  return;

}

module.exports.help = {
  name: "userinfo"
}