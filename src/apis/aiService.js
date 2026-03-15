/**
 * AI Service API for interacting with AI models
 * This service handles communication with various AI providers
 */
import { loadAIConfig, getProviderSettings, getCurrentProvider } from '@/config/aiConfig.js';

// Configuration for different AI providers
const AI_PROVIDERS = {
  DEEPSEEK: 'deepseek',
  KIMI: 'kimi',
  LOCAL: 'local',  // For local models or mock implementations
  OLLAMA: 'ollama' // For Ollama local models
};

class AIService {
  constructor(provider = null, apiKey = null) {
    // Use configured provider if none provided
    this.provider = provider || getCurrentProvider() || AI_PROVIDERS.LOCAL;
    // Use provided API key or get from config
    this.config = loadAIConfig();
    this.apiKey = apiKey || this._getApiKeyFromConfig(this.provider);
    this.settings = getProviderSettings(this.provider);
    this.baseURL = this.getBaseURL();
  }

  _getApiKeyFromConfig(provider) {
    const settings = getProviderSettings(provider);
    return settings.apiKey || null;
  }

  getBaseURL() {
    switch (this.provider) {
      case AI_PROVIDERS.DEEPSEEK:
        return 'https://api.deepseek.com';
      case AI_PROVIDERS.KIMI:
        // Kimi API endpoint - this is a placeholder as Kimi doesn't have a public API yet
        // In reality, you would use the actual Kimi API endpoint when available
        return 'https://api.kimi.com/v1'; 
      case AI_PROVIDERS.OLLAMA:
        // Ollama runs locally by default on port 11434
        return this.settings.ollamaBaseUrl || 'http://localhost:11434/api';
      default:
        return null; // Local/mocked implementation
    }
  }

  /**
   * Generic method to send a message to the AI service
   */
  async sendMessage(prompt, options = {}) {
    switch (this.provider) {
      case AI_PROVIDERS.DEEPSEEK:
        return this._callDeepSeek(prompt, options);
      case AI_PROVIDERS.KIMI:
        return this._callKimi(prompt, options);
      case AI_PROVIDERS.OLLAMA:
        return this._callOllama(prompt, options);
      default:
        return this._callLocal(prompt, options);
    }
  }

  /**
   * DeepSeek API call
   */
  async _callDeepSeek(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('DeepSeek API key is required');
    }

    const settings = { ...this.settings, ...options };
    
    const response = await fetch(`${this.baseURL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({
        model: settings.model || 'deepseek-chat',
        messages: [
          { role: 'system', content: options.systemPrompt || this.getDefaultSystemPrompt() },
          { role: 'user', content: prompt }
        ],
        temperature: settings.temperature || options.temperature || 0.7,
        max_tokens: settings.maxTokens || options.maxTokens || 8192,
        stream: false
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || '';
      
      // Handle specific DeepSeek errors
      if (response.status === 429) {
        // Rate limit or quota exceeded - fall back to local service
        console.warn('DeepSeek quota exceeded, falling back to local service');
        return this._callLocal(prompt, options);
      } else if (response.status === 401) {
        throw new Error(`DeepSeek authentication error: Invalid API key. ${errorMessage}`);
      } else if (response.status === 403) {
        throw new Error(`DeepSeek access forbidden: ${errorMessage}`);
      } else {
        throw new Error(`DeepSeek API error (${response.status}): ${errorMessage}`);
      }
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || '';
  }

  /**
   * Kimi API call
   * Note: Kimi doesn't have a public API yet, this is a placeholder
   * In practice, you would replace this with actual Kimi API implementation
   */
  async _callKimi(prompt, options = {}) {
    if (!this.apiKey) {
      throw new Error('Kimi API key is required');
    }

    // Since Kimi doesn't have a public API yet, we'll fall back to local service
    // In the future, when Kimi opens its API, replace this with actual API call
    console.warn('Kimi API not yet available, falling back to local service');
    return this._callLocal(prompt, options);
  }

  /**
   * Ollama API call
   */
  async _callOllama(prompt, options = {}) {
    const settings = { ...this.settings, ...options };
    const model = settings.ollamaModel || 'qwen2.5:7b'; // Default to qwen2.5:7b which is good for Chinese
    
    const response = await fetch(`${this.baseURL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: options.systemPrompt || this.getDefaultSystemPrompt() },
          { role: 'user', content: prompt }
        ],
        stream: false,
        options: {
          temperature: settings.temperature || options.temperature || 0.7,
          num_ctx: settings.contextSize || 2048 // Context window size
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || errorData.message || 'Unknown error';
      throw new Error(`Ollama API error (${response.status}): ${errorMessage}`);
    }

