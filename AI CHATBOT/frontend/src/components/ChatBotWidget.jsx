import { useState } from "react";
import { Box, TextField, IconButton, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

export default function ChatBotWidget() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    const r = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input, user_id: "demo" }),
    }).then(r => r.json());
    setMessages(m => [...m, userMsg, { role: "assistant", content: r.reply }]);
  };

  return (
    <Box>
      <Paper variant="outlined" sx={{ height: 400, p: 2, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <Typography key={i} sx={{ mb: 1 }} color={m.role === 'user' ? 'primary.main' : 'text.secondary'}>
            <b>{m.role === 'user' ? 'You' : 'AI'}:</b> {m.content}
          </Typography>
        ))}
      </Paper>
      <Box sx={{ display: "flex", mt: 2 }}>
        <TextField fullWidth value={input} onChange={e => setInput(e.target.value)} placeholder="Ask anything…" />
        <IconButton onClick={send} color="primary"><SendIcon/></IconButton>
      </Box>
    </Box>
  );
}