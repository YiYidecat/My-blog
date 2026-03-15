<template>
  <div class="ai-chat-assistant">
    <div class="chat-header">
      <h3>AI 助手</h3>
      <div class="header-controls">
        <select v-model="selectedModel" class="model-selector" @change="onModelChange">
          <option value="local">本地模型</option>
          <option value="ollama">Ollama</option>
          <option value="deepseek">DeepSeek</option>
          <option value="kimi">Kimi</option>
        </select>
        <button class="toggle-btn" @click="toggleChat">
          {{ isOpen ? '隐藏' : '显示' }}
        </button>
      </div>
    </div>
    
    <div v-show="isOpen" class="chat-container">
      <div class="chat-messages" ref="messagesContainer">
        <div 
          v-for="(msg, index) in messages" 
          :key="index" 
          :class="['message', msg.role]"
        >
          <div class="message-content" v-html="formatMessage(msg.content)"></div>
        </div>
      </div>
      
      <div class="chat-input-area">
        <textarea
          v-model="inputMessage"
          @keydown.ctrl.enter="sendMessage"
          placeholder="向AI助手提问，例如：帮我将这段内容转换为AKN4UN XML格式..."
          class="chat-input"
        ></textarea>
        <button 
          @click="sendMessage" 
          :disabled="isProcessing || !inputMessage.trim()"
          class="send-btn"
        >
          {{ isProcessing ? '发送中...' : '发送' }}
        </button>
      </div>
      
      <div class="security-controls">
        <div class="security-indicator">
          <span 
            class="secure-badge" 
            :class="{ active: isSecureConnection }"
            @click="toggleSecureConnection"
            title="点击切换安全连接状态"
          >
            🔐 安全连接
          </span>
          <span 
            class="privacy-badge" 
            :class="{ active: privacyMode }"
            @click="togglePrivacyMode"
            title="点击切换隐私模式"
          >
            👁️ 隐私模式
          </span>
        </div>
        <div class="action-buttons">
          <button class="action-btn" @click="insertXmlToEditor" title="将XML插入编辑器">
            📄 插入XML
          </button>
          <button class="action-btn" @click="exportXml" title="导出XML文件">
            💾 导出
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getAIService, initializeAIService } from '@/apis/aiService.js'

// Props
const props = defineProps({
  currentContent: {
    type: String,
    default: ''
  },
  currentTitle: {
    type: String,
    default: ''
  }
})

// Emits
const emit = defineEmits(['content-update', 'title-update'])

// Reactive data
const isOpen = ref(false)
const inputMessage = ref('')
const messages = ref([])
const isProcessing = ref(false)
const isSecureConnection = ref(true)
const privacyMode = ref(true)
const messagesContainer = ref(null)
const selectedModel = ref('ollama') // 默认选择Ollama模型

// Computed properties
const systemPrompt = computed(() => {
  return `你是一个专业的法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
  
能力说明：
1. 将普通文本内容转换为标准的AKN4UN XML格式
2. 提取文档中的关键信息（如章节、条款、段落等）
3. 检查XML格式的正确性
4. 优化文档结构以符合联合国文档标准
5. 提供关于AKN4UN标准的专业建议

AKN4UN XML标准示例：
<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <document type="bill">
    <meta>
      <identification source="#source">
        <FRBRWork>
          <FRBRthis value="/akn/un/document/"/>
          <FRBRuri value="/akn/un/document"/>
          <FRBRdate date="2024-01-01" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/un/document/eng@2024-01-01;_generation"/>
          <FRBRuri value="/akn/un/document/eng@2024-01-01"/>
          <FRBRdate date="2024-01-01" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/un/document/eng@2024-01-01;generation.xml"/>
          <FRBRuri value="/akn/un/document/eng@2024-01-01.akn"/>
          <FRBRdate date="2024-01-01" name="Generation"/>
        </FRBRManifestation>
      </identification>
      <publication date="2024-01-01" name="" showAs=""/>
      <classification source="#source">
        <keyword value="" showAs="" dictionary=""/>
      </classification>
      <lifecycle source="#source">
        <eventRef source="#source" date="2024-01-01" type="generation"/>
      </lifecycle>
      <references source="#source">
        <TLCPerson id="author" href="#author" showAs="Author"/>
      </references>
    </meta>
    <body>
      <section id="section_1">
        <num>1</num>
        <heading>Section Title</heading>
        <paragraph id="para_1">
          <content>
            <p>Document content here...</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>

请根据用户提供的内容进行相应的操作。`
})

