"""Build the public, phone-free one-page resume from the portfolio source."""
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import simpleSplit

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/resume/Shishir-Poudel-Resume.pdf'
pdfmetrics.registerFont(TTFont('Space', str(ROOT / 'public/fonts/space-grotesk-regular.ttf')))
pdfmetrics.registerFont(TTFont('SpaceBold', str(ROOT / 'public/fonts/space-grotesk-bold.ttf')))
pdfmetrics.registerFont(TTFont('Plex', str(ROOT / 'public/fonts/ibm-plex-mono.ttf')))
ink, green, muted = [HexColor(x) for x in ('#202725', '#567c45', '#53665b')]
W, H = 595.28, 841.89
c = canvas.Canvas(str(OUT), pagesize=(W,H), pageCompression=1)
c.setTitle('Shishir Poudel - AI Engineer Resume')
c.setAuthor('Shishir Poudel')
x, right = 45, W-45
y = H-48

def text(value, size=9.2, font='Space', color=ink, leading=13, max_width=505):
    global y
    c.setFont(font,size); c.setFillColor(color)
    for line in simpleSplit(value,font,size,max_width):
        c.drawString(x,y,line); y-=leading

def label(value):
    global y
    y-=14
    c.setStrokeColor(ink); c.setLineWidth(.7); c.line(x,y+7,right,y+7)
    c.setFillColor(green); c.setFont('Plex',8.5); c.drawString(x,y-8,value.upper()); y-=27

def item(title, date, lines):
    global y
    c.setFillColor(ink); c.setFont('SpaceBold',11.3); c.drawString(x,y,title)
    c.setFillColor(muted); c.setFont('Plex',7.4); c.drawRightString(right,y+1,date.upper()); y-=18
    for line in lines:
        text('• ' + line,8.9,leading=12,max_width=505)
    y-=5

c.setFillColor(HexColor('#f8f6ed')); c.rect(0,0,W,H,fill=1,stroke=0)
c.setFillColor(ink); c.setFont('SpaceBold',27); c.drawString(x,y,'Shishir Poudel'); y-=23
c.setFillColor(green); c.setFont('Plex',9); c.drawString(x,y,'AI ENGINEER  /  NEPAL'); y-=19
c.setFillColor(muted); c.setFont('Space',9.1)
c.drawString(x,y,'shishirpoudel.dev@gmail.com  ·  github.com/Shishir3D  ·  linkedin.com/in/shishir3d'); y-=13
c.drawString(x,y,'shishir-poudel.com.np'); y-=10
label('Profile')
text('AI engineer building and deploying backend AI systems, LLM/RAG pipelines, agentic workflows and real-time voice AI. Experienced with Python, FastAPI, PostgreSQL, AWS, Docker, Linux and CI/CD.',9.2,leading=13)
label('Experience')
item('AI Developer  /  Next AI Pvt. Ltd','Nov 2025 - Present',[
'Own a real-time voice-to-voice AI system supporting 1,000+ concurrent users, integrated into an app with 500k+ downloads.',
'Build speech processing, FastAPI integrations, orchestration and scalable deployment workflows.',
'Fine-tuned Gemma 3 for customer support and Piper TTS; deployed Omni Voice and Qwen3 TTS inference.',
'Prompt-engineered 48 English-learning AI characters. Built a customer-support agent with RAG and local LLM inference; exploring local Nepali STT, LLM and TTS components.'
])
item('Full-Stack Developer  /  Simal','Jun 2025 - Present',[
'Built an end-to-end multi-tenant SaaS mobile app with React Native, Supabase and PostgreSQL; added a generative UI dashboard for reporting.'
])
label('Technical skills')
for heading, value in [
('AI / LLM', 'LLM APIs, RAG, agentic workflows, structured output, embeddings, document chunking, prompt engineering, voice/audio'),
('Backend / Cloud', 'Python, FastAPI, Flask, REST APIs, Docker, AWS, Linux, Git, CI/CD, Jenkins, WebRTC, WebSockets, LiveKit, Grafana'),
('Product / Data', 'JavaScript, Java, C++, Dart, React Native, PostgreSQL, MySQL, MongoDB, Supabase')]:
    text(heading,8.4,'SpaceBold',green,leading=12)
    text(value,8.8,leading=12)
    y-=3
label('Achievements and education')
text('NASA Space Apps Challenge 2023 — Honorable Mention  ·  Hackathon winner',8.9,leading=13)
text('AWS Certified Cloud Practitioner  ·  AWS Machine Learning Fundamentals',8.9,leading=13)
text('BSc (Hons) Computing with Artificial Intelligence  ·  2023–2026',8.9,leading=13)
c.setStrokeColor(ink); c.line(x,38,right,38)
c.setFillColor(muted); c.setFont('Plex',7.5); c.drawString(x,25,'SHISHIR PO UDEL'.replace('PO UDEL','POUDEL'))
c.drawRightString(right,25,'BUILDING BEYOND THE DEMO')
if y < 55: raise RuntimeError(f'Resume overflows page: {y}')
c.save()
print(OUT)
