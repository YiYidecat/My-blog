<template>
  <div class="cnblogs-fullscreen">
    <div class="inner-wrapper">
      <!-- 顶部导航栏 -->
      <Header />

      <!-- 主体内容 -->
      <div class="main-body">
        <div class="content-inner">
          <!-- 左侧内容区域 -->
          <div class="content-left">
            <div class="article-editor-container">
              <div class="editor-header">
                <el-input 
                  v-model="article.title" 
                  placeholder="请输入文章标题"
                  class="title-input"
                />
                <div class="editor-actions">
                  <el-button @click="backToList">返回</el-button>
                  <el-button type="primary" @click="saveArticle">保存</el-button>
                  <el-button type="danger" @click="clearContent">清空内容</el-button>
                  <el-button type="success" @click="publishArticle">发布</el-button>
                </div>
              </div>
              
              <div class="editor-meta">
                <el-select 
                  v-model="article.category" 
                  placeholder="选择分类"
                  class="category-select"
                >
                  <el-option 
                    v-for="category in categories" 
                    :key="category.id" 
                    :label="category.name" 
                    :value="category.name"
                  ></el-option>
                </el-select>
                <el-select 
                  v-model="article.tags" 
                  multiple 
                  placeholder="选择标签"
                  class="tags-select"
                >
                  <el-option 
                    v-for="tag in allTags" 
                    :key="tag" 
                    :label="tag" 
                    :value="tag"
                  ></el-option>
                </el-select>
              </div>
              
              <div class="editor-content">
                <div class="xml-editor-section" v-if="isXmlMode">
                  <h3>AKN4UN XML 编辑器</h3>
                  <div class="xml-controls">
                    <el-button @click="switchToVisualMode" size="small">切换到可视化编辑</el-button>
                    <el-button @click="validateXml" size="small">验证XML</el-button>
                    <el-button @click="formatXml" size="small">格式化</el-button>
                  </div>
                  <textarea 
                    v-model="article.xmlContent" 
                    class="xml-textarea"
                    placeholder="在此输入AKN4UN XML内容..."
                  ></textarea>
                </div>
                
                <div class="visual-editor-section" v-else>
                  <h3>可视化编辑器</h3>
                  <div class="editor-controls">
                    <el-button @click="switchToXmlMode" size="small">切换到XML编辑</el-button>
                  </div>
                  <div class="visual-content">
                    <RichTextEditor
                      v-model="article.content"
                      placeholder="在此输入文章内容..."
                    />
                  </div>
                </div>
              </div>
              
              <div class="editor-preview" v-if="!isXmlMode">
                <h3>预览</h3>
                <div class="preview-content" v-html="article.content"></div>
              </div>
            </div>
          </div>

          <!-- 右侧边栏 -->
          <div class="sidebar-right">
            <!-- 博主信息 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">博主信息</h3>
              <div class="author-info">
                <div class="author-avatar">
                  <img
                    :src="user.avatar"
                    alt="博主头像"
                    class="avatar-img"
                  />
                </div>
                <div class="author-details">
                  <h4 class="author-name">{{ user.username }}</h4>
                  <p class="author-bio">{{ user.bio }}</p>
                  <div class="author-stats">
                    <div class="stat">
                      <span class="stat-number">{{ user.postsCount }}</span>
                      <span class="stat-label">随笔</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">{{ user.articlesCount || 0 }}</span>
                      <span class="stat-label">文章</span>
                    </div>
                    <div class="stat">
                      <span class="stat-number">{{ user.commentsCount || 0 }}</span>
                      <span class="stat-label">评论</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 编辑器提示 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">编辑器提示</h3>
              <ul class="tips-list">
                <li>支持AKN4UN XML格式编辑</li>
                <li>点击"验证XML"确保格式正确</li>
                <li>"格式化"功能可美化XML代码</li>
                <li>记得定期保存您的作品</li>
              </ul>
            </div>

            <!-- 快捷操作 -->
            <div class="sidebar-section">
              <h3 class="sidebar-title">快捷操作</h3>
              <ul class="quick-actions">
                <li>
                  <a href="#" @click.prevent="validateXml">验证XML</a>
                </li>
                <li>
                  <a href="#" @click.prevent="formatXml">格式化XML</a>
                </li>
                <li>
                  <a href="#" @click.prevent="switchToXmlMode" v-if="!isXmlMode">切换到XML模式</a>
                  <a href="#" @click.prevent="switchToVisualMode" v-else>切换到可视化模式</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <Footer />
    </div>
  </div>
  
  <!-- AI Chat Assistant -->
  <AIChatAssistant 
    :current-content="article.content" 
    :current-title="article.title"
    @content-update="handleContentUpdate"
  />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PostAPI, CategoryAPI, UserAPI } from '@/apis'
