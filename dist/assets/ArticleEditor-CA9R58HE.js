import{_ as te,r as k,x as re,k as se,y as le,c as _,o as y,a as t,b as P,z as ie,t as b,A as ce,F as O,m as H,B as q,C as ue,w as L,v as oe,D as de,E as d,u as me,d as h,H as pe,l as ve,g as U,f as x,p as he,G as ge,i as fe,P as K,U as ye,h as ke,e as S,q as J,s as W}from"./index-BCCh_hgj.js";const Q={provider:"ollama",settings:{deepseek:{apiKey:"sk-de9a96c79ab34fb1a31b3ca4a3743e82",model:"deepseek-chat",temperature:.7,maxTokens:2048},kimi:{apiKey:"",model:"kimi-large",temperature:.7,maxTokens:2048},local:{enabled:!0},ollama:{enabled:!0,baseUrl:"http://localhost:11434/api",model:"qwen2.5:7b",temperature:.7,contextSize:2048}},features:{xmlConversion:!0,documentAnalysis:!0,contentOptimization:!0,securityEnabled:!0},security:{enableEncryption:!0,enablePrivacyMode:!0,dataRetentionDays:30}},E=()=>{try{const g=localStorage.getItem("aiConfig");return g?JSON.parse(g):Q}catch(g){return console.warn("Failed to load AI config from localStorage, using defaults:",g),Q}},Y=g=>E().settings[g]||{},_e=()=>E().provider,M={DEEPSEEK:"deepseek",KIMI:"kimi",LOCAL:"local",OLLAMA:"ollama"};class ae{constructor(r=null,i=null){this.provider=r||_e()||M.LOCAL,this.config=E(),this.apiKey=i||this._getApiKeyFromConfig(this.provider),this.settings=Y(this.provider),this.baseURL=this.getBaseURL()}_getApiKeyFromConfig(r){return Y(r).apiKey||null}getBaseURL(){switch(this.provider){case M.DEEPSEEK:return"https://api.deepseek.com";case M.KIMI:return"https://api.kimi.com/v1";case M.OLLAMA:return this.settings.ollamaBaseUrl||"http://localhost:11434/api";default:return null}}async sendMessage(r,i={}){switch(this.provider){case M.DEEPSEEK:return this._callDeepSeek(r,i);case M.KIMI:return this._callKimi(r,i);case M.OLLAMA:return this._callOllama(r,i);default:return this._callLocal(r,i)}}async _callDeepSeek(r,i={}){if(!this.apiKey)throw new Error("DeepSeek API key is required");const l={...this.settings,...i},s=await fetch(`${this.baseURL}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:l.model||"deepseek-chat",messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:r}],temperature:l.temperature||i.temperature||.7,max_tokens:l.maxTokens||i.maxTokens||2048,stream:!1})});if(!s.ok){const m=(await s.json().catch(()=>({}))).error?.message||"";if(s.status===429)return console.warn("DeepSeek quota exceeded, falling back to local service"),this._callLocal(r,i);throw s.status===401?new Error(`DeepSeek authentication error: Invalid API key. ${m}`):s.status===403?new Error(`DeepSeek access forbidden: ${m}`):new Error(`DeepSeek API error (${s.status}): ${m}`)}return(await s.json()).choices[0]?.message?.content||""}async _callKimi(r,i={}){if(!this.apiKey)throw new Error("Kimi API key is required");return console.warn("Kimi API not yet available, falling back to local service"),this._callLocal(r,i)}async _callOllama(r,i={}){const l={...this.settings,...i},s=l.ollamaModel||"qwen2.5:7b",p=await fetch(`${this.baseURL}/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:s,messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:r}],stream:!1,options:{temperature:l.temperature||i.temperature||.7,num_ctx:l.contextSize||2048}})});if(!p.ok){const m=await p.json().catch(()=>({})),v=m.error?.message||m.message||"Unknown error";throw new Error(`Ollama API error (${p.status}): ${v}`)}const R=await p.json();return R.message?.content||R.response||""}async _callLocal(r,i={}){return await new Promise(l=>setTimeout(l,1e3)),this._simulateResponse(r,i)}_simulateResponse(r,i={}){const l=r.toLowerCase();if(l.includes("convert")||l.includes("xml")||l.includes("akn4un")){const s=i.currentTitle||"Untitled Document",p=i.currentContent||"Content to be converted...";return`好的，我已将您的内容转换为AKN4UN XML格式：

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <document type="bill">
    <meta>
      <identification source="#source">
        <FRBRWork>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(s)}/"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(s)}/"/>
          <FRBRdate date="${new Date().toISOString().split("T")[0]}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(s)}/eng@${new Date().toISOString().split("T")[0]};_generation"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(s)}/eng@${new Date().toISOString().split("T")[0]}"/>
          <FRBRdate date="${new Date().toISOString().split("T")[0]}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(s)}/eng@${new Date().toISOString().split("T")[0]};generation.xml"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(s)}/eng@${new Date().toISOString().split("T")[0]}.akn"/>
          <FRBRdate date="${new Date().toISOString().split("T")[0]}" name="Generation"/>
        </FRBRManifestation>
      </identification>
      <publication date="${new Date().toISOString().split("T")[0]}" name="" showAs=""/>
      <classification source="#source">
        <keyword value="${this._sanitizeForXml(s.toLowerCase())}" showAs="${this._sanitizeForXml(s)}" dictionary="legal"/>
      </classification>
      <lifecycle source="#source">
        <eventRef source="#source" date="${new Date().toISOString().split("T")[0]}" type="generation"/>
      </lifecycle>
      <references source="#source">
        <TLCPerson id="author" href="#author" showAs="Document Author"/>
      </references>
    </meta>
    <body>
      <section id="section_1">
        <num>1</num>
        <heading>${this._sanitizeForXml(s)}</heading>
        <paragraph id="para_1">
          <content>
            <p>${this._sanitizeForXml(p)}</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>
\`\`\`

您可以直接使用此XML代码，或进一步调整以满足您的具体需求。`}else return l.includes("help")||l.includes("instruction")||l.includes("how")?`我可以帮助您：

1. 将普通文本转换为AKN4UN XML格式
2. 优化现有的XML结构
3. 提取文档中的关键信息
4. 检查XML格式的正确性
5. 提供关于AKN4UN标准的专业建议

例如，您可以问我：
- "帮我把当前内容转换成AKN4UN XML格式"
- "优化这个XML文档的结构"
- "检查这段XML是否符合AKN4UN标准"
- "解释一下AKN4UN的某个元素的用途"`:`我已经收到您的请求："${r.substring(0,50)}..."。基于我的分析，以下是相关建议：

如果您需要将内容转换为AKN4UN XML格式，请明确说明，我可以帮您生成标准格式的XML文档。

如果您想了解如何更好地组织您的法律文档，请告诉我具体的文档类型或主题，我可以提供针对性的建议。`}_sanitizeForXml(r){return r?r.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"):""}getDefaultSystemPrompt(){return`你是一个专业的法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
    
能力说明：
1. 将普通文本内容转换为标准的AKN4UN XML格式
2. 提取文档中的关键信息（如章节、条款、段落等）
3. 检查XML格式的正确性
4. 优化文档结构以符合联合国文档标准
5. 提供关于AKN4UN标准的专业建议

请根据用户提供的内容进行相应的操作。`}}let N=null;const Z=(g=null,r=null)=>(N=new ae(g,r),N),Re=()=>{if(!N){const r=E().provider||"local";N=new ae(r)}return N},we={class:"ai-chat-assistant"},xe={class:"chat-header"},Se={class:"header-controls"},Me={class:"chat-container"},be=["innerHTML"],Ce={class:"chat-input-area"},Ae=["onKeydown"],Ie=["disabled"],Le={class:"security-controls"},Ne={class:"security-indicator"},Fe={__name:"AIChatAssistant",props:{currentContent:{type:String,default:""},currentTitle:{type:String,default:""}},emits:["content-update","title-update"],setup(g,{emit:r}){const i=g,l=r,s=k(!1),p=k(""),R=k([]),m=k(!1),v=k(!0),C=k(!0),A=k(null),w=k("ollama"),F=re(()=>`你是一个专业的法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
  
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

请根据用户提供的内容进行相应的操作。`),X=()=>{s.value=!s.value},B=e=>e.replace(/```xml([\s\S]*?)```/g,'<pre class="code-block"><code class="language-xml">$1</code></pre>').replace(/```([\s\S]*?)```/g,'<pre class="code-block"><code>$1</code></pre>').replace(/\n/g,"<br>"),$=()=>{C.value=!C.value,d.info(C.value?"隐私模式已启用":"隐私模式已禁用")},z=()=>{v.value=!v.value,d.info(v.value?"安全连接已启用":"安全连接已禁用")},V=()=>{Z(w.value),d.info(`已切换到 ${j(w.value)} 模型`)},j=e=>({local:"本地模型",ollama:"Ollama",deepseek:"DeepSeek",kimi:"Kimi"})[e]||e,I=(e,a)=>{R.value.push({role:e,content:a}),de(()=>{A.value&&(A.value.scrollTop=A.value.scrollHeight)})},D=async()=>{if(!p.value.trim()||m.value)return;const e=p.value;I("user",e),p.value="",m.value=!0;try{const a=`当前文档标题: "${i.currentTitle}"
当前文档内容: "${i.currentContent}"

用户问题: ${e}
请根据上述文档内容回答用户的问题。`;Z(w.value);const u=await Re().sendMessage(a,{currentTitle:i.currentTitle,currentContent:i.currentContent,systemPrompt:F.value});if(I("assistant",u),u.includes("<akomaNtoso")&&u.includes("</akomaNtoso>")){const f=u.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(f){const n=f[1]||f[2];l("content-update",{xml:n,text:T(n)})}}}catch(a){console.error("AI response error:",a),I("assistant","抱歉，处理您的请求时出现了错误。请稍后再试。"),d.error(`AI服务错误: ${a.message||"请求失败"}`)}finally{m.value=!1}},T=e=>{const a=document.createElement("div");return a.innerHTML=e,a.textContent||a.innerText||""},G=()=>{const e=[...R.value].reverse().find(a=>a.role==="assistant"&&a.content.includes("<akomaNtoso")&&a.content.includes("</akomaNtoso>"));if(e){const a=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(a){const c=a[1]||a[2];l("content-update",{xml:c,text:T(c)}),d.success("XML已插入到编辑器")}else d.warning("未找到有效的XML内容")}else d.warning("聊天记录中未找到XML内容")},o=()=>{const e=[...R.value].reverse().find(a=>a.role==="assistant"&&a.content.includes("<akomaNtoso")&&a.content.includes("</akomaNtoso>"));if(e){const a=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(a){const c=a[1]||a[2],u=new Blob([c],{type:"application/xml"}),f=URL.createObjectURL(u),n=document.createElement("a");n.href=f,n.download=`document-${new Date().toISOString().split("T")[0]}.xml`,document.body.appendChild(n),n.click(),document.body.removeChild(n),URL.revokeObjectURL(f),d.success("XML文件已导出")}else d.warning("未找到有效的XML内容")}else d.warning("聊天记录中未找到XML内容")};return se(()=>{I("assistant","您好！我是您的AI助手，专门帮助您处理AKN4UN XML格式的文档。您可以向我提问如何转换内容、优化结构或检查格式等问题。")}),le(()=>{}),(e,a)=>(y(),_("div",we,[t("div",xe,[a[3]||(a[3]=t("h3",null,"AI 助手",-1)),t("div",Se,[P(t("select",{"onUpdate:modelValue":a[0]||(a[0]=c=>w.value=c),class:"model-selector",onChange:V},[...a[2]||(a[2]=[t("option",{value:"local"},"本地模型",-1),t("option",{value:"ollama"},"Ollama",-1),t("option",{value:"deepseek"},"DeepSeek",-1),t("option",{value:"kimi"},"Kimi",-1)])],544),[[ie,w.value]]),t("button",{class:"toggle-btn",onClick:X},b(s.value?"隐藏":"显示"),1)])]),P(t("div",Me,[t("div",{class:"chat-messages",ref_key:"messagesContainer",ref:A},[(y(!0),_(O,null,H(R.value,(c,u)=>(y(),_("div",{key:u,class:q(["message",c.role])},[t("div",{class:"message-content",innerHTML:B(c.content)},null,8,be)],2))),128))],512),t("div",Ce,[P(t("textarea",{"onUpdate:modelValue":a[1]||(a[1]=c=>p.value=c),onKeydown:ue(L(D,["ctrl"]),["enter"]),placeholder:"向AI助手提问，例如：帮我将这段内容转换为AKN4UN XML格式...",class:"chat-input"},null,40,Ae),[[oe,p.value]]),t("button",{onClick:D,disabled:m.value||!p.value.trim(),class:"send-btn"},b(m.value?"发送中...":"发送"),9,Ie)]),t("div",Le,[t("div",Ne,[t("span",{class:q(["secure-badge",{active:v.value}]),onClick:z,title:"点击切换安全连接状态"}," 🔐 安全连接 ",2),t("span",{class:q(["privacy-badge",{active:C.value}]),onClick:$,title:"点击切换隐私模式"}," 👁️ 隐私模式 ",2)]),t("div",{class:"action-buttons"},[t("button",{class:"action-btn",onClick:G,title:"将XML插入编辑器"}," 📄 插入XML "),t("button",{class:"action-btn",onClick:o,title:"导出XML文件"}," 💾 导出 ")])])],512),[[ce,s.value]])]))}},ee=te(Fe,[["__scopeId","data-v-4cac8bc5"]]),Xe={class:"cnblogs-fullscreen"},Be={class:"inner-wrapper"},$e={class:"main-body"},De={class:"content-inner"},Te={class:"content-left"},Ue={class:"article-editor-container"},Ke={class:"editor-header"},Pe={class:"editor-actions"},Oe={class:"editor-meta"},Ee={class:"editor-content"},ze={key:0,class:"xml-editor-section"},Ve={class:"xml-controls"},je={key:1,class:"visual-editor-section"},Ge={class:"editor-controls"},qe={class:"visual-content"},He={key:0,class:"editor-preview"},Je=["innerHTML"],We={class:"sidebar-right"},Qe={class:"sidebar-section"},Ye={class:"author-info"},Ze={class:"author-avatar"},et=["src"],tt={class:"author-details"},st={class:"author-name"},ot={class:"author-bio"},at={class:"author-stats"},nt={class:"stat"},rt={class:"stat-number"},lt={class:"stat"},it={class:"stat-number"},ct={class:"stat"},ut={class:"stat-number"},dt={class:"sidebar-section"},mt={class:"quick-actions"},pt=Object.assign({components:{AIChatAssistant:ee}},{__name:"ArticleEditor",setup(g){const r=fe(),i=ke(),l=me(),s=k({id:"",title:"",content:"",xmlContent:"",category:"",tags:[],author:"",publishDate:"",likes:0,views:0,commentsCount:0}),p=k([]),R=k(["Vue","JavaScript","前端","后端","Node.js","React","TypeScript"]),m=k(!1),v=k({username:"",avatar:"",bio:"暂无简介",postsCount:0,articlesCount:0,commentsCount:0}),C=async()=>{try{p.value=await ge.getAllCategories()}catch(o){console.error("获取分类失败:",o),d.error("获取分类失败")}},A=async()=>{const o=r.params.articleId,e=l.user?.id||"1",a=`draft_${e}_cache`,c=o&&o!=="new"?`draft_${e}_${o}`:null;console.log("--- 开始加载文章 ---"),console.log("路由 ID:",o),console.log("用户 ID:",e);let u="server";const f=localStorage.getItem(a);if(f)try{const n=JSON.parse(f);(!o||o==="new"||o==="cache")&&(console.log("✅ 命中通用草稿缓存"),s.value={...n},s.value.xmlContent||(s.value.xmlContent=w(s.value.content)),u="local_draft")}catch(n){console.error("解析草稿缓存失败",n),localStorage.removeItem(a)}if(u==="server"&&o&&o!=="new"&&o!=="cache"){if(c){const n=localStorage.getItem(c);n&&(console.log("✅ 命中特定文章缓存"),s.value=JSON.parse(n),u="local_specific")}if(u==="server")try{console.log("🌐 请求服务器数据...");const n=await K.getPostById(o);s.value={...n},s.value.xmlContent||(s.value.xmlContent=w(n.content||n.title))}catch(n){console.error("加载文章失败:",n),d.error("加载文章失败，可能文章不存在")}}u==="server"&&(!o||o==="new")&&(console.log("📝 初始化全新文章"),s.value={id:"",title:"",content:"",xmlContent:w(),category:"",tags:[],author:l.user?.username||l.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0}),console.log("最终加载到的数据:",s.value),console.log("数据来源:",u)},w=(o="")=>{const e=new Date().toISOString().split("T")[0];return`<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <document type="bill">
    <meta>
      <identification source="#source">
        <FRBRWork>
          <FRBRthis value="/akn/un/document/"/>
          <FRBRuri value="/akn/un/document"/>
          <FRBRdate date="${e}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/un/document/eng@${e};_generation"/>
          <FRBRuri value="/akn/un/document/eng@${e}"/>
          <FRBRdate date="${e}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/un/document/eng@${e};generation.xml"/>
          <FRBRuri value="/akn/un/document/eng@${e}.akn"/>
          <FRBRdate date="${e}" name="Generation"/>
        </FRBRManifestation>
      </identification>
      <publication date="${e}" name="" showAs=""/>
      <classification source="#source">
        <keyword value="" showAs="" dictionary=""/>
      </classification>
      <lifecycle source="#source">
        <eventRef source="#source" date="${e}" type="generation"/>
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
            <p>${o||"开始输入您的内容..."}</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>`},F=()=>{m.value=!0},X=()=>{m.value=!1},B=()=>{try{if(new DOMParser().parseFromString(s.value.xmlContent,"text/xml").getElementsByTagName("parsererror").length>0)throw new Error("XML格式错误");d.success("XML格式正确")}catch(o){d.error(`XML格式错误: ${o.message}`)}},$=()=>{try{const e=new DOMParser().parseFromString(s.value.xmlContent,"text/xml");let u=new XMLSerializer().serializeToString(e).replace(/></g,`>
<`).replace(/^(\s*)/gm,function(f,n){const ne=f.length/2-1;return"  ".repeat(Math.max(0,ne))});s.value.xmlContent=u,d.success("XML已格式化")}catch(o){d.error(`格式化失败: ${o.message}`)}},z=async()=>{try{const o=l.user?.id||"1";let e;!s.value.id||s.value.id==="new"||s.value.id==="cache"?e=`draft_${o}_cache`:e=`draft_${o}_${s.value.id}`;const a={...s.value,updatedAt:new Date().toISOString()};localStorage.setItem(e,JSON.stringify(a)),console.log("✅ 文章已保存至本地缓存"),console.log("缓存键:",e),d.success("文章已保存到本地草稿箱")}catch(o){console.error("保存文章失败:",o),d.error("保存文章失败")}},V=()=>{const e=`draft_${l.user?.id||"1"}_cache`;W.confirm("确定要清空当前编辑的所有内容吗？此操作不可恢复。","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{s.value={id:"",title:"",content:"",xmlContent:w(),category:"",tags:[],author:l.user?.username||l.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0},localStorage.removeItem(e),d.success("内容已清空")}).catch(()=>{})},j=async()=>{try{const o=await K.getAllPosts(),e=l.user?.username||l.user?.name||"墨语",a=o.filter(u=>u.author===e).map(u=>parseInt(u.id)).filter(u=>!isNaN(u));return(a.length>0?Math.max(...a):0)+1}catch(o){return console.error("获取下一个ID失败:",o),1}},I=async()=>{try{const o={...s.value,xmlContent:s.value.xmlContent,publishDate:s.value.publishDate||new Date().toISOString().split("T")[0],updatedAt:new Date().toISOString()};if(!s.value.id||s.value.id===""){const e=await j();o.id=e.toString();const a=await K.createPost(o);s.value={...a},d.success("文章已发布")}else await K.updatePost(s.value.id,o),d.success("文章已发布")}catch(o){console.error("发布文章失败:",o),d.error("发布文章失败")}},D=async()=>{const o=l.user?.id||"1";if(console.log("准备返回文章列表"),console.log("当前文章ID:",s.value.id),console.log("用户ID:",o),!s.value.id||s.value.id===""||s.value.id==="cache"){const e=`draft_${o}_cache`;if(console.log("检查临时草稿键:",e),console.log("临时草稿是否存在:",localStorage.getItem(e)),localStorage.getItem(e))try{await W.confirm("检测到有未发布的草稿，是否在离开前清除？","提示",{confirmButtonText:"清除",cancelButtonText:"保留",type:"info"}),localStorage.removeItem(e),console.log("已清除临时草稿")}catch{console.log("用户选择保留草稿")}}i.push(`/dashboard/${o}`)},T=async()=>{try{if(l.user)v.value={...l.user};else{const o=await ye.getUserById(0);v.value=o}}catch(o){console.error("获取用户信息失败:",o)}},G=o=>{o.xml&&(s.value.xmlContent=o.xml),o.text&&(s.value.content=o.text),d.success("内容已通过AI助手更新")};return se(async()=>{await C(),await A(),await T()}),(o,e)=>{const a=U("el-input"),c=U("el-button"),u=U("el-option"),f=U("el-select");return y(),_(O,null,[t("div",Xe,[t("div",Be,[h(pe),t("div",$e,[t("div",De,[t("div",Te,[t("div",Ue,[t("div",Ke,[h(a,{modelValue:s.value.title,"onUpdate:modelValue":e[0]||(e[0]=n=>s.value.title=n),placeholder:"请输入文章标题",class:"title-input"},null,8,["modelValue"]),t("div",Pe,[h(c,{onClick:D},{default:x(()=>[...e[5]||(e[5]=[S("返回",-1)])]),_:1}),h(c,{type:"primary",onClick:z},{default:x(()=>[...e[6]||(e[6]=[S("保存",-1)])]),_:1}),h(c,{type:"danger",onClick:V},{default:x(()=>[...e[7]||(e[7]=[S("清空内容",-1)])]),_:1}),h(c,{type:"success",onClick:I},{default:x(()=>[...e[8]||(e[8]=[S("发布",-1)])]),_:1})])]),t("div",Oe,[h(f,{modelValue:s.value.category,"onUpdate:modelValue":e[1]||(e[1]=n=>s.value.category=n),placeholder:"选择分类",class:"category-select"},{default:x(()=>[(y(!0),_(O,null,H(p.value,n=>(y(),J(u,{key:n.id,label:n.name,value:n.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),h(f,{modelValue:s.value.tags,"onUpdate:modelValue":e[2]||(e[2]=n=>s.value.tags=n),multiple:"",placeholder:"选择标签",class:"tags-select"},{default:x(()=>[(y(!0),_(O,null,H(R.value,n=>(y(),J(u,{key:n,label:n,value:n},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),t("div",Ee,[m.value?(y(),_("div",ze,[e[12]||(e[12]=t("h3",null,"AKN4UN XML 编辑器",-1)),t("div",Ve,[h(c,{onClick:X,size:"small"},{default:x(()=>[...e[9]||(e[9]=[S("切换到可视化编辑",-1)])]),_:1}),h(c,{onClick:B,size:"small"},{default:x(()=>[...e[10]||(e[10]=[S("验证XML",-1)])]),_:1}),h(c,{onClick:$,size:"small"},{default:x(()=>[...e[11]||(e[11]=[S("格式化",-1)])]),_:1})]),P(t("textarea",{"onUpdate:modelValue":e[3]||(e[3]=n=>s.value.xmlContent=n),class:"xml-textarea",placeholder:"在此输入AKN4UN XML内容..."},null,512),[[oe,s.value.xmlContent]])])):(y(),_("div",je,[e[14]||(e[14]=t("h3",null,"可视化编辑器",-1)),t("div",Ge,[h(c,{onClick:F,size:"small"},{default:x(()=>[...e[13]||(e[13]=[S("切换到XML编辑",-1)])]),_:1})]),t("div",qe,[h(a,{modelValue:s.value.content,"onUpdate:modelValue":e[4]||(e[4]=n=>s.value.content=n),type:"textarea",rows:15,placeholder:"在此输入文章内容..."},null,8,["modelValue"])])]))]),m.value?ve("",!0):(y(),_("div",He,[e[15]||(e[15]=t("h3",null,"预览",-1)),t("div",{class:"preview-content",innerHTML:s.value.content},null,8,Je)]))])]),t("div",We,[t("div",Qe,[e[19]||(e[19]=t("h3",{class:"sidebar-title"},"博主信息",-1)),t("div",Ye,[t("div",Ze,[t("img",{src:v.value.avatar,alt:"博主头像",class:"avatar-img"},null,8,et)]),t("div",tt,[t("h4",st,b(v.value.username),1),t("p",ot,b(v.value.bio),1),t("div",at,[t("div",nt,[t("span",rt,b(v.value.postsCount),1),e[16]||(e[16]=t("span",{class:"stat-label"},"随笔",-1))]),t("div",lt,[t("span",it,b(v.value.articlesCount||0),1),e[17]||(e[17]=t("span",{class:"stat-label"},"文章",-1))]),t("div",ct,[t("span",ut,b(v.value.commentsCount||0),1),e[18]||(e[18]=t("span",{class:"stat-label"},"评论",-1))])])])])]),e[21]||(e[21]=t("div",{class:"sidebar-section"},[t("h3",{class:"sidebar-title"},"编辑器提示"),t("ul",{class:"tips-list"},[t("li",null,"支持AKN4UN XML格式编辑"),t("li",null,'点击"验证XML"确保格式正确'),t("li",null,'"格式化"功能可美化XML代码'),t("li",null,"记得定期保存您的作品")])],-1)),t("div",dt,[e[20]||(e[20]=t("h3",{class:"sidebar-title"},"快捷操作",-1)),t("ul",mt,[t("li",null,[t("a",{href:"#",onClick:L(B,["prevent"])},"验证XML")]),t("li",null,[t("a",{href:"#",onClick:L($,["prevent"])},"格式化XML")]),t("li",null,[m.value?(y(),_("a",{key:1,href:"#",onClick:L(X,["prevent"])},"切换到可视化模式")):(y(),_("a",{key:0,href:"#",onClick:L(F,["prevent"])},"切换到XML模式"))])])])])])]),h(he)])]),h(ee,{"current-content":s.value.content,"current-title":s.value.title,onContentUpdate:G},null,8,["current-content","current-title"])],64)}}}),ht=te(pt,[["__scopeId","data-v-3177e26f"]]);export{ht as default};
//# sourceMappingURL=ArticleEditor-CA9R58HE.js.map
