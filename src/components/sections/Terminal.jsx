import { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../context/NavigationContext";
import styles from "./Terminal.module.css";

const THEMES = {
  green: { bg: "#0d0d0d", fg: "#00ff41" },
  amber: { bg: "#0d0d0d", fg: "#ffb000" },
  blue:  { bg: "#0a0a18", fg: "#00cfff" },
  white: { bg: "#1c1c1c", fg: "#e2e2e2" },
};

const OUTPUT = {
  help: [
    "Available commands:",
    "  about      : about me",
    "  education  : education history",
    "  projects   : portfolio projects",
    "  contact    : contact information",
    "  history    : command history",
    "  themes     : change the terminal theme",
    "  clear      : clear the terminal",
    "  gui        : switch to the graphical interface",
  ],
  about: [
    "Jashanjodh Bajwa: CS student at Texas A&M University",
    "Major: Computer Science  |  Minors: Cybersecurity & Mathematics",
    "",
    "I build projects that tackle real challenges and curiosities,",
    "from network intrusion detection to a OneNote add-in.",
    "",
    "Experience:",
    "  Data Engineering Intern @ Plains All American Pipeline",
    "  Undergraduate Researcher @ Texas A&M University",
    "",
    "Interests: sci-fi & fantasy books, video games, TV shows",
    "",
    "Type 'projects' to see my work or 'contact' to reach me.",
  ],
  education: [
    "Texas A&M University",
    "  Degree : Bachelor of Science in Computer Science",
    "  Minors : Cybersecurity, Mathematics",
    "",
    "Coursework:",
    "",
    "  Data Structures & Algorithms:",
    "    Covers fundamental data structures (trees, graphs, hash tables)",
    "    and algorithm design, analysis, and complexity.",
    "",
    "  Computer Systems:",
    "    Multithreading, C programming, Win32 API, and synchronization",
    "    primitives (mutexes, semaphores, condition variables).",
    "",
    "  Computer Organization:",
    "    Low-level class covering hardware architecture, memory hierarchy,",
    "    and x86 Assembly programming.",
  ],
  projects: [
    "Projects:",
    "",
    "  Network Intrusion Detector:",
    "    End-to-end ML intrusion detection pipeline on UNSW-NB15",
    "    github.com/JashanjodhB/Network-Intrusion-Detector",
    "",
    "  SmartShot:",
    "    Dependency-free Win32 screen capture and PDF tool in C++17",
    "    github.com/JashanjodhB/SmartShot",
    "",
    "  Reddit Sentiment Analyzer:",
    "    WallStreetBets sentiment vs. next-day S&P 500 returns",
    "    github.com/JashanjodhB/wsbPredictionAccuracy",
    "",
    "  Restaurant POS & Analytics Platform:",
    "    Full-stack POS and analytics platform with a Gemini API assistant",
    "",
    "  Internship Alert System:",
    "    Self-hosted job-posting monitor with Discord alerts",
    "",
    "  Parallel Wikipedia Search Engine:",
    "    Multithreaded C search engine at 1.4 GB/s across a 28 GB corpus",
  ],
  contact: [
    "Get in touch:",
    "  Email    : jashanjodhb@gmail.com",
    "  LinkedIn : linkedin.com/in/jashanjodh-bajwa",
  ],
};

export function Terminal() {
  const { goTo } = useNavigation();
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState("");
  const [theme, setTheme] = useState("blue");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const t = THEMES[theme];

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
      const cmds = history.map((entry, i) => `  ${i + 1}  ${entry.cmd}`);
      setHistory((h) => [
        ...h,
        { cmd, output: cmds.length ? cmds : ["No history yet."] },
      ]);
      return;
    }

    if (cmd === "themes" || cmd.startsWith("themes ")) {
      const arg = cmd.split(" ")[1];
      if (!arg) {
        const list = Object.keys(THEMES).map(
          (k) => `  ${k}${k === theme ? " (active)" : ""}`
        );
        setHistory((h) => [
          ...h,
          { cmd, output: ["Available themes:", ...list, "", "Usage: themes <name>"] },
        ]);
      } else if (THEMES[arg]) {
        setTheme(arg);
        setHistory((h) => [...h, { cmd, output: [`Theme set to: ${arg}`] }]);
      } else {
        setHistory((h) => [
          ...h,
          { cmd, output: [`Unknown theme: ${arg}. Type 'themes' to see options.`] },
        ]);
      }
      return;
    }

    const output = OUTPUT[cmd]
      ?? [`Command not found: ${cmd}. Type 'help' for a list of commands.`];
    setHistory((h) => [...h, { cmd, output }]);
  }

  return (
    <section
      className={styles.terminal}
      style={{ background: t.bg, color: t.fg }}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((entry, i) => (
        <div key={i} className={styles.entry}>
          <div className={styles.prompt}>$ {entry.cmd}</div>
          {entry.output.map((line, j) => (
            <div key={j} className={styles.line}>{line}</div>
          ))}
        </div>
      ))}
      <form className={styles.inputRow} onSubmit={handleSubmit}>
        <span className={styles.caret}>$</span>
        <input
          ref={inputRef}
          className={styles.input}
          style={{ color: t.fg, caretColor: t.fg }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={history.length === 0 ? 'type "help" for a list of commands' : ""}
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
      </form>
      <div ref={bottomRef} />
    </section>
  );
}
