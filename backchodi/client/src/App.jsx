import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chat", { message: input });
      const botMessage = { role: "assistant", content: response.data.reply };

      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h1>ChatGPT App</h1>
      <div style={{ border: "1px solid #ccc", padding: "10px", height: "300px", overflowY: "auto" }}>
        {messages.map((msg, index) => (
          <p key={index} style={{ color: msg.role === "user" ? "blue" : "green" }}>
            <strong>{msg.role === "user" ? "You: " : "ChatGPT: "}</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ width: "80%", padding: "10px", marginTop: "10px" }}
      />
      <button onClick={sendMessage} style={{ padding: "10px", marginLeft: "10px" }}>Send</button>
    </div>
  );
}

export default App;
