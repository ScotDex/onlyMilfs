const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.BOT_TOKEN;

if (!clientId || !token) {
    console.error('Missing CLIENT_ID or BOT_TOKEN in .env');
    process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(path.join(commandsPath, file));
    if ('data' in command) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
    try {
        console.log(`Registering ${commands.length} command(s)...`);

        if (guildId) {
            await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
            console.log(`Registered to guild ${guildId}`);
        } else {
            await rest.put(Routes.applicationCommands(clientId), { body: commands });
            console.log('Registered globally (up to 1 hour to propagate)');
        }
    } catch (error) {
        console.error('Registration failed:', error);
    }
})();