<template>
  <div class="rich-text-editor">
    <div class="editor-toolbar">
      <div class="toolbar-group">
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('bold')" 
          title="Bold"
          :class="{ 'active': isActive('bold') }"
        >
          <strong>B</strong>
        </button>
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('italic')" 
          title="Italic"
          :class="{ 'active': isActive('italic') }"
        >
          <em>I</em>
        </button>
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('underline')" 
          title="Underline"
          :class="{ 'active': isActive('underline') }"
        >
          U
        </button>
      </div>
      
      <div class="toolbar-group">
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('heading', { level: 1 })" 
          title="Heading 1"
          :class="{ 'active': isActive('heading', { level: 1 }) }"
        >
          H1
        </button>
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('heading', { level: 2 })" 
          title="Heading 2"
          :class="{ 'active': isActive('heading', { level: 2 }) }"
        >
          H2
        </button>
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('heading', { level: 3 })" 
          title="Heading 3"
          :class="{ 'active': isActive('heading', { level: 3 }) }"
        >
          H3
        </button>
      </div>
      
      <div class="toolbar-group">
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('bulletList')" 
          title="Bullet List"
          :class="{ 'active': isActive('bulletList') }"
        >
          • List
        </button>
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('orderedList')" 
          title="Ordered List"
          :class="{ 'active': isActive('orderedList') }"
        >
          1. List
        </button>
      </div>
      
      <div class="toolbar-group">
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('blockquote')" 
          title="Blockquote"
          :class="{ 'active': isActive('blockquote') }"
        >
          "
        </button>
        <button 
          type="button" 
          class="toolbar-btn" 
          @click="format('codeBlock')" 
          title="Code Block"
          :class="{ 'active': isActive('codeBlock') }"
        >
          &lt;/&gt;
        </button>
      </div>
    </div>
    
    <div 
      ref="editorElement" 
      class="editor-content"
      contenteditable="true"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      :placeholder="placeholder"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '开始输入...'
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// Refs
const editorElement = ref(null)
let isEditorUpdating = false

// Helper function to save and restore cursor position
const saveCursorPosition = () => {
  if (!editorElement.value) return null
  const selection = window.getSelection()
  if (!selection.rangeCount) return null
  
  const range = selection.getRangeAt(0)
  const preCaretRange = range.cloneRange()
  preCaretRange.selectNodeContents(editorElement.value)
  preCaretRange.setEnd(range.endContainer, range.endOffset)
  return preCaretRange.toString().length
}

const restoreCursorPosition = (caretPos) => {
  if (!editorElement.value || caretPos === null) return
  
  let charIndex = 0
  const walker = document.createTreeWalker(
    editorElement.value,
    NodeFilter.SHOW_TEXT,
    null,
    false
  )
  
  let node
  while ((node = walker.nextNode())) {
    const nextCharIndex = charIndex + node.textContent.length
    if (caretPos <= nextCharIndex) {
      const range = document.createRange()
      range.setStart(node, caretPos - charIndex)
      range.collapse(true)
      
      const selection = window.getSelection()
      selection.removeAllRanges()
      selection.addRange(range)
      break
    }
    charIndex = nextCharIndex
  }
}

// Update editor content when modelValue changes, preserving cursor position
watch(() => props.modelValue, (newValue) => {
  if (!isEditorUpdating && editorElement.value) {
    // Save current cursor position
    const caretPos = saveCursorPosition()
    
    isEditorUpdating = true
    
    // Only update if the content is actually different
    if (editorElement.value.innerHTML !== (newValue || '')) {
      editorElement.value.innerHTML = newValue || ''
      
      // // Clean up empty paragraphs that sometimes get created
      // if (editorElement.value.innerHTML === '<p><br></p>') {
      //   editorElement.value.innerHTML = ''
      // }
    }
    
    // Restore cursor position after the update
    if (caretPos !== null) {
      nextTick(() => {
        restoreCursorPosition(caretPos)
        isEditorUpdating = false
      })
    } else {
      nextTick(() => {
        isEditorUpdating = false
      })
    }
  }
}, { immediate: true })

