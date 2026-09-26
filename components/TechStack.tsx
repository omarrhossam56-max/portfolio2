"use client";

import { motion } from "framer-motion";

const mainTools = [
  "n8n", "Make", "Flowise", "VAPI", "ElevenLabs", "OpenAI GPT-4", "Claude API", "MCP Server"
];

const secondaryTools = [
  "Zapier", "Airtable", "Notion", "Google Sheets", "Google Drive", "Cloudinary", "Pinecone", 
  "WhatsApp API", "Telegram API", "Facebook API", "Instagram API", "YouTube API", "Webhooks", 
  "REST APIs", "Prompt Engineering", "RAG Systems", "WordPress", "Gmail"
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

export default function TechStack() {
  return (
    <section id="skills" className="py-24 px-4 bg-bg-primary">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <span className="inline-block text-xs font-bold tracking-[0.3em] uppercase text-accent mb-4">
            Tech Stack
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">Tools I Master</h2>
          <p className="text-text-secondary text-lg">
            The ecosystem powering intelligent automations.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {mainTools.map((tool, i) => (
            <motion.span
              key={`main-${i}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-5 py-2.5 text-sm font-bold text-accent bg-accent/10 border border-accent/30 rounded-full shadow-sm cursor-default"
              style={{ boxShadow: "0 4px 12px rgba(59,130,246,0.18)" }}
            >
              {tool}
            </motion.span>
          ))}
          
          {secondaryTools.map((tool, i) => (
            <motion.span
              key={`sec-${i}`}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-5 py-2.5 text-sm font-medium text-text-secondary bg-bg-card border border-border rounded-full hover:border-accent/40 hover:text-text-primary transition-colors cursor-default"
            >
              {tool}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
