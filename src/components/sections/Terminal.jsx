import { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../context/NavigationContext";
import styles from "./Terminal.module.css";

const COMMANDS = {
  help: () => [
    "Available commands:",
    "  about      — about me",
    "  education  — education history",
    "  projects   — portfolio projects",
    "  contact    — contact information",
    "  history    — command history",
    "  themes     — change the terminal theme",
    "  clear      — clear the terminal",
    "  gui        — switch to the graphical interface",
  ],
  about:     () => ["[about — not yet implemented]"],
  education: () => ["[education — not yet implemented]"],
  projects:  () => ["[projects — not yet implemented]"],
  contact:   () => ["[contact — not yet implemented]"],
  themes:    () => ["[themes — not yet implemented]"],
  history:   "history",
  clear:     "clear",
  gui:       null,
};

export function Terminal() {
  const { goTo } = useNavigation();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  function handleSubmit(e) {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    setInput("");

    if (!cmd) return;

    if (cmd === "gui") {
      setHistory((h) => [...h, { cmd, output: ["Switching to GUI..."] }]);
      setTimeout(() => goTo("landing"), 300);
      return;
    }

    if (cmd === "clear") {
      setHistory([]);
      return;
    }

    if (cmd === "history") {
      const cmds = history.map((e, i) => `  ${i + 1}  ${e.cmd}`);
      setHistory((h) => [...h, { cmd, output: cmds.length ? cmds : ["No history yet."] }]);
      return;
    }

    const handler = COMMANDS[cmd];
    const output = typeof handler === "function"
      ? handler()
      : [`Command not found: ${cmd}. Type 'help' for a list of commands.`];
    setHistory((h) => [...h, { cmd, output }]);
  }

  return (
    <section className={styles.terminal}>
      <div className={styles.output}>
        {history.map((entry, i) => (
          <div key={i}>
            <div className={styles.prompt}>$ {entry.cmd}</div>
            {entry.output.map((line, j) => (
              <div key={j} className={styles.line}>{line}</div>
            ))}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <span className={styles.caret}>$</span>
        <input
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
    </section>
  );
}
