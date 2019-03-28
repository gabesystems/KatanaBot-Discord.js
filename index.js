
/////////////////////////////////////////////////////
// _  __     _                    ____        _    //
//| |/ /    | |                  |  _ \      | |   //
//| ' / __ _| |_ __ _ _ __   __ _| |_) | ___ | |_  //
//|  < / _` | __/ _` | '_ \ / _` |  _ < / _ \| __| //
//| . \ (_| | || (_| | | | | (_| | |_) | (_) | |_  //
//|_|\_\__,_|\__\__,_|_| |_|\__,_|____/ \___/ \__| //
/////////////////////////////////////////////////////
// Bot Created by GabeSystems //
///////////////////////////////

// Requirements and Important Varriables
const Discord = require("discord.js")
const settings = require("./settings.json")
const bot = new Discord.Client();

// Text Varriables
var botinfo1 = "BOT INFORMATION:";

// Command Handler
const fs = require("fs");
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.");
        return;
    }
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

// Bot ready messages
bot.on("ready", () => {
    console.log(" _  __     _                    ____        _    ");
    console.log("| |/ /    | |                  |  _ |      | |   ");
    console.log("| ' / __ _| |_ __ _ _ __   __ _| |_) | ___ | |_  ");
    console.log("|  < / _` | __/ _` | '_ | / _` |  _ < / _ || __| ");
    console.log("| . | (_| | || (_| | | | | (_| | |_) | (_) | |_  ");
    console.log("|_||_|__,_||__|__,_|_| |_||__,_|____/ |___/ |__| ");
    console.log(botinfo1);
    console.log("   Token = " + settings.token);
    console.log("   Prefix = " + settings.prefix);
    console.log("");
    console.log("BELOW IS THE BOT LOG [ERRORS & INFO]:")
    console.log(`CONNECTION: Bot is ready! Using: ${bot.user.username}`);
    console.log("");
});

// Message information & Command handaler things
bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return;
    let content = message.content.split(" ");
    if (message.content.length <= 1) {
        message.channel.send("Fields cannot be blank. Please try again.");
    }
    let command = content[0];
    let args = content.slice(1);
    let prefix = settings.prefix;
    let commandfile = bot.commands.get(command.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
})

// Logs the bot in.
bot.login(settings.token)