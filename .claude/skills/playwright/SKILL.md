---
name: playwright
description: Browser automation via Playwright MCP server. Navigate websites, click elements, fill forms, extract data, take screenshots, and perform full browser automation workflows. Use when the user wants to interact with websites, scrape data, or automate browser tasks.
metadata:
  tags: browser, automation, scraping, playwright, mcp, web
  requires_bin: npx
---

# Playwright — Browser Automation

Control Chrome, Firefox, or WebKit from Claude Code using the Playwright MCP server. Navigate pages, click buttons, fill forms, extract data, and take screenshots.

## Setup

### Step 1: Install Playwright

```bash
npm install -g @playwright/mcp
npx playwright install chromium
```

### Step 2: Add MCP Server to Claude Code

Add the Playwright MCP server to your Claude Code settings. Edit `~/.claude/settings.json`:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp", "--headless"]
    }
  }
}
```

For visible browser (useful for debugging):

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp"]
    }
  }
}
```

Restart Claude Code after adding the config.

### Server Options

```bash
# Headless mode (no visible browser)
npx @playwright/mcp --headless

# Specific browser
npx @playwright/mcp --browser firefox

# Custom viewport
npx @playwright/mcp --viewport-size 1280x720

# Ignore HTTPS errors
npx @playwright/mcp --ignore-https-errors

# Restrict to specific hosts
npx @playwright/mcp --allowed-hosts example.com,api.example.com

# Save screenshots and videos
npx @playwright/mcp --output-dir ./playwright-output --save-video 1280x720
```

## MCP Tools Reference

Once configured, these tools are available to Claude:

| Tool | Description |
|------|-------------|
| `browser_navigate` | Navigate to URL |
| `browser_click` | Click element by selector |
| `browser_type` | Type text into input |
| `browser_select_option` | Select dropdown option |
| `browser_get_text` | Get text content |
| `browser_evaluate` | Execute JavaScript |
| `browser_snapshot` | Get accessible page snapshot |
| `browser_close` | Close browser context |
| `browser_choose_file` | Upload file |
| `browser_press` | Press keyboard key |

## Common Workflows

### Navigate and Extract Data

```
1. browser_navigate to the page URL
2. browser_snapshot to see the page structure
3. browser_get_text to extract specific content
4. browser_evaluate to run JavaScript for complex extraction
```

### Fill and Submit Forms

```
1. browser_navigate to the form URL
2. browser_type into each input field
3. browser_select_option for dropdowns
4. browser_click to submit
5. browser_get_text to verify the result
```

### Login to a Website

```
browser_navigate: { url: "https://example.com/login" }
browser_type: { selector: "#username", text: "user" }
browser_type: { selector: "#password", text: "pass" }
browser_click: { selector: "#submit" }
browser_get_text: { selector: ".welcome-message" }
```

### Extract Table Data

```
browser_navigate: { url: "https://example.com/data" }
browser_evaluate: {
  script: "() => { return Array.from(document.querySelectorAll('table tr')).map(r => r.textContent); }"
}
```

## Security Notes

- By default restricts file system access to workspace root
- Use `--allowed-hosts` to restrict which domains can be visited
- Sandboxing enabled by default
- Service workers blocked by default

## Troubleshooting

- **MCP tools not available** — Make sure the server is in `~/.claude/settings.json` and restart Claude Code
- **Browser not found** — Run `npx playwright install chromium`
- **Page won't load** — Try adding `--ignore-https-errors` to the server args
- **Need to see what's happening** — Remove `--headless` from the args to show the browser window
- **Update browsers** — Run `npx playwright install chromium`
