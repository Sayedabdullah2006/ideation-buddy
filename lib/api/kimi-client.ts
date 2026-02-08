/**
 * AI API Client (Legacy KIMI compatibility layer)
 *
 * Re-exports Gemini client for backward compatibility.
 * All KIMI references now use Google Gemini 2.5 Flash.
 */

export {
  generateCompletion,
  generateWithContext,
  parseAIJSON,
  testConnection,
  GeminiAPIError as KIMIAPIError,
  GeminiRateLimitError as KIMIRateLimitError,
  GeminiAuthenticationError as KIMIAuthenticationError,
  type GenerateOptions,
} from './gemini-client';

export default {
  generateCompletion: require('./gemini-client').generateCompletion,
  generateWithContext: require('./gemini-client').generateWithContext,
  parseAIJSON: require('./gemini-client').parseAIJSON,
  testConnection: require('./gemini-client').testConnection,
};
