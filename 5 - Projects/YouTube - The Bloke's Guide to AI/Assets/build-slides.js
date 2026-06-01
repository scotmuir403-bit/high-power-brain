const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Will AI Replace Night Shift Workers?";
pres.author = "The Bloke's Guide to AI";

// ── PALETTE ──────────────────────────────────────────
const BG       = "12152A"; // deep navy
const CARD     = "1E2347"; // slightly lighter navy
const ACCENT   = "FF6B2B"; // bold orange
const WHITE    = "FFFFFF";
const MUTED    = "8B95C0"; // muted blue-white
const GREEN    = "2ECC71"; // check colour
const RED      = "E74C3C"; // X colour

// ── HELPERS ──────────────────────────────────────────
const makeShadow = () => ({ type: "outer", blur: 12, offset: 3, angle: 135, color: "000000", opacity: 0.35 });

function bgSlide() {
  const s = pres.addSlide();
  s.background = { color: BG };
  return s;
}

function accentBar(slide, y = 0.38) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y, w: 0.07, h: 0.55,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
}

function slideTitle(slide, text, x = 0.72, y = 0.3, w = 8.8, h = 0.65) {
  slide.addText(text, {
    x, y, w, h,
    fontFace: "Arial Black", fontSize: 28, bold: true,
    color: WHITE, align: "left", valign: "middle", margin: 0
  });
}

function tag(slide, text) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 5.1, w: 2.2, h: 0.32,
    fill: { color: ACCENT }, line: { color: ACCENT }, rectRadius: 0
  });
  slide.addText(text, {
    x: 0.55, y: 5.1, w: 2.2, h: 0.32,
    fontFace: "Arial", fontSize: 10, bold: true,
    color: WHITE, align: "center", valign: "middle", margin: 0
  });
}

// ══════════════════════════════════════════════════════
// SLIDE 1 — TITLE
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();

  // Left orange strip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });

  // Channel label top-right
  s.addText("THE BLOKE'S GUIDE TO AI", {
    x: 6.5, y: 0.28, w: 3.2, h: 0.35,
    fontFace: "Arial", fontSize: 11, bold: true,
    color: MUTED, align: "right", valign: "middle", margin: 0, charSpacing: 3
  });

  // Main title
  s.addText("WILL AI REPLACE", {
    x: 0.65, y: 1.35, w: 9.1, h: 0.85,
    fontFace: "Arial Black", fontSize: 52, bold: true,
    color: WHITE, align: "left", valign: "middle", margin: 0
  });
  s.addText("NIGHT SHIFT WORKERS?", {
    x: 0.65, y: 2.2, w: 9.1, h: 0.85,
    fontFace: "Arial Black", fontSize: 52, bold: true,
    color: ACCENT, align: "left", valign: "middle", margin: 0
  });

  // Subtitle
  s.addText("An honest answer from someone who does both.", {
    x: 0.65, y: 3.25, w: 8, h: 0.45,
    fontFace: "Arial", fontSize: 18, italic: true,
    color: MUTED, align: "left", valign: "middle", margin: 0
  });

  // Bottom rule
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.65, y: 4.8, w: 8.7, h: 0.03,
    fill: { color: MUTED }, line: { color: MUTED }
  });
  s.addText("Scott Muir  ·  Highway Maintenance  ·  30 Years  ·  Night Shift", {
    x: 0.65, y: 4.9, w: 8.7, h: 0.38,
    fontFace: "Arial", fontSize: 12,
    color: MUTED, align: "left", valign: "top", margin: 0
  });
}

