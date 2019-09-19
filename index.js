const client = new Discord.Client();
const fs = require('fs');
const log = require('./logger'); 
const fetch = require('node-fetch'); 
const Bot_Version = "1.0.0";
const config = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
/*bot.on('ready', async () => {
    console.log('\nStarting Bot...\nNode version: ' + '\nDiscord.js version: ' + Discord.version + '\n')
    console.log('\nThis Bot is online! Running on version: ' + BOT_VERSION + '\n')*/
client.commands = new Discord.Collection();
client.on('ready', () => {
    client.user.setActivity("Discord Hackathon!", {
        type: "STREAMING",
        url: "https://twitch.tv/Discord"
      })
      .then(() => log.info('I am ready! bot is made by Colin, Derek & Simone.'))
      .catch(err => log.err(err));
    client.user.setStatus("dnd")
    .catch(err => log.err(err));
}); 

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
} 

 // use this event listener


 
client.on('message', message => {
    const prefix = `h!`;
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args); 
	} catch (error) {
		log.err(error);
		message.reply('there was an error trying to execute that command!')
		.catch(err => log.err(err));
	}
});

client.login(config.token);