import { useUserStore } from '@/stores/userStore.js'
import Header from '@/views/Layout/components/Header.vue'
import Footer from '@/views/Layout/components/Footer.vue'
import AIChatAssistant from './AIChatAssistant.vue'

// route 路由参数
const route = useRoute()
// router 用于路由的重定向
const router = useRouter()
const userStore = useUserStore()

// 响应式数据
const article = ref({
  id: '',
  title: '',
  content: '',
  xmlContent: '',
  category: '',
  tags: [],
  author: '',
  publishDate: '',
  likes: 0,
  views: 0,
  commentsCount: 0
})

const categories = ref([])
const allTags = ref(['Vue', 'JavaScript', '前端', '后端', 'Node.js', 'React', 'TypeScript'])
const isXmlMode = ref(false)

// 右侧边栏数据
const user = ref({
  username: '',
  avatar: '',
  bio: '暂无简介',
  postsCount: 0,
  articlesCount: 0,
  commentsCount: 0
})

import RichTextEditor from './RichTextEditor.vue'

// Components
defineOptions({
  components: {
    AIChatAssistant,
    RichTextEditor
  }
})

// 获取分类列表
const fetchCategories = async () => {
  try {
    categories.value = await CategoryAPI.getAllCategories()
  } catch (error) {
    console.error('获取分类失败:', error)
    ElMessage.error('获取分类失败')
  }
}

// 根据路由参数加载文章
// 根据路由参数加载文章 (优化版：优先加载本地草稿)
const loadArticle = async () => {
  const routeId = route.params.articleId // 获取路由中的 ID (可能是 undefined, 'new', 或数字)
  const userId = userStore.user?.id || '1'
  
  // 1. 定义缓存键策略
  // 策略 A: 针对正在编辑但未保存的新文章 (通用草稿)
  const draftCacheKey = `draft_${userId}_cache` 
  // 策略 B: 针对特定 ID 的文章 (如果以后需要断点续传特定文章)
  const specificCacheKey = routeId && routeId !== 'new' ? `draft_${userId}_${routeId}` : null

  console.log('--- 开始加载文章 ---')
  console.log('路由 ID:', routeId)
  console.log('用户 ID:', userId)

  let cachedData = null
  let source = 'server' // 默认来源

  // 2. 优先检查通用草稿缓存 (无论路由是什么，只要有未发布的草稿，优先提示或加载)
  // 场景：用户点击"新建"，或者直接进入编辑器页面，但之前有没保存的内容
  const draftCache = localStorage.getItem(draftCacheKey)
  
  if (draftCache) {
    try {
      const parsedDraft = JSON.parse(draftCache)
      // 如果路由是 'new' 或者 没有路由(undefind)，且存在草稿，直接加载草稿
      if (!routeId || routeId === 'new' || routeId === 'cache') {
        console.log('✅ 命中通用草稿缓存')
        article.value = { ...parsedDraft }
        // 如果是从缓存加载，确保 xmlContent 不为空（防止旧数据格式问题）
        if (!article.value.xmlContent) {
           article.value.xmlContent = generateDefaultXml(article.value.content)
        }
        source = 'local_draft'
      }
    } catch (e) {
      console.error('解析草稿缓存失败', e)
      localStorage.removeItem(draftCacheKey) // 清除损坏的缓存
    }
  }

  // 3. 如果没有加载到草稿，且路由是具体 ID，则尝试加载特定缓存或服务器数据
  if (source === 'server' && routeId && routeId !== 'new' && routeId !== 'cache') {
    // 先检查是否有该特定文章的临时缓存
    if (specificCacheKey) {
      const specificCache = localStorage.getItem(specificCacheKey)
      if (specificCache) {
         console.log('✅ 命中特定文章缓存')
         const cachedArticle = JSON.parse(specificCache)
         // 确保缓存中的文章属于当前用户
         const currentAuthor = userStore.user?.username || userStore.user?.name || '墨语'
         if (cachedArticle.author === currentAuthor) {
           article.value = cachedArticle
           source = 'local_specific'
         } else {
           console.log('❌ 缓存文章不属于当前用户，忽略该缓存')
         }
      }
    }

    // 如果缓存也没命中，或者需要强制刷新，则请求服务器
    if (source === 'server') {
      try {
        console.log('🌐 请求服务器数据...')
        // 使用作者信息和ID共同定位文章，避免不同作者的相同ID文章混淆
        const currentAuthor = userStore.user?.username || userStore.user?.name || '墨语'
        const post = await PostAPI.getPostByIdAndAuthor(routeId, currentAuthor)
        article.value = { ...post }
        
        // 如果服务器返回的数据没有 xmlContent，生成默认的
        if (!article.value.xmlContent) {
          article.value.xmlContent = generateDefaultXml(post.content || post.title)
        }
      } catch (error) {
        console.error('加载文章失败:', error)
        ElMessage.error('加载文章失败，可能文章不存在')
        // 失败时可选：重定向回列表
        // router.push(`/dashboard/${userId}`)
      }
    }
  } 
  
  // 4. 如果以上都没命中，且是新文章 (routeId 为 'new' 或 undefined)，且没有草稿
  if (source === 'server' && (!routeId || routeId === 'new')) {
    console.log('📝 初始化全新文章')
    article.value = {
      id: '',
      title: '',
      content: '',
      xmlContent: generateDefaultXml(),
      category: '',
      tags: [],
      author: userStore.user?.username || userStore.user?.name || '墨语',
      publishDate: new Date().toISOString().split('T')[0],
      likes: 0,
      views: 0,
      commentsCount: 0
    }
  }

  console.log('最终加载到的数据:', article.value)
  console.log('数据来源:', source)
}

