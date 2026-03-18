import{_ as Q,r as w,x as ce,k as Y,y as ue,c as N,o as _,a as t,b as H,z as de,t as D,A as me,F as G,m as J,B as C,C as pe,w as K,v as re,D as W,E as g,G as ge,I as ve,u as he,d as k,H as fe,l as ye,g as z,f as S,p as be,J as ke,i as Re,P as V,U as _e,h as we,e as F,q as Z,s as ee}from"./index-Cd8RG0L4.js";const te={provider:"ollama",settings:{deepseek:{apiKey:"",model:"deepseek-chat",temperature:.7,maxTokens:8192},kimi:{apiKey:"",model:"kimi-large",temperature:.7,maxTokens:2048},local:{enabled:!0},ollama:{enabled:!0,baseUrl:"http://localhost:11434/api",model:"qwen2.5:7b",temperature:.7,contextSize:2048}},features:{xmlConversion:!0,documentAnalysis:!0,contentOptimization:!0,securityEnabled:!0},security:{enableEncryption:!0,enablePrivacyMode:!0,dataRetentionDays:30}},q=()=>{try{const y=localStorage.getItem("aiConfig");return y?JSON.parse(y):te}catch(y){return console.warn("Failed to load AI config from localStorage, using defaults:",y),te}},oe=y=>q().settings[y]||{},Ce=()=>q().provider,$={DEEPSEEK:"deepseek",KIMI:"kimi",LOCAL:"local",OLLAMA:"ollama"};class le{constructor(c=null,i=null){this.provider=c||Ce()||$.LOCAL,this.config=q(),this.apiKey=i||this._getApiKeyFromConfig(this.provider),this.settings=oe(this.provider),this.baseURL=this.getBaseURL()}_getApiKeyFromConfig(c){return oe(c).apiKey||null}getBaseURL(){switch(this.provider){case $.DEEPSEEK:return"https://api.deepseek.com";case $.KIMI:return"https://api.kimi.com/v1";case $.OLLAMA:return this.settings.ollamaBaseUrl||"http://localhost:11434/api";default:return null}}async sendMessage(c,i={}){switch(this.provider){case $.DEEPSEEK:return this._callDeepSeek(c,i);case $.KIMI:return this._callKimi(c,i);case $.OLLAMA:return this._callOllama(c,i);default:return this._callLocal(c,i)}}async _callDeepSeek(c,i={}){if(!this.apiKey)throw new Error("DeepSeek API key is required");const a={...this.settings,...i},o=await fetch(`${this.baseURL}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:a.model||"deepseek-chat",messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:c}],temperature:a.temperature||i.temperature||.7,max_tokens:a.maxTokens||i.maxTokens||8192,stream:!1})});if(!o.ok){const f=(await o.json().catch(()=>({}))).error?.message||"";if(o.status===429)return console.warn("DeepSeek quota exceeded, falling back to local service"),this._callLocal(c,i);throw o.status===401?new Error(`DeepSeek authentication error: Invalid API key. ${f}`):o.status===403?new Error(`DeepSeek access forbidden: ${f}`):new Error(`DeepSeek API error (${o.status}): ${f}`)}return(await o.json()).choices[0]?.message?.content||""}async _callKimi(c,i={}){if(!this.apiKey)throw new Error("Kimi API key is required");return console.warn("Kimi API not yet available, falling back to local service"),this._callLocal(c,i)}async _callOllama(c,i={}){const a={...this.settings,...i},o=a.ollamaModel||"qwen2.5:7b",p=await fetch(`${this.baseURL}/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:c}],stream:!1,options:{temperature:a.temperature||i.temperature||.7,num_ctx:a.contextSize||2048}})});if(!p.ok){const f=await p.json().catch(()=>({})),m=f.error?.message||f.message||"Unknown error";throw new Error(`Ollama API error (${p.status}): ${m}`)}const x=await p.json();return x.message?.content||x.response||""}async _callLocal(c,i={}){return await new Promise(a=>setTimeout(a,1e3)),this._simulateResponse(c,i)}_simulateResponse(c,i={}){const a=c.toLowerCase();if(a.includes("convert")||a.includes("xml")||a.includes("akn4un")){const o=i.currentTitle||"Untitled Document",p=i.currentContent||"Content to be converted...";return`好的，我已将您的内容转换为AKN4UN XML格式：

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0">
  <document type="bill">
    <meta>
      <identification source="#source">
        <FRBRWork>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(o)}/"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(o)}/"/>
          <FRBRdate date="${new Date().toISOString().split("T")[0]}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(o)}/eng@${new Date().toISOString().split("T")[0]};_generation"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(o)}/eng@${new Date().toISOString().split("T")[0]}"/>
          <FRBRdate date="${new Date().toISOString().split("T")[0]}" name="Generation"/>
          <FRBRauthor href="#author" as="#author"/>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/un/document/${this._sanitizeForXml(o)}/eng@${new Date().toISOString().split("T")[0]};generation.xml"/>
          <FRBRuri value="/akn/un/document/${this._sanitizeForXml(o)}/eng@${new Date().toISOString().split("T")[0]}.akn"/>
          <FRBRdate date="${new Date().toISOString().split("T")[0]}" name="Generation"/>
        </FRBRManifestation>
      </identification>
      <publication date="${new Date().toISOString().split("T")[0]}" name="" showAs=""/>
      <classification source="#source">
        <keyword value="${this._sanitizeForXml(o.toLowerCase())}" showAs="${this._sanitizeForXml(o)}" dictionary="legal"/>
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
        <heading>${this._sanitizeForXml(o)}</heading>
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

您可以直接使用此XML代码，或进一步调整以满足您的具体需求。`}else return a.includes("help")||a.includes("instruction")||a.includes("how")?`我可以帮助您：

1. 将普通文本转换为AKN4UN XML格式
2. 优化现有的XML结构
3. 提取文档中的关键信息
4. 检查XML格式的正确性
5. 提供关于AKN4UN标准的专业建议

例如，您可以问我：
- "帮我把当前内容转换成AKN4UN XML格式"
- "优化这个XML文档的结构"
- "检查这段XML是否符合AKN4UN标准"
- "解释一下AKN4UN的某个元素的用途"`:`我已经收到您的请求："${c.substring(0,50)}..."。基于我的分析，以下是相关建议：

如果您需要将内容转换为AKN4UN XML格式，请明确说明，我可以帮您生成标准格式的XML文档。

如果您想了解如何更好地组织您的法律文档，请告诉我具体的文档类型或主题，我可以提供针对性的建议。`}_sanitizeForXml(c){return c?c.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"):""}getDefaultSystemPrompt(){return`你是一个专业的法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
    
能力说明：
1. 将普通文本内容转换为标准的AKN4UN XML格式
2. 提取文档中的关键信息（如章节、条款、段落等）
3. 检查XML格式的正确性
4. 优化文档结构以符合联合国文档标准
5. 提供关于AKN4UN标准的专业建议

请根据用户提供的内容进行相应的操作。`}}let O=null;const ne=(y=null,c=null)=>(O=new le(y,c),O),xe=()=>{if(!O){const c=q().provider||"local";O=new le(c)}return O},Ae={class:"ai-chat-assistant"},Ne={class:"chat-header"},Se={class:"header-controls"},Me={class:"chat-container"},Ie=["innerHTML"],Le={class:"chat-input-area"},Fe=["onKeydown"],Te=["disabled"],Be={class:"security-controls"},$e={class:"security-indicator"},De={__name:"AIChatAssistant",props:{currentContent:{type:String,default:""},currentTitle:{type:String,default:""}},emits:["content-update","title-update"],setup(y,{emit:c}){const i=y,a=c,o=w(!1),p=w(""),x=w([]),f=w(!1),m=w(!0),b=w(!0),M=w(null),A=w("ollama"),U=ce(()=>`你是一个专业的联合国法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
  
能力说明：
1. 将普通文本内容转换为标准的AKN4UN XML格式
2. 提取文档中的关键信息（如章节、条款、段落等）
3. 检查XML格式的正确性
4. 优化文档结构以符合联合国文档标准
5. 提供关于AKN4UN标准的专业建议

AKN4UN XML标准示例：
<?xml version="1.0" encoding="UTF-8"?>
<akomaNtoso xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://docs.oasis-open.org/legaldocml/ns/akn/3.0 http://docs.oasis-open.org/legaldocml/akn-core/v1.0/os/part2-specs/schemas/akomantoso30.xsd" xmlns="http://docs.oasis-open.org/legaldocml/ns/akn/3.0" xmlns:html="http://www.w3.org/1999/xhtml" xmlns:akn4un="http://un.org/akn4un">
  <!-- UN Official Document - AKN4UN Standard Format -->
  <statement name="resolution">
    <!-- 核心元数据模块：完整保留AKN4UN强制FRBR三层结构、分类、工作流、引用规范 -->
    <meta>
      <identification source="#DGACM">
        <FRBRWork>
          <FRBRthis value="/akn/un/statement/deliberation/unga/2025-03-25/79-275/!main/"></FRBRthis>
          <FRBRuri value="/akn/un/statement/deliberation/unga/2025-03-25/79-275/"></FRBRuri>
          <FRBRdate date="2025-03-25" name="adoption"></FRBRdate>
          <FRBRauthor href="ga" as="author"></FRBRauthor>
          <FRBRcountry value="un"></FRBRcountry>
        </FRBRWork>
        <FRBRExpression>
          <FRBRthis value="/akn/un/statement/deliberation/unga/2025-03-25/79-275/eng@!main/"></FRBRthis>
          <FRBRuri value="/akn/un/statement/deliberation/unga/2025-03-25/79-275/eng@/"></FRBRuri>
          <FRBRdate date="2025-03-27" name="publication"></FRBRdate>
          <FRBRauthor href="ga" as="issuer"></FRBRauthor>
          <FRBRlanguage language="eng"></FRBRlanguage>
        </FRBRExpression>
        <FRBRManifestation>
          <FRBRthis value="/akn/un/statement/deliberation/unga/2025-03-25/79-275/eng@/!main.xml"></FRBRthis>
          <FRBRuri value="/akn/un/statement/deliberation/unga/2025-03-25/79-275/eng@.xml"></FRBRuri>
          <FRBRdate date="2025-12-10" name="markup"></FRBRdate>
          <FRBRauthor href="DGACM" as="editor"></FRBRauthor>
        </FRBRManifestation>
      </identification>
      <!-- 关键词分类模块：保留AKN4UN标准分类标签与核心关键词，精简冗余项 -->
      <classification source="DHLAUTH">
        <keyword value="Kimberley Process" showAs="Kimberley Process" dictionary="DHLAUTH"></keyword>
        <keyword value="CONFLICT DIAMONDS" href="http://metadata.un.org/thesaurus/1001225" showAs="CONFLICT DIAMONDS" dictionary="UNBIS Thesaurus"></keyword>
        <keyword refersTo="agenda" value="31" showAs="The role of diamonds in fuelling conflict." shortForm="DIAMONDS--FUELLING CONFLICT" dictionary="A/79/251"></keyword>
      </classification>
      <!-- 文档工作流模块：保留AKN4UN标准流程节点，精简超长提案国列表 -->
      <workflow source="#un">
        <step date="2025-03-11" outcome="draftResolution" as="A/79/L.63" by="Multiple Member States" />
        <step date="2025-03-25" outcome="adopted" as="A/79/PV.62" by="" />
      </workflow>
      <!-- 投票分析模块：完整保留AKN4UN议会投票规范标签 -->
      <analysis source="#un">
        <parliamentary>
          <voting outcome="adoptedWithoutVote">
            <quorum value=""></quorum>
          </voting>
        </parliamentary>
      </analysis>
      <!-- 引用模块：保留AKN4UN核心实体引用，精简非必要项 -->
      <references source="#DGACM">
        <TLCOrganization eId="source" href="/akn/ontology/organization/un/DGACM" showAs="DGACM"></TLCOrganization>
        <TLCOrganization eId="ga" href="/akn/ontology/organization/un/generalAssembly" showAs="General Assembly"></TLCOrganization>
        <TLCTerm eId="resolutionTitle" href="/akn/ontology/reference/un/resolutionTitle" showAs="Resolution title"></TLCTerm>
      </references>
      <!-- AKN4UN专属排版模块：完整保留联合国专属扩展标签，符合官方格式要求 -->
      <presentation source="#un">
        <akn4un:footerFirstPage>
          <akn4un:footerFirstPageLeft>
            <akn4un:internalCode>
              <docketNumber refersTo="#publicationJobNumber">25-04962 (E)</docketNumber>
            </akn4un:internalCode>
          </akn4un:footerFirstPageLeft>
        </akn4un:footerFirstPage>
      </presentation>
    </meta>
    <!-- 封面模块：完整保留AKN4UN决议封面标准标签与核心信息 -->
    <coverPage eId="coverPage_1">
      <p><docAuthority refersTo="#publisher">United Nations</docAuthority></p>
      <p class="upperRight"><docNumber refersTo="#symbol">A/RES/79/275</docNumber></p>
      <p><docAuthority refersTo="#issuingBody" class="rightBig">General Assembly</docAuthority></p>
      <p><docDate date="2025-03-27" class="rightSmall" refersTo="#dateOfIssuance">27 March 2025</docDate></p>
      <p><session refersTo="#generalAssembly" value="79" eId="coverPage_1__session_1">Seventy-ninth session</session></p>
      <p><inline name="agenda item name">The role of diamonds in fuelling conflict</inline></p>
      <p><docTitle>Resolution adopted by the General Assembly on 25 March 2025</docTitle></p>
    </coverPage>
    <!-- 序言模块：保留AKN4UN标准结构，精简大段重复表述，保留规范句式 -->
    <preface>
      <p>
        <docNumber>79/275.</docNumber>
        <docTitle refersTo="#resolutionTitle">
          <span class="bold">The role of diamonds in fuelling conflict: breaking the link between the illicit transaction of rough diamonds and armed conflict</span>
        </docTitle>
      </p>
    </preface>
    <preamble>
      <formula name="enactingFormula" eId="formula_1">
        <p xml:space="preserve"><span class="italic">The General Assembly</span>,</p>
      </formula>
      <container name="Recognizing" eId="container_2">
        <p xml:space="preserve">        <span class="italic">Recognizing</span> the harm of conflict diamonds in fuelling armed conflict and undermining international peace and security,</p>
      </container>
      <container name="Noting" eId="container_3">
        <p xml:space="preserve">        <span class="italic">Noting</span> the key role of the Kimberley Process in curbing conflict diamond trade and supporting sustainable development,</p>
      </container>
    </preamble>
    <!-- 正文模块：保留AKN4UN标准段落、列表、编号规范，精简为核心条款示例 -->
    <mainBody>
      <paragraph eId="para_1" class="MercuryDocument">
        <num>1.</num>
        <content eId="para_1__content">
          <p xml:space="preserve">        <span class="italic">Recognizes</span> the role of the Kimberley Process Certification Scheme in preventing conflict diamonds and fuelling conflicts;</p>
        </content>
      </paragraph>
      <paragraph eId="para_2" class="MercuryDocument">
        <num>2.</num>
        <list eId="para_2_list">
          <intro eId="para_2_list_intro"><p xml:space="preserve">        <span class="italic">Recalls</span> the mandate of the Ad Hoc Committee on Review and Reform:</p></intro>
          <point eId="para_2_list_point_a"><num>(a)</num><content><p xml:space="preserve">To define conflict diamonds matching current conflict realities;</p></content></point>
          <point eId="para_2_list_point_b"><num>(b)</num><content><p xml:space="preserve">To strengthen scheme implementation and technical cooperation;</p></content></point>
        </list>
      </paragraph>
      <paragraph eId="para_3" class="MercuryDocument">
        <num>3.</num>
        <content eId="para_3__content">
          <p xml:space="preserve">        <span class="italic">Requests</span> the Kimberley Process Chair to submit a progress report to the General Assembly;</p>
        </content>
      </paragraph>
    </mainBody>
    <!-- 结论模块：完整保留AKN4UN通过信息规范标签 -->
    <conclusions eId="conclusions">
      <p>
        <event refersTo="#adoption">
          <location title="62nd" refersTo="#adoptionMeeting">62nd plenary meeting</location>
          <eol />
          <docDate date="2025-03-25" refersTo="#adoptionDate">25 March 2025</docDate>
        </event>
      </p>
    </conclusions>
  </statement>
</akomaNtoso>

请根据用户提供的内容进行相应的操作。`),v=()=>{o.value=!o.value},r=e=>e.replace(/```xml([\s\S]*?)```/g,'<pre class="code-block"><code class="language-xml">$1</code></pre>').replace(/```([\s\S]*?)```/g,'<pre class="code-block"><code>$1</code></pre>').replace(/\n/g,"<br>"),h=()=>{b.value=!b.value,g.info(b.value?"隐私模式已启用":"隐私模式已禁用")},T=()=>{m.value=!m.value,g.info(m.value?"安全连接已启用":"安全连接已禁用")},X=()=>{ne(A.value),g.info(`已切换到 ${B(A.value)} 模型`)},B=e=>({local:"本地模型",ollama:"Ollama",deepseek:"DeepSeek",kimi:"Kimi"})[e]||e,I=(e,s)=>{x.value.push({role:e,content:s}),W(()=>{M.value&&(M.value.scrollTop=M.value.scrollHeight)})},P=async()=>{if(!p.value.trim()||f.value)return;const e=p.value;I("user",e),p.value="",f.value=!0;try{const s=`当前文档标题: "${i.currentTitle}"
当前文档内容: "${i.currentContent}"

用户问题: ${e}
请根据上述文档内容回答用户的问题。`;ne(A.value);const d=await xe().sendMessage(s,{currentTitle:i.currentTitle,currentContent:i.currentContent,systemPrompt:U.value});if(I("assistant",d),console.log("AI Response:",d),d.includes("<akomaNtoso")&&d.includes("</akomaNtoso>")){const R=d.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(R){const l=R[1]||R[2];a("content-update",{xml:l,text:E(l)})}}}catch(s){console.error("AI response error:",s),I("assistant","抱歉，处理您的请求时出现了错误。请稍后再试。"),g.error(`AI服务错误: ${s.message||"请求失败"}`)}finally{f.value=!1}},E=e=>{const s=document.createElement("div");return s.innerHTML=e,s.textContent||s.innerText||""},j=()=>{const e=[...x.value].reverse().find(s=>s.role==="assistant"&&s.content.includes("<akomaNtoso")&&s.content.includes("</akomaNtoso>"));if(e){const s=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(s){const u=s[1]||s[2];a("content-update",{xml:u,text:E(u)}),g.success("XML已插入到编辑器")}else g.warning("未找到有效的XML内容")}else g.warning("聊天记录中未找到XML内容")},n=()=>{const e=[...x.value].reverse().find(s=>s.role==="assistant"&&s.content.includes("<akomaNtoso")&&s.content.includes("</akomaNtoso>"));if(e){const s=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(s){const u=s[1]||s[2],d=new Blob([u],{type:"application/xml"}),R=URL.createObjectURL(d),l=document.createElement("a");l.href=R,l.download=`document-${new Date().toISOString().split("T")[0]}.xml`,document.body.appendChild(l),l.click(),document.body.removeChild(l),URL.revokeObjectURL(R),g.success("XML文件已导出")}else g.warning("未找到有效的XML内容")}else g.warning("聊天记录中未找到XML内容")};return Y(()=>{I("assistant","您好！我是您的AI助手，专门帮助您处理AKN4UN XML格式的文档。您可以向我提问如何转换内容、优化结构或检查格式等问题。")}),ue(()=>{}),(e,s)=>(_(),N("div",Ae,[t("div",Ne,[s[3]||(s[3]=t("h3",null,"AI 助手",-1)),t("div",Se,[H(t("select",{"onUpdate:modelValue":s[0]||(s[0]=u=>A.value=u),class:"model-selector",onChange:X},[...s[2]||(s[2]=[t("option",{value:"local"},"本地模型",-1),t("option",{value:"ollama"},"Ollama",-1),t("option",{value:"deepseek"},"DeepSeek",-1),t("option",{value:"kimi"},"Kimi",-1)])],544),[[de,A.value]]),t("button",{class:"toggle-btn",onClick:v},D(o.value?"隐藏":"显示"),1)])]),H(t("div",Me,[t("div",{class:"chat-messages",ref_key:"messagesContainer",ref:M},[(_(!0),N(G,null,J(x.value,(u,d)=>(_(),N("div",{key:d,class:C(["message",u.role])},[t("div",{class:"message-content",innerHTML:r(u.content)},null,8,Ie)],2))),128))],512),t("div",Le,[H(t("textarea",{"onUpdate:modelValue":s[1]||(s[1]=u=>p.value=u),onKeydown:pe(K(P,["ctrl"]),["enter"]),placeholder:"向AI助手提问，例如：帮我将这段内容转换为AKN4UN XML格式...",class:"chat-input"},null,40,Fe),[[re,p.value]]),t("button",{onClick:P,disabled:f.value||!p.value.trim(),class:"send-btn"},D(f.value?"发送中...":"发送"),9,Te)]),t("div",Be,[t("div",$e,[t("span",{class:C(["secure-badge",{active:m.value}]),onClick:T,title:"点击切换安全连接状态"}," 🔐 安全连接 ",2),t("span",{class:C(["privacy-badge",{active:b.value}]),onClick:h,title:"点击切换隐私模式"}," 👁️ 隐私模式 ",2)]),t("div",{class:"action-buttons"},[t("button",{class:"action-btn",onClick:j,title:"将XML插入编辑器"}," 📄 插入XML "),t("button",{class:"action-btn",onClick:n,title:"导出XML文件"}," 💾 导出 ")])])],512),[[me,o.value]])]))}},se=Q(De,[["__scopeId","data-v-fed4d6f9"]]),Ue={class:"rich-text-editor"},Xe={class:"editor-toolbar"},Ke={class:"toolbar-group"},Oe={class:"toolbar-group"},Pe={class:"toolbar-group"},Ee={class:"toolbar-group"},ze=["placeholder"],Ve={__name:"RichTextEditor",props:{modelValue:{type:String,default:""},placeholder:{type:String,default:"开始输入..."}},emits:["update:modelValue","focus","blur"],setup(y,{emit:c}){const i=y,a=c,o=w(null);let p=!1;const x=()=>{if(!o.value)return null;const v=window.getSelection();if(!v.rangeCount)return null;const r=v.getRangeAt(0),h=r.cloneRange();return h.selectNodeContents(o.value),h.setEnd(r.endContainer,r.endOffset),h.toString().length},f=v=>{if(!o.value||v===null)return;let r=0;const h=document.createTreeWalker(o.value,NodeFilter.SHOW_TEXT,null,!1);let T;for(;T=h.nextNode();){const X=r+T.textContent.length;if(v<=X){const B=document.createRange();B.setStart(T,v-r),B.collapse(!0);const I=window.getSelection();I.removeAllRanges(),I.addRange(B);break}r=X}};ge(()=>i.modelValue,v=>{if(!p&&o.value){const r=x();p=!0,o.value.innerHTML!==(v||"")&&(o.value.innerHTML=v||""),r!==null?W(()=>{f(r),p=!1}):W(()=>{p=!1})}},{immediate:!0});const m=(v,r=null)=>{p=!0,document.execCommand(v,!1,r),o.value.focus(),setTimeout(()=>{p=!1,M()},0)},b=(v,r=null)=>{if(!o.value)return!1;try{return document.queryCommandState(v)}catch(h){return console.warn("Could not check command state:",h),!1}},M=()=>{if(!p&&o.value){const v=o.value.innerHTML;v!==i.modelValue&&a("update:modelValue",v)}},A=()=>{a("focus")},U=()=>{a("blur")};return Y(()=>{o.value&&(o.value.setAttribute("style",`
      min-height: 300px;
      padding: 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      line-height: 1.6;
    `),i.modelValue&&o.value.innerHTML!==i.modelValue&&(o.value.innerHTML=i.modelValue))}),ve(()=>{}),(v,r)=>(_(),N("div",Ue,[t("div",Xe,[t("div",Ke,[t("button",{type:"button",class:C(["toolbar-btn",{active:b("bold")}]),onClick:r[0]||(r[0]=h=>m("bold")),title:"Bold"},[...r[10]||(r[10]=[t("strong",null,"B",-1)])],2),t("button",{type:"button",class:C(["toolbar-btn",{active:b("italic")}]),onClick:r[1]||(r[1]=h=>m("italic")),title:"Italic"},[...r[11]||(r[11]=[t("em",null,"I",-1)])],2),t("button",{type:"button",class:C(["toolbar-btn",{active:b("underline")}]),onClick:r[2]||(r[2]=h=>m("underline")),title:"Underline"}," U ",2)]),t("div",Oe,[t("button",{type:"button",class:C(["toolbar-btn",{active:b("heading",{})}]),onClick:r[3]||(r[3]=h=>m("heading",{level:1})),title:"Heading 1"}," H1 ",2),t("button",{type:"button",class:C(["toolbar-btn",{active:b("heading",{})}]),onClick:r[4]||(r[4]=h=>m("heading",{level:2})),title:"Heading 2"}," H2 ",2),t("button",{type:"button",class:C(["toolbar-btn",{active:b("heading",{})}]),onClick:r[5]||(r[5]=h=>m("heading",{level:3})),title:"Heading 3"}," H3 ",2)]),t("div",Pe,[t("button",{type:"button",class:C(["toolbar-btn",{active:b("bulletList")}]),onClick:r[6]||(r[6]=h=>m("bulletList")),title:"Bullet List"}," • List ",2),t("button",{type:"button",class:C(["toolbar-btn",{active:b("orderedList")}]),onClick:r[7]||(r[7]=h=>m("orderedList")),title:"Ordered List"}," 1. List ",2)]),t("div",Ee,[t("button",{type:"button",class:C(["toolbar-btn",{active:b("blockquote")}]),onClick:r[8]||(r[8]=h=>m("blockquote")),title:"Blockquote"},' " ',2),t("button",{type:"button",class:C(["toolbar-btn",{active:b("codeBlock")}]),onClick:r[9]||(r[9]=h=>m("codeBlock")),title:"Code Block"}," </> ",2)])]),t("div",{ref_key:"editorElement",ref:o,class:"editor-content",contenteditable:"true",onInput:M,onFocus:A,onBlur:U,placeholder:y.placeholder},null,40,ze)]))}},ae=Q(Ve,[["__scopeId","data-v-8a97fdf4"]]),He={class:"cnblogs-fullscreen"},Ge={class:"inner-wrapper"},qe={class:"main-body"},je={class:"content-inner"},Je={class:"content-left"},We={class:"article-editor-container"},Qe={class:"editor-header"},Ye={class:"editor-actions"},Ze={class:"editor-meta"},et={class:"editor-content"},tt={key:0,class:"xml-editor-section"},ot={class:"xml-controls"},nt={key:1,class:"visual-editor-section"},st={class:"editor-controls"},at={class:"visual-content"},rt={key:0,class:"editor-preview"},lt=["innerHTML"],it={class:"sidebar-right"},ct={class:"sidebar-section"},ut={class:"author-info"},dt={class:"author-avatar"},mt=["src"],pt={class:"author-details"},gt={class:"author-name"},vt={class:"author-bio"},ht={class:"author-stats"},ft={class:"stat"},yt={class:"stat-number"},bt={class:"stat"},kt={class:"stat-number"},Rt={class:"stat"},_t={class:"stat-number"},wt={class:"sidebar-section"},Ct={class:"quick-actions"},xt=Object.assign({components:{AIChatAssistant:se,RichTextEditor:ae}},{__name:"ArticleEditor",setup(y){const c=Re(),i=we(),a=he(),o=w({id:"",title:"",content:"",xmlContent:"",category:"",tags:[],author:"",publishDate:"",likes:0,views:0,commentsCount:0}),p=w([]),x=w(["Vue","JavaScript","前端","后端","Node.js","React","TypeScript"]),f=w(!1),m=w({username:"",avatar:"",bio:"暂无简介",postsCount:0,articlesCount:0,commentsCount:0}),b=async()=>{try{p.value=await ke.getAllCategories()}catch(n){console.error("获取分类失败:",n),g.error("获取分类失败")}},M=async()=>{const n=c.params.articleId,e=a.user?.id||"1",s=`draft_${e}_cache`,u=n&&n!=="new"?`draft_${e}_${n}`:null;console.log("--- 开始加载文章 ---"),console.log("路由 ID:",n),console.log("用户 ID:",e);let d="server";const R=localStorage.getItem(s);if(R)try{const l=JSON.parse(R);(!n||n==="new"||n==="cache")&&(console.log("✅ 命中通用草稿缓存"),o.value={...l},o.value.xmlContent||(o.value.xmlContent=A(o.value.content)),d="local_draft")}catch(l){console.error("解析草稿缓存失败",l),localStorage.removeItem(s)}if(d==="server"&&n&&n!=="new"&&n!=="cache"){if(u){const l=localStorage.getItem(u);if(l){console.log("✅ 命中特定文章缓存");const L=JSON.parse(l),ie=a.user?.username||a.user?.name||"墨语";L.author===ie?(o.value=L,d="local_specific"):console.log("❌ 缓存文章不属于当前用户，忽略该缓存")}}if(d==="server")try{console.log("🌐 请求服务器数据...");const l=a.user?.username||a.user?.name||"墨语",L=await V.getPostByIdAndAuthor(n,l);o.value={...L},o.value.xmlContent||(o.value.xmlContent=A(L.content||L.title))}catch(l){console.error("加载文章失败:",l),g.error("加载文章失败，可能文章不存在")}}d==="server"&&(!n||n==="new")&&(console.log("📝 初始化全新文章"),o.value={id:"",title:"",content:"",xmlContent:A(),category:"",tags:[],author:a.user?.username||a.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0}),console.log("最终加载到的数据:",o.value),console.log("数据来源:",d)},A=(n="")=>{const e=new Date().toISOString().split("T")[0];return`<?xml version="1.0" encoding="UTF-8"?>
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
            <p>${n||"开始输入您的内容..."}</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>`},U=()=>{f.value=!0},v=()=>{f.value=!1},r=()=>{try{if(new DOMParser().parseFromString(o.value.xmlContent,"text/xml").getElementsByTagName("parsererror").length>0)throw new Error("XML格式错误");g.success("XML格式正确")}catch(n){g.error(`XML格式错误: ${n.message}`)}},h=()=>{try{const e=new DOMParser().parseFromString(o.value.xmlContent,"text/xml");let d=new XMLSerializer().serializeToString(e).replace(/></g,`>
<`).replace(/^(\s*)/gm,function(R,l){const L=R.length/2-1;return"  ".repeat(Math.max(0,L))});o.value.xmlContent=d,g.success("XML已格式化")}catch(n){g.error(`格式化失败: ${n.message}`)}},T=async()=>{try{const n=a.user?.id||"1";let e;!o.value.id||o.value.id==="new"||o.value.id==="cache"?e=`draft_${n}_cache`:e=`draft_${n}_${o.value.id}`;const s=a.user?.username||a.user?.name||"墨语",u={...o.value,author:s,updatedAt:new Date().toISOString()};localStorage.setItem(e,JSON.stringify(u)),console.log("✅ 文章已保存至本地缓存"),console.log("缓存键:",e),g.success("文章已保存到本地草稿箱")}catch(n){console.error("保存文章失败:",n),g.error("保存文章失败")}},X=()=>{const e=`draft_${a.user?.id||"1"}_cache`;ee.confirm("确定要清空当前编辑的所有内容吗？此操作不可恢复。","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{o.value={id:"",title:"",content:"",xmlContent:A(),category:"",tags:[],author:a.user?.username||a.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0},localStorage.removeItem(e),g.success("内容已清空")}).catch(()=>{})},B=async()=>{try{const n=await V.getAllPosts(),e=a.user?.username||a.user?.name||"墨语",s=n.filter(d=>d.author===e).map(d=>parseInt(d.id)).filter(d=>!isNaN(d));return(s.length>0?Math.max(...s):0)+1}catch(n){return console.error("获取下一个ID失败:",n),1}},I=async()=>{try{const n=a.user?.username||a.user?.name||"墨语",e={...o.value,author:n,xmlContent:o.value.xmlContent,publishDate:o.value.publishDate||new Date().toISOString().split("T")[0],updatedAt:new Date().toISOString()};if(!o.value.id||o.value.id===""){const s=await B();e.id=s.toString();const u=await V.createPost(e);o.value={...u},g.success("文章已发布")}else await V.updatePost(o.value.id,e),g.success("文章已发布")}catch(n){console.error("发布文章失败:",n),g.error("发布文章失败")}},P=async()=>{const n=a.user?.id||"1";if(console.log("准备返回文章列表"),console.log("当前文章ID:",o.value.id),console.log("用户ID:",n),!o.value.id||o.value.id===""||o.value.id==="cache"){const e=`draft_${n}_cache`;if(console.log("检查临时草稿键:",e),console.log("临时草稿是否存在:",localStorage.getItem(e)),localStorage.getItem(e))try{await ee.confirm("检测到有未发布的草稿，是否在离开前清除？","提示",{confirmButtonText:"清除",cancelButtonText:"保留",type:"info"}),localStorage.removeItem(e),console.log("已清除临时草稿")}catch{console.log("用户选择保留草稿")}}i.push(`/dashboard/${n}`)},E=async()=>{try{if(a.user)m.value={...a.user};else{const n=await _e.getUserById(0);m.value=n}}catch(n){console.error("获取用户信息失败:",n)}},j=n=>{n.xml&&(o.value.xmlContent=n.xml),n.text&&(o.value.content=n.text),g.success("内容已通过AI助手更新")};return Y(async()=>{await b(),await M(),await E()}),(n,e)=>{const s=z("el-input"),u=z("el-button"),d=z("el-option"),R=z("el-select");return _(),N(G,null,[t("div",He,[t("div",Ge,[k(fe),t("div",qe,[t("div",je,[t("div",Je,[t("div",We,[t("div",Qe,[k(s,{modelValue:o.value.title,"onUpdate:modelValue":e[0]||(e[0]=l=>o.value.title=l),placeholder:"请输入文章标题",class:"title-input"},null,8,["modelValue"]),t("div",Ye,[k(u,{onClick:P},{default:S(()=>[...e[5]||(e[5]=[F("返回",-1)])]),_:1}),k(u,{type:"primary",onClick:T},{default:S(()=>[...e[6]||(e[6]=[F("保存",-1)])]),_:1}),k(u,{type:"danger",onClick:X},{default:S(()=>[...e[7]||(e[7]=[F("清空内容",-1)])]),_:1}),k(u,{type:"success",onClick:I},{default:S(()=>[...e[8]||(e[8]=[F("发布",-1)])]),_:1})])]),t("div",Ze,[k(R,{modelValue:o.value.category,"onUpdate:modelValue":e[1]||(e[1]=l=>o.value.category=l),placeholder:"选择分类",class:"category-select"},{default:S(()=>[(_(!0),N(G,null,J(p.value,l=>(_(),Z(d,{key:l.id,label:l.name,value:l.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),k(R,{modelValue:o.value.tags,"onUpdate:modelValue":e[2]||(e[2]=l=>o.value.tags=l),multiple:"",placeholder:"选择标签",class:"tags-select"},{default:S(()=>[(_(!0),N(G,null,J(x.value,l=>(_(),Z(d,{key:l,label:l,value:l},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),t("div",et,[f.value?(_(),N("div",tt,[e[12]||(e[12]=t("h3",null,"AKN4UN XML 编辑器",-1)),t("div",ot,[k(u,{onClick:v,size:"small"},{default:S(()=>[...e[9]||(e[9]=[F("切换到可视化编辑",-1)])]),_:1}),k(u,{onClick:r,size:"small"},{default:S(()=>[...e[10]||(e[10]=[F("验证XML",-1)])]),_:1}),k(u,{onClick:h,size:"small"},{default:S(()=>[...e[11]||(e[11]=[F("格式化",-1)])]),_:1})]),H(t("textarea",{"onUpdate:modelValue":e[3]||(e[3]=l=>o.value.xmlContent=l),class:"xml-textarea",placeholder:"在此输入AKN4UN XML内容..."},null,512),[[re,o.value.xmlContent]])])):(_(),N("div",nt,[e[14]||(e[14]=t("h3",null,"可视化编辑器",-1)),t("div",st,[k(u,{onClick:U,size:"small"},{default:S(()=>[...e[13]||(e[13]=[F("切换到XML编辑",-1)])]),_:1})]),t("div",at,[k(ae,{modelValue:o.value.content,"onUpdate:modelValue":e[4]||(e[4]=l=>o.value.content=l),placeholder:"在此输入文章内容..."},null,8,["modelValue"])])]))]),f.value?ye("",!0):(_(),N("div",rt,[e[15]||(e[15]=t("h3",null,"预览",-1)),t("div",{class:"preview-content",innerHTML:o.value.content},null,8,lt)]))])]),t("div",it,[t("div",ct,[e[19]||(e[19]=t("h3",{class:"sidebar-title"},"博主信息",-1)),t("div",ut,[t("div",dt,[t("img",{src:m.value.avatar,alt:"博主头像",class:"avatar-img"},null,8,mt)]),t("div",pt,[t("h4",gt,D(m.value.username),1),t("p",vt,D(m.value.bio),1),t("div",ht,[t("div",ft,[t("span",yt,D(m.value.postsCount),1),e[16]||(e[16]=t("span",{class:"stat-label"},"随笔",-1))]),t("div",bt,[t("span",kt,D(m.value.articlesCount||0),1),e[17]||(e[17]=t("span",{class:"stat-label"},"文章",-1))]),t("div",Rt,[t("span",_t,D(m.value.commentsCount||0),1),e[18]||(e[18]=t("span",{class:"stat-label"},"评论",-1))])])])])]),e[21]||(e[21]=t("div",{class:"sidebar-section"},[t("h3",{class:"sidebar-title"},"编辑器提示"),t("ul",{class:"tips-list"},[t("li",null,"支持AKN4UN XML格式编辑"),t("li",null,'点击"验证XML"确保格式正确'),t("li",null,'"格式化"功能可美化XML代码'),t("li",null,"记得定期保存您的作品")])],-1)),t("div",wt,[e[20]||(e[20]=t("h3",{class:"sidebar-title"},"快捷操作",-1)),t("ul",Ct,[t("li",null,[t("a",{href:"#",onClick:K(r,["prevent"])},"验证XML")]),t("li",null,[t("a",{href:"#",onClick:K(h,["prevent"])},"格式化XML")]),t("li",null,[f.value?(_(),N("a",{key:1,href:"#",onClick:K(v,["prevent"])},"切换到可视化模式")):(_(),N("a",{key:0,href:"#",onClick:K(U,["prevent"])},"切换到XML模式"))])])])])])]),k(be)])]),k(se,{"current-content":o.value.content,"current-title":o.value.title,onContentUpdate:j},null,8,["current-content","current-title"])],64)}}}),Nt=Q(xt,[["__scopeId","data-v-234339af"]]);export{Nt as default};
//# sourceMappingURL=ArticleEditor-Bm4P2j6n.js.map
