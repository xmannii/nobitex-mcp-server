//evals.ts

import { EvalConfig } from 'mcp-evals';
import { openai } from "@ai-sdk/openai";
import { grade, EvalFunction } from "mcp-evals";

const getMarketStatsEval: EvalFunction = {
    name: 'getMarketStatsEval',
    description: 'Evaluates the getMarketStats tool functionality',
    run: async () => {
        const result = await grade(openai("gpt-4"), "Please retrieve the latest market stats for BTC/USDT from Nobitex.");
        return JSON.parse(result);
    }
};

const getGlobalStatsEval: EvalFunction = {
  name: 'getGlobalStatsEval',
  description: 'Evaluates the getGlobalStats tool functionality',
  run: async () => {
    const result = await grade(openai("gpt-4"), "What are the current global stats for all crypto markets according to Nobitex?");
    return JSON.parse(result);
  }
};

const config: EvalConfig = {
    model: openai("gpt-4"),
    evals: [getMarketStatsEval, getGlobalStatsEval]
};
  
export default config;
  
export const evals = [getMarketStatsEval, getGlobalStatsEval];