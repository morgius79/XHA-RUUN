# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claude Code + OmniRoute — a startup wrapper that routes Claude Code through a local OmniRoute API proxy. OmniRoute is an API gateway/load balancer for AI models, providing access to various model providers through a unified OpenAI-compatible endpoint.

## How to Run

```bat
start.bat
```

This launches OmniRoute in a separate window, waits for it to become available at `http://localhost:20128`, then starts Claude Code pointed at the OmniRoute proxy.

## Architecture

The entire project is a single `start.bat` script that:

1. **Launches OmniRoute** (`omniroute` command) in its own PowerShell window via `start`
2. **Polls `http://localhost:20128/v1/models`** with `curl` (up to 30 retries, 2s apart = 60s timeout) until the API responds
3. **Configures environment variables** to route Claude Code through OmniRoute:
   - `ANTHROPIC_BASE_URL` — set to the local OmniRoute endpoint
   - `ANTHROPIC_AUTH_TOKEN` — authentication token for OmniRoute
   - `ANTHROPIC_API_KEY` — left empty (auth is handled by the token above)
   - `ANTHROPIC_MODEL` / `ANTHROPIC_DEFAULT_MODEL` — set to `auto/best-coding`
4. **Starts Claude Code** (`claude`), which picks up these env vars and routes all API calls through OmniRoute

## Configuration Notes

- OmniRoute must be installed and available on `PATH` for `omniroute` to work
- The script uses a 60-second startup window for OmniRoute; if the API doesn't respond in time, it exits with an error
- All Claude Code API traffic flows through the local proxy at port 20128, allowing OmniRoute to handle model routing, load balancing, and failover across providers
