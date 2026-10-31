import { useState } from "react";
import "./ChatInput.css";

type Props = {
  onSubmit: (question: string) => void;
};

function ChatInput({ onSubmit }: Props) {
  const [text, setText] = useState("");

  function handleSubmit() {
    onSubmit(text);
    setText("");
  }

  return (
    <div className="chat-input">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ask any question"
      />
      <button onClick={handleSubmit}>Send</button>
    </div>
  );
}

export default ChatInput;
