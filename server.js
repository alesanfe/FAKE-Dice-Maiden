
// CONSTANTES
const { Client, Intents, MessageEmbed, MessageAttachment} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const { prefix, token, trolled, number } = require('./config.json');


// function to roll a dice
function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

// ESTADO
client.on("ready", () => {
    console.log("Estoy listo!");
    // Presencia
    client.user.setPresence({ activities: [{ name: "Dice Maiden is a simple to use dice rolling bot perfect for any trpg session!" }] });
   
});

// MENSAJES
client.on("messageCreate", (message) => {

  // Evitar bucles
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  
  // Comandos
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const username = message.author.username;
  if (command === "roll") {
    if (args[0].includes("d")) {
        const sides = args[0].split("d")[1];
        const dice = args[0].split("d")[0];
        const results = [];
        let sum = 0;
        for (let i = 0; i < dice; i++) {
            let diceRolled = username === trolled ? number : rollDice(sides);
            results.push(diceRolled);
            sum += diceRolled;
        }
        message.channel.send(message.author.username + " Roll: **[" + results.join(", ") + "]** Result: " + sum);
    } else {
        const embed = new MessageEmbed()
        .setTitle("Dice Roll")
        .setDescription("You need to specify the number of sides of the dice you want to roll.\nExample: `!roll 1d20`")
        .setColor("#0099ff")
        .setFooter({text: "Dice Maiden by @DiceMaiden#0001"});
        message.channel.send({ embeds: [embed] });
    }
  }
  if (command === "help" && username === trolled) {
    const embed = new MessageEmbed()
      .setTitle("Fuiste troleada")
      .setColor("#FF0097")
      .setDescription("y un rick roll de regalo.")
      .setAuthor({name: message.author.username, iconURL: message.author.avatarURL()})
      .setImage("https://c.tenor.com/_4YgA77ExHEAAAAC/rick-roll.gif")
      .setURL("https://www.youtube.com/watch?v=2cL2CTT6DnI&ab_channel=AnotherCatBased");
    message.channel.send({ embeds: [embed] });
  } else if (command === "help")
      message.channel.send("We only have one command:\n!roll numberdsize\nWhere number specify the number of rolls and size the number of size which has the dice.")
});


client.login(token);      