// ══════════════════════════════════════════════════════
// SLIDE 2 — THE QUESTION EVERYONE'S ASKING
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();
  accentBar(s);
  slideTitle(s, "THE QUESTION EVERYONE'S ASKING");

  // Big stat card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.55, y: 1.15, w: 8.9, h: 1.5,
    fill: { color: CARD }, line: { color: CARD }, shadow: makeShadow()
  });
  s.addText("85%", {
    x: 0.75, y: 1.2, w: 2.2, h: 1.4,
    fontFace: "Arial Black", fontSize: 72, bold: true,
    color: ACCENT, align: "center", valign: "middle", margin: 0
  });
  s.addText("of workers are worried AI will change\nor eliminate their job in the next 5 years.", {
    x: 3.1, y: 1.2, w: 6.1, h: 1.4,
    fontFace: "Arial", fontSize: 18,
    color: WHITE, align: "left", valign: "middle", margin: 0
  });

  // Three fear points
  const fears = [
    "\"Is my job safe?\"",
    "\"Am I too old to learn this?\"",
    "\"Is AI just for tech people?\""
  ];
  fears.forEach((f, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.55 + i * 3.05, y: 2.95, w: 2.8, h: 1.55,
      fill: { color: CARD }, line: { color: CARD }, shadow: makeShadow()
    });
    s.addText(f, {
      x: 0.65 + i * 3.05, y: 3.0, w: 2.6, h: 1.45,
      fontFace: "Arial", fontSize: 15, italic: true,
      color: WHITE, align: "center", valign: "middle", margin: 0
    });
  });

  s.addText("These are real questions. You deserve honest answers.", {
    x: 0.55, y: 4.75, w: 8.9, h: 0.4,
    fontFace: "Arial", fontSize: 13, italic: true,
    color: MUTED, align: "center", valign: "middle", margin: 0
  });

  tag(s, "THE QUESTION");
}

// ══════════════════════════════════════════════════════
// SLIDE 3 — WHAT AI ACTUALLY IS
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();
  accentBar(s);
  slideTitle(s, "WHAT AI ACTUALLY IS");

  const cols = [
    { label: "What it CAN do", color: GREEN, items: ["Write, summarise, plan", "Answer questions", "Spot patterns in data", "Handle repetitive tasks"] },
    { label: "What it CAN'T do", color: RED, items: ["Work in the physical world", "Make judgment calls on-site", "Replace human experience", "Replicate real trust"] },
    { label: "What it IS", color: ACCENT, items: ["A tool — like a power drill", "Only as good as the input", "Available to everyone", "Not magic. Not a threat."] }
  ];

  cols.forEach((col, i) => {
    const x = 0.55 + i * 3.08;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.1, w: 2.85, h: 0.42,
      fill: { color: col.color }, line: { color: col.color }
    });
    s.addText(col.label, {
      x, y: 1.1, w: 2.85, h: 0.42,
      fontFace: "Arial", fontSize: 13, bold: true,
      color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.52, w: 2.85, h: 3.55,
      fill: { color: CARD }, line: { color: CARD }, shadow: makeShadow()
    });
    s.addText(col.items.map((item, j) => ({
      text: item,
      options: { breakLine: j < col.items.length - 1, bullet: true, paraSpaceAfter: 6 }
    })), {
      x: x + 0.12, y: 1.62, w: 2.6, h: 3.3,
      fontFace: "Arial", fontSize: 14,
      color: WHITE, align: "left", valign: "top", margin: 0
    });
  });

  tag(s, "WHAT IS AI?");
}

// ══════════════════════════════════════════════════════
// SLIDE 4 — JOBS AI IS GOOD AT
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();
  accentBar(s, 0.35);
  slideTitle(s, "JOBS AI IS GOOD AT");

  const jobs = [
    { icon: "✓", label: "Data Entry & Admin", desc: "Forms, records, scheduling — done in seconds" },
    { icon: "✓", label: "Repetitive Tasks", desc: "Anything you do the same way every time" },
    { icon: "✓", label: "Writing & Emails", desc: "First drafts, reports, replies, summaries" },
    { icon: "✓", label: "Pattern Spotting", desc: "Finding trends in numbers or text" },
    { icon: "✓", label: "Research & Summaries", desc: "Reading long documents so you don't have to" },
    { icon: "✓", label: "Answering Questions", desc: "24/7, no attitude, no waiting" }
  ];

  jobs.forEach((job, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.55 + col * 4.65;
    const y = 1.15 + row * 1.38;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.35, h: 1.22,
      fill: { color: CARD }, line: { color: CARD }, shadow: makeShadow()
    });
    // Green check circle
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.15, y: y + 0.31, w: 0.55, h: 0.55,
      fill: { color: GREEN }, line: { color: GREEN }
    });
    s.addText(job.icon, {
      x: x + 0.15, y: y + 0.28, w: 0.55, h: 0.58,
      fontFace: "Arial Black", fontSize: 18, bold: true,
      color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addText(job.label, {
      x: x + 0.82, y: y + 0.1, w: 3.35, h: 0.38,
      fontFace: "Arial", fontSize: 14, bold: true,
      color: WHITE, align: "left", valign: "middle", margin: 0
    });
    s.addText(job.desc, {
      x: x + 0.82, y: y + 0.5, w: 3.35, h: 0.55,
      fontFace: "Arial", fontSize: 12,
      color: MUTED, align: "left", valign: "top", margin: 0
    });
  });

  tag(s, "AI STRENGTHS");
}

