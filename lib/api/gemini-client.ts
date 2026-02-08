/**
 * Google Gemini AI API Client
 *
 * Handles communication with Google Gemini API for AI generation.
 * Includes error handling, rate limiting, and retry logic.
 */

// ============================================
// CONFIGURATION
// ============================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const REQUEST_TIMEOUT = 60000; // 60 seconds

// ============================================
// ERROR CLASSES
// ============================================

export class GeminiAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: any
  ) {
    super(message);
    this.name = 'GeminiAPIError';
  }
}

export class GeminiRateLimitError extends GeminiAPIError {
  constructor(message: string = 'تم تجاوز حد الطلبات. حاول مرة أخرى لاحقاً.') {
    super(message, 429);
    this.name = 'GeminiRateLimitError';
  }
}

export class GeminiAuthenticationError extends GeminiAPIError {
  constructor(message: string = 'خطأ في المصادقة مع Gemini AI') {
    super(message, 401);
    this.name = 'GeminiAuthenticationError';
  }
}

// ============================================
// HELPER FUNCTIONS
// ============================================

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function validateConfig(): void {
  if (!GEMINI_API_KEY) {
    throw new GeminiAPIError('GEMINI_API_KEY is not configured in environment variables');
  }
}

function parseErrorResponse(error: any, statusCode?: number): GeminiAPIError {
  if (statusCode === 429) {
    return new GeminiRateLimitError();
  }

  if (statusCode === 401 || statusCode === 403) {
    return new GeminiAuthenticationError();
  }

  if (error?.error?.message) {
    return new GeminiAPIError(error.error.message, statusCode, error);
  }

  return new GeminiAPIError(
    'حدث خطأ أثناء الاتصال بـ Gemini AI. حاول مرة أخرى.',
    statusCode,
    error
  );
}

// ============================================
// MAIN API CLIENT
// ============================================

interface GeminiRequest {
  contents: Array<{
    role: string;
    parts: Array<{ text: string }>;
  }>;
  generationConfig?: {
    temperature?: number;
    maxOutputTokens?: number;
    topP?: number;
    topK?: number;
  };
  systemInstruction?: {
    parts: Array<{ text: string }>;
  };
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{ text: string }>;
      role: string;
    };
    finishReason: string;
  }>;
  usageMetadata?: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
}

async function sendRequestWithRetry(
  payload: GeminiRequest,
  retryCount = 0
): Promise<GeminiResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    const url = `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw parseErrorResponse(errorData, response.status);
    }

    const data: GeminiResponse = await response.json();
    return data;

  } catch (error: any) {
    if (
      error instanceof GeminiAuthenticationError ||
      error instanceof GeminiRateLimitError
    ) {
      throw error;
    }

    if (retryCount < MAX_RETRIES) {
      await delay(RETRY_DELAY * Math.pow(2, retryCount));
      return sendRequestWithRetry(payload, retryCount + 1);
    }

    if (error.name === 'AbortError') {
      throw new GeminiAPIError('انتهت مهلة الطلب. حاول مرة أخرى.', 408);
    }

    throw error instanceof GeminiAPIError
      ? error
      : new GeminiAPIError('فشل الاتصال بـ Gemini AI', undefined, error);
  }
}

// ============================================
// PUBLIC API
// ============================================

export interface GenerateOptions {
  temperature?: number;
  maxTokens?: number;
  systemPrompt?: string;
}

export async function generateCompletion(
  userPrompt: string,
  options: GenerateOptions = {}
): Promise<{
  content: string;
  tokensUsed: number;
  model: string;
}> {
  validateConfig();

  const {
    temperature = 0.7,
    maxTokens = 2000,
    systemPrompt = 'You are a helpful AI assistant specialized in Design Thinking and MVP development. Always respond in Arabic unless the user writes in English.',
  } = options;

  const payload: GeminiRequest = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userPrompt }],
      },
    ],
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      topP: 0.95,
      topK: 40,
    },
    systemInstruction: {
      parts: [{ text: systemPrompt }],
    },
  };

  const response = await sendRequestWithRetry(payload);

  const completion = response.candidates[0]?.content?.parts[0]?.text;
  if (!completion) {
    throw new GeminiAPIError('لم يتم استلام رد من Gemini AI');
  }

  const tokensUsed = response.usageMetadata?.totalTokenCount || 0;

  return {
    content: completion.trim(),
    tokensUsed,
    model: GEMINI_MODEL,
  };
}

export async function generateWithContext(
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options: GenerateOptions = {}
): Promise<{
  content: string;
  tokensUsed: number;
  model: string;
}> {
  validateConfig();

  const {
    temperature = 0.7,
    maxTokens = 2000,
  } = options;

  // Extract system prompt if present
  const systemMessage = messages.find(m => m.role === 'system');
  const conversationMessages = messages.filter(m => m.role !== 'system');

  const payload: GeminiRequest = {
    contents: conversationMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    })),
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      topP: 0.95,
      topK: 40,
    },
  };

  if (systemMessage) {
    payload.systemInstruction = {
      parts: [{ text: systemMessage.content }],
    };
  }

  const response = await sendRequestWithRetry(payload);

  const completion = response.candidates[0]?.content?.parts[0]?.text;
  if (!completion) {
    throw new GeminiAPIError('لم يتم استلام رد من Gemini AI');
  }

  return {
    content: completion.trim(),
    tokensUsed: response.usageMetadata?.totalTokenCount || 0,
    model: GEMINI_MODEL,
  };
}

export function parseAIJSON<T>(content: string): T {
  try {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1]);
    }

    // Try to extract JSON from the content directly
    const jsonStart = content.indexOf('{');
    const jsonEnd = content.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      return JSON.parse(content.slice(jsonStart, jsonEnd + 1));
    }

    // Try parsing the entire content
    return JSON.parse(content);
  } catch (error) {
    throw new GeminiAPIError('فشل تحليل استجابة AI. الرجاء المحاولة مرة أخرى.');
  }
}

export async function testConnection(): Promise<boolean> {
  try {
    await generateCompletion('Hello, test connection.', {
      maxTokens: 50,
      temperature: 0.5,
    });
    return true;
  } catch (error) {
    console.error('Gemini API connection test failed:', error);
    return false;
  }
}

export default {
  generateCompletion,
  generateWithContext,
  parseAIJSON,
  testConnection,
};
