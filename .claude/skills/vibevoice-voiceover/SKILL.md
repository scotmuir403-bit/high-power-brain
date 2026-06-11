---
name: vibevoice-voiceover
description: "Generate AI voiceover audio from a script using Microsoft's VibeVoice TTS model via the fal.ai API. Supports single and multi-speaker (up to 4) audio with preset voices or voice cloning. Trigger on phrases like 'turn this script into a voiceover', 'generate audio for this script', 'make a voiceover', 'VibeVoice this', 'create an AI voice demo', or any request to turn text into spoken audio."
---

# VibeVoice Voiceover

Generate AI voiceover audio from a script using Microsoft's VibeVoice model, hosted on fal.ai (no local install or GPU needed).

**Background:** see `7 - Resources/VibeVoice — AI Voiceover Tool.md`. Short version — this is for **client work, B-roll narration, and multi-speaker demo clips**. It is NOT for replacing Scott's own TikTok talking-head videos; his voice and face are the brand.

## Setup required

- `FAL_KEY` must be set in `Vault/.env` (same fal.ai account used for AI images).
- If it's missing, tell the user to add it — it's documented in `Vault/key-inventory.md`.

## Step 1 — Get the script text

If the user points at an existing script (e.g. this week's TikTok scripts doc), read it. Otherwise use the text they paste directly.

**Strip everything that isn't spoken dialogue:**
- Remove `*On-screen: ...*` lines
- Remove section labels like `[HOOK]`, `[BRIDGE]`, `[VALUE]`, `[CTA]`
- Remove visual direction blocks
- Keep only the lines a voice would actually say

## Step 2 — Single vs multi-speaker

Default: **single speaker** (`Speaker 0`).

If the user wants a dialogue/demo (e.g. "make this a two-person convo for a client pitch"), split into turns across `Speaker 0`–`Speaker 3` (max 4 speakers).

Format the script exactly like:
```
Speaker 0: <line>
Speaker 1: <line>
```

## Step 3 — Pick voices

Ask the user, or default to:
- Single speaker → `Maya [EN]` (warm, neutral) or `Frank [EN]` (male)
- Two speakers → `Frank [EN]` + `Alice [EN]`

Other presets: Carter, Mary (all `[EN]`), plus Mandarin presets (Anchen, Bowen, Xinran).

For a cloned voice, the user provides a URL to a clean audio sample (10–30s, no background noise) — use `"voice": {"url": "..."}` for that speaker instead of `"preset"`.

## Step 4 — Call the fal.ai API

```bash
source Vault/.env

curl -s -X POST "https://queue.fal.run/fal-ai/vibevoice" \
  -H "Authorization: Key $FAL_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "script": "Speaker 0: Your spoken script text goes here.",
    "speakers": [{"preset": "Maya [EN]"}],
    "cfg_scale": 1.3
  }'
```

Use `fal-ai/vibevoice/7b` instead of `fal-ai/vibevoice` for higher quality (costs more — confirm with the user first).

This returns a `request_id`. Poll for completion:

```bash
curl -s "https://queue.fal.run/fal-ai/vibevoice/requests/$REQUEST_ID/status" \
  -H "Authorization: Key $FAL_KEY"
```

Once `status` is `COMPLETED`, fetch the result:

```bash
curl -s "https://queue.fal.run/fal-ai/vibevoice/requests/$REQUEST_ID" \
  -H "Authorization: Key $FAL_KEY"
```

The response includes an `audio.url` field — download it.

> **First run note:** fal.ai's exact response field names can drift between models/versions. If something doesn't match, print the raw JSON and adapt — don't guess or fabricate a URL.

## Step 5 — Save the output

```bash
mkdir -p "9 - Operations/runs/voiceovers"
curl -s -L -o "9 - Operations/runs/voiceovers/YYYY-MM-DD-<slug>.mp3" "<audio_url>"
```

Use today's date and a short slug from the topic/script.

## Step 6 — Report back

- File saved location
- Approximate cost (audio length × $0.04/min for 1.5B; 7B costs more)
- Reminder: this is for client/demo use, not Scott's own TikTok voice

## Notes

- Costs are billed to Scott's fal.ai account. Confirm before running 7B requests or long scripts — cost scales with audio duration.
- If the API call fails, show the actual error. Never fabricate a result.
