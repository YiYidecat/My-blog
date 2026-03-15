import{_ as oe,r as R,x as le,k as se,y as ie,c as k,o as y,a as t,b as O,z as ce,t as C,A as ue,F as E,m as J,B as j,C as de,w as F,v as ae,D as me,E as d,u as pe,d as g,H as he,l as ge,g as K,f as w,p as ve,G as fe,i as ye,P,U as Re,h as ke,e as N,q as W,s as Q}from"./index-B9fUhdPb.js";const Y={provider:"ollama",settings:{deepseek:{apiKey:"",model:"deepseek-chat",temperature:.7,maxTokens:8192},kimi:{apiKey:"",model:"kimi-large",temperature:.7,maxTokens:2048},local:{enabled:!0},ollama:{enabled:!0,baseUrl:"http://localhost:11434/api",model:"qwen2.5:7b",temperature:.7,contextSize:2048}},features:{xmlConversion:!0,documentAnalysis:!0,contentOptimization:!0,securityEnabled:!0},security:{enableEncryption:!0,enablePrivacyMode:!0,dataRetentionDays:30}},z=()=>{try{const v=localStorage.getItem("aiConfig");return v?JSON.parse(v):Y}catch(v){return console.warn("Failed to load AI config from localStorage, using defaults:",v),Y}},Z=v=>z().settings[v]||{},_e=()=>z().provider,x={DEEPSEEK:"deepseek",KIMI:"kimi",LOCAL:"local",OLLAMA:"ollama"};class ne{constructor(l=null,i=null){this.provider=l||_e()||x.LOCAL,this.config=z(),this.apiKey=i||this._getApiKeyFromConfig(this.provider),this.settings=Z(this.provider),this.baseURL=this.getBaseURL()}_getApiKeyFromConfig(l){return Z(l).apiKey||null}getBaseURL(){switch(this.provider){case x.DEEPSEEK:return"https://api.deepseek.com";case x.KIMI:return"https://api.kimi.com/v1";case x.OLLAMA:return this.settings.ollamaBaseUrl||"http://localhost:11434/api";default:return null}}async sendMessage(l,i={}){switch(this.provider){case x.DEEPSEEK:return this._callDeepSeek(l,i);case x.KIMI:return this._callKimi(l,i);case x.OLLAMA:return this._callOllama(l,i);default:return this._callLocal(l,i)}}async _callDeepSeek(l,i={}){if(!this.apiKey)throw new Error("DeepSeek API key is required");const n={...this.settings,...i},o=await fetch(`${this.baseURL}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:n.model||"deepseek-chat",messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:l}],temperature:n.temperature||i.temperature||.7,max_tokens:n.maxTokens||i.maxTokens||8192,stream:!1})});if(!o.ok){const m=(await o.json().catch(()=>({}))).error?.message||"";if(o.status===429)return console.warn("DeepSeek quota exceeded, falling back to local service"),this._callLocal(l,i);throw o.status===401?new Error(`DeepSeek authentication error: Invalid API key. ${m}`):o.status===403?new Error(`DeepSeek access forbidden: ${m}`):new Error(`DeepSeek API error (${o.status}): ${m}`)}return(await o.json()).choices[0]?.message?.content||""}async _callKimi(l,i={}){if(!this.apiKey)throw new Error("Kimi API key is required");return console.warn("Kimi API not yet available, falling back to local service"),this._callLocal(l,i)}async _callOllama(l,i={}){const n={...this.settings,...i},o=n.ollamaModel||"qwen2.5:7b",p=await fetch(`${this.baseURL}/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:l}],stream:!1,options:{temperature:n.temperature||i.temperature||.7,num_ctx:n.contextSize||2048}})});if(!p.ok){const m=await p.json().catch(()=>({})),h=m.error?.message||m.message||"Unknown error";throw new Error(`Ollama API error (${p.status}): ${h}`)}const _=await p.json();return _.message?.content||_.response||""}async _callLocal(l,i={}){return await new Promise(n=>setTimeout(n,1e3)),this._simulateResponse(l,i)}_simulateResponse(l,i={}){const n=l.toLowerCase();if(n.includes("convert")||n.includes("xml")||n.includes("akn4un")){const o=i.currentTitle||"Untitled Document",p=i.currentContent||"Content to be converted...";return`好的，我已将您的内容转换为AKN4UN XML格式：

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

您可以直接使用此XML代码，或进一步调整以满足您的具体需求。`}else return n.includes("help")||n.includes("instruction")||n.includes("how")?`我可以帮助您：

1. 将普通文本转换为AKN4UN XML格式
2. 优化现有的XML结构
3. 提取文档中的关键信息
4. 检查XML格式的正确性
5. 提供关于AKN4UN标准的专业建议

例如，您可以问我：
- "帮我把当前内容转换成AKN4UN XML格式"
- "优化这个XML文档的结构"
- "检查这段XML是否符合AKN4UN标准"
- "解释一下AKN4UN的某个元素的用途"`:`我已经收到您的请求："${l.substring(0,50)}..."。基于我的分析，以下是相关建议：

如果您需要将内容转换为AKN4UN XML格式，请明确说明，我可以帮您生成标准格式的XML文档。

如果您想了解如何更好地组织您的法律文档，请告诉我具体的文档类型或主题，我可以提供针对性的建议。`}_sanitizeForXml(l){return l?l.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&apos;"):""}getDefaultSystemPrompt(){return`你是一个专业的法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
    
能力说明：
1. 将普通文本内容转换为标准的AKN4UN XML格式
2. 提取文档中的关键信息（如章节、条款、段落等）
3. 检查XML格式的正确性
4. 优化文档结构以符合联合国文档标准
5. 提供关于AKN4UN标准的专业建议

请根据用户提供的内容进行相应的操作。`}}let T=null;const ee=(v=null,l=null)=>(T=new ne(v,l),T),be=()=>{if(!T){const l=z().provider||"local";T=new ne(l)}return T},we={class:"ai-chat-assistant"},Ae={class:"chat-header"},Ne={class:"header-controls"},xe={class:"chat-container"},Ce=["innerHTML"],Me={class:"chat-input-area"},Se=["onKeydown"],Ie=["disabled"],Fe={class:"security-controls"},Te={class:"security-indicator"},Le={__name:"AIChatAssistant",props:{currentContent:{type:String,default:""},currentTitle:{type:String,default:""}},emits:["content-update","title-update"],setup(v,{emit:l}){const i=v,n=l,o=R(!1),p=R(""),_=R([]),m=R(!1),h=R(!0),M=R(!0),S=R(null),b=R("ollama"),L=le(()=>`你是一个专业的联合国法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
  
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

请根据用户提供的内容进行相应的操作。`),B=()=>{o.value=!o.value},D=e=>e.replace(/```xml([\s\S]*?)```/g,'<pre class="code-block"><code class="language-xml">$1</code></pre>').replace(/```([\s\S]*?)```/g,'<pre class="code-block"><code>$1</code></pre>').replace(/\n/g,"<br>"),X=()=>{M.value=!M.value,d.info(M.value?"隐私模式已启用":"隐私模式已禁用")},V=()=>{h.value=!h.value,d.info(h.value?"安全连接已启用":"安全连接已禁用")},G=()=>{ee(b.value),d.info(`已切换到 ${H(b.value)} 模型`)},H=e=>({local:"本地模型",ollama:"Ollama",deepseek:"DeepSeek",kimi:"Kimi"})[e]||e,I=(e,a)=>{_.value.push({role:e,content:a}),me(()=>{S.value&&(S.value.scrollTop=S.value.scrollHeight)})},U=async()=>{if(!p.value.trim()||m.value)return;const e=p.value;I("user",e),p.value="",m.value=!0;try{const a=`当前文档标题: "${i.currentTitle}"
当前文档内容: "${i.currentContent}"

用户问题: ${e}
请根据上述文档内容回答用户的问题。`;ee(b.value);const u=await be().sendMessage(a,{currentTitle:i.currentTitle,currentContent:i.currentContent,systemPrompt:L.value});if(I("assistant",u),u.includes("<akomaNtoso")&&u.includes("</akomaNtoso>")){const f=u.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(f){const r=f[1]||f[2];n("content-update",{xml:r,text:$(r)})}}}catch(a){console.error("AI response error:",a),I("assistant","抱歉，处理您的请求时出现了错误。请稍后再试。"),d.error(`AI服务错误: ${a.message||"请求失败"}`)}finally{m.value=!1}},$=e=>{const a=document.createElement("div");return a.innerHTML=e,a.textContent||a.innerText||""},q=()=>{const e=[..._.value].reverse().find(a=>a.role==="assistant"&&a.content.includes("<akomaNtoso")&&a.content.includes("</akomaNtoso>"));if(e){const a=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(a){const c=a[1]||a[2];n("content-update",{xml:c,text:$(c)}),d.success("XML已插入到编辑器")}else d.warning("未找到有效的XML内容")}else d.warning("聊天记录中未找到XML内容")},s=()=>{const e=[..._.value].reverse().find(a=>a.role==="assistant"&&a.content.includes("<akomaNtoso")&&a.content.includes("</akomaNtoso>"));if(e){const a=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(a){const c=a[1]||a[2],u=new Blob([c],{type:"application/xml"}),f=URL.createObjectURL(u),r=document.createElement("a");r.href=f,r.download=`document-${new Date().toISOString().split("T")[0]}.xml`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(f),d.success("XML文件已导出")}else d.warning("未找到有效的XML内容")}else d.warning("聊天记录中未找到XML内容")};return se(()=>{I("assistant","您好！我是您的AI助手，专门帮助您处理AKN4UN XML格式的文档。您可以向我提问如何转换内容、优化结构或检查格式等问题。")}),ie(()=>{}),(e,a)=>(y(),k("div",we,[t("div",Ae,[a[3]||(a[3]=t("h3",null,"AI 助手",-1)),t("div",Ne,[O(t("select",{"onUpdate:modelValue":a[0]||(a[0]=c=>b.value=c),class:"model-selector",onChange:G},[...a[2]||(a[2]=[t("option",{value:"local"},"本地模型",-1),t("option",{value:"ollama"},"Ollama",-1),t("option",{value:"deepseek"},"DeepSeek",-1),t("option",{value:"kimi"},"Kimi",-1)])],544),[[ce,b.value]]),t("button",{class:"toggle-btn",onClick:B},C(o.value?"隐藏":"显示"),1)])]),O(t("div",xe,[t("div",{class:"chat-messages",ref_key:"messagesContainer",ref:S},[(y(!0),k(E,null,J(_.value,(c,u)=>(y(),k("div",{key:u,class:j(["message",c.role])},[t("div",{class:"message-content",innerHTML:D(c.content)},null,8,Ce)],2))),128))],512),t("div",Me,[O(t("textarea",{"onUpdate:modelValue":a[1]||(a[1]=c=>p.value=c),onKeydown:de(F(U,["ctrl"]),["enter"]),placeholder:"向AI助手提问，例如：帮我将这段内容转换为AKN4UN XML格式...",class:"chat-input"},null,40,Se),[[ae,p.value]]),t("button",{onClick:U,disabled:m.value||!p.value.trim(),class:"send-btn"},C(m.value?"发送中...":"发送"),9,Ie)]),t("div",Fe,[t("div",Te,[t("span",{class:j(["secure-badge",{active:h.value}]),onClick:V,title:"点击切换安全连接状态"}," 🔐 安全连接 ",2),t("span",{class:j(["privacy-badge",{active:M.value}]),onClick:X,title:"点击切换隐私模式"}," 👁️ 隐私模式 ",2)]),t("div",{class:"action-buttons"},[t("button",{class:"action-btn",onClick:q,title:"将XML插入编辑器"}," 📄 插入XML "),t("button",{class:"action-btn",onClick:s,title:"导出XML文件"}," 💾 导出 ")])])],512),[[ue,o.value]])]))}},te=oe(Le,[["__scopeId","data-v-5d49be8f"]]),Be={class:"cnblogs-fullscreen"},De={class:"inner-wrapper"},Xe={class:"main-body"},Ue={class:"content-inner"},$e={class:"content-left"},Ke={class:"article-editor-container"},Pe={class:"editor-header"},Oe={class:"editor-actions"},Ee={class:"editor-meta"},ze={class:"editor-content"},Ve={key:0,class:"xml-editor-section"},Ge={class:"xml-controls"},He={key:1,class:"visual-editor-section"},qe={class:"editor-controls"},je={class:"visual-content"},Je={key:0,class:"editor-preview"},We=["innerHTML"],Qe={class:"sidebar-right"},Ye={class:"sidebar-section"},Ze={class:"author-info"},et={class:"author-avatar"},tt=["src"],ot={class:"author-details"},st={class:"author-name"},at={class:"author-bio"},nt={class:"author-stats"},rt={class:"stat"},lt={class:"stat-number"},it={class:"stat"},ct={class:"stat-number"},ut={class:"stat"},dt={class:"stat-number"},mt={class:"sidebar-section"},pt={class:"quick-actions"},ht=Object.assign({components:{AIChatAssistant:te}},{__name:"ArticleEditor",setup(v){const l=ye(),i=ke(),n=pe(),o=R({id:"",title:"",content:"",xmlContent:"",category:"",tags:[],author:"",publishDate:"",likes:0,views:0,commentsCount:0}),p=R([]),_=R(["Vue","JavaScript","前端","后端","Node.js","React","TypeScript"]),m=R(!1),h=R({username:"",avatar:"",bio:"暂无简介",postsCount:0,articlesCount:0,commentsCount:0}),M=async()=>{try{p.value=await fe.getAllCategories()}catch(s){console.error("获取分类失败:",s),d.error("获取分类失败")}},S=async()=>{const s=l.params.articleId,e=n.user?.id||"1",a=`draft_${e}_cache`,c=s&&s!=="new"?`draft_${e}_${s}`:null;console.log("--- 开始加载文章 ---"),console.log("路由 ID:",s),console.log("用户 ID:",e);let u="server";const f=localStorage.getItem(a);if(f)try{const r=JSON.parse(f);(!s||s==="new"||s==="cache")&&(console.log("✅ 命中通用草稿缓存"),o.value={...r},o.value.xmlContent||(o.value.xmlContent=b(o.value.content)),u="local_draft")}catch(r){console.error("解析草稿缓存失败",r),localStorage.removeItem(a)}if(u==="server"&&s&&s!=="new"&&s!=="cache"){if(c){const r=localStorage.getItem(c);if(r){console.log("✅ 命中特定文章缓存");const A=JSON.parse(r),re=n.user?.username||n.user?.name||"墨语";A.author===re?(o.value=A,u="local_specific"):console.log("❌ 缓存文章不属于当前用户，忽略该缓存")}}if(u==="server")try{console.log("🌐 请求服务器数据...");const r=n.user?.username||n.user?.name||"墨语",A=await P.getPostByIdAndAuthor(s,r);o.value={...A},o.value.xmlContent||(o.value.xmlContent=b(A.content||A.title))}catch(r){console.error("加载文章失败:",r),d.error("加载文章失败，可能文章不存在")}}u==="server"&&(!s||s==="new")&&(console.log("📝 初始化全新文章"),o.value={id:"",title:"",content:"",xmlContent:b(),category:"",tags:[],author:n.user?.username||n.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0}),console.log("最终加载到的数据:",o.value),console.log("数据来源:",u)},b=(s="")=>{const e=new Date().toISOString().split("T")[0];return`<?xml version="1.0" encoding="UTF-8"?>
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
            <p>${s||"开始输入您的内容..."}</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>`},L=()=>{m.value=!0},B=()=>{m.value=!1},D=()=>{try{if(new DOMParser().parseFromString(o.value.xmlContent,"text/xml").getElementsByTagName("parsererror").length>0)throw new Error("XML格式错误");d.success("XML格式正确")}catch(s){d.error(`XML格式错误: ${s.message}`)}},X=()=>{try{const e=new DOMParser().parseFromString(o.value.xmlContent,"text/xml");let u=new XMLSerializer().serializeToString(e).replace(/></g,`>
<`).replace(/^(\s*)/gm,function(f,r){const A=f.length/2-1;return"  ".repeat(Math.max(0,A))});o.value.xmlContent=u,d.success("XML已格式化")}catch(s){d.error(`格式化失败: ${s.message}`)}},V=async()=>{try{const s=n.user?.id||"1";let e;!o.value.id||o.value.id==="new"||o.value.id==="cache"?e=`draft_${s}_cache`:e=`draft_${s}_${o.value.id}`;const a=n.user?.username||n.user?.name||"墨语",c={...o.value,author:a,updatedAt:new Date().toISOString()};localStorage.setItem(e,JSON.stringify(c)),console.log("✅ 文章已保存至本地缓存"),console.log("缓存键:",e),d.success("文章已保存到本地草稿箱")}catch(s){console.error("保存文章失败:",s),d.error("保存文章失败")}},G=()=>{const e=`draft_${n.user?.id||"1"}_cache`;Q.confirm("确定要清空当前编辑的所有内容吗？此操作不可恢复。","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{o.value={id:"",title:"",content:"",xmlContent:b(),category:"",tags:[],author:n.user?.username||n.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0},localStorage.removeItem(e),d.success("内容已清空")}).catch(()=>{})},H=async()=>{try{const s=await P.getAllPosts(),e=n.user?.username||n.user?.name||"墨语",a=s.filter(u=>u.author===e).map(u=>parseInt(u.id)).filter(u=>!isNaN(u));return(a.length>0?Math.max(...a):0)+1}catch(s){return console.error("获取下一个ID失败:",s),1}},I=async()=>{try{const s=n.user?.username||n.user?.name||"墨语",e={...o.value,author:s,xmlContent:o.value.xmlContent,publishDate:o.value.publishDate||new Date().toISOString().split("T")[0],updatedAt:new Date().toISOString()};if(!o.value.id||o.value.id===""){const a=await H();e.id=a.toString();const c=await P.createPost(e);o.value={...c},d.success("文章已发布")}else await P.updatePost(o.value.id,e),d.success("文章已发布")}catch(s){console.error("发布文章失败:",s),d.error("发布文章失败")}},U=async()=>{const s=n.user?.id||"1";if(console.log("准备返回文章列表"),console.log("当前文章ID:",o.value.id),console.log("用户ID:",s),!o.value.id||o.value.id===""||o.value.id==="cache"){const e=`draft_${s}_cache`;if(console.log("检查临时草稿键:",e),console.log("临时草稿是否存在:",localStorage.getItem(e)),localStorage.getItem(e))try{await Q.confirm("检测到有未发布的草稿，是否在离开前清除？","提示",{confirmButtonText:"清除",cancelButtonText:"保留",type:"info"}),localStorage.removeItem(e),console.log("已清除临时草稿")}catch{console.log("用户选择保留草稿")}}i.push(`/dashboard/${s}`)},$=async()=>{try{if(n.user)h.value={...n.user};else{const s=await Re.getUserById(0);h.value=s}}catch(s){console.error("获取用户信息失败:",s)}},q=s=>{s.xml&&(o.value.xmlContent=s.xml),s.text&&(o.value.content=s.text),d.success("内容已通过AI助手更新")};return se(async()=>{await M(),await S(),await $()}),(s,e)=>{const a=K("el-input"),c=K("el-button"),u=K("el-option"),f=K("el-select");return y(),k(E,null,[t("div",Be,[t("div",De,[g(he),t("div",Xe,[t("div",Ue,[t("div",$e,[t("div",Ke,[t("div",Pe,[g(a,{modelValue:o.value.title,"onUpdate:modelValue":e[0]||(e[0]=r=>o.value.title=r),placeholder:"请输入文章标题",class:"title-input"},null,8,["modelValue"]),t("div",Oe,[g(c,{onClick:U},{default:w(()=>[...e[5]||(e[5]=[N("返回",-1)])]),_:1}),g(c,{type:"primary",onClick:V},{default:w(()=>[...e[6]||(e[6]=[N("保存",-1)])]),_:1}),g(c,{type:"danger",onClick:G},{default:w(()=>[...e[7]||(e[7]=[N("清空内容",-1)])]),_:1}),g(c,{type:"success",onClick:I},{default:w(()=>[...e[8]||(e[8]=[N("发布",-1)])]),_:1})])]),t("div",Ee,[g(f,{modelValue:o.value.category,"onUpdate:modelValue":e[1]||(e[1]=r=>o.value.category=r),placeholder:"选择分类",class:"category-select"},{default:w(()=>[(y(!0),k(E,null,J(p.value,r=>(y(),W(u,{key:r.id,label:r.name,value:r.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),g(f,{modelValue:o.value.tags,"onUpdate:modelValue":e[2]||(e[2]=r=>o.value.tags=r),multiple:"",placeholder:"选择标签",class:"tags-select"},{default:w(()=>[(y(!0),k(E,null,J(_.value,r=>(y(),W(u,{key:r,label:r,value:r},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),t("div",ze,[m.value?(y(),k("div",Ve,[e[12]||(e[12]=t("h3",null,"AKN4UN XML 编辑器",-1)),t("div",Ge,[g(c,{onClick:B,size:"small"},{default:w(()=>[...e[9]||(e[9]=[N("切换到可视化编辑",-1)])]),_:1}),g(c,{onClick:D,size:"small"},{default:w(()=>[...e[10]||(e[10]=[N("验证XML",-1)])]),_:1}),g(c,{onClick:X,size:"small"},{default:w(()=>[...e[11]||(e[11]=[N("格式化",-1)])]),_:1})]),O(t("textarea",{"onUpdate:modelValue":e[3]||(e[3]=r=>o.value.xmlContent=r),class:"xml-textarea",placeholder:"在此输入AKN4UN XML内容..."},null,512),[[ae,o.value.xmlContent]])])):(y(),k("div",He,[e[14]||(e[14]=t("h3",null,"可视化编辑器",-1)),t("div",qe,[g(c,{onClick:L,size:"small"},{default:w(()=>[...e[13]||(e[13]=[N("切换到XML编辑",-1)])]),_:1})]),t("div",je,[g(a,{modelValue:o.value.content,"onUpdate:modelValue":e[4]||(e[4]=r=>o.value.content=r),type:"textarea",rows:15,placeholder:"在此输入文章内容..."},null,8,["modelValue"])])]))]),m.value?ge("",!0):(y(),k("div",Je,[e[15]||(e[15]=t("h3",null,"预览",-1)),t("div",{class:"preview-content",innerHTML:o.value.content},null,8,We)]))])]),t("div",Qe,[t("div",Ye,[e[19]||(e[19]=t("h3",{class:"sidebar-title"},"博主信息",-1)),t("div",Ze,[t("div",et,[t("img",{src:h.value.avatar,alt:"博主头像",class:"avatar-img"},null,8,tt)]),t("div",ot,[t("h4",st,C(h.value.username),1),t("p",at,C(h.value.bio),1),t("div",nt,[t("div",rt,[t("span",lt,C(h.value.postsCount),1),e[16]||(e[16]=t("span",{class:"stat-label"},"随笔",-1))]),t("div",it,[t("span",ct,C(h.value.articlesCount||0),1),e[17]||(e[17]=t("span",{class:"stat-label"},"文章",-1))]),t("div",ut,[t("span",dt,C(h.value.commentsCount||0),1),e[18]||(e[18]=t("span",{class:"stat-label"},"评论",-1))])])])])]),e[21]||(e[21]=t("div",{class:"sidebar-section"},[t("h3",{class:"sidebar-title"},"编辑器提示"),t("ul",{class:"tips-list"},[t("li",null,"支持AKN4UN XML格式编辑"),t("li",null,'点击"验证XML"确保格式正确'),t("li",null,'"格式化"功能可美化XML代码'),t("li",null,"记得定期保存您的作品")])],-1)),t("div",mt,[e[20]||(e[20]=t("h3",{class:"sidebar-title"},"快捷操作",-1)),t("ul",pt,[t("li",null,[t("a",{href:"#",onClick:F(D,["prevent"])},"验证XML")]),t("li",null,[t("a",{href:"#",onClick:F(X,["prevent"])},"格式化XML")]),t("li",null,[m.value?(y(),k("a",{key:1,href:"#",onClick:F(B,["prevent"])},"切换到可视化模式")):(y(),k("a",{key:0,href:"#",onClick:F(L,["prevent"])},"切换到XML模式"))])])])])])]),g(ve)])]),g(te,{"current-content":o.value.content,"current-title":o.value.title,onContentUpdate:q},null,8,["current-content","current-title"])],64)}}}),vt=oe(ht,[["__scopeId","data-v-bea31ebc"]]);export{vt as default};
//# sourceMappingURL=ArticleEditor-D4GngzWs.js.map
