export const chapters = [
  {
    number: '01', name: 'THE WELL', title: 'Start with a question.',
    copy: 'I learned to code because I wanted to change the rules of a game. The trick never worked. The curiosity did.',
  },
  {
    number: '02', name: 'THE RIM', title: 'Make the leap real.',
    copy: 'A demo is the beginning. I work on the latency, reliability and deployment that let an AI system hold up in a real conversation.',
  },
  {
    number: '03', name: 'THE VALLEY', title: 'Connect the pieces.',
    copy: 'Models, APIs, data and interfaces need to work together. I like building the paths between them.',
  },
  {
    number: '04', name: 'THE HORIZON', title: 'Keep looking up.',
    copy: 'The next questions are about useful, private and multilingual AI, especially for Nepali language and people.',
  },
] as const;

export const projects = [
  {
    id: 'voice', number: '01', label: 'REAL-TIME VOICE AI', title: 'When a conversation cannot wait.',
    description: 'I owned a voice-to-voice AI system supporting 1,000+ concurrent users, integrated into an app with 500k+ downloads. My work covered speech, orchestration, APIs, inference and deployment.',
    video: '/media/voice.mp4', poster: '/media/voice.webp',
    tags: ['WebRTC', 'LiveKit', 'FastAPI', 'TTS', 'AWS'],
    fact: '1,000+ concurrent users',
  },
  {
    id: 'legal', number: '02', label: 'GROUNDED AI / RAG', title: 'Answers that know where they came from.',
    description: 'I built a legal AI retrieval system for Nepal’s Constitution, Acts and Najirs. It retrieves, reranks and grounds generated answers in relevant source material.',
    video: '/media/legal.mp4', poster: '/media/legal.webp',
    tags: ['RAG', 'Reranking', 'Python', 'LLMs'],
    fact: 'Source-grounded answers',
  },
  {
    id: 'mobile', number: '03', label: 'MOBILE / SAAS', title: 'A product that travels with its users.',
    description: 'At Simal I built an end-to-end, multi-tenant SaaS mobile app in React Native with Supabase and PostgreSQL, including a generative UI dashboard for reporting.',
    video: '/media/mobile.mp4', poster: '/media/mobile.webp',
    tags: ['React Native', 'Supabase', 'PostgreSQL'],
    fact: 'Multi-tenant mobile product',
  },
] as const;

export const repositories = [
  {
    id: 'plant', number: 'A', title: 'Plant Monitoring System',
    description: 'An ESP32 system that watches soil moisture, temperature and water level, automates watering and sends readings to Blynk.',
    href: 'https://github.com/Shishir3D/PlantMonitoringSystem',
    tags: ['ESP32', 'C++', 'IoT'],
  },
  {
    id: 'pyquest', number: 'B', title: 'PyQuest',
    description: 'An educational game made for Hackademia 2.0 that generates multiple-choice questions with the Gemini API.',
    href: 'https://github.com/Shishir3D/pyquest',
    tags: ['C#', 'Gemini API', 'Game'],
  },
  {
    id: 'cpr', number: 'C', title: 'CPR Feedback',
    description: 'A training device using an ultrasonic sensor, Arduino and Bluetooth to graph CPR compression movement in real time.',
    href: 'https://github.com/Shishir3D/CPR-Feedback',
    tags: ['Arduino', 'Sensors', 'Bluetooth'],
  },
] as const;

export const capabilities = [
  ['AI SYSTEMS', 'LLM APIs, RAG, agentic workflows, fine-tuning, embeddings, structured output'],
  ['VOICE + REAL-TIME', 'Speech AI, TTS, WebRTC, WebSockets, LiveKit'],
  ['BACKEND + CLOUD', 'Python, FastAPI, Flask, Docker, AWS, Linux, CI/CD, Jenkins'],
  ['DATA + PRODUCT', 'PostgreSQL, MySQL, MongoDB, React Native, Supabase'],
] as const;