// 生成默认XML结构
const generateDefaultXml = (content = '') => {
  const today = new Date().toISOString().split('T')[0]
  return `<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <document type="bill">
    <meta>
      <identification source="#source">
        <FRBRWork>
          <FRBRthis value="/akn/un/document/"/>
          <FRBRuri value="/akn/un/document"/>
          <FRBRdate date="${today}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/un/document/eng@${today};_generation"/>
          <FRBRuri value="/akn/un/document/eng@${today}"/>
          <FRBRdate date="${today}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/un/document/eng@${today};generation.xml"/>
          <FRBRuri value="/akn/un/document/eng@${today}.akn"/>
          <FRBRdate date="${today}" name="Generation"/>
        </FRBRManifestation>
      </identification>
      <publication date="${today}" name="" showAs=""/>
      <classification source="#source">
        <keyword value="" showAs="" dictionary=""/>
      </classification>
      <lifecycle source="#source">
        <eventRef source="#source" date="${today}" type="generation"/>
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
            <p>${content || '开始输入您的内容...'}</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>`
}

// 切换到XML模式
const switchToXmlMode = () => {
  isXmlMode.value = true
}

// 切换到可视化模式
const switchToVisualMode = () => {
  isXmlMode.value = false
}

// 验证XML
const validateXml = () => {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(article.value.xmlContent, "text/xml")
    
    // 检查是否有解析错误
    const parserError = xmlDoc.getElementsByTagName("parsererror")
    if (parserError.length > 0) {
      throw new Error("XML格式错误")
    }
    
    ElMessage.success('XML格式正确')
  } catch (error) {
    ElMessage.error(`XML格式错误: ${error.message}`)
  }
}

// 格式化XML
const formatXml = () => {
  try {
    const parser = new DOMParser()
    const xmlDoc = parser.parseFromString(article.value.xmlContent, "text/xml")
    
    // 简单的格式化（实际应用中可能需要更复杂的格式化逻辑）
    const serializer = new XMLSerializer()
    const formattedXml = serializer.serializeToString(xmlDoc)
    
    // 简单美化XML（添加缩进和换行）
    let prettyXml = formattedXml
      .replace(/></g, '>\n<')
      .replace(/^(\s*)/gm, function(match, p1) {
        const level = (match.length / 2) - 1
        return '  '.repeat(Math.max(0, level))
      })
    
    article.value.xmlContent = prettyXml
    ElMessage.success('XML已格式化')
  } catch (error) {
    ElMessage.error(`格式化失败: ${error.message}`)
  }
}

