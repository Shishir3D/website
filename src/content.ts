export const chapters = [
  { number: '01', name: 'THE WELL', title: 'Stay curious.', copy: 'A small view made me ask bigger questions.' },
  { number: '02', name: 'THE RIM', title: 'Build beyond demos.', copy: 'Latency and reliability turn experiments into products.' },
  { number: '03', name: 'THE VALLEY', title: 'Connect the pieces.', copy: 'Models, APIs, data and interfaces work best together.' },
  { number: '04', name: 'THE HORIZON', title: 'Keep looking up.', copy: 'I’m exploring local voice AI for Nepali.' },
] as const;

export const projects = [
  {
    id: 'voice', number: '01', label: 'REAL-TIME VOICE AI', title: 'When a conversation cannot wait.',
    description: 'I owned a voice-to-voice AI system supporting 1,000+ concurrent users, integrated into an app with 500k+ downloads. My work covered speech, orchestration, APIs, inference and deployment. I also explore local Nepali STT, LLM and TTS components.',
    video: '/media/voice.mp4?v=2', poster: '/media/voice.webp?v=2',
    tags: ['WebRTC', 'LiveKit', 'FastAPI', 'TTS', 'AWS'],
    fact: '1,000+ concurrent users',
  },
  {
    id: 'support', number: '02', label: 'LOCAL AI / CUSTOMER SUPPORT', title: 'A support bot that runs locally.',
    description: 'I built a customer-support agent using retrieval and a locally deployed LLM. It uses relevant knowledge to answer questions while keeping inference on local infrastructure.',
    video: '/media/support.mp4', poster: '/media/support.webp',
    tags: ['Local LLM', 'RAG', 'Python', 'Agent'],
    fact: 'Local model inference',
  },
  {
    id: 'mobile', number: '03', label: 'MOBILE / SAAS', title: 'A product that travels with its users.',
    description: 'At Simal I built an end-to-end, multi-tenant SaaS mobile app in React Native with Supabase and PostgreSQL, including a generative UI dashboard for reporting.',
    video: '/media/mobile.mp4?v=2', poster: '/media/mobile.webp?v=2',
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