// Methods
const toggleChat = () => {
  isOpen.value = !isOpen.value
}

const formatMessage = (content) => {
  // Simple formatting for code blocks
  return content
    .replace(/```xml([\s\S]*?)```/g, '<pre class="code-block"><code class="language-xml">$1</code></pre>')
    .replace(/```([\s\S]*?)```/g, '<pre class="code-block"><code>$1</code></pre>')
    .replace(/\n/g, '<br>') // Preserve line breaks
}

// Toggle privacy mode
const togglePrivacyMode = () => {
  privacyMode.value = !privacyMode.value
  ElMessage.info(privacyMode.value ? '隐私模式已启用' : '隐私模式已禁用')
}

// Toggle secure connection simulation
const toggleSecureConnection = () => {
  isSecureConnection.value = !isSecureConnection.value
  ElMessage.info(isSecureConnection.value ? '安全连接已启用' : '安全连接已禁用')
}

// Handle model change
const onModelChange = () => {
  // 更新AI服务实例以使用新选择的模型
  initializeAIService(selectedModel.value);
  ElMessage.info(`已切换到 ${getModelName(selectedModel.value)} 模型`);
}

// Get model display name
const getModelName = (model) => {
  const modelNames = {
    'local': '本地模型',
    'ollama': 'Ollama',
    'deepseek': 'DeepSeek',
    'kimi': 'Kimi'
  };
  return modelNames[model] || model;
}

const addMessage = (role, content) => {
  messages.value.push({ role, content })
  // Auto-scroll to bottom
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

const encryptContent = (content) => {
  // Simple encryption using base64 as a basic obfuscation
  // In production, use proper encryption libraries like crypto-js
  if (!privacyMode.value) return content
  return btoa(encodeURIComponent(content)).substring(0, 10) + '[ENCRYPTED]' + 
         btoa(encodeURIComponent(content)).slice(-10)
}

const decryptContent = (encryptedContent) => {
  // Decryption logic
  if (!privacyMode.value) return encryptedContent
  try {
    const encryptedPart = encryptedContent.match(/\[ENCRYPTED\](.+)$/)?.[1]
    if (encryptedPart) {
      return decodeURIComponent(atob(encryptedPart.slice(-10)))
    }
    return encryptedContent
  } catch (e) {
    return encryptedContent
  }
}

const sendMessage = async () => {
  if (!inputMessage.value.trim() || isProcessing.value) return

  const userMessage = inputMessage.value
  addMessage('user', userMessage)
  inputMessage.value = ''
  isProcessing.value = true

  try {
    // Add system context about current document
    const contextPrompt = `当前文档标题: "${props.currentTitle}"
当前文档内容: "${props.currentContent}"

用户问题: ${userMessage}
请根据上述文档内容回答用户的问题。`

    // Initialize AI service with selected model and get instance
    initializeAIService(selectedModel.value);
    const aiService = getAIService();
    
    // Call AI service
    const aiResponse = await aiService.sendMessage(contextPrompt, {
      currentTitle: props.currentTitle,
      currentContent: props.currentContent,
      systemPrompt: systemPrompt.value
    })
    
    addMessage('assistant', aiResponse)
    
    // Check if response contains XML conversion request
    if (aiResponse.includes('<akomaNtoso') && aiResponse.includes('</akomaNtoso>')) {
      // Extract XML and emit to parent component
      const xmlMatch = aiResponse.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/)
      if (xmlMatch) {
        const extractedXml = xmlMatch[1] || xmlMatch[2]
        emit('content-update', { xml: extractedXml, text: extractTextFromXml(extractedXml) })
      }
    }
  } catch (error) {
    console.error('AI response error:', error)
    addMessage('assistant', '抱歉，处理您的请求时出现了错误。请稍后再试。')
    ElMessage.error(`AI服务错误: ${error.message || '请求失败'}`)
  } finally {
    isProcessing.value = false
  }
}



const extractTextFromXml = (xmlString) => {
  // Simple extraction of text content from XML
  const tempDiv = document.createElement('div')
  tempDiv.innerHTML = xmlString
  return tempDiv.textContent || tempDiv.innerText || ''
}