// ══════════════════════════════════════════════════════
// SLIDE 5 — JOBS AI STRUGGLES WITH
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();
  accentBar(s, 0.35);
  slideTitle(s, "JOBS AI STRUGGLES WITH");

  const jobs = [
    { label: "Physical Environments", desc: "Rain, mud, roadworks — AI can't touch a cone" },
    { label: "Unpredictable Situations", desc: "A burst pipe at 3am needs human judgment" },
    { label: "Hands-On Skilled Work", desc: "Welding, driving, operating machinery" },
    { label: "Real-World Trust", desc: "People trust a face, not a chatbot, in a crisis" },
    { label: "Emotional Intelligence", desc: "Reading a room, calming someone down" },
    { label: "On-Site Decision Making", desc: "Decades of experience can't be uploaded" }
  ];

  jobs.forEach((job, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 0.55 + col * 4.65;
    const y = 1.15 + row * 1.38;

    s.addShape(pres.shapes.RECTANGLE, {
      x, y, w: 4.35, h: 1.22,
      fill: { color: CARD }, line: { color: CARD }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.15, y: y + 0.31, w: 0.55, h: 0.55,
      fill: { color: RED }, line: { color: RED }
    });
    s.addText("✕", {
      x: x + 0.15, y: y + 0.28, w: 0.55, h: 0.58,
      fontFace: "Arial Black", fontSize: 18, bold: true,
      color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addText(job.label, {
      x: x + 0.82, y: y + 0.1, w: 3.35, h: 0.38,
      fontFace: "Arial", fontSize: 14, bold: true,
      color: WHITE, align: "left", valign: "middle", margin: 0
    });
    s.addText(job.desc, {
      x: x + 0.82, y: y + 0.5, w: 3.35, h: 0.55,
      fontFace: "Arial", fontSize: 12,
      color: MUTED, align: "left", valign: "top", margin: 0
    });
  });

  tag(s, "AI WEAKNESSES");
}

// ══════════════════════════════════════════════════════
// SLIDE 6 — THE NIGHT SHIFT REALITY
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();

  // Left panel — dark card
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 4.6, h: 5.625,
    fill: { color: CARD }, line: { color: CARD }
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.35, h: 5.625,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });

  s.addText("THE NIGHT\nSHIFT\nREALITY", {
    x: 0.55, y: 0.8, w: 3.85, h: 2.4,
    fontFace: "Arial Black", fontSize: 38, bold: true,
    color: WHITE, align: "left", valign: "top", margin: 0
  });
  s.addText("30 years. All weathers.\nAll hours. I know this.", {
    x: 0.55, y: 3.5, w: 3.85, h: 1.3,
    fontFace: "Arial", fontSize: 15, italic: true,
    color: MUTED, align: "left", valign: "top", margin: 0
  });

  // Right panel — reality points
  const points = [
    "Every shift is different. No two incidents are the same.",
    "Split-second calls — there's no time to prompt an AI.",
    "Your crew trusts you, not an algorithm.",
    "Experience lives in your hands and your gut — not a server."
  ];

  points.forEach((p, i) => {
    const y = 0.7 + i * 1.1;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.85, y, w: 4.8, h: 0.95,
      fill: { color: "1A1F36" }, line: { color: ACCENT, width: 1 }, shadow: makeShadow()
    });
    s.addText(`${i + 1}`, {
      x: 4.95, y, w: 0.5, h: 0.95,
      fontFace: "Arial Black", fontSize: 22, bold: true,
      color: ACCENT, align: "center", valign: "middle", margin: 0
    });
    s.addText(p, {
      x: 5.55, y: y + 0.08, w: 3.95, h: 0.82,
      fontFace: "Arial", fontSize: 13,
      color: WHITE, align: "left", valign: "middle", margin: 0
    });
  });

  tag(s, "THE REALITY");
}

