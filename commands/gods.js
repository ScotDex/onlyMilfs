const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('gods')
        .setDescription('you get your answer'),

    async execute(interaction) {
        await interaction.deferReply();
        const file = path.join(__dirname, '..', 'assets', 'clips', 'gods.gif');
        const attachment = new AttachmentBuilder(file, { name: 'gods.gif' });
        await interaction.editReply({ files: [attachment] });
    }
};