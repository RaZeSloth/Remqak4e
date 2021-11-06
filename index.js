const Discord = require('discord.js');
const { Database } = require('quickmongo');
const dailyCollected = new Set();

/**
 * Economy Options
 * @typedef {object} economyOptions
 * @prop {number} [dailyMoney=100] The amount of money to give when the `Economy#daily()` method is called. (Defaults to 100)
 * @prop {number} [moneyPerMinute=0] The amount of money to give automatically per minute. (Disabled by default and set to 0)
 */

const economyOptions = {
    dailyMoney: 100,
    moneyPerMinute: 0
}

class Economy {
    /**
     * Create an instance of an Economy System.
     * @param {string} uri The MongoDB Database URI.
     * @param {economyOptions} options
     */
    constructor(uri, options = {}) {
        this.uri = uri;
        this.options = options;
        Object.assign(this.options, options);
        if (!uri) throw new Error("No MongoDB URI was provided!");
        else if (!uri.startsWith("mongodb")) throw new Error("Invalid MongoDB URI!");
        const db = new Database(uri);
        this.db = db;
    }

    /**
     * Collect the daily money for a user.
     * @param {Discord.Message} message The message sent by the user.
     * @returns {Promise<number>} The new balance of the user.
     */
    async daily(message) {
        if (!message) throw new Error("No message parameter was provided!")
        if (dailyCollected.has(message.author.id)) {
            let alreadyCollected = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
                .setTitle("❌ Daily Already Collected!")
                .setDescription(`You have already collected your daily today!`)
                .setTimestamp();
            return message.channel.send({ embeds: [alreadyCollected] });
        }
        await db.add(`economy_${member.user.id}.money`, this.options.dailyMoney);
        let newBalance = await db.get(`economy_${member.user.id}.money`);
        dailyCollected.add(member.user.id);
        let dailyEmbed = new Discord.MessageEmbed()
            .setColor("GREEN")
            .setAuthor(`${member.user.tag}`, member.user.displayAvatarURL())
            .setTitle("✅ Daily Collected!")
            .setDescription(`You have collected $${this.options.dailyMoney}.\nYou now have $${newBalance}!`)
            .setTimestamp();
        message.channel.send({ embeds: [dailyEmbed] });
        setTimeout(() => {
            dailyCollected.delete(member.user.id);
        }, 86400000) // 24 hours
        return newBalance;
    }
}

module.exports = Economy;