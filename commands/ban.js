module.exports = {
	name: 'ban',
	description: 'For banning a member.',
	execute(message, args) {
        if(message.author.id === message.guild.ownerID || message.member.hasPermission('BAN_MEMBERS')) {
            const member = message.mentions.members.array();
            if(member.length === 1) {
                if(args[1] === undefined) {
                    message.reply(`please input a reason to ban that member.`)
                    .then(() => {
                        log.err(`No reason inputted to ban a member.`)
                    })
                    .catch(err => log.err(err));
                }
                else if(member[0].hasPermission('BAN_MEMBERS') || member[0].id === message.guild.ownerID) {
                    message.reply(`that user is a mod or admin, I can't ban him/her.`)
                    .then(() => {
                        log.err(`Cannot ban mod or admin.`)
                    })
                    .catch(err => log.err(err));
                } else {
                    const reason = args.slice(1);
                    member[0].ban({
                        days: 7,
                        reason: reason.join(` `)
                    })
                    .then(() => {
                        const bannedEmbed = new Discord.RichEmbed()
                        .setDescription(`Successfully banned \`${member[0].user.tag}\`.`)
                        .addField(`Reason:`, reason.join(` `))
                        .setColor(`#23ef6e`);
                        message.channel.send(bannedEmbed)
                        .then(() => {
                            log.info(`Successfully banned ${member[0].user.tag}.`)
                        })
                        .catch(err => log.err(err));
                    })
                    .catch(err => {
                        message.reply(`there was an error banning this member: \`${err}\``)
                        .then(() => {
                            log.err(`Error banning this member, reason: ${err}`)
                        })
                        .catch(err => log.err(err));
                    });
                }
            }
            else if(member.length > 1) {
                message.reply(`one at a time please.`)
                .then(() => {
                    log.err(`Only can ban members one at a time.`)
                })
                .catch(err => log.err(err));
            }
            else if(message.mentions.everyone || message.mentions.roles.array().length > 0) {
                message.reply(`you cannot ban ${args[0]}.`)
                .then(() => {
                    log.err(`Cannot ban ${args[0]}.`)
                })
                .catch(err => log.err(err));
            } else {
                message.reply(`please mention someone to ban.`)
                .then(() => {
                    log.err(`No one mentioned to be banned.`)
                })
                .catch(err => log.err(err));
            } 
        } else {
            message.reply(`you don't have access to this command!`)
            .then(() => {
                log.err(`Denied ban request since ${message.author.tag} doesn't have access to this command.`)
            })
            .catch(err => log.err(err));
        }
    }
}