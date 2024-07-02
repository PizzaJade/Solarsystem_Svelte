declare module 'openai' {
    // Add the specific types you need for your project here.
    export type ChatCompletionRequestMessage = {
      role: 'user' | 'assistant' | 'system';
      content: string;
    };
  
    export class OpenAIApi {
      constructor(configuration: any);
      createChatCompletion(options: { messages: ChatCompletionRequestMessage[] }): Promise<any>;
    }
  }