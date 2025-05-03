# 📊 Nobitex Market Data MCP Server

This is a Model Context Protocol (MCP) server that provides access to cryptocurrency market data from the Nobitex API.

## ✨ Features

- Get market statistics for specific cryptocurrency pairs
- Get global cryptocurrency market statistics

## 🛠️ Tools

- `getMarketStats`: Fetch statistics for a specific cryptocurrency market pair
- `getGlobalStats`: Fetch global cryptocurrency market statistics

## 🚀 Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the server:
   ```bash
   npm run start
   ```

## 🔗 Usage with Claude Desktop

To add this server to Claude Desktop:

1. Open Claude Desktop settings
2. Go to the "Developer" section and click "Edit Config"
3. Add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "nobitex": {
      "command": "npm",
      "args": [
        "--prefix",
        "/path/to/this/repo",
        "run",
        "start"
      ]
    }
  }
}
```

Replace `/path/to/this/repo` with the actual path to this repository on your computer.

4. Restart Claude Desktop

## Example Prompts

- "What are the current Bitcoin prices in rials?"
- "What is the current global cryptocurrency market status?"
