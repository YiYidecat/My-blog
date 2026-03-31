import{_ as te,r as C,x as me,k as oe,A as pe,c as N,o as _,a as t,b as j,B as ge,t as X,D as ve,F as J,m as Z,G as A,I as he,w as E,v as ue,J as ee,E as g,y as fe,K as ye,u as be,d as x,H as ke,l as Re,g as G,f as M,p as xe,C as P,i as _e,P as q,U as Ce,h as we,e as B,q as ne,z as ae}from"./index-BI8rZcD1.js";const se={provider:"ollama",settings:{deepseek:{apiKey:"",model:"deepseek-chat",temperature:.7,maxTokens:8192},kimi:{apiKey:"",model:"kimi-large",temperature:.7,maxTokens:2048},local:{enabled:!0},ollama:{enabled:!0,baseUrl:"http://localhost:11434/api",model:"qwen2.5:7b",temperature:.7,contextSize:2048}},features:{xmlConversion:!0,documentAnalysis:!0,contentOptimization:!0,securityEnabled:!0},security:{enableEncryption:!0,enablePrivacyMode:!0,dataRetentionDays:30}},W=()=>{try{const b=localStorage.getItem("aiConfig");return b?JSON.parse(b):se}catch(b){return console.warn("Failed to load AI config from localStorage, using defaults:",b),se}},re=b=>W().settings[b]||{},Ae=()=>W().provider,U={DEEPSEEK:"deepseek",KIMI:"kimi",LOCAL:"local",OLLAMA:"ollama"};class de{constructor(c=null,i=null){this.provider=c||Ae()||U.LOCAL,this.config=W(),this.apiKey=i||this._getApiKeyFromConfig(this.provider),this.settings=re(this.provider),this.baseURL=this.getBaseURL()}_getApiKeyFromConfig(c){return re(c).apiKey||null}getBaseURL(){switch(this.provider){case U.DEEPSEEK:return"https://api.deepseek.com";case U.KIMI:return"https://api.kimi.com/v1";case U.OLLAMA:return this.settings.ollamaBaseUrl||"http://localhost:11434/api";default:return null}}async sendMessage(c,i={}){switch(this.provider){case U.DEEPSEEK:return this._callDeepSeek(c,i);case U.KIMI:return this._callKimi(c,i);case U.OLLAMA:return this._callOllama(c,i);default:return this._callLocal(c,i)}}async _callDeepSeek(c,i={}){if(!this.apiKey)throw new Error("DeepSeek API key is required");const r={...this.settings,...i},o=await fetch(`${this.baseURL}/chat/completions`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${this.apiKey}`},body:JSON.stringify({model:r.model||"deepseek-chat",messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:c}],temperature:r.temperature||i.temperature||.7,max_tokens:r.maxTokens||i.maxTokens||8192,stream:!1})});if(!o.ok){const f=(await o.json().catch(()=>({}))).error?.message||"";if(o.status===429)return console.warn("DeepSeek quota exceeded, falling back to local service"),this._callLocal(c,i);throw o.status===401?new Error(`DeepSeek authentication error: Invalid API key. ${f}`):o.status===403?new Error(`DeepSeek access forbidden: ${f}`):new Error(`DeepSeek API error (${o.status}): ${f}`)}return(await o.json()).choices[0]?.message?.content||""}async _callKimi(c,i={}){if(!this.apiKey)throw new Error("Kimi API key is required");return console.warn("Kimi API not yet available, falling back to local service"),this._callLocal(c,i)}async _callOllama(c,i={}){const r={...this.settings,...i},o=r.ollamaModel||"qwen2.5:7b",m=await fetch(`${this.baseURL}/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:o,messages:[{role:"system",content:i.systemPrompt||this.getDefaultSystemPrompt()},{role:"user",content:c}],stream:!1,options:{temperature:r.temperature||i.temperature||.7,num_ctx:r.contextSize||2048}})});if(!m.ok){const f=await m.json().catch(()=>({})),d=f.error?.message||f.message||"Unknown error";throw new Error(`Ollama API error (${m.status}): ${d}`)}const S=await m.json();return S.message?.content||S.response||""}async _callLocal(c,i={}){return await new Promise(r=>setTimeout(r,1e3)),this._simulateResponse(c,i)}_simulateResponse(c,i={}){const r=c.toLowerCase();if(r.includes("convert")||r.includes("xml")||r.includes("akn4un")){const o=i.currentTitle||"Untitled Document",m=i.currentContent||"Content to be converted...";return`好的，我已将您的内容转换为AKN4UN XML格式：

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
            <p>${this._sanitizeForXml(m)}</p>
          </content>
        </paragraph>
      </section>
    </body>
  </document>
</akomaNtoso>
\`\`\`

您可以直接使用此XML代码，或进一步调整以满足您的具体需求。`}else return r.includes("help")||r.includes("instruction")||r.includes("how")?`我可以帮助您：

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

请根据用户提供的内容进行相应的操作。`}}let z=null;const le=(b=null,c=null)=>(z=new de(b,c),z),Se=()=>{if(!z){const c=W().provider||"local";z=new de(c)}return z},Ie={class:"ai-chat-assistant"},Ne={class:"chat-header"},Me={class:"header-controls"},Le={class:"chat-container"},Fe=["innerHTML"],Te={class:"chat-input-area"},Be=["onKeydown"],$e=["disabled"],De={class:"security-controls"},Ue={class:"security-indicator"},Xe={__name:"AIChatAssistant",props:{currentContent:{type:String,default:""},currentTitle:{type:String,default:""}},emits:["content-update","title-update"],setup(b,{emit:c}){const i=b,r=c,o=C(!1),m=C(""),S=C([]),f=C(!1),d=C(!0),k=C(!0),L=C(null),I=C("ollama"),K=me(()=>`你是一个专业的联合国法律文档编辑助手，专门帮助用户创建和编辑符合AKN4UN (Akoma Ntoso for United Nations) 标准的XML文档。
  
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

请根据用户提供的内容进行相应的操作。`),v=()=>{o.value=!o.value},l=e=>e.replace(/```xml([\s\S]*?)```/g,'<pre class="code-block"><code class="language-xml">$1</code></pre>').replace(/```([\s\S]*?)```/g,'<pre class="code-block"><code>$1</code></pre>').replace(/\n/g,"<br>"),h=()=>{k.value=!k.value,g.info(k.value?"隐私模式已启用":"隐私模式已禁用")},$=()=>{d.value=!d.value,g.info(d.value?"安全连接已启用":"安全连接已禁用")},O=()=>{le(I.value),g.info(`已切换到 ${D(I.value)} 模型`)},D=e=>({local:"本地模型",ollama:"Ollama",deepseek:"DeepSeek",kimi:"Kimi"})[e]||e,F=(e,a)=>{S.value.push({role:e,content:a}),ee(()=>{L.value&&(L.value.scrollTop=L.value.scrollHeight)})},V=async()=>{if(!m.value.trim()||f.value)return;const e=m.value;F("user",e),m.value="",f.value=!0;try{const a=`当前文档标题: "${i.currentTitle}"
当前文档内容: "${i.currentContent}"

用户问题: ${e}
请根据上述文档内容回答用户的问题。`;le(I.value);const p=await Se().sendMessage(a,{currentTitle:i.currentTitle,currentContent:i.currentContent,systemPrompt:K.value});if(F("assistant",p),console.log("AI Response:",p),p.includes("<akomaNtoso")&&p.includes("</akomaNtoso>")){const y=p.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(y){const s=y[1]||y[2];r("content-update",{xml:s,text:H(s)})}}}catch(a){console.error("AI response error:",a),F("assistant","抱歉，处理您的请求时出现了错误。请稍后再试。"),g.error(`AI服务错误: ${a.message||"请求失败"}`)}finally{f.value=!1}},H=e=>{const a=document.createElement("div");return a.innerHTML=e,a.textContent||a.innerText||""},Q=()=>{const e=[...S.value].reverse().find(a=>a.role==="assistant"&&a.content.includes("<akomaNtoso")&&a.content.includes("</akomaNtoso>"));if(e){const a=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(a){const u=a[1]||a[2];r("content-update",{xml:u,text:H(u)}),g.success("XML已插入到编辑器")}else g.warning("未找到有效的XML内容")}else g.warning("聊天记录中未找到XML内容")},n=()=>{const e=[...S.value].reverse().find(a=>a.role==="assistant"&&a.content.includes("<akomaNtoso")&&a.content.includes("</akomaNtoso>"));if(e){const a=e.content.match(/```xml([\s\S]*?)```|(<akomaNtoso[\s\S]*<\/akomaNtoso>)/);if(a){const u=a[1]||a[2],p=new Blob([u],{type:"application/xml"}),y=URL.createObjectURL(p),s=document.createElement("a");s.href=y,s.download=`document-${new Date().toISOString().split("T")[0]}.xml`,document.body.appendChild(s),s.click(),document.body.removeChild(s),URL.revokeObjectURL(y),g.success("XML文件已导出")}else g.warning("未找到有效的XML内容")}else g.warning("聊天记录中未找到XML内容")};return oe(()=>{F("assistant","您好！我是您的AI助手，专门帮助您处理AKN4UN XML格式的文档。您可以向我提问如何转换内容、优化结构或检查格式等问题。")}),pe(()=>{}),(e,a)=>(_(),N("div",Ie,[t("div",Ne,[a[3]||(a[3]=t("h3",null,"AI 助手",-1)),t("div",Me,[j(t("select",{"onUpdate:modelValue":a[0]||(a[0]=u=>I.value=u),class:"model-selector",onChange:O},[...a[2]||(a[2]=[t("option",{value:"local"},"本地模型",-1),t("option",{value:"ollama"},"Ollama",-1),t("option",{value:"deepseek"},"DeepSeek",-1),t("option",{value:"kimi"},"Kimi",-1)])],544),[[ge,I.value]]),t("button",{class:"toggle-btn",onClick:v},X(o.value?"隐藏":"显示"),1)])]),j(t("div",Le,[t("div",{class:"chat-messages",ref_key:"messagesContainer",ref:L},[(_(!0),N(J,null,Z(S.value,(u,p)=>(_(),N("div",{key:p,class:A(["message",u.role])},[t("div",{class:"message-content",innerHTML:l(u.content)},null,8,Fe)],2))),128))],512),t("div",Te,[j(t("textarea",{"onUpdate:modelValue":a[1]||(a[1]=u=>m.value=u),onKeydown:he(E(V,["ctrl"]),["enter"]),placeholder:"向AI助手提问，例如：帮我将这段内容转换为AKN4UN XML格式...",class:"chat-input"},null,40,Be),[[ue,m.value]]),t("button",{onClick:V,disabled:f.value||!m.value.trim(),class:"send-btn"},X(f.value?"发送中...":"发送"),9,$e)]),t("div",De,[t("div",Ue,[t("span",{class:A(["secure-badge",{active:d.value}]),onClick:$,title:"点击切换安全连接状态"}," 🔐 安全连接 ",2),t("span",{class:A(["privacy-badge",{active:k.value}]),onClick:h,title:"点击切换隐私模式"}," 👁️ 隐私模式 ",2)]),t("div",{class:"action-buttons"},[t("button",{class:"action-btn",onClick:Q,title:"将XML插入编辑器"}," 📄 插入XML "),t("button",{class:"action-btn",onClick:n,title:"导出XML文件"}," 💾 导出 ")])])],512),[[ve,o.value]])]))}},ie=te(Xe,[["__scopeId","data-v-fed4d6f9"]]),Ke={class:"rich-text-editor"},Oe={class:"editor-toolbar"},Pe={class:"toolbar-group"},Ee={class:"toolbar-group"},ze={class:"toolbar-group"},Ve={class:"toolbar-group"},He=["placeholder"],Ge={__name:"RichTextEditor",props:{modelValue:{type:String,default:""},placeholder:{type:String,default:"开始输入..."}},emits:["update:modelValue","focus","blur"],setup(b,{emit:c}){const i=b,r=c,o=C(null);let m=!1;const S=()=>{if(!o.value)return null;const v=window.getSelection();if(!v.rangeCount)return null;const l=v.getRangeAt(0),h=l.cloneRange();return h.selectNodeContents(o.value),h.setEnd(l.endContainer,l.endOffset),h.toString().length},f=v=>{if(!o.value||v===null)return;let l=0;const h=document.createTreeWalker(o.value,NodeFilter.SHOW_TEXT,null,!1);let $;for(;$=h.nextNode();){const O=l+$.textContent.length;if(v<=O){const D=document.createRange();D.setStart($,v-l),D.collapse(!0);const F=window.getSelection();F.removeAllRanges(),F.addRange(D);break}l=O}};fe(()=>i.modelValue,v=>{if(!m&&o.value){const l=S();m=!0,o.value.innerHTML!==(v||"")&&(o.value.innerHTML=v||""),l!==null?ee(()=>{f(l),m=!1}):ee(()=>{m=!1})}},{immediate:!0});const d=(v,l=null)=>{m=!0,document.execCommand(v,!1,l),o.value.focus(),setTimeout(()=>{m=!1,L()},0)},k=(v,l=null)=>{if(!o.value)return!1;try{return document.queryCommandState(v)}catch(h){return console.warn("Could not check command state:",h),!1}},L=()=>{if(!m&&o.value){const v=o.value.innerHTML;v!==i.modelValue&&r("update:modelValue",v)}},I=()=>{r("focus")},K=()=>{r("blur")};return oe(()=>{o.value&&(o.value.setAttribute("style",`
      min-height: 300px;
      padding: 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      font-size: 14px;
      line-height: 1.6;
    `),i.modelValue&&o.value.innerHTML!==i.modelValue&&(o.value.innerHTML=i.modelValue))}),ye(()=>{}),(v,l)=>(_(),N("div",Ke,[t("div",Oe,[t("div",Pe,[t("button",{type:"button",class:A(["toolbar-btn",{active:k("bold")}]),onClick:l[0]||(l[0]=h=>d("bold")),title:"Bold"},[...l[10]||(l[10]=[t("strong",null,"B",-1)])],2),t("button",{type:"button",class:A(["toolbar-btn",{active:k("italic")}]),onClick:l[1]||(l[1]=h=>d("italic")),title:"Italic"},[...l[11]||(l[11]=[t("em",null,"I",-1)])],2),t("button",{type:"button",class:A(["toolbar-btn",{active:k("underline")}]),onClick:l[2]||(l[2]=h=>d("underline")),title:"Underline"}," U ",2)]),t("div",Ee,[t("button",{type:"button",class:A(["toolbar-btn",{active:k("heading",{})}]),onClick:l[3]||(l[3]=h=>d("heading",{level:1})),title:"Heading 1"}," H1 ",2),t("button",{type:"button",class:A(["toolbar-btn",{active:k("heading",{})}]),onClick:l[4]||(l[4]=h=>d("heading",{level:2})),title:"Heading 2"}," H2 ",2),t("button",{type:"button",class:A(["toolbar-btn",{active:k("heading",{})}]),onClick:l[5]||(l[5]=h=>d("heading",{level:3})),title:"Heading 3"}," H3 ",2)]),t("div",ze,[t("button",{type:"button",class:A(["toolbar-btn",{active:k("bulletList")}]),onClick:l[6]||(l[6]=h=>d("bulletList")),title:"Bullet List"}," • List ",2),t("button",{type:"button",class:A(["toolbar-btn",{active:k("orderedList")}]),onClick:l[7]||(l[7]=h=>d("orderedList")),title:"Ordered List"}," 1. List ",2)]),t("div",Ve,[t("button",{type:"button",class:A(["toolbar-btn",{active:k("blockquote")}]),onClick:l[8]||(l[8]=h=>d("blockquote")),title:"Blockquote"},' " ',2),t("button",{type:"button",class:A(["toolbar-btn",{active:k("codeBlock")}]),onClick:l[9]||(l[9]=h=>d("codeBlock")),title:"Code Block"}," </> ",2)])]),t("div",{ref_key:"editorElement",ref:o,class:"editor-content",contenteditable:"true",onInput:L,onFocus:I,onBlur:K,placeholder:b.placeholder},null,40,He)]))}},ce=te(Ge,[["__scopeId","data-v-8a97fdf4"]]),qe={class:"cnblogs-fullscreen"},je={class:"inner-wrapper"},Je={class:"main-body"},We={class:"content-inner"},Qe={class:"content-left"},Ye={class:"article-editor-container"},Ze={class:"editor-header"},et={class:"editor-actions"},tt={class:"editor-meta"},ot={class:"editor-content"},nt={key:0,class:"xml-editor-section"},at={class:"xml-controls"},st={key:1,class:"visual-editor-section"},rt={class:"editor-controls"},lt={class:"visual-content"},it={key:0,class:"editor-preview"},ct=["innerHTML"],ut={class:"sidebar-right"},dt={class:"sidebar-section"},mt={class:"author-info"},pt={class:"author-avatar"},gt=["src"],vt={class:"author-details"},ht={class:"author-name"},ft={class:"author-bio"},yt={class:"author-stats"},bt={class:"stat"},kt={class:"stat-number"},Rt={class:"stat"},xt={class:"stat-number"},_t={class:"stat"},Ct={class:"stat-number"},wt={class:"sidebar-section"},At={class:"quick-actions"},St=Object.assign({components:{AIChatAssistant:ie,RichTextEditor:ce}},{__name:"ArticleEditor",setup(b){const c=_e(),i=we(),r=be(),o=C({id:"",title:"",content:"",xmlContent:"",category:"",tags:[],author:"",publishDate:"",likes:0,views:0,commentsCount:0}),m=C([]),S=C(["Vue","JavaScript","前端","后端","Node.js","React","TypeScript"]),f=C(!1),d=C({username:"",avatar:"",bio:"暂无简介",postsCount:0,articlesCount:0,commentsCount:0}),k=async()=>{try{m.value=await P.getAllCategories()}catch(n){console.error("获取分类失败:",n),g.error("获取分类失败")}},L=async()=>{const n=c.params.articleId,e=r.user?.id||"1",a=`draft_${e}_cache`,u=n&&n!=="new"?`draft_${e}_${n}`:null;console.log("--- 开始加载文章 ---"),console.log("路由 ID:",n),console.log("用户 ID:",e);let p="server";const y=localStorage.getItem(a);if(y)try{const s=JSON.parse(y);(!n||n==="new"||n==="cache")&&(console.log("✅ 命中通用草稿缓存"),o.value={...s},o.value.xmlContent||(o.value.xmlContent=I(o.value.content)),p="local_draft")}catch(s){console.error("解析草稿缓存失败",s),localStorage.removeItem(a)}if(p==="server"&&n&&n!=="new"&&n!=="cache"){if(u){const s=localStorage.getItem(u);if(s){console.log("✅ 命中特定文章缓存");const R=JSON.parse(s),w=r.user?.username||r.user?.name||"墨语";R.author===w?(o.value=R,p="local_specific"):console.log("❌ 缓存文章不属于当前用户，忽略该缓存")}}if(p==="server")try{console.log("🌐 请求服务器数据...");const s=r.user?.username||r.user?.name||"墨语",R=await q.getPostByIdAndAuthor(n,s);o.value={...R},o.value.xmlContent||(o.value.xmlContent=I(R.content||R.title))}catch(s){console.error("加载文章失败:",s),g.error("加载文章失败，可能文章不存在")}}p==="server"&&(!n||n==="new")&&(console.log("📝 初始化全新文章"),o.value={id:"",title:"",content:"",xmlContent:I(),category:"",tags:[],author:r.user?.username||r.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0}),console.log("最终加载到的数据:",o.value),console.log("数据来源:",p)},I=(n="")=>{const e=new Date().toISOString().split("T")[0];return`<?xml version="1.0" encoding="UTF-8"?>
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
</akomaNtoso>`},K=()=>{f.value=!0},v=()=>{f.value=!1},l=()=>{try{if(new DOMParser().parseFromString(o.value.xmlContent,"text/xml").getElementsByTagName("parsererror").length>0)throw new Error("XML格式错误");g.success("XML格式正确")}catch(n){g.error(`XML格式错误: ${n.message}`)}},h=()=>{try{const e=new DOMParser().parseFromString(o.value.xmlContent,"text/xml");let p=new XMLSerializer().serializeToString(e).replace(/></g,`>
<`).replace(/^(\s*)/gm,function(y,s){const R=y.length/2-1;return"  ".repeat(Math.max(0,R))});o.value.xmlContent=p,g.success("XML已格式化")}catch(n){g.error(`格式化失败: ${n.message}`)}},$=async()=>{try{const n=r.user?.id||"1";let e;!o.value.id||o.value.id==="new"||o.value.id==="cache"?e=`draft_${n}_cache`:e=`draft_${n}_${o.value.id}`;const a=r.user?.username||r.user?.name||"墨语",u={...o.value,author:a,updatedAt:new Date().toISOString()};localStorage.setItem(e,JSON.stringify(u)),console.log("✅ 文章已保存至本地缓存"),console.log("缓存键:",e),g.success("文章已保存到本地草稿箱")}catch(n){console.error("保存文章失败:",n),g.error("保存文章失败")}},O=()=>{const e=`draft_${r.user?.id||"1"}_cache`;ae.confirm("确定要清空当前编辑的所有内容吗？此操作不可恢复。","警告",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(async()=>{o.value={id:"",title:"",content:"",xmlContent:I(),category:"",tags:[],author:r.user?.username||r.user?.name||"墨语",publishDate:new Date().toISOString().split("T")[0],likes:0,views:0,commentsCount:0},localStorage.removeItem(e),g.success("内容已清空")}).catch(()=>{})},D=()=>window.crypto&&window.crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){const e=Math.random()*16|0;return(n==="x"?e:e&3|8).toString(16)}),F=async()=>{try{const n=r.user?.username||r.user?.name||"墨语",e={...o.value,author:n,xmlContent:o.value.xmlContent,publishDate:o.value.publishDate||new Date().toISOString().split("T")[0],updatedAt:new Date().toISOString()};if(!o.value.id||o.value.id===""){const p=D();e.id=p;const y=await q.createPost(e);if(o.value={...y},g.success("文章已发布"),o.value.category)try{const R=(await P.getAllCategories()).find(w=>w.name===o.value.category);if(R){const w=(R.count||0)+1,T=parseInt(R.id);await P.updateCategoryCount(T,w)}else console.warn(`未找到分类: ${o.value.category}`)}catch(s){console.error("更新分类计数失败:",s)}}else{const y=(await q.getPostById(o.value.id)).category,s=e.category;if(await q.updatePost(o.value.id,e),y!==s)try{const R=await P.getAllCategories();if(y){const w=R.find(T=>T.name===y);if(w){const T=Math.max(0,(w.count||0)-1),Y=parseInt(w.id);await P.updateCategoryCount(Y,T)}}if(s){const w=R.find(T=>T.name===s);if(w){const T=(w.count||0)+1,Y=parseInt(w.id);await P.updateCategoryCount(Y,T)}}}catch(R){console.error("更新分类计数失败:",R)}g.success("文章更新并已发布")}const u=`draft_${r.user?.id||"1"}_cache`;localStorage.removeItem(u)}catch(n){console.error("发布文章失败:",n),g.error("发布文章失败")}},V=async()=>{const n=r.user?.id||"1";if(console.log("准备返回文章列表"),console.log("当前文章ID:",o.value.id),console.log("用户ID:",n),!o.value.id||o.value.id===""||o.value.id==="cache"){const e=`draft_${n}_cache`;if(console.log("检查临时草稿键:",e),console.log("临时草稿是否存在:",localStorage.getItem(e)),localStorage.getItem(e))try{await ae.confirm("检测到有未发布的草稿，是否在离开前清除？","提示",{confirmButtonText:"清除",cancelButtonText:"保留",type:"info"}),localStorage.removeItem(e),console.log("已清除临时草稿")}catch{console.log("用户选择保留草稿")}}i.push(`/dashboard/${n}`)},H=async()=>{try{if(r.user)d.value={...r.user};else{const n=await Ce.getUserById(0);d.value=n}}catch(n){console.error("获取用户信息失败:",n)}},Q=n=>{n.xml&&(o.value.xmlContent=n.xml),n.text&&(o.value.content=n.text),g.success("内容已通过AI助手更新")};return oe(async()=>{await k(),await L(),await H()}),(n,e)=>{const a=G("el-input"),u=G("el-button"),p=G("el-option"),y=G("el-select");return _(),N(J,null,[t("div",qe,[t("div",je,[x(ke),t("div",Je,[t("div",We,[t("div",Qe,[t("div",Ye,[t("div",Ze,[x(a,{modelValue:o.value.title,"onUpdate:modelValue":e[0]||(e[0]=s=>o.value.title=s),placeholder:"请输入文章标题",class:"title-input"},null,8,["modelValue"]),t("div",et,[x(u,{onClick:V},{default:M(()=>[...e[5]||(e[5]=[B("返回",-1)])]),_:1}),x(u,{type:"primary",onClick:$},{default:M(()=>[...e[6]||(e[6]=[B("保存",-1)])]),_:1}),x(u,{type:"danger",onClick:O},{default:M(()=>[...e[7]||(e[7]=[B("清空内容",-1)])]),_:1}),x(u,{type:"success",onClick:F},{default:M(()=>[...e[8]||(e[8]=[B("发布",-1)])]),_:1})])]),t("div",tt,[x(y,{modelValue:o.value.category,"onUpdate:modelValue":e[1]||(e[1]=s=>o.value.category=s),placeholder:"选择分类",class:"category-select"},{default:M(()=>[(_(!0),N(J,null,Z(m.value,s=>(_(),ne(p,{key:s.id,label:s.name,value:s.name},null,8,["label","value"]))),128))]),_:1},8,["modelValue"]),x(y,{modelValue:o.value.tags,"onUpdate:modelValue":e[2]||(e[2]=s=>o.value.tags=s),multiple:"",placeholder:"选择标签",class:"tags-select"},{default:M(()=>[(_(!0),N(J,null,Z(S.value,s=>(_(),ne(p,{key:s,label:s,value:s},null,8,["label","value"]))),128))]),_:1},8,["modelValue"])]),t("div",ot,[f.value?(_(),N("div",nt,[e[12]||(e[12]=t("h3",null,"AKN4UN XML 编辑器",-1)),t("div",at,[x(u,{onClick:v,size:"small"},{default:M(()=>[...e[9]||(e[9]=[B("切换到可视化编辑",-1)])]),_:1}),x(u,{onClick:l,size:"small"},{default:M(()=>[...e[10]||(e[10]=[B("验证XML",-1)])]),_:1}),x(u,{onClick:h,size:"small"},{default:M(()=>[...e[11]||(e[11]=[B("格式化",-1)])]),_:1})]),j(t("textarea",{"onUpdate:modelValue":e[3]||(e[3]=s=>o.value.xmlContent=s),class:"xml-textarea",placeholder:"在此输入AKN4UN XML内容..."},null,512),[[ue,o.value.xmlContent]])])):(_(),N("div",st,[e[14]||(e[14]=t("h3",null,"可视化编辑器",-1)),t("div",rt,[x(u,{onClick:K,size:"small"},{default:M(()=>[...e[13]||(e[13]=[B("切换到XML编辑",-1)])]),_:1})]),t("div",lt,[x(ce,{modelValue:o.value.content,"onUpdate:modelValue":e[4]||(e[4]=s=>o.value.content=s),placeholder:"在此输入文章内容..."},null,8,["modelValue"])])]))]),f.value?Re("",!0):(_(),N("div",it,[e[15]||(e[15]=t("h3",null,"预览",-1)),t("div",{class:"preview-content",innerHTML:o.value.content},null,8,ct)]))])]),t("div",ut,[t("div",dt,[e[19]||(e[19]=t("h3",{class:"sidebar-title"},"博主信息",-1)),t("div",mt,[t("div",pt,[t("img",{src:d.value.avatar,alt:"博主头像",class:"avatar-img"},null,8,gt)]),t("div",vt,[t("h4",ht,X(d.value.username),1),t("p",ft,X(d.value.bio),1),t("div",yt,[t("div",bt,[t("span",kt,X(d.value.postsCount),1),e[16]||(e[16]=t("span",{class:"stat-label"},"随笔",-1))]),t("div",Rt,[t("span",xt,X(d.value.articlesCount||0),1),e[17]||(e[17]=t("span",{class:"stat-label"},"文章",-1))]),t("div",_t,[t("span",Ct,X(d.value.commentsCount||0),1),e[18]||(e[18]=t("span",{class:"stat-label"},"评论",-1))])])])])]),e[21]||(e[21]=t("div",{class:"sidebar-section"},[t("h3",{class:"sidebar-title"},"编辑器提示"),t("ul",{class:"tips-list"},[t("li",null,"支持AKN4UN XML格式编辑"),t("li",null,'点击"验证XML"确保格式正确'),t("li",null,'"格式化"功能可美化XML代码'),t("li",null,"记得定期保存您的作品")])],-1)),t("div",wt,[e[20]||(e[20]=t("h3",{class:"sidebar-title"},"快捷操作",-1)),t("ul",At,[t("li",null,[t("a",{href:"#",onClick:E(l,["prevent"])},"验证XML")]),t("li",null,[t("a",{href:"#",onClick:E(h,["prevent"])},"格式化XML")]),t("li",null,[f.value?(_(),N("a",{key:1,href:"#",onClick:E(v,["prevent"])},"切换到可视化模式")):(_(),N("a",{key:0,href:"#",onClick:E(K,["prevent"])},"切换到XML模式"))])])])])])]),x(xe)])]),x(ie,{"current-content":o.value.content,"current-title":o.value.title,onContentUpdate:Q},null,8,["current-content","current-title"])],64)}}}),Nt=te(St,[["__scopeId","data-v-4dd60de3"]]);export{Nt as default};
//# sourceMappingURL=ArticleEditor-BexvX1r3.js.map
