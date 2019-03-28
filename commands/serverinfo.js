const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    var serverinfoembed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription("This desplays some basic information regarding this server.")
        .setColor("RANDOM")
        .addField("General", "**Users** - " + message.guild.memberCount + "\n" + "**ID** - " + message.guild.id, true)
        .addField("Technical", "**Server Location** - " + message.guild.region + "\n" + "**Vertification Level** - " + message.guild.verificationLevel, true)
        .setFooter("Requested by " + message.author.username)
        .setTimestamp()
    message.channel.send(serverinfoembed);
    return;
}

module.exports.help = {
  name: "serverinfo"
}