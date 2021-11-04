const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
const { Database } = require('quickmongo');

/**
 * Economy Options
 * @typedef {object} economyOptions
 * @prop {number} [dailyMoney=100] The amount of money to give when the `Economy#daily()` method is called. (Defaults to 100)
 * @prop {number} [moneyPerMinute=0] The amount of money to give automatically per minute. (Disabled by default and set to 0)
 */

//we should do that was a number, so that it df's to 0. If it's not set, it'll be off by df
//should we also do something like auto-profile on join?
//The constuctor already takes care of it really though
// what do you mean?
//when a user earns money, it should be added to their profile right? Thus, it's automatic profile creation.
//true
//i gtg now, it's getting late. I'll definitely do it tomorrow with ya
// :wave: (dammit this isn't discord)
// haha cya!
const economyOptions = {
    dailyMoney: 100,
    moneyPerMinute: 0
}

class Economy { // the constructor
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
            
        db.on('ready', () => console.log('Connected to MongoDB')); // testing
        db.on('error', err => console.error(err)); // also for testing
    }

    /**
     * Collect the daily money for a user.
     * @param {Discord.GuildMember} member The user to collect the daily money for.
     * @returns {Promise<number>} The new balance of the user.
     */
    async daily(member) {
        if (!member) throw new Error("No member was provided!");
        let balance = await this.db.get(`economy_${member.user.id}.money`);
        await db.add(`economy_${member.user.id}.money`, )
    }
}

module.exports = Economy;

//later on we should add options, eg: how much for daily, available jobs and their success to get into em
//options are pretty easy to do

new Economy("mongodb://localhost:27017/test", {
    dailyMoney: 100,
    moneyPerMinute: 0
});