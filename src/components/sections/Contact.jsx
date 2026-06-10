import { useState } from "react";
import { ChapterLayout } from "../ChapterLayout/ChapterLayout";
import styles from "./Contact.module.css";


const FORMSPREE_ENDPOINT = "https://formspree.io/f/mgobzbql";

export function Contact() {
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(fields),
      });
      if (res.ok) {
        setStatus("success");
        setFields({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <ChapterLayout chapterNum="IV" title="Contact">
      <div className={styles.body}>
        <p className={styles.intro}>
          Want to get in touch? Send a message below or reach out via email at my <a href="mailto:jashanjodhb@gmail.com">Email</a> or <a href="https://www.linkedin.com/in/jashanjodh-bajwa/" target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>

        {status === "success" ? (
          <div className={styles.successMsg}>
            <span className={styles.successIcon}>✦</span>
            <p>Message received — I'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className={styles.input}
                  value={fields.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={styles.input}
                  value={fields.email}
                  onChange={handleChange}
                  autoComplete="off"
                />
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className={styles.textarea}
                value={fields.message}
                onChange={handleChange}
              />
            </div>

            {status === "error" && (
              <p className={styles.errorMsg}>Something went wrong — please try again.</p>
            )}

            <button
              type="submit"
              className={styles.submit}
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </ChapterLayout>
  );
}
