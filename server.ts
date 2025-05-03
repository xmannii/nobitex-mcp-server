import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { NobitexService } from "./services/nobitex.service.js";
import { registerMarketTools } from "./tools/market.tools.js";

const nobitexService = new NobitexService();

const server = new McpServer({
  name: "NobitexMarketDataServer",
  version: "1.0.1", 
  
});

registerMarketTools(server, nobitexService);

async function startServer() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
  } catch (error) {
    console.error("Failed to start MCP server:", error); 
    process.exit(1); 
  }
}

startServer(); 