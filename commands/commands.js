const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('health')
        .setDescription('Health Check - bot is alive'),
    async execute(interaction) {
        const latency = Date.now() - interaction.createdTimestamp;
        await interaction.reply({
            content: `Roundtrip: ${latency}ms`,
            ephemeral: true
        });
    }
};