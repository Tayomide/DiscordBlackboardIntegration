const { Client, GatewayIntentBits } = require('discord.js');
const htp = require('html2plaintext');

/*
  A function to get a message, check if message has previously been sent and send message if it has not
*/
const discord = async (req, res) => {
  // Get professor update and discord thread id
  const { message, threadId } = req.body

  // Create a client to handle sending message
  const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
  });

  // Authenticate the client
  client.login(process.env.DISCORDBOTTOKEN)

  // Start logic once client is authenticated
  client.on('ready', async () => {
    // Parse html message
    const parsedMessage = htp(message)

    // Format message for discord
    const sentMessage = "=============================\n\n" + parsedMessage.replace(/[^\w\s]/g, ' ').replace(/\s{2,}/g, '\n') + "\n\n============================="
    
    // Get messages from thread
    const thread = client.channels.cache.get(threadId);
    const messages = await thread.messages.fetch({ limit: 30});

    // Check if message has already been sent
    for(const [key, prevMessage] of messages){
      if(prevMessage.content === sentMessage)return res.status(200).json({message: "Already notified"})
    }

    // Send message if message has not previously been sent
    thread.send(sentMessage)

    // Send a response
    res.status(200).json({message: "Notified"})
  });
}

module.exports = discord