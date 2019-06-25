const log = require('../logger');
module.exports = { // I have a question, the mute command can just directly create the channel right?
    name: 'createchannel', // needs to be lower case.
    description: 'Command for creating channels.', 
    execute(message, args){ 
       if(message.member.hasPermission('MANAGE_CHANNELS')) {
            if(args[0] === `text`) { 
                const channelName = args.slice(1);
                message.guild.createChannel(channelName.join(` `), {type: 'text'}) 
                .then(() => {
                    message.reply(`the channel has been created.`) 
                    .then(() => log.err(`The channel has been created.`))
                    .catch(err => log.err(err));
                })
                .catch(err => {
                    message.reply(`failed to created a text channel due to \`${err}\``)
                    .catch(err => log.err(err));
                    log.err(err);
                })
            }
            else if(args[0] === `voice`) {
                const channelName = args.slice(1);
                message.guild.createChannel(channelName.join(` `), {type: 'voice'})
                .then(() => {
                    message.reply(`the channel has been created.`) 
                    .then(() => log.err(`The channel has been created.`))
                    .catch(err => log.err(err)); 
                })
                .catch(err => {
                    message.reply(`failed to created a voice channel due to \`${err}\``)
                    .catch(err => log.err(err));
                    log.err(err);
                })
            } else {
                message.reply(`it needs to be a voice or a text channel.`)
                .then(() => log.err(`Needs to be a voice or text channel only.`))
                .catch(err => log.err(err));
            }
        } else {
            message.reply('You do not have permission to manage channels.')
            .then(() => log.err(`You do not have permission to manage channels.`))
            .catch(err => log.err(err));
        }
    } 
}