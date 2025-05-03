import { z } from "zod";

const NOBITEX_API_BASE = "https://api.nobitex.ir";

// Schemas for Nobitex API parameters 
export const MarketStatsParamsSchema = z.object({
  srcCurrency: z.string().describe("Source currency symbol (e.g., 'btc', 'usdt')"),
  dstCurrency: z.string().describe("Destination currency symbol (e.g., 'rls')"),
});
export type MarketStatsParams = z.infer<typeof MarketStatsParamsSchema>;

/**
 * Handles communication with the Nobitex public market API.
 */
export class NobitexService {
  private baseUrl: string;

  constructor(baseUrl: string = NOBITEX_API_BASE) {
    this.baseUrl = baseUrl;
  }

  // Core request function
  private async makeRequest(endpoint: string, body: object = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const responseBody = await response.json(); 

      if (!response.ok) {
        throw new Error(`Nobitex API request failed (${response.status}): ${JSON.stringify(responseBody)}`);
      }

      if (responseBody.status !== 'ok') {
      }
      return responseBody; 
    } catch (error) {

      throw new Error(`Failed to fetch from ${endpoint}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async getMarketStats(params: MarketStatsParams) {
    const data = await this.makeRequest('/market/stats', params);
    return data.stats || data;
  }

  async getGlobalStats() {
    return await this.makeRequest('/market/global-stats', {});
  }
} 