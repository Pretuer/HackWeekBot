module.exports = {
	name: 'kick',
	description: 'For kicking a member.',
	execute(message, args) {
        if(message.author.id === message.guild.ownerID || message.member.hasPermission('KICK_MEMBERS')) {
                const member = message.mentions.members.array();
                if(member.length === 1) {
                    if(args[1] === undefined) {
                        message.reply(`please input a reason to kick that member.`)
                        .then(() => {
                            log.err(`No reason inputted to kick a member.`)
                        })
                        .catch(err => log.err(err));
                    }
                    else if(member[0].hasPermission('KICK_MEMBERS') || member[0].id === message.guild.ownerID) {
                        message.reply(`that user is a mod or admin, I can't kick him/her.`)
                        .then(() => {
                            log.err(`Cannot kick mod or admin.`)
                        })
                        .catch(err => log.err(err));
                    } else {
                        const reason = args.slice(1);
                        member[0].kick(reason.join(` `))
                        .then(() => {
                            const kickedEmbed = new Discord.RichEmbed()
                            .setDescription(`Successfully kicked \`${member[0].user.tag}\`.`)
                            .addField(`Reason:`, reason.join(` `))
                            .setColor(`#23ef6e`);
                            message.channel.send(kickedEmbed)
                            .then(() => {
                                log.info(`Successfully kicked ${member[0].user.tag}.`)
                            })
                            .catch(err => log.err(err));
                        })
                        .catch(err => {
                            message.reply(`there was an error kicking this member: \`${err}\``)
                            .then(() => {
                                log.err(`Error kicking this member, reason: ${err}`)
                            })
                            .catch(err => log.err(err));
                        });
                    }
                }
                else if(member.length > 1) {
                    message.reply(`one at a time please.`)
                    .then(() => {
                        log.err(`Only can kick members one at a time.`)
                    })
                    .catch(err => log.err(err));
                }
                else if(message.mentions.everyone || message.mentions.roles.array().length > 0) {
                    message.reply(`you cannot kick ${args[0]}.`)
                    .then(() => {
                        log.err(`Cannot kick ${args[0]}.`)
                    })
                    .catch(err => log.err(err));
                } else {
                    message.reply(`please mention someone to kick.`)
                    .then(() => {
                        log.err(`No one mentioned to be kicked.`)
                    })
                    .catch(err => log.err(err));
                } 
            } else {
            message.reply(`you don't have access to this command!`)
            .then(() => {
                log.err(`Denied kick request since ${message.author.tag} doesn't have access to this command.`)
            })
            .catch(err => log.err(err));
        }
    }
};