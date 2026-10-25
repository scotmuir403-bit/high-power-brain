# VibeVoice — AI Voiceover Tool

> Research note: what VibeVoice is, the state of the official repo, and the practical way to use it.

## What it is

VibeVoice is Microsoft's open-source text-to-speech model. The headline feature is **multi-speaker, long-form conversational audio** — up to 4 speakers, up to ~90 minutes, from a script formatted like:

```
Speaker 0: First line of dialogue.
Speaker 1: Reply from the second speaker.
```

Comes in three sizes: 0.5B (realtime/streaming), 1.5B, and 7B (best quality, podcast/audiobook-grade).

## The catch — don't bother cloning the GitHub repo

In September 2025, Microsoft **pulled the TTS inference code** from `microsoft/VibeVoice` after it was used for deepfake-style misuse. What's left in the official repo is the ASR (speech-to-text) model and the small 0.5B realtime streamer — neither is what you'd want for voiceovers.

The 1.5B/7B model **weights** are still on Hugging Face, and community forks (e.g. `vibevoice-community/VibeVoice`) restore the inference code — but running it yourself means a CUDA GPU with serious VRAM, a Python/uv setup, and babysitting dependencies. Not worth it for what you need.

## The practical path: fal.ai (you already have an account)

**fal.ai hosts VibeVoice as a paid API** — same model, zero install, zero GPU:

- `fal-ai/vibevoice` (1.5B)
- `fal-ai/vibevoice/7b` (better quality, more expensive)

**Cost:** $0.04/min of generated audio (1.5B), rounded to the nearest 15 seconds. A 60-second TikTok voiceover ≈ $0.04. Even a week of daily voiceovers is pocket change.

**How it works:**
- Send a script with `Speaker 0:` / `Speaker 1:` etc.
- Pick from preset voices (Alice, Carter, Frank, Maya, etc. — all `[EN]`) or clone a voice from an audio sample URL
- Get back a single audio file with natural turn-taking between speakers

## Honest take — where this fits for Scott

**Your TikTok talking-head videos: don't use this.** Your voice and face ARE the brand — the relatability is the product. An American-accented AI voice replacing you would work against everything in the positioning.

**Where it's actually useful:**
1. **Client work (Digital Made Simple)** — a client wants explainer/demo videos with a voiceover and doesn't want to record themselves. This is a sellable deliverable.
2. **B-roll / screen-recording narration** — if you ever do a "here's the AI tool, here's what it does" segment over a screen recording rather than to-camera.
3. **Multi-speaker demo content** — showing a client "look, AI can generate a two-person conversation for your ad" is a strong proof-of-concept for a pitch.
4. **"The build" content pillar** — testing this on camera (showing the fal.ai dashboard, generating a clip) IS content. The process is the product.

## Setup

1. Get your fal.ai API key from the fal.ai dashboard (you should already have one for image generation).
2. Add it to `Vault/.env`:
   ```
   FAL_KEY=your-key-here
   ```
3. It's documented in `Vault/key-inventory.md`.
4. Use the `vibevoice-voiceover` Claude skill to generate audio from a script.

## Related

- [[6 - Areas/AI Tools & Automation]]
- [[5 - Projects/Digital Made Simple]]