// Insert latest XML response to editor
const insertXmlToEditor = () => {
  const lastXmlMessage = [...messages.value].reverse().find(msg => 
    msg.role === 'assistant' && msg.content.includes('<akomaNtoso') && msg.content.includes('</akomaNtoso>')
  )
  
  if (lastXmlMessage) {
    const xmlMatch = lastXmlMessage.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/)
    if (xmlMatch) {
      const extractedXml = xmlMatch[1] || xmlMatch[2]
      emit('content-update', { xml: extractedXml, text: extractTextFromXml(extractedXml) })
      ElMessage.success('XML已插入到编辑器')
    } else {
      ElMessage.warning('未找到有效的XML内容')
    }
  } else {
    ElMessage.warning('聊天记录中未找到XML内容')
  }
}

// Export XML as file
const exportXml = () => {
  const lastXmlMessage = [...messages.value].reverse().find(msg => 
    msg.role === 'assistant' && msg.content.includes('<akomaNtoso') && msg.content.includes('</akomaNtoso>')
  )
  
  if (lastXmlMessage) {
    const xmlMatch = lastXmlMessage.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/)
    if (xmlMatch) {
      const extractedXml = xmlMatch[1] || xmlMatch[2]
      const blob = new Blob([extractedXml], { type: 'application/xml' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `document-${new Date().toISOString().split('T')[0]}.xml`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      ElMessage.success('XML文件已导出')
    } else {
      ElMessage.warning('未找到有效的XML内容')
    }
  } else {
    ElMessage.warning('聊天记录中未找到XML内容')
  }
}

// Initialize with a welcome message
onMounted(() => {
  addMessage('assistant', '您好！我是您的AI助手，专门帮助您处理AKN4UN XML格式的文档。您可以向我提问如何转换内容、优化结构或检查格式等问题。')
})

// Clean up event listeners if needed
onUnmounted(() => {
  // Cleanup code if necessary
})
</script>

<style scoped>
.ai-chat-assistant {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 500px;
  z-index: 1000;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: white;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: #409eff;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.model-selector {
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 14px;
}

.model-selector:focus {
  outline: none;
  border-color: rgba(255, 255, 255, 0.6);
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.chat-container {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
  background-color: #fafafa;
}

.message {
  margin-bottom: 12px;
  max-width: 85%;
}

.message.user {
  margin-left: auto;
  text-align: right;
}

.message.assistant {
  margin-right: auto;
}

.message-content {
  padding: 8px 12px;
  border-radius: 18px;
  display: inline-block;
}

.message.user .message-content {
  background-color: #409eff;
  color: white;
}

.message.assistant .message-content {
  background-color: #e6f7ff;
  color: #333;
}

.chat-input-area {
  padding: 12px;
  border-top: 1px solid #eee;
  background: white;
}

.chat-input {
  width: calc(100% - 60px);
  height: 60px;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: none;
  font-family: inherit;
  font-size: 14px;
}

.send-btn {
  width: 80px;
  height: 40px;
  margin-left: 8px;
  background-color: #409eff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-btn:disabled {
  background-color: #a0cfff;
  cursor: not-allowed;
}

.security-controls {
  padding: 8px 12px;
  border-top: 1px solid #eee;
  background: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
}

.security-indicator {
  display: flex;
  gap: 8px;
}

.secure-badge, .privacy-badge {
  padding: 4px 8px;
  border-radius: 12px;
  opacity: 0.6;
  cursor: pointer;
  transition: all 0.3s;
}

.secure-badge.active, .privacy-badge.active {
  opacity: 1;
  background: #e6f7ff;
  color: #1890ff;
  box-shadow: 0 0 4px rgba(24, 144, 255, 0.3);
}

.action-buttons {
  display: flex;
  gap: 6px;
}

.action-btn {
  background: #f0f9ff;
  border: 1px solid #b3d8ff;
  color: #409eff;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.action-btn:hover {
  background: #ecf5ff;
  box-shadow: 0 0 4px rgba(64, 158, 255, 0.3);
}

.code-block {
  background: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 8px;
  margin: 8px 0;
  overflow-x: auto;
  font-family: monospace;
  font-size: 13px;
}
</style>