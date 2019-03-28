const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {
    var helpembed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setDescription("This displays some commands that I currently can run.")
        .setColor("RANDOM")
        // General
        .addField("General", "**;help** - " + "brings up this menu" + "\n" + "**;userinfo** - " + "brings up info about the user." + "\n" +
            "**;serverinfo** - " + "brings up some info about the server." + "\n" + "**;report** - " + "reports a user to an admin." + "\n")
        // Administration commands.
        .addField("Administration", "**;kick** - " + "kicks a user." + "\n" + "**;ban** - " + "bans a user." + "\n" + "**;warn** - " +
            "warns a user." + "\n" + "**;clear** - " + "clears the chat.")
        // Fun commands.
        .addField("Fun", "**;fidgetspinner** - " + "spins a fidget spinner." + "\n" + "**;rolldice** - " + "rolls a dice for you.")
        .setFooter("Requested by " + message.author.username)
        .setTimestamp()
    message.channel.send(helpembed);
    return;

}

module.exports.help = {
    name: "help"
}