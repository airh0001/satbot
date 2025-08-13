import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSend = async () => {
    const res = await fetch("/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input })
    });
    const data = await res.json();
    setMessages([...messages, { user: input, bot: data.response }]);
    setInput("");
  };

  return (
    <Box>
      {messages.map((m, i) => (
        <div key={i}><b>You:</b> {m.user} <br/> <b>Bot:</b> {m.bot}</div>
      ))}
      <TextField fullWidth value={input} onChange={e => setInput(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>
    </Box>
  );
}