// 保存文章到本地缓存
// 修改 saveArticle 函数
const saveArticle = async () => {
  try {
    const userId = userStore.user?.id || '1'
    
    // 【关键修改】只要是新文章（没有正式ID），统一保存到 _cache 后缀
    // 只有当文章已经有正式 ID (比如从服务器加载回来的) 才用具体 ID 做键
    let cacheKey;
    if (!article.value.id || article.value.id === 'new' || article.value.id === 'cache') {
      cacheKey = `draft_${userId}_cache`;
    } else {
      cacheKey = `draft_${userId}_${article.value.id}`;
    }

    const currentAuthor = userStore.user?.username || userStore.user?.name || '墨语'
    const articleData = {
      ...article.value,
      author: currentAuthor, // 确保作者信息正确
      updatedAt: new Date().toISOString()
    }

    localStorage.setItem(cacheKey, JSON.stringify(articleData))

    console.log('✅ 文章已保存至本地缓存')
    console.log('缓存键:', cacheKey)
    ElMessage.success('文章已保存到本地草稿箱')
  } catch (error) {
    console.error('保存文章失败:', error)
    ElMessage.error('保存文章失败')
  }
}

// 清空当前编辑内容
const clearContent = () => {
  // 从用户store当中获取当前用户的ID
  const userId = userStore.user?.id || '1'
  const key = `draft_${userId}_cache`

  ElMessageBox.confirm(
    '确定要清空当前编辑的所有内容吗？此操作不可恢复。',
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  ).then(async () => {
    article.value = {
      id: '',
      title: '',
      content: '',
      xmlContent: generateDefaultXml(),
      category: '',
      tags: [],
      author: userStore.user?.username || userStore.user?.name || '墨语', // 从用户store获取当前用户名
      publishDate: new Date().toISOString().split('T')[0],
      likes: 0,
      views: 0,
      commentsCount: 0
    }

    localStorage.removeItem(key)
    ElMessage.success('内容已清空')
  }).catch(() => {
    // 用户取消操作
  })
}

