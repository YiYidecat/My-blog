/**
 * AI Configuration for the blog application
 * This file manages AI provider settings and configurations
 */


// Default AI configuration
const defaultAIConfig = {
  provider: 'ollama', // Options: 'deepseek', 'kimi', 'local', 'ollama'
  settings: {
    deepseek: {
      apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '', // 从环境变量获取API密钥
      model: 'deepseek-chat',
      temperature: 0.7,
      maxTokens: 8192
    },
    kimi: {
      apiKey: '',
      model: 'kimi-large', // Placeholder - actual model name when API is available
      temperature: 0.7,
      maxTokens: 2048
    },
    local: {
      // Local model settings would go here
      enabled: true
    },
    ollama: {
      enabled: true,
      baseUrl: 'http://localhost:11434/api', // Default Ollama API endpoint
      model: 'qwen2.5:7b', // Recommended model for Chinese content
      temperature: 0.7,
      contextSize: 2048
    }
  },
  features: {
    xmlConversion: true,
    documentAnalysis: true,
    contentOptimization: true,
    securityEnabled: true
  },
  security: {
    enableEncryption: true,
    enablePrivacyMode: true,
    dataRetentionDays: 30
  }
};

// Load configuration from localStorage or use defaults
const loadAIConfig = () => {
  try {
    const savedConfig = localStorage.getItem('aiConfig');
    return savedConfig ? JSON.parse(savedConfig) : defaultAIConfig;
  } catch (error) {
    console.warn('Failed to load AI config from localStorage, using defaults:', error);
    return defaultAIConfig;
  }
};

// Save configuration to localStorage
const saveAIConfig = (config) => {
  try {
    localStorage.setItem('aiConfig', JSON.stringify(config));
    return true;
  } catch (error) {
    console.error('Failed to save AI config to localStorage:', error);
    return false;
  }
};

// Get specific provider settings
const getProviderSettings = (provider) => {
  const config = loadAIConfig();
  return config.settings[provider] || {};
};

// Update provider API key
const updateProviderApiKey = (provider, apiKey) => {
  const config = loadAIConfig();
  if (config.settings[provider]) {
    config.settings[provider].apiKey = apiKey;
    saveAIConfig(config);
    return true;
  }
  return false;
};

// Get current active provider
const getCurrentProvider = () => {
  const config = loadAIConfig();
  return config.provider;
};

// Set current active provider
const setCurrentProvider = (provider) => {
  const config = loadAIConfig();
  if (['deepseek', 'kimi', 'local', 'ollama', 'openai', 'anthropic', 'google'].includes(provider)) {
    config.provider = provider;
    saveAIConfig(config);
    return true;
  }
  return false;
};

export {
  defaultAIConfig,
  loadAIConfig,
  saveAIConfig,
  getProviderSettings,
  updateProviderApiKey,
  getCurrentProvider,
  setCurrentProvider
};