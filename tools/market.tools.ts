import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import {
  NobitexService,
  MarketStatsParamsSchema
} from "../services/nobitex.service.js";

/**
 * Registers Nobitex market data tools with the MCP server.
 * @param server The McpServer instance.
 * @param nobitexService An instance of the NobitexService.
 */
export function registerMarketTools(server: McpServer, nobitexService: NobitexService) {

  async function handleToolCall<TParams>(toolName: string, serviceMethod: (params: TParams) => Promise<any>, params: TParams) {
    try {
      const data = await serviceMethod(params);
      const contentText = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
      return {
        content: [{ type: "text" as const, text: contentText }],
      };
    } catch (error: any) {
      console.error(`Error executing tool '${toolName}':`, error); // Log errors to stderr
      return {
        content: [{ type: "text" as const, text: `Error fetching data for ${toolName}: ${error.message}` }],
        isError: true
      };
    }
  }


  const getShape = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) => schema.shape;

  // the tools we have are here
  server.tool(
    "getMarketStats",
    getShape(MarketStatsParamsSchema),
    (params) => handleToolCall('getMarketStats', nobitexService.getMarketStats.bind(nobitexService), params)
  );

  server.tool(
    "getGlobalStats",
    {},
    (params) => handleToolCall('getGlobalStats', nobitexService.getGlobalStats.bind(nobitexService), params as Record<string, never>)
  );
} 