// 生成UUID作为新ID
const generateNewId = () => {
  // 使用浏览器内置的crypto API生成UUID
  if (window.crypto && window.crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // 如果浏览器不支持crypto.randomUUID，则手动生成UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 发布文章
const publishArticle = async () => {
  try {
    // 准备文章数据
    const currentAuthor = userStore.user?.username || userStore.user?.name || '墨语'
    const articleData = {
      ...article.value,
      author: currentAuthor, // 确保作者信息正确
      xmlContent: article.value.xmlContent,
      publishDate: article.value.publishDate || new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString()
    }

    if (!article.value.id || article.value.id === '') {
      // 发布新文章，生成新ID
      const newId = generateNewId()
      articleData.id = newId // UUID已经是字符串类型
      
      const response = await PostAPI.createPost(articleData)
      // 后端会返回完整的文章对象，包括新分配的ID
      article.value = { ...response }
      ElMessage.success('文章已发布')
    } else {
      // 更新并发布文章
      await PostAPI.updatePost(article.value.id, articleData)

      ElMessage.success('文章更新并已发布')
    }

    // 发布成功后清除相关草稿缓存
    // 从用户store当中获取当前用户的ID
    const userId = userStore.user?.id || '1'
    const key = `draft_${userId}_cache`
    localStorage.removeItem(key)
    
  } catch (error) {
    console.error('发布文章失败:', error)
    ElMessage.error('发布文章失败')
  }
}

// 返回文章列表
const backToList = async () => {
  // 从用户store获取当前用户的ID
  const userId = userStore.user?.id || '1' // 默认使用ID为1的用户
  
  console.log('准备返回文章列表')
  console.log('当前文章ID:', article.value.id)
  console.log('用户ID:', userId)
  
  // 如果当前文章是新文章且有临时缓存，询问用户是否需要清理
  if (!article.value.id || article.value.id === '' || article.value.id === 'cache') {
    const key = `draft_${userId}_cache`
    console.log('检查临时草稿键:', key)
    console.log('临时草稿是否存在:', localStorage.getItem(key))
    
    if (localStorage.getItem(key)) {
      try {
        await ElMessageBox.confirm(
          '检测到有未发布的草稿，是否在离开前清除？',
          '提示',
          {
            confirmButtonText: '清除',
            cancelButtonText: '保留',
            type: 'info'
          }
        )
        localStorage.removeItem(key) // 清除临时草稿
        console.log('已清除临时草稿')
      } catch (error) {
        console.log('用户选择保留草稿')
        // 用户选择保留草稿，不做任何操作
      }
    }
  }
  
  router.push(`/dashboard/${userId}`)
}

// 从 API 获取边栏数据
const fetchSidebarData = async () => {
  try {
    // 使用 store 中的用户信息，如果不存在则获取默认用户
    if (userStore.user) {
      user.value = { ...userStore.user }
    } else {
      const userData = await UserAPI.getUserById(0) // 获取ID为0的默认用户
      user.value = userData
    }
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

// Handle content updates from AI assistant
const handleContentUpdate = (data) => {
  if (data.xml) {
    article.value.xmlContent = data.xml
  }
  if (data.text) {
    article.value.content = data.text
  }
  ElMessage.success('内容已通过AI助手更新')
}

onMounted(async () => {
  await fetchCategories()
  await loadArticle()
  await fetchSidebarData()
})
</script>

<style scoped>
.cnblogs-fullscreen {
  position: fixed;
  inset: 0;
  overflow: auto;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
  align-items: center;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
}

.inner-wrapper {
  width: 100%;
  max-width: 1400px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  background-color: transparent;
  box-sizing: border-box;
}

.main-body {
  display: flex;
  width: 100%;
  padding: 0;
  margin: 0;
  flex: 1;
  box-sizing: border-box;
  gap: 0;
  align-items: flex-start;
}

.main-body > .content-inner {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 0;
  padding: 20px;
  box-sizing: border-box;
}

.content-left {
  flex: 1;
  background-color: white;
  padding: 20px;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

.article-editor-container {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  min-height: 600px;
}

.sidebar-right {
  width: 280px;
  background-color: white;
  padding: 20px;
  margin: 0;
  border-left: 1px solid #eee;
  box-sizing: border-box;
}

.sidebar-section {
  margin-bottom: 25px;
}

.sidebar-title {
  color: #2c3e50;
  font-size: 18px;
  margin-bottom: 15px;
  padding-bottom: 8px;
  border-bottom: 2px solid #009688;
}

.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.author-avatar {
  margin-bottom: 15px;
}

.avatar-img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details {
  width: 100%;
}

.author-name {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
  margin: 0 0 8px 0;
}

.author-bio {
  color: #7f8c8d;
  font-size: 14px;
  margin: 0 0 15px 0;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 18px;
  font-weight: bold;
  color: #009688;
}

.stat-label {
  font-size: 12px;
  color: #7f8c8d;
}

.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.tips-list li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  color: #555;
}

.tips-list li:before {
  content: "• ";
  color: #009688;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  margin-left: -1em;
}

.tips-list li:last-child {
  border-bottom: none;
}

.quick-actions {
  list-style: none;
  padding: 0;
  margin: 0;
}

.quick-actions li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.quick-actions li:last-child {
  border-bottom: none;
}

.quick-actions a {
  text-decoration: none;
  color: #009688;
  display: block;
  padding: 5px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.quick-actions a:hover {
  background-color: #f0f0f0;
  color: #00796b;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.title-input {
  flex: 1;
  margin-right: 15px;
}

.editor-actions {
  display: flex;
  gap: 10px;
}

.editor-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.category-select {
  width: 200px;
}

.tags-select {
  width: 300px;
}

.editor-content {
  margin-bottom: 20px;
}

.xml-editor-section, .visual-editor-section {
  margin-bottom: 20px;
}

.xml-controls, .editor-controls {
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
}

.xml-textarea {
  width: 100%;
  height: 400px;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  font-family: monospace;
  resize: vertical;
}

.visual-content {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}

.editor-preview {
  border-top: 1px solid #ebeef5;
  padding-top: 20px;
}

.preview-content {
  padding: 15px;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  background-color: #fafafa;
  min-height: 100px;
}
</style>