const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '..', 'assets', 'pics');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cj')
        .setDescription('Milf Inbound'),

    async execute(interaction) {
        const files = fs.readdirSync(imagesDir).filter(f => /\.(jpg|jpeg|png|gif|webp)$/i.test(f));
        const pick = files[Math.floor(Math.random() * files.length)];


        const attachment = new AttachmentBuilder(path.join(imagesDir, pick));
        const embed = new EmbedBuilder()
            .setImage(`attachment://${pick}`)
            .setColor(0x0099FF);
        await interaction.reply({ embeds: [embed], files: [attachment] });
    }
}