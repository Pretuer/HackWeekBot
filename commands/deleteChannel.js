module.exports = {
    name: `deletechannel`,
    description: `A command for deleting a channel.`,
    execute(message, args) {
        if(message.member.hasPermission('MANAGE_CHANNELS')) {
            log.err(args[0]);
            const channel = message.guild.channels.find(args[0]);
        }

        /*
        const fetchedChannel = message.guild.channels.find(r => r.name === args.join(' '));

        if (command === 'delete') {
             fetchedChannel.delete();
        }
        */
    }
}