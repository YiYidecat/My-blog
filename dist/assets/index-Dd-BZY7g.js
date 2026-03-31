import{_ as $e,r as oe,u as ve,x as Te,k as Ie,c as I,a as u,d as $,H as ze,t as A,F as N,m as Le,n as U,f as D,g as Ce,p as Ee,C as Be,E as De,U as He,h as qe,o as z,e as H}from"./index-xFmk5Ny8.js";function W(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var P=W();function ke(n){P=n}var _={exec:()=>null};function d(n,e=""){let r=typeof n=="string"?n:n.source,s={replace:(t,i)=>{let l=typeof i=="string"?i:i.source;return l=l.replace(x.caret,"$1"),r=r.replace(t,l),s},getRegex:()=>new RegExp(r,e)};return s}var Me=(()=>{try{return!!new RegExp("(?<=1)(?<!1)")}catch{return!1}})(),x={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:n=>new RegExp(`^( {0,3}${n})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}#`),htmlBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:n=>new RegExp(`^ {0,${Math.min(3,n-1)}}>`)},Oe=/^(?:[ \t]*(?:\n|$))+/,Ge=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,je=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,B=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Qe=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,X=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,fe=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,be=d(fe).replace(/bull/g,X).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),Ze=d(fe).replace(/bull/g,X).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),K=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ne=/^[^\n]+/,Y=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ue=d(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",Y).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ve=d(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,X).getRegex(),j="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",ee=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Fe=d("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",ee).replace("tag",j).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xe=d(K).replace("hr",B).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",j).getRegex(),Je=d(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",xe).getRegex(),te={blockquote:Je,code:Ge,def:Ue,fences:je,heading:Qe,hr:B,html:Fe,lheading:be,list:Ve,newline:Oe,paragraph:xe,table:_,text:Ne},ce=d("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",B).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",j).getRegex(),We={...te,lheading:Ze,table:ce,paragraph:d(K).replace("hr",B).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",ce).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",j).getRegex()},Xe={...te,html:d(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",ee).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:_,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:d(K).replace("hr",B).replace("heading",` *#{1,6} *[^
]`).replace("lheading",be).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},Ke=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Ye=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,me=/^( {2,}|\\)\n(?!\s*$)/,et=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,v=/[\p{P}\p{S}]/u,Q=/[\s\p{P}\p{S}]/u,re=/[^\s\p{P}\p{S}]/u,tt=d(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,Q).getRegex(),we=/(?!~)[\p{P}\p{S}]/u,rt=/(?!~)[\s\p{P}\p{S}]/u,nt=/(?:[^\s\p{P}\p{S}]|~)/u,st=d(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Me?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),ye=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,lt=d(ye,"u").replace(/punct/g,v).getRegex(),it=d(ye,"u").replace(/punct/g,we).getRegex(),Se="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",at=d(Se,"gu").replace(/notPunctSpace/g,re).replace(/punctSpace/g,Q).replace(/punct/g,v).getRegex(),ot=d(Se,"gu").replace(/notPunctSpace/g,nt).replace(/punctSpace/g,rt).replace(/punct/g,we).getRegex(),ct=d("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,re).replace(/punctSpace/g,Q).replace(/punct/g,v).getRegex(),pt=d(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,v).getRegex(),ht="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",ut=d(ht,"gu").replace(/notPunctSpace/g,re).replace(/punctSpace/g,Q).replace(/punct/g,v).getRegex(),gt=d(/\\(punct)/,"gu").replace(/punct/g,v).getRegex(),dt=d(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),kt=d(ee).replace("(?:-->|$)","-->").getRegex(),ft=d("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",kt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),M=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,bt=d(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",M).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),Ae=d(/^!?\[(label)\]\[(ref)\]/).replace("label",M).replace("ref",Y).getRegex(),_e=d(/^!?\[(ref)\](?:\[\])?/).replace("ref",Y).getRegex(),xt=d("reflink|nolink(?!\\()","g").replace("reflink",Ae).replace("nolink",_e).getRegex(),pe=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,ne={_backpedal:_,anyPunctuation:gt,autolink:dt,blockSkip:st,br:me,code:Ye,del:_,delLDelim:_,delRDelim:_,emStrongLDelim:lt,emStrongRDelimAst:at,emStrongRDelimUnd:ct,escape:Ke,link:bt,nolink:_e,punctuation:tt,reflink:Ae,reflinkSearch:xt,tag:ft,text:et,url:_},mt={...ne,link:d(/^!?\[(label)\]\((.*?)\)/).replace("label",M).getRegex(),reflink:d(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",M).getRegex()},V={...ne,emStrongRDelimAst:ot,emStrongLDelim:it,delLDelim:pt,delRDelim:ut,url:d(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",pe).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:d(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",pe).getRegex()},wt={...V,br:d(me).replace("{2,}","*").getRegex(),text:d(V.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},q={normal:te,gfm:We,pedantic:Xe},L={normal:ne,gfm:V,breaks:wt,pedantic:mt},yt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},he=n=>yt[n];function y(n,e){if(e){if(x.escapeTest.test(n))return n.replace(x.escapeReplace,he)}else if(x.escapeTestNoEncode.test(n))return n.replace(x.escapeReplaceNoEncode,he);return n}function ue(n){try{n=encodeURI(n).replace(x.percentDecode,"%")}catch{return null}return n}function ge(n,e){let r=n.replace(x.findPipe,(i,l,c)=>{let a=!1,p=l;for(;--p>=0&&c[p]==="\\";)a=!a;return a?"|":" |"}),s=r.split(x.splitPipe),t=0;if(s[0].trim()||s.shift(),s.length>0&&!s.at(-1)?.trim()&&s.pop(),e)if(s.length>e)s.splice(e);else for(;s.length<e;)s.push("");for(;t<s.length;t++)s[t]=s[t].trim().replace(x.slashPipe,"|");return s}function C(n,e,r){let s=n.length;if(s===0)return"";let t=0;for(;t<s&&n.charAt(s-t-1)===e;)t++;return n.slice(0,s-t)}function St(n,e){if(n.indexOf(e[1])===-1)return-1;let r=0;for(let s=0;s<n.length;s++)if(n[s]==="\\")s++;else if(n[s]===e[0])r++;else if(n[s]===e[1]&&(r--,r<0))return s;return r>0?-2:-1}function At(n,e=0){let r=e,s="";for(let t of n)if(t==="	"){let i=4-r%4;s+=" ".repeat(i),r+=i}else s+=t,r++;return s}function de(n,e,r,s,t){let i=e.href,l=e.title||null,c=n[1].replace(t.other.outputLinkReplace,"$1");s.state.inLink=!0;let a={type:n[0].charAt(0)==="!"?"image":"link",raw:r,href:i,title:l,text:c,tokens:s.inlineTokens(c)};return s.state.inLink=!1,a}function _t(n,e,r){let s=n.match(r.other.indentCodeCompensation);if(s===null)return e;let t=s[1];return e.split(`
`).map(i=>{let l=i.match(r.other.beginningSpace);if(l===null)return i;let[c]=l;return c.length>=t.length?i.slice(t.length):i}).join(`
`)}var O=class{options;rules;lexer;constructor(n){this.options=n||P}space(n){let e=this.rules.block.newline.exec(n);if(e&&e[0].length>0)return{type:"space",raw:e[0]}}code(n){let e=this.rules.block.code.exec(n);if(e){let r=e[0].replace(this.rules.other.codeRemoveIndent,"");return{type:"code",raw:e[0],codeBlockStyle:"indented",text:this.options.pedantic?r:C(r,`
`)}}}fences(n){let e=this.rules.block.fences.exec(n);if(e){let r=e[0],s=_t(r,e[3]||"",this.rules);return{type:"code",raw:r,lang:e[2]?e[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):e[2],text:s}}}heading(n){let e=this.rules.block.heading.exec(n);if(e){let r=e[2].trim();if(this.rules.other.endingHash.test(r)){let s=C(r,"#");(this.options.pedantic||!s||this.rules.other.endingSpaceChar.test(s))&&(r=s.trim())}return{type:"heading",raw:e[0],depth:e[1].length,text:r,tokens:this.lexer.inline(r)}}}hr(n){let e=this.rules.block.hr.exec(n);if(e)return{type:"hr",raw:C(e[0],`
`)}}blockquote(n){let e=this.rules.block.blockquote.exec(n);if(e){let r=C(e[0],`
`).split(`
`),s="",t="",i=[];for(;r.length>0;){let l=!1,c=[],a;for(a=0;a<r.length;a++)if(this.rules.other.blockquoteStart.test(r[a]))c.push(r[a]),l=!0;else if(!l)c.push(r[a]);else break;r=r.slice(a);let p=c.join(`
`),o=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");s=s?`${s}
${p}`:p,t=t?`${t}
${o}`:o;let g=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(o,i,!0),this.lexer.state.top=g,r.length===0)break;let h=i.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let b=h,f=b.raw+`
`+r.join(`
`),S=this.blockquote(f);i[i.length-1]=S,s=s.substring(0,s.length-b.raw.length)+S.raw,t=t.substring(0,t.length-b.text.length)+S.text;break}else if(h?.type==="list"){let b=h,f=b.raw+`
`+r.join(`
`),S=this.list(f);i[i.length-1]=S,s=s.substring(0,s.length-h.raw.length)+S.raw,t=t.substring(0,t.length-b.raw.length)+S.raw,r=f.substring(i.at(-1).raw.length).split(`
`);continue}}return{type:"blockquote",raw:s,tokens:i,text:t}}}list(n){let e=this.rules.block.list.exec(n);if(e){let r=e[1].trim(),s=r.length>1,t={type:"list",raw:"",ordered:s,start:s?+r.slice(0,-1):"",loose:!1,items:[]};r=s?`\\d{1,9}\\${r.slice(-1)}`:`\\${r}`,this.options.pedantic&&(r=s?r:"[*+-]");let i=this.rules.other.listItemRegex(r),l=!1;for(;n;){let a=!1,p="",o="";if(!(e=i.exec(n))||this.rules.block.hr.test(n))break;p=e[0],n=n.substring(p.length);let g=At(e[2].split(`
`,1)[0],e[1].length),h=n.split(`
`,1)[0],b=!g.trim(),f=0;if(this.options.pedantic?(f=2,o=g.trimStart()):b?f=e[1].length+1:(f=g.search(this.rules.other.nonSpaceChar),f=f>4?1:f,o=g.slice(f),f+=e[1].length),b&&this.rules.other.blankLine.test(h)&&(p+=h+`
`,n=n.substring(h.length+1),a=!0),!a){let S=this.rules.other.nextBulletRegex(f),le=this.rules.other.hrRegex(f),ie=this.rules.other.fencesBeginRegex(f),ae=this.rules.other.headingBeginRegex(f),Re=this.rules.other.htmlBeginRegex(f),Pe=this.rules.other.blockquoteBeginRegex(f);for(;n;){let Z=n.split(`
`,1)[0],T;if(h=Z,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),T=h):T=h.replace(this.rules.other.tabCharGlobal,"    "),ie.test(h)||ae.test(h)||Re.test(h)||Pe.test(h)||S.test(h)||le.test(h))break;if(T.search(this.rules.other.nonSpaceChar)>=f||!h.trim())o+=`
`+T.slice(f);else{if(b||g.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||ie.test(g)||ae.test(g)||le.test(g))break;o+=`
`+h}b=!h.trim(),p+=Z+`
`,n=n.substring(Z.length+1),g=T.slice(f)}}t.loose||(l?t.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(l=!0)),t.items.push({type:"list_item",raw:p,task:!!this.options.gfm&&this.rules.other.listIsTask.test(o),loose:!1,text:o,tokens:[]}),t.raw+=p}let c=t.items.at(-1);if(c)c.raw=c.raw.trimEnd(),c.text=c.text.trimEnd();else return;t.raw=t.raw.trimEnd();for(let a of t.items){if(this.lexer.state.top=!1,a.tokens=this.lexer.blockTokens(a.text,[]),a.task){if(a.text=a.text.replace(this.rules.other.listReplaceTask,""),a.tokens[0]?.type==="text"||a.tokens[0]?.type==="paragraph"){a.tokens[0].raw=a.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),a.tokens[0].text=a.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let o=this.lexer.inlineQueue.length-1;o>=0;o--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[o].src)){this.lexer.inlineQueue[o].src=this.lexer.inlineQueue[o].src.replace(this.rules.other.listReplaceTask,"");break}}let p=this.rules.other.listTaskCheckbox.exec(a.raw);if(p){let o={type:"checkbox",raw:p[0]+" ",checked:p[0]!=="[ ]"};a.checked=o.checked,t.loose?a.tokens[0]&&["paragraph","text"].includes(a.tokens[0].type)&&"tokens"in a.tokens[0]&&a.tokens[0].tokens?(a.tokens[0].raw=o.raw+a.tokens[0].raw,a.tokens[0].text=o.raw+a.tokens[0].text,a.tokens[0].tokens.unshift(o)):a.tokens.unshift({type:"paragraph",raw:o.raw,text:o.raw,tokens:[o]}):a.tokens.unshift(o)}}if(!t.loose){let p=a.tokens.filter(g=>g.type==="space"),o=p.length>0&&p.some(g=>this.rules.other.anyLine.test(g.raw));t.loose=o}}if(t.loose)for(let a of t.items){a.loose=!0;for(let p of a.tokens)p.type==="text"&&(p.type="paragraph")}return t}}html(n){let e=this.rules.block.html.exec(n);if(e)return{type:"html",block:!0,raw:e[0],pre:e[1]==="pre"||e[1]==="script"||e[1]==="style",text:e[0]}}def(n){let e=this.rules.block.def.exec(n);if(e){let r=e[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),s=e[2]?e[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",t=e[3]?e[3].substring(1,e[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):e[3];return{type:"def",tag:r,raw:e[0],href:s,title:t}}}table(n){let e=this.rules.block.table.exec(n);if(!e||!this.rules.other.tableDelimiter.test(e[2]))return;let r=ge(e[1]),s=e[2].replace(this.rules.other.tableAlignChars,"").split("|"),t=e[3]?.trim()?e[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],i={type:"table",raw:e[0],header:[],align:[],rows:[]};if(r.length===s.length){for(let l of s)this.rules.other.tableAlignRight.test(l)?i.align.push("right"):this.rules.other.tableAlignCenter.test(l)?i.align.push("center"):this.rules.other.tableAlignLeft.test(l)?i.align.push("left"):i.align.push(null);for(let l=0;l<r.length;l++)i.header.push({text:r[l],tokens:this.lexer.inline(r[l]),header:!0,align:i.align[l]});for(let l of t)i.rows.push(ge(l,i.header.length).map((c,a)=>({text:c,tokens:this.lexer.inline(c),header:!1,align:i.align[a]})));return i}}lheading(n){let e=this.rules.block.lheading.exec(n);if(e){let r=e[1].trim();return{type:"heading",raw:e[0],depth:e[2].charAt(0)==="="?1:2,text:r,tokens:this.lexer.inline(r)}}}paragraph(n){let e=this.rules.block.paragraph.exec(n);if(e){let r=e[1].charAt(e[1].length-1)===`
`?e[1].slice(0,-1):e[1];return{type:"paragraph",raw:e[0],text:r,tokens:this.lexer.inline(r)}}}text(n){let e=this.rules.block.text.exec(n);if(e)return{type:"text",raw:e[0],text:e[0],tokens:this.lexer.inline(e[0])}}escape(n){let e=this.rules.inline.escape.exec(n);if(e)return{type:"escape",raw:e[0],text:e[1]}}tag(n){let e=this.rules.inline.tag.exec(n);if(e)return!this.lexer.state.inLink&&this.rules.other.startATag.test(e[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(e[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(e[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(e[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:e[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:e[0]}}link(n){let e=this.rules.inline.link.exec(n);if(e){let r=e[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let i=C(r.slice(0,-1),"\\");if((r.length-i.length)%2===0)return}else{let i=St(e[2],"()");if(i===-2)return;if(i>-1){let l=(e[0].indexOf("!")===0?5:4)+e[1].length+i;e[2]=e[2].substring(0,i),e[0]=e[0].substring(0,l).trim(),e[3]=""}}let s=e[2],t="";if(this.options.pedantic){let i=this.rules.other.pedanticHrefTitle.exec(s);i&&(s=i[1],t=i[3])}else t=e[3]?e[3].slice(1,-1):"";return s=s.trim(),this.rules.other.startAngleBracket.test(s)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?s=s.slice(1):s=s.slice(1,-1)),de(e,{href:s&&s.replace(this.rules.inline.anyPunctuation,"$1"),title:t&&t.replace(this.rules.inline.anyPunctuation,"$1")},e[0],this.lexer,this.rules)}}reflink(n,e){let r;if((r=this.rules.inline.reflink.exec(n))||(r=this.rules.inline.nolink.exec(n))){let s=(r[2]||r[1]).replace(this.rules.other.multipleSpaceGlobal," "),t=e[s.toLowerCase()];if(!t){let i=r[0].charAt(0);return{type:"text",raw:i,text:i}}return de(r,t,r[0],this.lexer,this.rules)}}emStrong(n,e,r=""){let s=this.rules.inline.emStrongLDelim.exec(n);if(!(!s||!s[1]&&!s[2]&&!s[3]&&!s[4]||s[4]&&r.match(this.rules.other.unicodeAlphaNumeric))&&(!(s[1]||s[3])||!r||this.rules.inline.punctuation.exec(r))){let t=[...s[0]].length-1,i,l,c=t,a=0,p=s[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(p.lastIndex=0,e=e.slice(-1*n.length+t);(s=p.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i)continue;if(l=[...i].length,s[3]||s[4]){c+=l;continue}else if((s[5]||s[6])&&t%3&&!((t+l)%3)){a+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c+a);let o=[...s[0]][0].length,g=n.slice(0,t+s.index+o+l);if(Math.min(t,l)%2){let b=g.slice(1,-1);return{type:"em",raw:g,text:b,tokens:this.lexer.inlineTokens(b)}}let h=g.slice(2,-2);return{type:"strong",raw:g,text:h,tokens:this.lexer.inlineTokens(h)}}}}codespan(n){let e=this.rules.inline.code.exec(n);if(e){let r=e[2].replace(this.rules.other.newLineCharGlobal," "),s=this.rules.other.nonSpaceChar.test(r),t=this.rules.other.startingSpaceChar.test(r)&&this.rules.other.endingSpaceChar.test(r);return s&&t&&(r=r.substring(1,r.length-1)),{type:"codespan",raw:e[0],text:r}}}br(n){let e=this.rules.inline.br.exec(n);if(e)return{type:"br",raw:e[0]}}del(n,e,r=""){let s=this.rules.inline.delLDelim.exec(n);if(s&&(!s[1]||!r||this.rules.inline.punctuation.exec(r))){let t=[...s[0]].length-1,i,l,c=t,a=this.rules.inline.delRDelim;for(a.lastIndex=0,e=e.slice(-1*n.length+t);(s=a.exec(e))!=null;){if(i=s[1]||s[2]||s[3]||s[4]||s[5]||s[6],!i||(l=[...i].length,l!==t))continue;if(s[3]||s[4]){c+=l;continue}if(c-=l,c>0)continue;l=Math.min(l,l+c);let p=[...s[0]][0].length,o=n.slice(0,t+s.index+p+l),g=o.slice(t,-t);return{type:"del",raw:o,text:g,tokens:this.lexer.inlineTokens(g)}}}}autolink(n){let e=this.rules.inline.autolink.exec(n);if(e){let r,s;return e[2]==="@"?(r=e[1],s="mailto:"+r):(r=e[1],s=r),{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}url(n){let e;if(e=this.rules.inline.url.exec(n)){let r,s;if(e[2]==="@")r=e[0],s="mailto:"+r;else{let t;do t=e[0],e[0]=this.rules.inline._backpedal.exec(e[0])?.[0]??"";while(t!==e[0]);r=e[0],e[1]==="www."?s="http://"+e[0]:s=e[0]}return{type:"link",raw:e[0],text:r,href:s,tokens:[{type:"text",raw:r,text:r}]}}}inlineText(n){let e=this.rules.inline.text.exec(n);if(e){let r=this.lexer.state.inRawBlock;return{type:"text",raw:e[0],text:e[0],escaped:r}}}},m=class F{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||P,this.options.tokenizer=this.options.tokenizer||new O,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let r={other:x,block:q.normal,inline:L.normal};this.options.pedantic?(r.block=q.pedantic,r.inline=L.pedantic):this.options.gfm&&(r.block=q.gfm,this.options.breaks?r.inline=L.breaks:r.inline=L.gfm),this.tokenizer.rules=r}static get rules(){return{block:q,inline:L}}static lex(e,r){return new F(r).lex(e)}static lexInline(e,r){return new F(r).inlineTokens(e)}lex(e){e=e.replace(x.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let r=0;r<this.inlineQueue.length;r++){let s=this.inlineQueue[r];this.inlineTokens(s.src,s.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,r=[],s=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(x.tabCharGlobal,"    ").replace(x.spaceLine,""));e;){let t;if(this.options.extensions?.block?.some(l=>(t=l.call({lexer:this},e,r))?(e=e.substring(t.raw.length),r.push(t),!0):!1))continue;if(t=this.tokenizer.space(e)){e=e.substring(t.raw.length);let l=r.at(-1);t.raw.length===1&&l!==void 0?l.raw+=`
`:r.push(t);continue}if(t=this.tokenizer.code(e)){e=e.substring(t.raw.length);let l=r.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.text,this.inlineQueue.at(-1).src=l.text):r.push(t);continue}if(t=this.tokenizer.fences(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.heading(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.hr(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.blockquote(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.list(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.html(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.def(e)){e=e.substring(t.raw.length);let l=r.at(-1);l?.type==="paragraph"||l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.raw,this.inlineQueue.at(-1).src=l.text):this.tokens.links[t.tag]||(this.tokens.links[t.tag]={href:t.href,title:t.title},r.push(t));continue}if(t=this.tokenizer.table(e)){e=e.substring(t.raw.length),r.push(t);continue}if(t=this.tokenizer.lheading(e)){e=e.substring(t.raw.length),r.push(t);continue}let i=e;if(this.options.extensions?.startBlock){let l=1/0,c=e.slice(1),a;this.options.extensions.startBlock.forEach(p=>{a=p.call({lexer:this},c),typeof a=="number"&&a>=0&&(l=Math.min(l,a))}),l<1/0&&l>=0&&(i=e.substring(0,l+1))}if(this.state.top&&(t=this.tokenizer.paragraph(i))){let l=r.at(-1);s&&l?.type==="paragraph"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):r.push(t),s=i.length!==e.length,e=e.substring(t.raw.length);continue}if(t=this.tokenizer.text(e)){e=e.substring(t.raw.length);let l=r.at(-1);l?.type==="text"?(l.raw+=(l.raw.endsWith(`
`)?"":`
`)+t.raw,l.text+=`
`+t.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=l.text):r.push(t);continue}if(e){let l="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(l);break}else throw new Error(l)}}return this.state.top=!0,r}inline(e,r=[]){return this.inlineQueue.push({src:e,tokens:r}),r}inlineTokens(e,r=[]){this.tokenizer.lexer=this;let s=e,t=null;if(this.tokens.links){let a=Object.keys(this.tokens.links);if(a.length>0)for(;(t=this.tokenizer.rules.inline.reflinkSearch.exec(s))!=null;)a.includes(t[0].slice(t[0].lastIndexOf("[")+1,-1))&&(s=s.slice(0,t.index)+"["+"a".repeat(t[0].length-2)+"]"+s.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;(t=this.tokenizer.rules.inline.anyPunctuation.exec(s))!=null;)s=s.slice(0,t.index)+"++"+s.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(t=this.tokenizer.rules.inline.blockSkip.exec(s))!=null;)i=t[2]?t[2].length:0,s=s.slice(0,t.index+i)+"["+"a".repeat(t[0].length-i-2)+"]"+s.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);s=this.options.hooks?.emStrongMask?.call({lexer:this},s)??s;let l=!1,c="";for(;e;){l||(c=""),l=!1;let a;if(this.options.extensions?.inline?.some(o=>(a=o.call({lexer:this},e,r))?(e=e.substring(a.raw.length),r.push(a),!0):!1))continue;if(a=this.tokenizer.escape(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.tag(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.link(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(a.raw.length);let o=r.at(-1);a.type==="text"&&o?.type==="text"?(o.raw+=a.raw,o.text+=a.text):r.push(a);continue}if(a=this.tokenizer.emStrong(e,s,c)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.codespan(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.br(e)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.del(e,s,c)){e=e.substring(a.raw.length),r.push(a);continue}if(a=this.tokenizer.autolink(e)){e=e.substring(a.raw.length),r.push(a);continue}if(!this.state.inLink&&(a=this.tokenizer.url(e))){e=e.substring(a.raw.length),r.push(a);continue}let p=e;if(this.options.extensions?.startInline){let o=1/0,g=e.slice(1),h;this.options.extensions.startInline.forEach(b=>{h=b.call({lexer:this},g),typeof h=="number"&&h>=0&&(o=Math.min(o,h))}),o<1/0&&o>=0&&(p=e.substring(0,o+1))}if(a=this.tokenizer.inlineText(p)){e=e.substring(a.raw.length),a.raw.slice(-1)!=="_"&&(c=a.raw.slice(-1)),l=!0;let o=r.at(-1);o?.type==="text"?(o.raw+=a.raw,o.text+=a.text):r.push(a);continue}if(e){let o="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(o);break}else throw new Error(o)}}return r}},G=class{options;parser;constructor(n){this.options=n||P}space(n){return""}code({text:n,lang:e,escaped:r}){let s=(e||"").match(x.notSpaceStart)?.[0],t=n.replace(x.endingNewline,"")+`
`;return s?'<pre><code class="language-'+y(s)+'">'+(r?t:y(t,!0))+`</code></pre>
`:"<pre><code>"+(r?t:y(t,!0))+`</code></pre>
`}blockquote({tokens:n}){return`<blockquote>
${this.parser.parse(n)}</blockquote>
`}html({text:n}){return n}def(n){return""}heading({tokens:n,depth:e}){return`<h${e}>${this.parser.parseInline(n)}</h${e}>
`}hr(n){return`<hr>
`}list(n){let e=n.ordered,r=n.start,s="";for(let l=0;l<n.items.length;l++){let c=n.items[l];s+=this.listitem(c)}let t=e?"ol":"ul",i=e&&r!==1?' start="'+r+'"':"";return"<"+t+i+`>
`+s+"</"+t+`>
`}listitem(n){return`<li>${this.parser.parse(n.tokens)}</li>
`}checkbox({checked:n}){return"<input "+(n?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:n}){return`<p>${this.parser.parseInline(n)}</p>
`}table(n){let e="",r="";for(let t=0;t<n.header.length;t++)r+=this.tablecell(n.header[t]);e+=this.tablerow({text:r});let s="";for(let t=0;t<n.rows.length;t++){let i=n.rows[t];r="";for(let l=0;l<i.length;l++)r+=this.tablecell(i[l]);s+=this.tablerow({text:r})}return s&&(s=`<tbody>${s}</tbody>`),`<table>
<thead>
`+e+`</thead>
`+s+`</table>
`}tablerow({text:n}){return`<tr>
${n}</tr>
`}tablecell(n){let e=this.parser.parseInline(n.tokens),r=n.header?"th":"td";return(n.align?`<${r} align="${n.align}">`:`<${r}>`)+e+`</${r}>
`}strong({tokens:n}){return`<strong>${this.parser.parseInline(n)}</strong>`}em({tokens:n}){return`<em>${this.parser.parseInline(n)}</em>`}codespan({text:n}){return`<code>${y(n,!0)}</code>`}br(n){return"<br>"}del({tokens:n}){return`<del>${this.parser.parseInline(n)}</del>`}link({href:n,title:e,tokens:r}){let s=this.parser.parseInline(r),t=ue(n);if(t===null)return s;n=t;let i='<a href="'+n+'"';return e&&(i+=' title="'+y(e)+'"'),i+=">"+s+"</a>",i}image({href:n,title:e,text:r,tokens:s}){s&&(r=this.parser.parseInline(s,this.parser.textRenderer));let t=ue(n);if(t===null)return y(r);n=t;let i=`<img src="${n}" alt="${y(r)}"`;return e&&(i+=` title="${y(e)}"`),i+=">",i}text(n){return"tokens"in n&&n.tokens?this.parser.parseInline(n.tokens):"escaped"in n&&n.escaped?n.text:y(n.text)}},se=class{strong({text:n}){return n}em({text:n}){return n}codespan({text:n}){return n}del({text:n}){return n}html({text:n}){return n}text({text:n}){return n}link({text:n}){return""+n}image({text:n}){return""+n}br(){return""}checkbox({raw:n}){return n}},w=class J{options;renderer;textRenderer;constructor(e){this.options=e||P,this.options.renderer=this.options.renderer||new G,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new se}static parse(e,r){return new J(r).parse(e)}static parseInline(e,r){return new J(r).parseInline(e)}parse(e){this.renderer.parser=this;let r="";for(let s=0;s<e.length;s++){let t=e[s];if(this.options.extensions?.renderers?.[t.type]){let l=t,c=this.options.extensions.renderers[l.type].call({parser:this},l);if(c!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(l.type)){r+=c||"";continue}}let i=t;switch(i.type){case"space":{r+=this.renderer.space(i);break}case"hr":{r+=this.renderer.hr(i);break}case"heading":{r+=this.renderer.heading(i);break}case"code":{r+=this.renderer.code(i);break}case"table":{r+=this.renderer.table(i);break}case"blockquote":{r+=this.renderer.blockquote(i);break}case"list":{r+=this.renderer.list(i);break}case"checkbox":{r+=this.renderer.checkbox(i);break}case"html":{r+=this.renderer.html(i);break}case"def":{r+=this.renderer.def(i);break}case"paragraph":{r+=this.renderer.paragraph(i);break}case"text":{r+=this.renderer.text(i);break}default:{let l='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(l),"";throw new Error(l)}}}return r}parseInline(e,r=this.renderer){this.renderer.parser=this;let s="";for(let t=0;t<e.length;t++){let i=e[t];if(this.options.extensions?.renderers?.[i.type]){let c=this.options.extensions.renderers[i.type].call({parser:this},i);if(c!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){s+=c||"";continue}}let l=i;switch(l.type){case"escape":{s+=r.text(l);break}case"html":{s+=r.html(l);break}case"link":{s+=r.link(l);break}case"image":{s+=r.image(l);break}case"checkbox":{s+=r.checkbox(l);break}case"strong":{s+=r.strong(l);break}case"em":{s+=r.em(l);break}case"codespan":{s+=r.codespan(l);break}case"br":{s+=r.br(l);break}case"del":{s+=r.del(l);break}case"text":{s+=r.text(l);break}default:{let c='Token with "'+l.type+'" type was not found.';if(this.options.silent)return console.error(c),"";throw new Error(c)}}}return s}},E=class{options;block;constructor(n){this.options=n||P}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(n){return n}postprocess(n){return n}processAllTokens(n){return n}emStrongMask(n){return n}provideLexer(){return this.block?m.lex:m.lexInline}provideParser(){return this.block?w.parse:w.parseInline}},Rt=class{defaults=W();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=w;Renderer=G;TextRenderer=se;Lexer=m;Tokenizer=O;Hooks=E;constructor(...n){this.use(...n)}walkTokens(n,e){let r=[];for(let s of n)switch(r=r.concat(e.call(this,s)),s.type){case"table":{let t=s;for(let i of t.header)r=r.concat(this.walkTokens(i.tokens,e));for(let i of t.rows)for(let l of i)r=r.concat(this.walkTokens(l.tokens,e));break}case"list":{let t=s;r=r.concat(this.walkTokens(t.items,e));break}default:{let t=s;this.defaults.extensions?.childTokens?.[t.type]?this.defaults.extensions.childTokens[t.type].forEach(i=>{let l=t[i].flat(1/0);r=r.concat(this.walkTokens(l,e))}):t.tokens&&(r=r.concat(this.walkTokens(t.tokens,e)))}}return r}use(...n){let e=this.defaults.extensions||{renderers:{},childTokens:{}};return n.forEach(r=>{let s={...r};if(s.async=this.defaults.async||s.async||!1,r.extensions&&(r.extensions.forEach(t=>{if(!t.name)throw new Error("extension name required");if("renderer"in t){let i=e.renderers[t.name];i?e.renderers[t.name]=function(...l){let c=t.renderer.apply(this,l);return c===!1&&(c=i.apply(this,l)),c}:e.renderers[t.name]=t.renderer}if("tokenizer"in t){if(!t.level||t.level!=="block"&&t.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let i=e[t.level];i?i.unshift(t.tokenizer):e[t.level]=[t.tokenizer],t.start&&(t.level==="block"?e.startBlock?e.startBlock.push(t.start):e.startBlock=[t.start]:t.level==="inline"&&(e.startInline?e.startInline.push(t.start):e.startInline=[t.start]))}"childTokens"in t&&t.childTokens&&(e.childTokens[t.name]=t.childTokens)}),s.extensions=e),r.renderer){let t=this.defaults.renderer||new G(this.defaults);for(let i in r.renderer){if(!(i in t))throw new Error(`renderer '${i}' does not exist`);if(["options","parser"].includes(i))continue;let l=i,c=r.renderer[l],a=t[l];t[l]=(...p)=>{let o=c.apply(t,p);return o===!1&&(o=a.apply(t,p)),o||""}}s.renderer=t}if(r.tokenizer){let t=this.defaults.tokenizer||new O(this.defaults);for(let i in r.tokenizer){if(!(i in t))throw new Error(`tokenizer '${i}' does not exist`);if(["options","rules","lexer"].includes(i))continue;let l=i,c=r.tokenizer[l],a=t[l];t[l]=(...p)=>{let o=c.apply(t,p);return o===!1&&(o=a.apply(t,p)),o}}s.tokenizer=t}if(r.hooks){let t=this.defaults.hooks||new E;for(let i in r.hooks){if(!(i in t))throw new Error(`hook '${i}' does not exist`);if(["options","block"].includes(i))continue;let l=i,c=r.hooks[l],a=t[l];E.passThroughHooks.has(i)?t[l]=p=>{if(this.defaults.async&&E.passThroughHooksRespectAsync.has(i))return(async()=>{let g=await c.call(t,p);return a.call(t,g)})();let o=c.call(t,p);return a.call(t,o)}:t[l]=(...p)=>{if(this.defaults.async)return(async()=>{let g=await c.apply(t,p);return g===!1&&(g=await a.apply(t,p)),g})();let o=c.apply(t,p);return o===!1&&(o=a.apply(t,p)),o}}s.hooks=t}if(r.walkTokens){let t=this.defaults.walkTokens,i=r.walkTokens;s.walkTokens=function(l){let c=[];return c.push(i.call(this,l)),t&&(c=c.concat(t.call(this,l))),c}}this.defaults={...this.defaults,...s}}),this}setOptions(n){return this.defaults={...this.defaults,...n},this}lexer(n,e){return m.lex(n,e??this.defaults)}parser(n,e){return w.parse(n,e??this.defaults)}parseMarkdown(n){return(e,r)=>{let s={...r},t={...this.defaults,...s},i=this.onError(!!t.silent,!!t.async);if(this.defaults.async===!0&&s.async===!1)return i(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof e>"u"||e===null)return i(new Error("marked(): input parameter is undefined or null"));if(typeof e!="string")return i(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(e)+", string expected"));if(t.hooks&&(t.hooks.options=t,t.hooks.block=n),t.async)return(async()=>{let l=t.hooks?await t.hooks.preprocess(e):e,c=await(t.hooks?await t.hooks.provideLexer():n?m.lex:m.lexInline)(l,t),a=t.hooks?await t.hooks.processAllTokens(c):c;t.walkTokens&&await Promise.all(this.walkTokens(a,t.walkTokens));let p=await(t.hooks?await t.hooks.provideParser():n?w.parse:w.parseInline)(a,t);return t.hooks?await t.hooks.postprocess(p):p})().catch(i);try{t.hooks&&(e=t.hooks.preprocess(e));let l=(t.hooks?t.hooks.provideLexer():n?m.lex:m.lexInline)(e,t);t.hooks&&(l=t.hooks.processAllTokens(l)),t.walkTokens&&this.walkTokens(l,t.walkTokens);let c=(t.hooks?t.hooks.provideParser():n?w.parse:w.parseInline)(l,t);return t.hooks&&(c=t.hooks.postprocess(c)),c}catch(l){return i(l)}}}onError(n,e){return r=>{if(r.message+=`
Please report this to https://github.com/markedjs/marked.`,n){let s="<p>An error occurred:</p><pre>"+y(r.message+"",!0)+"</pre>";return e?Promise.resolve(s):s}if(e)return Promise.reject(r);throw r}}},R=new Rt;function k(n,e){return R.parse(n,e)}k.options=k.setOptions=function(n){return R.setOptions(n),k.defaults=R.defaults,ke(k.defaults),k};k.getDefaults=W;k.defaults=P;k.use=function(...n){return R.use(...n),k.defaults=R.defaults,ke(k.defaults),k};k.walkTokens=function(n,e){return R.walkTokens(n,e)};k.parseInline=R.parseInline;k.Parser=w;k.parser=w.parse;k.Renderer=G;k.TextRenderer=se;k.Lexer=m;k.lexer=m.lex;k.Tokenizer=O;k.Hooks=E;k.parse=k;k.options;k.setOptions;k.use;k.walkTokens;k.parseInline;w.parse;m.lex;const Pt=`# Vue 3 + Vite 博客系统\r
\r
这是一个基于 Vue 3、Vite、Element Plus 和 Pinia 构建的博客系统。该项目也搭载了一个简单的展示个人简历的入口，用户可以在博客系统中查看和下载简历，同时还集成了一个基于AI（调用DeepSeek API和Ollama本地部署大模型）的智能问答功能，用来处理AKN4UN XML格式的文档，该模块被集成到了写文章的页面当中，需要用户登录才能使用，拉取该项目之后需要你自己在config->aiConfig文件当中部署自己的DeepSeek API密钥或者Ollama本地部署大模型的URL。\r
\r
本项目支持三种不同的数据获取方式，可根据不同使用场景灵活选择：\r
本地开发环境：\r
1. 优先使用Set-Location "D:\\Code\\JS\\my-blog\\backend"; python -m uvicorn main:app  --host 0.0.0.0 --port 8001启动后端服务。然后在浏览器中访问http://localhost:8001，即可查看API文档。在另外一个终端运行npm run dev启动前端服务，更改之后使用npm run build打包前端代码，最后上传到GitHub仓库，GitHub Actions会自动部署到GitHub Pages上。前端会根据环境变量自动切换API端点，在本地开发环境下会使用http://localhost:8001作为API端点，在GitHub Pages环境下会使用./api作为API端点。 \r
\r
2. 再次使用json-server --watch db.json --port 3000命令启动json-server服务，前端会自动切换到http://localhost:3000作为API端点，数据来自db.json文件中的模拟数据，但是该数据仅仅是存于内存中的，不会持久化到数据库中，然后使用npm run dev启动前端服务，适合前端开发和功能测试。最后使用npm run build打包前端代码，上传到GitHub仓库，GitHub Actions会自动部署到GitHub Pages上。前端会根据环境变量自动切换API端点，在本地开发环境下会使用http://localhost:3000作为API端点，在GitHub Pages环境下会使用./api作为API端点。\r
   \r
3. 最后是可以在Github Pages上直接使用静态JSON文件作为数据源的方式，前端会自动切换到./api作为API端点，数据来自public/api/*.json静态文件，但是由于GitHub Pages环境的限制，所有数据都是静态的，无法进行任何数据修改操作，用户登录、文章发布、与AI交互等动态功能都无法使用。\r
\r
## 三种数据获取方式\r
\r
### 1. MySQL + FastAPI 后端服务方式\r
\r
此方式适用于完整功能开发和生产环境使用，具有完整的数据持久化能力。\r
\r
#### 配置步骤：\r
1. **安装并配置MySQL数据库**\r
   - 下载并安装MySQL服务\r
   - 创建数据库：\`CREATE DATABASE blog_db;\`\r
   - 确保MySQL服务正在运行\r
\r
2. **配置数据库连接**\r
   - 在 \`backend/database.py\` 中设置数据库连接参数\r
   - 推荐使用环境变量设置敏感信息：\r
     \`\`\`bash\r
     # 设置环境变量（Linux/Mac）\r
     export DB_USER=your_username\r
     export DB_PASSWORD=your_password\r
     export DB_HOST=localhost\r
     export DB_PORT=3306\r
     export DB_NAME=blog_db\r
     \`\`\`\r
     \r
     \`\`\`cmd\r
     # 设置环境变量（Windows）\r
     set DB_USER=your_username\r
     set DB_PASSWORD=your_password\r
     set DB_HOST=localhost\r
     set DB_PORT=3306\r
     set DB_NAME=blog_db\r
     \`\`\`\r
\r
3. **安装Python依赖**\r
   \`\`\`bash\r
   cd backend\r
   pip install -r requirements.txt\r
   \`\`\`\r
\r
4. **启动后端服务**\r
   \`\`\`bash\r
   # Windows\r
   Set-Location "d:\\Code\\JS\\my-blog\\backend"; python -m uvicorn main:app --host 0.0.0.0 --port 8001\r
   \r
   # 或使用启动脚本\r
   cd backend\r
   .\\start_server.bat\r
\r
   # 然后可以在浏览器中访问 http://localhost:8001 查看API文档\r
   \`\`\`\r
\r
5. **启动前端服务**\r
   \`\`\`bash\r
   npm run dev\r
   \`\`\`\r
\r
6. **前端配置**\r
   - 前端会自动检测环境并使用 \`http://localhost:8001\` 作为API端点\r
   - 所有数据操作将通过FastAPI接口与MySQL数据库交互\r
\r
#### 特点：\r
- 完整的CRUD功能\r
- 用户认证和授权\r
- 实时数据同步\r
- 支持所有业务功能（文章发布、评论、点赞等）\r
\r
### 2. Json-server Mock数据方式\r
\r
此方式适用于前端开发和功能测试，无需配置数据库，使用模拟数据。\r
\r
#### 配置步骤：\r
1. **安装json-server**\r
   \`\`\`bash\r
   npm install -g json-server\r
   \`\`\`\r
\r
2. **启动json-server服务**\r
   \`\`\`bash\r
   # 在项目根目录下启动\r
   json-server --watch db.json --port 3000\r
   \`\`\`\r
\r
3. **启动前端开发服务器**\r
   \`\`\`bash\r
   npm run dev\r
   \`\`\`\r
\r
4. **前端配置**\r
   - 前端会自动检测环境并使用 \`http://localhost:3000\` 作为API端点\r
   - 数据来自 \`db.json\` 文件中的模拟数据\r
\r
#### 特点：\r
- 快速启动，无需数据库配置\r
- 适合前端界面开发\r
- 支持数据的增删改查（临时存储在内存中）\r
- 部分高级功能可能受限\r
\r
### 3. GitHub Pages 静态数据方式\r
\r
此方式适用于部署到GitHub Pages，使用静态JSON文件提供数据，但部分动态功能受限。\r
\r
#### 部署步骤：\r
1. **构建项目**\r
   \`\`\`bash\r
   npm run build\r
   \`\`\`\r
\r
2. **部署到GitHub Pages**\r
   - 方式1（推荐）：使用GitHub Actions\r
     - 确保仓库名为 \`yourusername.github.io\` 或者 \`your-repo-name\`\r
     - 将代码推送到 \`master\` 分支\r
     - GitHub Actions 会在 \`.github/workflows/deploy.yml\` 中自动构建并部署\r
   \r
   - 方式2：手动部署\r
     - 将 \`dist\` 目录中的内容部署到 GitHub Pages\r
\r
3. **数据获取方式**\r
   - 前端会自动检测为GitHub Pages环境，使用 \`./api\` 作为API端点\r
   - 所有数据从 \`public/api/*.json\` 静态文件获取\r
\r
#### 在线演示\r
你可以查看项目的[在线演示](https://yiyidecat.github.io/My-blog/)，但请注意：\r
- 由于没有上传DeepSeek API密钥，智能问答功能会报错\r
- 网站只能展示静态资源，发布文章、与AI交互、用户登录等动态功能无法使用\r
- 所有数据显示为静态内容，无法进行任何数据修改操作\r
\r
#### 特点：\r
- 无需后端服务\r
- 免费托管\r
- 适合展示和分享\r
- **限制**：不支持数据修改、用户认证、实时交互等动态功能\r
\r
## 本地开发\r
\r
！！！！！！！！注意：\r
1. 运行项目前请先启动后端API服务：\r
Set-Location "d:\\Code\\JS\\my-blog\\backend"; python -m uvicorn main:app --host 0.0.0.0 --port 8001\r
2. 或者如果你想使用mock数据测试前端功能，可以在项目根目录下运行\r
json-server --watch db.json --port 3000。\r
3. 启动前端开发服务器：\r
npm run dev\r
\r
### 1. 安装依赖\r
\`\`\`bash\r
npm install -g json-server\r
npm install\r
\`\`\`\r
\r
### 2. 启动后端API服务\r
\`\`\`bash\r
# 方法1：启用Mysql数据库并启动FastAPI服务\r
先在backend目录下的database.py文件当中配置好你的MySQL数据库连接参数，然后运行以下命令：\r
\r
Set-Location "d:\\Code\\JS\\my-blog\\backend"; python -m uvicorn main:app --host 0.0.0.0 --port 8001\r
\r
# 方法2：手动启动json-server服务\r
json-server --watch db.json --port 3000\r
\`\`\`\r
\r
### 3. 启动前端开发服务器\r
\`\`\`bash\r
npm run dev\r
\`\`\`\r
\r
### 4. 用户登录\r
可以使用以下测试账号登录（仅在MySQL+FastAPI模式下有效）：\r
- 用户名：\`前端小白\`  \r
- 密码：\`frontend123\`\r
\r
- 用户名：\`后端老手  \`  \r
- 密码：\`backend123\`   \r
\r
## 部署到 GitHub Pages\r
\r
### 方式1：使用 GitHub Actions（推荐）\r
\r
1. 确保仓库名为 \`yourusername.github.io\` 或者 \`your-repo-name\`\r
2. 将代码推送到 \`master\` 分支\r
3. GitHub Actions 会在 \`.github/workflows/deploy.yml\` 中自动构建并部署\r
## 注意！！！！\r
## 以后若是需要修改静态数据，只需要在master分支下对public->api下的json文件进行修改即可，修改后npm run build然后提交到远程仓库会自动触发deploy.yml文件部署流程，并更新gh-pages分支上的数据。\r
\r
### 方式2：手动部署\r
\r
1. 构建项目：\r
\`\`\`bash\r
npm run build\r
\`\`\`\r
\r
2. 将 \`dist\` 目录中的内容部署到 GitHub Pages\r
\r
### 注意事项\r
- 本项目使用 Hash 路由以兼容 GitHub Pages\r
- API 请求会根据环境自动切换到适当的端点\r
- 在 GitHub Pages 上，API 数据来自静态 JSON 文件\r
\r
## 项目结构\r
src/\r
├── api/               # 接口请求\r
│   └── \r
├── components/        # 可复用组件\r
│   ├── ArticleCard.vue\r
│   └── CommentList.vue\r
├── views/             # 页面视图\r
│   ├── HomeView.vue   # 文章列表\r
│   ├── PostView.vue   # 文章详情\r
│   └── LoginView.vue  # 登录页\r
├── store/             # Pinia状态管理\r
│   ├── userStore.js   # 用户登录状态\r
│   └── postStore.js   # 文章数据\r
├── utils/               # 工具函数\r
│   └── request.js     # 统一请求拦截器\r
├── router/            # Vue Router\r
│   └── index.js       # 路由配置\r
└── App.vue            # 根组件\r
\r
## 墨语博客开发指南\r
\r
## 1. 登录功能（需实现）\r
- **API**: \`POST /login\` (body: { username, password })\r
- **业务逻辑**:\r
  1. 用户输入用户名密码 → 调用API\r
  2. 成功后存储token到Pinia \`userStore\`\r
  3. 跳转到首页（需路由守卫）\r
\r
## 2. 文章列表（需实现）\r
- **API**: \`GET /posts\`\r
- **需求**:\r
  - 分页加载（每页10条）\r
  - 支持分类筛选（前端过滤）\r
  - 点赞按钮：点击后调用 \`POST /posts/:id/like\`，更新文章likes\r
\r
## 3. 文章详情\r
- **API**: \`GET /posts/:id\`\r
- **需求**:\r
  - 显示文章内容（富文本渲染）\r
  - 评论区：输入框 + 发表按钮\r
  - 发表评论：调用 \`POST /posts/:id/comments\`，添加到评论列表\r
\r
## 4. 技术亮点\r
- ✨ **虚拟滚动**：文章列表用 \`el-virtual-list\`（Element Plus组件）\r
- ✨ **评论防抖**：发表评论时防抖处理（避免重复请求）\r
- ✨ **状态管理**：用Pinia统一管理用户登录态和文章数据\r
- ✨ **API封装**：统一请求拦截器，处理错误和token过期 \r
- ✨ **路由守卫**：登录后才能访问文章详情页\r
- ✨ **评论列表**：实时更新，支持删除评论\r
- \r
\r
## 5. AI 助手配置\r
\r
本项目集成了智能 AI 助手，支持多种 AI 模型提供商，包括云端模型和本地模型。\r
\r
### 5.1 支持的 AI 提供商\r
\r
#### 云端模型\r
- **DeepSeek**：高性能的中文 AI 模型，适合复杂文档处理\r
- **Kimi**：月之暗面开发的大模型（API 接口暂未开放）\r
\r
#### 本地模型\r
- **Ollama**：支持本地运行的各种开源模型，保护数据隐私\r
\r
### 5.2 配置 DeepSeek API 密钥\r
\r
为安全起见，API 密钥应存储在环境变量中：\r
\r
1. 在项目根目录创建 \`.env.local\` 文件：\r
   \`\`\`bash\r
   # 手动创建文件，内容如下：\r
   VITE_DEEPSEEK_API_KEY=sk-your-actual-deepseek-api-key-here\r
   \`\`\`\r
\r
2. 重启开发服务器：\r
   \`\`\`bash\r
   npm run dev\r
   \`\`\`\r
\r
**注意**：环境变量必须以 \`VITE_\` 开头才能在 Vite 项目中访问，且 \`.env.local\` 文件会被 \`.gitignore\` 忽略，不会提交到代码仓库。\r
\r
### 5.3 配置 Ollama 本地模型\r
\r
1. **安装 Ollama**：\r
   - 访问 [Ollama 官网](https://ollama.ai/) 并下载适合您系统的版本\r
   - 安装并启动 Ollama 服务\r
   - 确认服务运行在默认端口 \`http://localhost:11434\`\r
\r
2. **拉取推荐的中文模型**：\r
   \`\`\`bash\r
   # 拉取 Qwen2.5 模型（适合中文处理）\r
   ollama pull qwen2.5:7b\r
   \r
   # 或者拉取其他中文友好的模型\r
   ollama pull llama3:8b\r
   ollama pull gemma2:2b\r
   \`\`\`\r
\r
3. **启动 Ollama 服务**：\r
   \`\`\`bash\r
   ollama serve\r
   \`\`\`\r
\r
### 5.4 在应用中切换 AI 模型\r
\r
在文章编辑器界面，你可以通过 AI 助手右上角的下拉菜单在不同模型之间切换：\r
- 本地模型\r
- Ollama\r
- DeepSeek\r
- Kimi（如果API开放）\r
\r
### 5.5 安全和隐私注意事项\r
\r
- **云端模型**：所有发送到 AI 提供商的文档内容都通过 TLS 1.3 进行传输加密\r
- **本地模型**：数据完全保留在本地设备，不经过网络传输\r
- **隐私模式**：启用隐私模式以最小化数据保留\r
- **环境变量**：API 密钥存储在环境变量中，不会提交到代码仓库\r
\r
### 5.6 测试 AI 配置\r
\r
设置完成后，启动应用程序：\r
\r
1. 启动应用：\`npm run dev\`\r
2. 打开文章编辑器\r
3. 点击右下角的 AI 助手图标\r
4. 尝试测试查询，如："将以下样本文本转换为AKN4UN XML格式：样本法律文档内容"\r
5. 验证是否收到正确的XML响应\r
\r
### 5.7 故障排除\r
\r
- **API 密钥错误**：检查环境变量配置是否正确，确保密钥格式正确\r
- **Ollama 连接问题**：确保 Ollama 服务正在运行 (\`ollama serve\`)\r
- **模型未找到**：确认所需模型已下载 (\`ollama list\`)\r
- **速率限制**：如果使用云端模型遇到限制，可切换到本地模型\r
- **响应质量**：调整温度设置或尝试不同模型`,$t={class:"cnblogs-fullscreen"},vt={class:"inner-wrapper"},Tt={class:"main-body"},It={class:"content-inner"},zt={class:"content-left"},Lt={class:"about-container"},Ct=["innerHTML"],Et={class:"sidebar-right"},Bt={class:"sidebar-section"},Dt={class:"author-info"},Ht={class:"author-avatar"},qt=["src"],Mt={class:"author-details"},Ot={class:"author-name"},Gt={class:"author-bio"},jt={class:"author-stats"},Qt={class:"stat"},Zt={class:"stat-number"},Nt={class:"stat"},Ut={class:"stat-number"},Vt={class:"stat"},Ft={class:"stat-number"},Jt={class:"sidebar-section"},Wt={class:"recent-posts"},Xt=["onClick"],Kt={class:"recent-post-link"},Yt={class:"post-title"},er={class:"post-count"},tr={class:"sidebar-section login-section"},rr={class:"login-prompt"},nr={class:"login-buttons"},sr={class:"login-buttons"},lr={__name:"index",setup(n){const e=oe([]),r=oe({username:"",avatar:"",bio:"",postsCount:0,articlesCount:0,commentsCount:0}),s=qe(),t=ve();k.setOptions({gfm:!0,breaks:!0});const i=Te(()=>k.parse(Pt)),l=async()=>{try{const g=[...await Be.getAllCategories()||[]].sort((h,b)=>b.count-h.count);e.value=g.slice(0,5)}catch(p){console.error("获取分类数据失败:",p),De.error("获取分类数据失败")}},c=async()=>{try{if(t.user)r.value=t.user;else{const p=await He.getUserById(1);r.value=p}}catch(p){console.error("获取用户数据失败:",p)}},a=p=>{s.push({path:"/",query:{category:p.name}})};return Ie(async()=>{await l(),await c()}),(p,o)=>{const g=Ce("router-link");return z(),I("div",$t,[u("div",vt,[$(ze),u("div",Tt,[u("div",It,[u("div",zt,[u("div",Lt,[o[0]||(o[0]=u("h2",{class:"page-title"},"关于本项目",-1)),o[1]||(o[1]=u("p",{class:"page-subtitle"},"以下内容来自仓库根目录的 README.md，修改该文件后保存即可在开发模式下即时更新",-1)),u("article",{class:"readme-body",innerHTML:i.value},null,8,Ct)])]),u("div",Et,[u("div",Bt,[o[5]||(o[5]=u("h3",{class:"sidebar-title"},"博主信息",-1)),u("div",Dt,[u("div",Ht,[u("img",{src:r.value.avatar||"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",alt:"博主头像",class:"avatar-img"},null,8,qt)]),u("div",Mt,[u("h4",Ot,A(r.value.username||"访客"),1),u("p",Gt,A(r.value.bio||"暂无简介"),1),u("div",jt,[u("div",Qt,[u("span",Zt,A(r.value.postsCount||0),1),o[2]||(o[2]=u("span",{class:"stat-label"},"随笔",-1))]),u("div",Nt,[u("span",Ut,A(r.value.articlesCount||0),1),o[3]||(o[3]=u("span",{class:"stat-label"},"文章",-1))]),u("div",Vt,[u("span",Ft,A(r.value.commentsCount||0),1),o[4]||(o[4]=u("span",{class:"stat-label"},"评论",-1))])])])])]),u("div",Jt,[o[6]||(o[6]=u("h3",{class:"sidebar-title"},"热门分类",-1)),u("ul",Wt,[(z(!0),I(N,null,Le(e.value,h=>(z(),I("li",{key:h.id,class:"recent-post-item",onClick:b=>a(h)},[u("div",Kt,[u("span",Yt,A(h.name),1),u("span",er,"("+A(h.count)+")",1)])],8,Xt))),128))])]),u("div",tr,[o[12]||(o[12]=u("h3",{class:"sidebar-title"},"访问入口",-1)),U(t).token==="1"?(z(),I(N,{key:0},[u("p",rr,"欢迎回来，"+A(r.value.username)+"！",1),u("div",nr,[$(g,{to:`/dashboard/${U(t).user.id}/editor/new`,class:"login-button"},{default:D(()=>[...o[7]||(o[7]=[H("写文章",-1)])]),_:1},8,["to"]),$(g,{to:`/dashboard/${U(t).user.id}/settings`,class:"register-button"},{default:D(()=>[...o[8]||(o[8]=[H("设置",-1)])]),_:1},8,["to"])])],64)):(z(),I(N,{key:1},[o[11]||(o[11]=u("p",{class:"login-prompt"},"立即登录，发布你的第一篇博客",-1)),u("div",sr,[$(g,{to:"/login",class:"login-button"},{default:D(()=>[...o[9]||(o[9]=[H("登录",-1)])]),_:1}),$(g,{to:"/register",class:"register-button"},{default:D(()=>[...o[10]||(o[10]=[H("注册",-1)])]),_:1})])],64))])])])]),$(Ee)])])}}},ar=$e(lr,[["__scopeId","data-v-736c2cc1"]]);export{ar as default};
//# sourceMappingURL=index-Dd-BZY7g.js.map
