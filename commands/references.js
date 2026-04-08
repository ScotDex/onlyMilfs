const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('romulus')
        .setDescription('Romulus clip'),

    async execute(interaction) {
        const file = path.join(__dirname, '..', 'assets', 'clips', 'romulus.gif');
        const attachment = new AttachmentBuilder(file, { name: 'romulus.gif' });
        await interaction.reply({ files: [attachment] });
    }
};