    const data = await response.json();
    return data.message?.content || data.response || '';
  }

  /**
   * Local/mocked implementation
   */
  async _callLocal(prompt, options = {}) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, return a simulated response
    // In a real local implementation, you might connect to a local LLM
    return this._simulateResponse(prompt, options);
  }

  /**
   * Simulated response for demo/local purposes
   */
  _simulateResponse(prompt, options = {}) {
    const lowerPrompt = prompt.toLowerCase();

    if (lowerPrompt.includes('convert') || lowerPrompt.includes('xml') || lowerPrompt.includes('akn4un')) {
      const docTitle = options.currentTitle || "Untitled Document";
      const docContent = options.currentContent || "Content to be converted...";
      
      return `好的，我已将您的内容转换为AKN4UN XML格式：

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <document type="bill">
    <meta>
      <identification source="#source">
        <FRBRWork>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(docTitle)}/"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(docTitle)}/"/>
          <FRBRdate date="${new Date().toISOString().split('T')[0]}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(docTitle)}/eng@${new Date().toISOString().split('T')[0]};_generation"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(docTitle)}/eng@${new Date().toISOString().split('T')[0]}"/>
          <FRBRdate date="${new Date().toISOString().split('T')[0]}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(docTitle)}/eng@${new Date().toISOString().split('T')[0]};generation.xml"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(docTitle)}/eng@${new Date().toISOString().split('T')[0]}.akn"/>
          <FRBRdate date="${new Date().toISOString().split('T')[0]}" name="Generation"/>
        </FRBRManifestation>
      </identification>
      <publication date="${new Date().toISOString().split('T')[0]}" name="" showAs=""/>
      <classification source="#source">
        <keyword value="${this._sanitizeForXml(docTitle.toLowerCase())}" showAs="${this._sanitizeForXml(docTitle)}" dictionary="legal"/>
      </classification>
      <lifecycle source="#source">
        <eventRef source="#source" date="${new Date().toISOString().split('T')[0]}" type="generation"/>
      </lifecycle>
      <references source="#source">
        <TLCPerson id="author" href="#author" showAs="Document Author"/>
      </references>
    </meta>
    <body>
      <section id="section_1">
        <num>1</num>
        <heading>${this._sanitizeForXml(docTitle)}</heading>
        <paragraph id="para_1">
          <content>
            <p>${this._sanitizeForXml(docContent)}</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>
\`\`\`

您可以直接使用此XML代码，或进一步调整以满足您的具体需求。`;
    } else if (lowerPrompt.includes('help') || lowerPrompt.includes('instruction') || lowerPrompt.includes('how')) {
      return `我可以帮助您：

1. 将普通文本转换为AKN4UN XML格式
2. 优化现有的XML结构
3. 提取文档中的关键信息
4. 检查XML格式的正确性
5. 提供关于AKN4UN标准的专业建议

例如，您可以问我：
- "帮我把当前内容转换成AKN4UN XML格式"
- "优化这个XML文档的结构"
- "检查这段XML是否符合AKN4UN标准"
- "解释一下AKN4UN的某个元素的用途"`;
    } else {
      return `我已经收到您的请求："${prompt.substring(0, 50)}..."。基于我的分析，以下是相关建议：

如果您需要将内容转换为AKN4UN XML格式，请明确说明，我可以帮您生成标准格式的XML文档。

如果您想了解如何更好地组织您的法律文档，请告诉我具体的文档类型或主题，我可以提供针对性的建议。`;
    }
  }

  /**
   * Sanitize content for XML
   */
  _sanitizeForXml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Get default system prompt for legal/AKN4UN documents
   */
  getDefaultSystemPrompt() {
    return `你是一个专业的法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
    
能力说明：
1. 将普通文本内容转换为标准的AKN4UN XML格式
2. 提取文档中的关键信息（如章节、条款、段落等）
3. 检查XML格式的正确性
4. 优化文档结构以符合联合国文档标准
5. 提供关于AKN4UN标准的专业建议

请根据用户提供的内容进行相应的操作。`;
  }
}

// Export singleton instance
let aiService = null;

export const initializeAIService = (provider = null, apiKey = null) => {
  aiService = new AIService(provider, apiKey);
  return aiService;
};

export const getAIService = () => {
  if (!aiService) {
    // Initialize with configured provider by default, fallback to local
    const config = loadAIConfig();
    const provider = config.provider || 'local';
    aiService = new AIService(provider);
  }
  return aiService;
};