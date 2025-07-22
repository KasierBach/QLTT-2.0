require('dotenv').config();

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

app.post("/api/chat", async (req, res) => {
  const userMsg = req.body.message;
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: "Bạn là trợ lý bán hàng thân thiện, trả lời ngắn gọn." },
      { role: "user", content: userMsg }
    ]
  });
  res.json({ reply: completion.data.choices[0].message.content });
});

async function sendMessage() {
  const input = document.getElementById('chat-input-field');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';

  // gọi AI
  const resp = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: text })
  });
  const data = await resp.json();
  appendMessage('bot', data.reply);
}

function appendMessage(sender, txt) {
  const chatMessages = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.className = `message ${sender}-message`;
  msg.innerHTML = `<p>${txt}</p>`;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