// ══════════════════════════════════════════════════════
// SLIDE 7 — THE REAL THREAT ISN'T AI
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();

  // Full bleed orange bar at top
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.55,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });

  s.addText("THE REAL THREAT", {
    x: 0.5, y: 0.85, w: 9, h: 1.0,
    fontFace: "Arial Black", fontSize: 54, bold: true,
    color: WHITE, align: "center", valign: "middle", margin: 0
  });
  s.addText("ISN'T AI.", {
    x: 0.5, y: 1.85, w: 9, h: 1.0,
    fontFace: "Arial Black", fontSize: 54, bold: true,
    color: ACCENT, align: "center", valign: "middle", margin: 0
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.5, y: 3.05, w: 3, h: 0.04,
    fill: { color: MUTED }, line: { color: MUTED }
  });

  s.addText("It's the person who USES AI\nwhile you're still ignoring it.", {
    x: 0.5, y: 3.2, w: 9, h: 1.1,
    fontFace: "Arial", fontSize: 22,
    color: WHITE, align: "center", valign: "middle", margin: 0
  });

  s.addText("That gap is closing fast. But it's not too late.", {
    x: 0.5, y: 4.6, w: 9, h: 0.55,
    fontFace: "Arial", fontSize: 14, italic: true,
    color: MUTED, align: "center", valign: "middle", margin: 0
  });

  tag(s, "THE REAL THREAT");
}

// ══════════════════════════════════════════════════════
// SLIDE 8 — THE OPPORTUNITY
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();
  accentBar(s);
  slideTitle(s, "THE OPPORTUNITY");

  // Two big panels
  const panels = [
    { title: "DON'T compete with AI", body: "You'll lose.\nEvery time.\nIt doesn't sleep.\nIt doesn't get tired.", color: RED },
    { title: "DO work alongside it", body: "Use it for the jobs\nyou hate.\nSave your energy\nfor the work only you can do.", color: GREEN }
  ];

  panels.forEach((p, i) => {
    const x = 0.55 + i * 4.75;
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.1, w: 4.4, h: 0.48,
      fill: { color: p.color }, line: { color: p.color }
    });
    s.addText(p.title, {
      x, y: 1.1, w: 4.4, h: 0.48,
      fontFace: "Arial", fontSize: 15, bold: true,
      color: WHITE, align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.58, w: 4.4, h: 2.9,
      fill: { color: CARD }, line: { color: CARD }, shadow: makeShadow()
    });
    s.addText(p.body, {
      x: x + 0.2, y: 1.68, w: 4.0, h: 2.7,
      fontFace: "Arial", fontSize: 18,
      color: WHITE, align: "center", valign: "middle", margin: 0
    });
  });

  s.addText("The starting point: learn ONE tool. Apply it to ONE thing you do every week.", {
    x: 0.55, y: 4.72, w: 8.9, h: 0.5,
    fontFace: "Arial", fontSize: 13, italic: true, bold: true,
    color: ACCENT, align: "center", valign: "middle", margin: 0
  });

  tag(s, "THE OPPORTUNITY");
}

