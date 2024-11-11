const axios = require('axios');

module.exports.config = {
  name: 'ai',
  version: '1.0.0',
  hasPermission: 0,
  usePrefix: false,
  aliases: ['gpt', 'openai'],
  description: "An AI command powered by GPT-4",
  usages: "ai [prompt]",
  credits: 'Developer',
  cooldowns: 3,
  dependencies: {
    "axios": ""
  }
};

module.exports.run = async function({ api, event, args }) {
  const input = args.join(' ');

  if (!input) {
    return api.sendMessage(`Please provide a question or statement after 'ai'. For example: 'ai What is the capital of France?'`, event.threadID, event.messageID);
  }

  if (input === "clear") {
    try {
      await axios.post('https://gaypt4ai.onrender.com/clear', { id: event.senderID });
      return api.sendMessage("Chat history has been cleared.", event.threadID, event.messageID);
    } catch (error) {
      console.error(error);
      return api.sendMessage('𝑝𝑜𝑠𝑒 𝑡𝑎 𝑞𝑢𝑒𝑠𝑡𝑖𝑜𝑛 𝑗'𝑦 𝑟𝑒𝑝𝑜𝑛𝑑𝑟𝑎𝑖 𝑝𝑒𝑢𝑡-ê𝑡𝑟𝑒.', event.threadID, event.messageID);
    }
  }


  let chatInfoMessageID = "";
  
  api.sendMessage(`🔍 "${input}"`, event.threadID, (error, chatInfo) => {
    chatInfoMessageID = chatInfo.messageID;
  },event.messageID);

  try {
    const url = (event.type === "message_reply" && event.messageReply.attachments[0]?.type === "photo")
      ? { link: event.messageReply.attachments[0].url }
      : {};

    const { data } = await axios.post('https://gays-porno-api.onrender.com/chat', {
      prompt: input,
      customId: event.senderID,
      ...url
    });

    api.editMessage(`${data.message}`, chatInfoMessageID, (err) => {
      if (err) {
        console.error(err);
      }
    });

  } catch (error) {
    console.error(error);
    return api.sendMessage('𝑝𝑜𝑠𝑒 𝑡𝑎 𝑞𝑢𝑒𝑠𝑡𝑖𝑜𝑛 𝑗'𝑦 𝑟𝑒𝑝𝑜𝑛𝑑𝑟𝑎𝑖 𝑝𝑒𝑢𝑡-ê𝑡𝑟𝑒.', event.threadID, event.messageID);
  }
};
