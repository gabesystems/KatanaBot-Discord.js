const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
    
  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
  
  if(command === "kick") {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Insufficient Permissions.");
    if(args[0] == "help"){
      message.reply("Usage: o/kick <user> <reason>");
      return;
    }
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!");
    let kReason = args.join(" ").slice(22);
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("KICK LOG")
    .setColor("#ff5900")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Kicked On", message.createdAt)
    .addField("Reason", kReason);

    let logsChannel = message.guild.channels.find(`name`, "logs");
    if(!logsChannel) return message.channel.send("Logs channel not found. Please create a channel called logs.")

    message.guild.member(kUser).kick(kReason);
    logsChannel.send(kickEmbed);


  }
  
  if(command === "ban") {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("Insufficient Permissions.");
    if(args[0] == "help"){
      message.reply("Usage: o/ban <user> <reason>");
      return;
    }
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't find user!");
    let bReason = args.join(" ").slice(22);
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("BAN LOGS")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let logsChannel = message.guild.channels.find(`name`, "logs");
    if(!logsChannel) return message.channel.send("Logs channel not found. Please create a channel called logs.")

    message.guild.member(bUser).ban(bReason);
    logsChannel.send(banEmbed);
  }
  
  if(command === "clear") {

    const deleteCount = parseInt(args[0], 10);
    
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

  if(command === "report") {
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("REPORT LOG")
    .setColor("#303030")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);
    let logsChannel = message.guild.channels.find(`name`, "logs");
    if(!logsChannel) return message.channel.send("Logs channel not found. Please create a channel called logs.")
    message.delete().catch(O_o=>{});
    logsChannel.send(reportEmbed);
    return;
  }

  if(command === "help") {
    let uicon = message.author.avatarURL;
    let serverembed = new Discord.RichEmbed()
    .setAuthor("Author Name", uicon)
    .setColor("#303030")
    .setFooter("Requested by, " + message.author.userame + ".")
    .setTimestamp()
    .addField("General", "`o/help` - Brings up the help menu." + "`o/say` - Bot will say what you want." + "\n" + "`o/unflip` - Unflips table." + "\n" + "`o/flip` - Flips table.", true)
    .addField("Administration", "`o/kick` - Kicks a specified user." + "\n" + "`o/ban` - Bans a specified user." + "\n" + "`o/report` - Creates a report." + "\n" + "`o/warn` - Warns a user.", true);
    return message.channel.send(serverembed);
  }

  if(command === "unflip"){
    message.channel.send("(╯°□°)╯  ︵  ┻━┻").then(m => {
      setTimeout(() => {
          m.edit("(╯°□°)╯    ]").then(ms => {
              setTimeout(() => {
                  ms.edit("(°-°)\\ ┬─┬")
              }, 500)
          })
      }, 500);

    });
  }

  if(command === "flip") {
    message.channel.send("(°-°)\\ ┬─┬").then(m => {
      setTimeout(() => {
          m.edit("(╯°□°)╯    ]").then(ms => {
              setTimeout(() => {
                  ms.edit("(╯°□°)╯  ︵  ┻━┻")
              }, 500)
          })
      }, 500);

    });
  }
});

client.login(config.token);