// Format text using document.execCommand (basic implementation)
const format = (command, options = null) => {
  // Temporarily disable updating to prevent cursor jumping
  isEditorUpdating = true
  
  document.execCommand(command, false, options)
  editorElement.value.focus()
  
  // Allow a brief moment for the command to execute, then trigger update
  setTimeout(() => {
    isEditorUpdating = false
    onInput()
  }, 0)
}

// Check if a formatting is active
const isActive = (command, options = null) => {
  if (!editorElement.value) return false
  try {
    return document.queryCommandState(command)
  } catch (e) {
    console.warn('Could not check command state:', e)
    return false
  }
}

// Handle input events
const onInput = () => {
  if (!isEditorUpdating && editorElement.value) {
    const content = editorElement.value.innerHTML
    // Prevent updating if content hasn't actually changed
    if (content !== props.modelValue) {
      emit('update:modelValue', content)
    }
  }
}

// Handle focus events
const onFocus = () => {
  emit('focus')
}

// Handle blur events
const onBlur = () => {
  emit('blur')
}

// Initialize editor
onMounted(() => {
  // Ensure editor has proper styling
  if (editorElement.value) {
    editorElement.value.setAttribute('style', `
      min-height: 300px;
      padding: 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      line-height: 1.6;
    `)
    
    // Set initial content only if it doesn't match current content
    if (props.modelValue && editorElement.value.innerHTML !== props.modelValue) {
      editorElement.value.innerHTML = props.modelValue
    }
  }
})

// Cleanup
onBeforeUnmount(() => {
  // Any cleanup code if needed
})
</script>

<style scoped>
.rich-text-editor {
  display: flex;
  flex-direction: column;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  display: flex;
  flex-wrap: wrap;
  background-color: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
  padding: 8px;
  gap: 4px;
}

.toolbar-group {
  display: flex;
  gap: 2px;
  margin-right: 12px;
  padding-right: 12px;
  border-right: 1px solid #e4e7ed;
}

.toolbar-group:last-child {
  border-right: none;
  margin-right: 0;
}

.toolbar-btn {
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
}

.toolbar-btn:hover {
  background-color: #ecf5ff;
  border-color: #b3d8ff;
}

.toolbar-btn.active {
  background-color: #409eff;
  color: white;
  border-color: #409eff;
}

.editor-content {
  flex: 1;
  min-height: 300px;
  overflow-y: auto;
  padding: 12px;
  outline: none;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
  line-height: 1.6;
}

.editor-content:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

.editor-content:empty:before {
  content: attr(placeholder);
  color: #c0c4cc;
  pointer-events: none;
}

.editor-content:focus-visible {
  outline: none;
}

/* Rich text content styles */
.editor-content h1 {
  font-size: 1.8rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #303133;
}

.editor-content h2 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.8rem;
  font-weight: bold;
  color: #303133;
}

.editor-content h3 {
  font-size: 1.25rem;
  margin-top: 1.2rem;
  margin-bottom: 0.6rem;
  font-weight: bold;
  color: #303133;
}

.editor-content p {
  margin-top: 0;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.editor-content strong {
  font-weight: bold;
}

.editor-content em {
  font-style: italic;
}

.editor-content u {
  text-decoration: underline;
}

.editor-content ul, .editor-content ol {
  margin: 1rem 0;
  padding-left: 1.5rem;
}

.editor-content li {
  margin-bottom: 0.25rem;
}

.editor-content blockquote {
  margin: 1rem 0;
  padding: 0.5rem 1rem;
  border-left: 3px solid #409eff;
  background-color: #f5f7fa;
  color: #606266;
}

.editor-content code {
  background-color: #f5f7fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  font-size: 0.875em;
}

.editor-content pre {
  background-color: #2d333b;
  color: #f0f0f0;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1rem 0;
}

.editor-content pre code {
  background: none;
  padding: 0;
  border-radius: 0;
}
</style>