const { Client, GatewayIntentBits } = require('discord.js');
const htp = require('html2plaintext');

const discord = async (req, res) => {
  const { message, threadId } = req.body
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });
  client.login(process.env.DISCORDBOTTOKEN)
  client.on('ready', async () => {
    const parsedMessage = htp(message)

    const sentMessage = "\n=============================\n\n" + parsedMessage.replace(/[^\w\s]/g, ' ').replace(/\s{2,}/g, '\n') + "\n\n============================="
    
    const thread = client.channels.cache.get(threadId);

    const messages = await thread.messages.fetch({ limit: 30});

    for(const [key, prevMessage] of messages){
      if(prevMessage.content === sentMessage)return res.status(200).json({message: "Already notified"})
    }
    thread.send(sentMessage)
    res.status(200).json({message: "Notified"})
  });
}

module.exports = discord