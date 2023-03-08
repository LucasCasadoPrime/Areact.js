const discord = require('discord.js');

const webhookUrl = "https://discord.com/api/webhooks/989663014510821428/0utftlyj_dbst72wU1295YuCfEPA_9oR8vlooCLlo8Kl10z7RblfIgiYdjlLhkd1t3Qc";

class Discord { 
    constructor(url) {
        this.client = new discord.WebhookClient({ url: webhookUrl });
    }

    login() {
        this.client.login(process.env.DISCORD_TOKEN);
    }

    // ====================================================================================================
    // Send
    sendMessage(message) {
        this.client.send(message);
    }

    sendEmbed(title, color, description) {
        color = parseInt(color, 16);

        const embed = new discord.EmbedBuilder()
            .setTitle(title)
            .setDescription(description)
            .setColor(color) 
            .setTimestamp()
        this.client.send({ embeds: [embed] });
    }
}

module.exports = Discord;