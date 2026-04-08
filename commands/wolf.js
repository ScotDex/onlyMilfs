const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('wolf')
        .setDescription('wolf clip'),

    async execute(interaction) {
        const file = path.join(__dirname, '..', 'assets', 'clips', 'wolf.gif');
        const attachment = new AttachmentBuilder(file, { name: 'wolf.gif' });
        await interaction.reply({ files: [attachment] });
    }
};