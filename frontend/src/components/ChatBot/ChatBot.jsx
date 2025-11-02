import './ChatBot.css';
import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const userMessage = { sender: 'user', text: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
  
    try {
      const res = await axios.post("http://localhost:4000/api/chatbot", { message: input });
      const botMessage = { sender: 'bot', text: res.data.response };
      setMessages([...newMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <p key={i} style={{ color: msg.sender === 'user' ? 'blue' : 'green' }}>
            {msg.sender}: {msg.text}
          </p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBot;
