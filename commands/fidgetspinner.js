const Discord = require('discord.js')

module.exports.run = async (bot, message, args) => {

    message.channel.send("https://orig00.deviantart.net/c286/f/2017/128/4/3/untitled_by_scytheaandlanarkine-db8jbxg.gif");
    let mathrandom = (Math.random() * (60 - 5 + 1)) + 5;
    message.channel.send(`You span it for: ${mathrandom.toFixed()} seconds!`);
}

module.exports.help = {
    name: "fidgetspinner"
}