// ══════════════════════════════════════════════════════
// SLIDE 9 — WHAT YOU CAN DO RIGHT NOW
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();
  accentBar(s);
  slideTitle(s, "WHAT YOU CAN DO RIGHT NOW");

  const steps = [
    { num: "1", title: "Go to claude.ai", body: "Sign up free. No credit card.\nTakes 2 minutes." },
    { num: "2", title: "Pick one task you hate", body: "An email. A report. A plan.\nSomething you've been dreading." },
    { num: "3", title: "Ask Claude to help", body: "Describe what you need.\nSee what it gives you.\nThat's it." }
  ];

  steps.forEach((step, i) => {
    const x = 0.55 + i * 3.08;

    // Number circle
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.9, y: 1.1, w: 1.0, h: 1.0,
      fill: { color: ACCENT }, line: { color: ACCENT }, shadow: makeShadow()
    });
    s.addText(step.num, {
      x: x + 0.9, y: 1.1, w: 1.0, h: 1.0,
      fontFace: "Arial Black", fontSize: 32, bold: true,
      color: WHITE, align: "center", valign: "middle", margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 2.25, w: 2.85, h: 2.7,
      fill: { color: CARD }, line: { color: CARD }, shadow: makeShadow()
    });
    s.addText(step.title, {
      x: x + 0.1, y: 2.35, w: 2.65, h: 0.55,
      fontFace: "Arial Black", fontSize: 17, bold: true,
      color: ACCENT, align: "center", valign: "middle", margin: 0
    });
    s.addText(step.body, {
      x: x + 0.1, y: 3.0, w: 2.65, h: 1.8,
      fontFace: "Arial", fontSize: 14,
      color: WHITE, align: "center", valign: "top", margin: 0
    });
  });

  s.addText("Not a commitment. Just a test.", {
    x: 0.55, y: 5.1, w: 8.9, h: 0.32,
    fontFace: "Arial", fontSize: 12, italic: true,
    color: MUTED, align: "center", valign: "middle", margin: 0
  });

  tag(s, "TAKE ACTION");
}

// ══════════════════════════════════════════════════════
// SLIDE 10 — OUTRO / CTA
// ══════════════════════════════════════════════════════
{
  const s = bgSlide();

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 5.625,
    fill: { color: BG }, line: { color: BG }
  });

  // Centre orange circle
  s.addShape(pres.shapes.OVAL, {
    x: 3.75, y: 0.55, w: 2.5, h: 2.5,
    fill: { color: ACCENT }, line: { color: ACCENT }
  });
  s.addText("AI", {
    x: 3.75, y: 0.55, w: 2.5, h: 2.5,
    fontFace: "Arial Black", fontSize: 64, bold: true,
    color: WHITE, align: "center", valign: "middle", margin: 0
  });

  s.addText("THE BLOKE'S GUIDE TO AI", {
    x: 0.5, y: 3.2, w: 9, h: 0.65,
    fontFace: "Arial Black", fontSize: 30, bold: true, charSpacing: 3,
    color: WHITE, align: "center", valign: "middle", margin: 0
  });

  s.addText("Plain English. No jargon. No guru nonsense.", {
    x: 0.5, y: 3.9, w: 9, h: 0.45,
    fontFace: "Arial", fontSize: 16, italic: true,
    color: MUTED, align: "center", valign: "middle", margin: 0
  });

  // Subscribe box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 3.1, y: 4.55, w: 3.8, h: 0.65,
    fill: { color: ACCENT }, line: { color: ACCENT }, shadow: makeShadow()
  });
  s.addText("SUBSCRIBE FOR MORE", {
    x: 3.1, y: 4.55, w: 3.8, h: 0.65,
    fontFace: "Arial Black", fontSize: 16, bold: true, charSpacing: 2,
    color: WHITE, align: "center", valign: "middle", margin: 0
  });
}

// ── WRITE FILE ────────────────────────────────────────
const outPath = "C:\\Users\\scott\\High Power Brain\\5 - Projects\\YouTube - The Bloke's Guide to AI\\Assets\\Video 02 - Will AI Replace Night Shift Workers - Slides.pptx";

pres.writeFile({ fileName: outPath })
  .then(() => console.log("✅ Saved: " + outPath))
  .catch(e => console.error("❌ Error:", e));
