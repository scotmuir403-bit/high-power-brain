# HeyGen + HyperFrames

Installed: October 2026, via `npx skills add heygen-com/hyperframes`.

## What it is

- **HyperFrames** — turns HTML into rendered MP4 video. Claude writes the video as a web page, the CLI renders it.
- **HeyGen** — the account behind it. Gives you AI voiceover (TTS), stock music and sound effects, avatar video, and cloud rendering.

You don't need HeyGen to make a video. You need it for voiceover and music.

## What's installed

21 skills in `.claude/skills/`. Versions pinned in `skills-lock.json`.
Start any video request with `/hyperframes` — it routes to the right one.

The ones that fit your content:

| Skill | Use it for |
|---|---|
| `faceless-explainer` | TikTok explainers from a script — no face needed |
| `embedded-captions` | Captions on your talking-head clips |
| `talking-head-recut` | Lower-thirds, stat cards, callouts over your own footage |
| `motion-graphics` | Short title cards, stat hits, logo stings |
| `media-use` | Voiceover, music, SFX (needs HeyGen login) |

## One-time setup on your PC (Git Bash)

1. Check everything's there:
   ```
   npx hyperframes doctor
   ```
2. Install the browser it renders with:
   ```
   npx hyperframes browser ensure
   ```
3. Log in to HeyGen. Use OAuth — it uses your free plan credits. An API key bills paid API credits instead.
   ```
   npx hyperframes auth login
   ```
   This opens the browser. Check it worked with `npx hyperframes auth status`.
4. For voiceover and music search, also install the HeyGen CLI from https://developers.heygen.com/cli. It shares the same login — no second sign-in needed. Then test:
   ```
   npx hyperframes media-use resolve --doctor
   ```

Credentials save to `~/.heygen/credentials`. Never commit them to this repo.

## Optional

- `whisper-cpp` — local transcription for captions. Only if you want to caption without HeyGen.
- FFmpeg — needed for rendering and audio. Install via `winget install ffmpeg` if `doctor` says it's missing.

## Updating

```
npx hyperframes skills check
npx hyperframes skills update
```
