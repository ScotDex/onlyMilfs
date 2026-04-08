const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gods')
        .setDescription(''),

    async execute(interaction) {
        const file = path.join(__dirname, '..', 'assets', 'clips', 'gods.gif');
        const attachment = new AttachmentBuilder(file, { name: 'gods.gif' });
        await interaction.reply({ files: [attachment] });
    }
};