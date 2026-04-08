const { Client, GatewayIntentBits, Collection, Events } = require('discord.js')
const fs = require('fs');
const path = require('path');
const http = require('http');
require('dotenv').config();

// Loading Bot Token

const botToken = process.env.BOT_TOKEN;
if (!botToken) {
    console.log("Bot Token not Present in .env file")
    process.exit(1);
}

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

// Command Loader

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    try {
        const command = require(path.join(commandsPath, file));
        if ('data' in command && 'execute' in command) {
            client.commands.set(command.data.name, command);
            console.log(`Successfully loaded command: ${command.data.name}`);
        } else {
            console.log(`[WARNING] The command at ${file} is missing a required "data" or "execute" property.`);
        }
    } catch (err) {
        console.error(`[ERROR] Failed to load command file ${file}:`, err);
    }
}

// Command Handler

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) {
        await interaction.reply({ content: 'Command not found', ephemeral: true });
        return;
    }
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing command ${command.data.name}:`, error);
        const reply = { content: `Error executing command ${command.data.name}`, ephemeral: true };
        try {
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp(reply);
            } else {
                await interaction.reply(reply);
            }
        } catch (replyErr) {
            console.error(`Failed to send error reply for ${command.data.name}:`, replyErr);
        }
    }
});

// Health Checker *Possibly Unnecessary*

const port = process.env.PORT || 8080;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot is alive');
}).listen(port, () => {
    console.log(`Bot is alive on port ${port}`);
});


// Bot Ready Event

client.once(Events.ClientReady, () => {
    console.log(`Logged in as ${client.user.tag}! CTRL + C to exit`);
    console.log(`${client.commands.size} commands loaded`);
});


// Bot Login
client.login(botToken).catch(err => {
    console.error("Login Failed", err);
});

// Shut down signal for local dev
process.on('SIGINT', () => {
    console.log("Shutting down the bot.");
    client.destroy();
    process.exit(0);
});