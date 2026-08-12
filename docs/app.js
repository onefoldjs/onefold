var ce=null;function pe(t,o){ce?ce(t,o):o()}var Gt=new Map;function ue(t){return Gt.get(t)}var E=null,Jt=0,Yt=new Set;var V=class{constructor(o,r){this.deps=new Set,this.active=!0,this.fn=o,this.label=r}run(){if(!this.active)return;this.cleanup();let o=E;E=this;try{pe(this.label,this.fn)}finally{E=o}}cleanup(){for(let o of this.deps)o.subscribers.delete(this);this.deps.clear()}dispose(){this.active=!1,this.cleanup()}},G=class{constructor(o){this.value=o,this.subscribers=new Set}get(){return E&&(this.subscribers.add(E),E.deps.add(this)),this.value}set(o){let r=typeof o=="function"?o(this.value):o;Object.is(r,this.value)||(this.value=r,this.notify())}peek(){return this.value}notify(){if(Jt>0)for(let o of this.subscribers)Yt.add(o);else{let o=Array.from(this.subscribers);for(let r=0;r<o.length;r++)o[r].run()}}};function b(t){let o=new G(t),r=(()=>o.get());return r.set=i=>o.set(i),r.peek=()=>o.peek(),r}function R(t,o="effect"){let r=o,i=new V(t,r);return i.run(),()=>i.dispose()}var Kt=/^\s*(javascript|data|vbscript):/i,Xt=/^on/i;function J(t){return Kt.test(t)}function F(t){return Xt.test(t)}function Y(t){let o=document.createElement("template");o.innerHTML=t;let r=i=>{let a=[];i.childNodes.forEach(d=>{if(d.nodeType===Node.ELEMENT_NODE){let s=d,c=s.tagName.toLowerCase();if(c==="script"||c==="style"||c==="iframe"||c==="object"||c==="embed"||c==="form"){a.push(d);return}Array.from(s.attributes).forEach(u=>{(F(u.name)||(u.name==="href"||u.name==="src")&&J(u.value))&&s.removeAttribute(u.name)}),r(s)}}),a.forEach(d=>d.remove())};return r(o.content),o.innerHTML}var U=null;function Qt(){return U||(typeof window<"u"&&window.trustedTypes&&(U=window.trustedTypes.createPolicy("onefold-sanitized",{createHTML:t=>Y(t)})),U)}function K(t){let o=Qt();return o?o.createHTML(t):Y(t)}function f(t){return{__onefoldRaw:!0,html:Y(t)}}function X(t){return typeof t=="object"&&t!==null&&t.__onefoldRaw===!0}function Q(t,o){o.replaceChildren(t)}var j=new WeakMap,Z=null;function Zt(){if(Z||typeof MutationObserver>"u"||typeof document>"u")return;Z=new MutationObserver(o=>{for(let r of o)r.removedNodes.forEach(me)});let t=document.documentElement??document;Z.observe(t,{childList:!0,subtree:!0})}function me(t){let o=j.get(t);if(o){for(let r of o)try{r()}catch(i){console.error("[onefold] Error while disposing a reactive binding:",i)}j.delete(t)}t.childNodes.forEach(me)}function H(t,o){Zt();let r=j.get(t);r||(r=new Set,j.set(t,r)),r.add(o)}var he=null;var A="\0nf_",I=/\x00nf_(\d+)\x00/g;function eo(t){return`${A}${t}\0`}function w(t,o){return t.charAt(o)}function ee(t){return parseInt(t[1]??"0",10)}function to(t,o){let r="";for(let s=0;s<t.length;s++)r+=t[s],s<o.length&&(r+=eo(s));let i=[],a=0,d=r.length;for(;a<d;){if(w(r,a)==="<"){if(r.startsWith("<!--",a)){let $=r.indexOf("-->",a+4);a=$===-1?d:$+3;continue}if(w(r,a+1)==="/"){let $=r.indexOf(">",a),L=r.slice(a+2,$).trim();i.push({kind:1,tag:L}),a=$+1;continue}let u=oo(r,a),g=w(r,u-1)==="/",m=r.slice(a+1,g?u-1:u),{tag:y,attrs:x}=ro(m,o);i.push({kind:0,tag:y});for(let $ of x)i.push($);g&&i.push({kind:1,tag:y}),a=u+1;continue}let s=r.indexOf("<",a),c=s===-1?r.slice(a):r.slice(a,s);if(a=s===-1?d:s,c.trim()||I.test(c)){I.lastIndex=0;let u=0,g;for(;(g=I.exec(c))!==null;){let y=c.slice(u,g.index);y&&i.push({kind:3,value:y}),i.push({kind:4,value:o[ee(g)]}),u=g.index+g[0].length}let m=c.slice(u);m&&m.trim()&&i.push({kind:3,value:m})}}return i}function oo(t,o){let r=null;for(let i=o+1;i<t.length;i++){let a=w(t,i);if(r)a===r&&(r=null);else if(a==='"'||a==="'")r=a;else if(a===">")return i}return t.length-1}function z(t){return t===" "||t==="	"||t===`
`||t==="\r"||t==="\f"}function ro(t,o){let r=t.search(/[\s/]/),i=r===-1?t:t.slice(0,r),a=[];if(r===-1)return{tag:i,attrs:a};let d=t.slice(r).trim();if(!d)return{tag:i,attrs:a};let s=0,c=d.length;for(;s<c;){for(;s<c&&z(w(d,s));)s++;if(s>=c)break;if(d.startsWith(A,s)){let m=d.indexOf("\0",s+A.length),y=parseInt(d.slice(s+A.length,m),10),x=o[y];if(x&&typeof x=="object")for(let[$,L]of Object.entries(x))a.push({kind:2,name:$,value:L});s=m+1;continue}let u=s;for(;s<c&&w(d,s)!=="="&&!z(w(d,s));)s++;let g=d.slice(u,s);if(!g){s++;continue}for(;s<c&&z(w(d,s));)s++;if(s>=c||w(d,s)!=="="){a.push({kind:2,name:g,value:!0});continue}for(s++;s<c&&z(w(d,s));)s++;if(d.startsWith(A,s)){let m=d.indexOf("\0",s+A.length),y=parseInt(d.slice(s+A.length,m),10);a.push({kind:2,name:g,value:o[y]}),s=m+1}else if(w(d,s)==='"'||w(d,s)==="'"){let m=w(d,s);s++;let y=s;for(;s<c&&w(d,s)!==m;)s++;let x=d.slice(y,s);s++,a.push({kind:2,name:g,value:ge(x,o)})}else{let m=s;for(;s<c&&!z(w(d,s));)s++;let y=d.slice(m,s);a.push({kind:2,name:g,value:ge(y,o)})}}return{tag:i,attrs:a}}function ge(t,o){I.lastIndex=0;let r=I.exec(t);if(!r)return t;if(r.index===0&&r[0].length===t.length)return o[ee(r)];I.lastIndex=0;let i=[],a=0,d;for(;(d=I.exec(t))!==null;){d.index>a&&i.push(t.slice(a,d.index));let s=o[ee(d)];i.push(typeof s=="function"?s:()=>s),a=d.index+d[0].length}return a<t.length&&i.push(t.slice(a)),()=>i.map(s=>typeof s=="function"?s():s).join("")}function no(t){let o=document.createDocumentFragment(),r=[o],i=o;for(let a of t)switch(a.kind){case 0:{let d=document.createElement(a.tag);i.appendChild(d),r.push(d),i=d;break}case 1:{r.pop(),i=r.length>0?r[r.length-1]:o;break}case 2:{io(i,a.name,a.value);break}case 3:{i.appendChild(document.createTextNode(a.value));break}case 4:{fe(i,a.value);break}}return o.childNodes.length===1&&o.firstChild instanceof HTMLElement?o.firstChild:o}function io(t,o,r){if(o==="ref"){typeof r=="function"&&r(t);return}if(o==="class"){W(r,i=>ao(t,i),t);return}if(o==="style"){W(r,i=>{typeof i=="string"?t.style.cssText=i:Object.assign(t.style,i??{})},t);return}if(F(o)&&typeof r=="function"){t.addEventListener(o.slice(2).toLowerCase(),r);return}if(o.startsWith("d-")){let i=ue(o.slice(2));i?W(r,a=>i(t,a),t):console.warn(`[onefold] No directive registered for "${o}". Call registerDirective() first.`);return}W(r,i=>so(t,o,i),t)}function W(t,o,r){if(typeof t=="function"){let i=R(()=>o(t()));H(r,i)}else o(t)}function ao(t,o){o?typeof o=="string"?t.className=o:typeof o=="object"&&(t.className=Object.entries(o).filter(([,r])=>r).map(([r])=>r).join(" ")):t.className=""}function so(t,o,r){if(r===!1||r==null){t.removeAttribute(o);return}if(r===!0){t.setAttribute(o,"");return}let i=String(r);if(F(o)){console.warn(`[onefold] Blocked string event handler "${o}". Use a function instead.`);return}if((o==="href"||o==="src"||o==="action"||o==="formaction"||o==="xlink:href")&&J(i)){console.warn(`[onefold] Blocked unsafe "${o}" value:`,i),t.removeAttribute(o);return}if(o==="value"&&"value"in t){t.value=i;return}if(o==="checked"&&t instanceof HTMLInputElement){t.checked=r===!0||i==="true"||i==="";return}if(o==="selected"&&t instanceof HTMLOptionElement){t.selected=r===!0||i==="true"||i==="";return}t.setAttribute(o,i)}function fe(t,o){if(!(o==null||o===!1||o===!0)){if(o instanceof Node){t.appendChild(o);return}if(Array.isArray(o)){for(let r of o)fe(t,r);return}if(typeof o=="function"){let r=document.createComment("expr-start"),i=document.createComment("expr-end");t.appendChild(r),t.appendChild(i);let a=R(()=>{let d=o(),s=r.parentNode;if(!s)return;let c=r.nextSibling;for(;c&&c!==i;){let g=c.nextSibling;s.removeChild(c),c=g}let u=ve(d);s.insertBefore(u,i)});H(t,a);return}if(X(o)){let r=document.createElement("span");r.innerHTML=K(o.html),t.appendChild(r);return}t.appendChild(document.createTextNode(String(o)))}}function ve(t){if(t==null||t===!1||t===!0)return document.createComment("");if(t instanceof Node)return t;if(X(t)){let o=document.createElement("span");return o.innerHTML=K(t.html),o}if(Array.isArray(t)){let o=document.createDocumentFragment();for(let r of t)o.appendChild(ve(r));return o}return document.createTextNode(String(t))}function n(t,...o){if(he)return he(t,...o);let r=to(t,o);return no(r)}var lo=0,be=new Map;function co(){return`nf-${(lo++).toString(36)}`}function xe(t,o){let r=`.${o}`,i="",a=0,d=t.length;for(;a<d;){for(;a<d&&/\s/.test(t[a]);)i+=t[a],a++;if(a>=d)break;if(t[a]==="@"){let m=a;for(;a<d&&t[a]!=="{";)a++;i+=t.slice(m,a),a<d&&(i+=t[a],a++);let y=ye(t,a-1),x=y.slice(1,-1);i+=xe(x,o),i+="}",a+=y.length-1;continue}let s=a;for(;a<d&&t[a]!=="{";)a++;let c=t.slice(s,a).trim();if(!c||a>=d)break;let u=c.split(",").map(m=>(m=m.trim(),m&&(m===":root"||m===":host"?r:m.startsWith("&")?r+m.slice(1):`${r} ${m}`))).join(", ");i+=u;let g=ye(t,a);i+=g,a+=g.length}return i}function ye(t,o){if(t[o]!=="{")return"";let r=0,i=o;for(;i<t.length;){if(t[i]==="{")r++;else if(t[i]==="}"&&(r--,r===0))return t.slice(o,i+1);i++}return t.slice(o)}function po(t,o){if(typeof document>"u"||document.getElementById(o))return;let r=document.createElement("style");r.id=o,r.textContent=t,document.head.appendChild(r)}function te(t,...o){let r="";for(let c=0;c<t.length;c++)r+=t[c],c<o.length&&(r+=String(o[c]));let i=be.get(r);if(i)return i;let a=co(),d=xe(r,a);po(d,`style-${a}`);let s={scope:a,css:d};return be.set(r,s),s}var B=null,q=null;function oe(t){t.hash!==void 0&&(q=t.hash)}function re(){return q===null&&(q=typeof window<"u"&&window.location.protocol==="file:"),q}function we(){return typeof window>"u"?"/":re()?window.location.hash.slice(1)||"/":window.location.pathname}function ne(){if(B)return B;if(B=b(we()),typeof window<"u"){let t=re()?"hashchange":"popstate";window.addEventListener(t,()=>B.set(we()))}return B}function S(t){if(typeof window>"u")return;let o=ne();re()?(window.location.hash=t,o.set(t)):(window.history.pushState({},"",t),o.set(t))}function N(){return ne()()}function uo(t,o){let r=t.split("/"),i=o.split("/");if(r.length!==i.length)return null;let a={};for(let d=0;d<r.length;d++){let s=r[d],c=i[d];if(s.startsWith(":"))try{a[s.slice(1)]=decodeURIComponent(c)}catch{a[s.slice(1)]=c}else if(s!==c)return null}return a}function mo(t,o){if(t==="/")return{};let r=t.split("/").filter(Boolean),i=o.split("/").filter(Boolean);if(i.length<r.length)return null;let a={};for(let d=0;d<r.length;d++){let s=r[d],c=i[d];if(s.startsWith(":"))try{a[s.slice(1)]=decodeURIComponent(c)}catch{a[s.slice(1)]=c}else if(s!==c)return null}return a}function Se(t,o,r,i=""){for(let a of t){let d=ho(i,a.path);if(a.children&&a.children.length>0){let s=mo(d,o);if(s!==null){let u=Se(a.children,o,r,d)??r();return a.view(s,u)}}else{let s=uo(d,o);if(s!==null)return a.view(s)}}return null}function ho(t,o){if(!t||t==="/")return o;if(o==="/")return t;let r=t.endsWith("/")?t.slice(0,-1):t,i=o.startsWith("/")?o:"/"+o;return r+i}function ie(t,o){let r=ne(),i=document.createElement("div"),a=R(()=>{let d=r(),s=null;if(Array.isArray(t))s=Se(t,d,o,"");else{let c=t[d];c&&(s=c())}i.textContent="",i.appendChild(s??o())});return H(i,a),i}var T=[{title:"Get Started",links:[{label:"Introduction",path:"/"},{label:"Installation",path:"/getting-started/install"},{label:"Quick Start",path:"/getting-started/quickstart"}]},{title:"Fundamentals",links:[{label:"Signals (Reactivity)",path:"/core/signals"},{label:"Templates (html)",path:"/core/templates"},{label:"Mounting (mount)",path:"/core/mounting"},{label:"Scoped CSS (css)",path:"/core/css"}]},{title:"UI & Styling",links:[{label:"Theming",path:"/theming"},{label:"Transitions",path:"/transitions"},{label:"Accessibility",path:"/a11y"}]},{title:"Routing",links:[{label:"Router",path:"/routing/router"},{label:"configureRouter",path:"/routing/configure"},{label:"Nested Routes",path:"/routing/nested"},{label:"Dynamic Params",path:"/routing/params"},{label:"Navigate",path:"/routing/navigate"},{label:"Link",path:"/routing/link"}]},{title:"State Management",links:[{label:"Store",path:"/state/store"},{label:"Persisted Signals",path:"/state/persisted"},{label:"Dependency Injection",path:"/di"}]},{title:"Data Fetching",links:[{label:"Resource",path:"/data/resource"},{label:"HTTP Client",path:"/data/http-client"},{label:"Interceptors",path:"/data/interceptors"}]},{title:"Forms",links:[{label:"createForm",path:"/forms/create-form"},{label:"Validation Rules",path:"/forms/validation"}]},{title:"Real-time",links:[{label:"WebSocket",path:"/streaming/websocket"},{label:"Server-Sent Events",path:"/streaming/sse"}]},{title:"Async Patterns",links:[{label:"Suspense",path:"/async/suspense"},{label:"Lazy Loading",path:"/async/lazy-loading"},{label:"Error Boundaries",path:"/async/error-boundaries"}]},{title:"Security",links:[{label:"XSS Prevention",path:"/security/xss"},{label:"RBAC Guards",path:"/security/guards"}]},{title:"Performance",links:[{label:"VirtualList",path:"/performance/virtual-list"},{label:"Code Splitting",path:"/performance/code-splitting"}]},{title:"Server-Side Rendering",links:[{label:"renderHTML",path:"/ssr"}]},{title:"Internationalization",links:[{label:"i18n",path:"/i18n"}]},{title:"Microfrontends",links:[{label:"loadRemote",path:"/microfrontends/load-remote"},{label:"Isolation Modes",path:"/microfrontends/isolation"},{label:"Communication",path:"/microfrontends/communication"},{label:"configureSecurity",path:"/microfrontends/security"},{label:"SRI Integrity",path:"/microfrontends/sri"},{label:"Shared Dependencies",path:"/microfrontends/shared-deps"},{label:"Cross-Framework",path:"/microfrontends/cross-framework"},{label:"Deployment",path:"/microfrontends/deployment"},{label:"API Reference",path:"/microfrontends/api-reference"}]},{title:"Interop",links:[{label:"wrapImperative",path:"/interop/wrap-imperative"},{label:"embedForeign",path:"/interop/embed-foreign"}]},{title:"Plugins & Observability",links:[{label:"Plugins",path:"/plugins"},{label:"Observability",path:"/observability"},{label:"Component Metadata",path:"/meta"}]},{title:"Tooling",links:[{label:"CLI (create-onefold)",path:"/cli"},{label:"DevTools",path:"/devtools"},{label:"Extensions",path:"/extensions"},{label:"Utilities",path:"/utilities"}]},{title:"Deployment",links:[{label:"GitHub Pages",path:"/deployment/github-pages"},{label:"Vercel",path:"/deployment/vercel"},{label:"Netlify",path:"/deployment/netlify"},{label:"Cloudflare Pages",path:"/deployment/cloudflare"},{label:"AWS S3 + CloudFront",path:"/deployment/aws"},{label:"Docker / Node",path:"/deployment/docker"}]},{title:"Playground",links:[{label:"Live Editor",path:"/playground"}]}];function P(t){let o=document.createElement("div");return o.innerHTML=t,o.firstElementChild??document.createComment("svg-empty")}var ke=()=>P(`<svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect y="3" width="20" height="2" rx="1"/>
    <rect y="9" width="20" height="2" rx="1"/>
    <rect y="15" width="20" height="2" rx="1"/>
  </svg>`),$e=()=>P(`<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242.156a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z"/>
  </svg>`),Ce=()=>P(`<svg width="32" height="32" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
    <polygon points="83.8,39.8 108,64 64,108 20,64 44.2,39.8" fill="#4338CA"/>
    <polygon points="83.8,39.8 44.2,39.8 64,59.6" fill="#818CF8"/>
  </svg>`),Pe=()=>P(`<svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 2l10 6-10 6V2z"/>
  </svg>`),Re=()=>P(`<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1h5v2H3.414L6.707 6.293l-1.414 1.414L2 4.414V7H0V1h1zm14 0h-5v2h2.586L9.293 6.293l1.414 1.414L14 4.414V7h2V1h-1zM1 15h5v-2H3.414l3.293-3.293-1.414-1.414L2 11.586V9H0v6h1zm14 0h-5v-2h2.586l-3.293-3.293 1.414-1.414L14 11.586V9h2v6h-1z"/>
  </svg>`),Te=()=>P(`<svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 1v4H1v2h5a1 1 0 001-1V1H5zm6 0v5a1 1 0 001 1h5V5h-4V1h-2zM1 9v2h4v4h2v-5a1 1 0 00-1-1H1zm9 0a1 1 0 00-1 1v5h2v-4h4V9h-5z"/>
  </svg>`);function Ae(){let t=b(new Set(["Get Started"]));R(()=>{let i=N();for(let a of T)for(let d of a.links)if(d.path===i){t.set(s=>{let c=new Set(s);return c.add(a.title),c});return}});let o=i=>{t.set(a=>{let d=new Set(a);return d.has(i)?d.delete(i):d.add(i),d})},r=i=>{S(i),document.getElementById("sidebar")?.classList.remove("open"),document.getElementById("overlay")?.classList.remove("open")};return n`
    <aside id="sidebar" class="sidebar">
      <div class="sidebar-logo">
        ${Ce()}
        <span class="wordmark">one<span>fold</span></span>
        <span class="version">v0.1.6</span>
      </div>
      <nav class="sidebar-nav">
        ${()=>T.map(i=>n`
          <div class=${()=>"sidebar-section"+(t().has(i.title)?"":" collapsed")}>
            <div class="sidebar-section-title" onclick=${()=>o(i.title)}>
              ${i.title}
              <span class="arrow">▼</span>
            </div>
            <ul class="sidebar-links">
              ${i.links.map(a=>n`
                <li>
                  <a class=${()=>"sidebar-link"+(N()===a.path?" active":"")}
                     onclick=${()=>r(a.path)}>
                    ${a.label}
                  </a>
                </li>
              `)}
            </ul>
          </div>
        `)}
      </nav>
    </aside>
  `}function Ie(){let t=b(""),o=b(!1),r=T.flatMap(c=>c.links.map(u=>({...u,section:c.title}))),i=()=>{let c=t().toLowerCase().trim();return c?r.filter(u=>u.label.toLowerCase().includes(c)||u.section.toLowerCase().includes(c)).slice(0,10):[]},a=c=>{t.set(c.target.value),o.set(t().trim().length>0)},d=c=>{S(c),t.set(""),o.set(!1)};return n`
    <header class="header">
      <div class="header-left">
        <button class="sidebar-toggle" onclick=${()=>{document.getElementById("sidebar")?.classList.toggle("open"),document.getElementById("overlay")?.classList.toggle("open")}} aria-label="Toggle menu">
          ${ke()}
        </button>
        <div class="search">
          <span class="s-icon">${$e()}</span>
          <input
            type="text"
            placeholder="Search docs..."
            oninput=${a}
            onfocus=${()=>{t().trim()&&o.set(!0)}}
            onblur=${()=>setTimeout(()=>o.set(!1),200)}
          />
          <div class=${()=>"search-results"+(o()&&i().length>0?" visible":"")}>
            ${()=>i().map(c=>n`
              <div class="search-result" onclick=${()=>d(c.path)}>
                <span style="font-size:10px;text-transform:uppercase;color:var(--accent);letter-spacing:0.05em">${c.section}</span><br/>
                ${c.label}
              </div>
            `)}
          </div>
        </div>
      </div>
      <div class="header-actions">
        <a href="#/playground" class="playground-link" onclick=${c=>{c.preventDefault(),S("/playground")}}>▶ Play</a>
        <a href="https://discord.gg/4WUXzGgan" target="_blank">Discord</a>
        <a href="https://github.com/onefoldjs/onefold" target="_blank">GitHub</a>
        <a href="https://www.npmjs.com/package/onefold" target="_blank">npm</a>
      </div>
    </header>
  `}function Ee(){let t=new Map;for(let i of T)for(let a of i.links)t.set(a.path,{section:i.title,label:a.label});let o=new Map;for(let i of T)i.links.length>0&&o.set(i.title,i.links[0].path);let r=i=>a=>{a.preventDefault(),S(i)};return n`
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      ${()=>{let i=N(),a=t.get(i);if(i==="/")return document.createTextNode("");let d=[];if(d.push(n`<a class="breadcrumb-link" href="/" onclick=${r("/")}>Home</a>`),d.push(n`<span class="breadcrumb-sep" aria-hidden="true">/</span>`),a){let c=o.get(a.section)??"/";c!==i&&(d.push(n`<a class="breadcrumb-link" href="${c}" onclick=${r(c)}>${a.section}</a>`),d.push(n`<span class="breadcrumb-sep" aria-hidden="true">/</span>`)),d.push(n`<span class="breadcrumb-current" aria-current="page">${a.label}</span>`)}else{let c=i.split("/").filter(Boolean),u=c[c.length-1]??"Page";d.push(n`<span class="breadcrumb-current" aria-current="page">${u}</span>`)}let s=document.createDocumentFragment();for(let c of d)s.appendChild(c);return s}}
    </nav>
  `}function Ne(t){return n`
    <div class="overlay" id="overlay"></div>
    <div class="app-shell">
      ${Ae()}
      ${Ie()}
      <main class="content">
        ${Ee()}
        ${t}
      </main>
    </div>
  `}function Le(t,o){let r=new Map(Object.entries(t)),i=o??document;function a(s){let c=[];(s.ctrlKey||s.metaKey)&&c.push("Ctrl"),s.shiftKey&&c.push("Shift"),s.altKey&&c.push("Alt");let u=s.key.length===1?s.key.toUpperCase():s.key;return c.push(u),c.join("+")}function d(s){let c=a(s),u=r.get(c);u&&(s.preventDefault(),u(s))}return i.addEventListener("keydown",d),{destroy:()=>i.removeEventListener("keydown",d),add:(s,c)=>r.set(s,c),remove:s=>r.delete(s)}}function go(t){return t.replace(/^(export\s+)?(interface|type)\s+\w+[^]*?\n\}/gm,"").replace(/\)\s*:\s*[A-Za-z<>\[\]|&\s,]+\s*\{/g,") {").replace(/\)\s*:\s*[A-Za-z<>\[\]|&\s,]+\s*=>/g,") =>").replace(/(const|let|var)\s+(\w+)\s*:\s*[A-Za-z<>\[\]|&\s,]+\s*=/g,"$1 $2 =").replace(/(\w)\s*:\s*(?:[A-Z]\w*(?:<[^>]*>)?(?:\[\])?|string|number|boolean|void|any|unknown|never)(\s*[,)=])/g,"$1$2").replace(/(\w)<[^>]+>\(/g,"$1(").replace(/\s+as\s+[A-Z]\w*(?:<[^>]*>)?/g,"").replace(/\n{3,}/g,`

`)}function p(t,o="Live Example",r){let i={allowStorage:!1,allowNetwork:!1,height:300,autoRun:!0,hideEditor:!1,...r},a=["allow-scripts"];i.allowStorage&&a.push("allow-same-origin"),i.allowNetwork&&a.push("allow-same-origin");let d=[...new Set(a)].join(" "),s=b(t.trim()),c=b(null),u=b("result"),g=b([]),m=b(t.trim().split(`
`).length),y=b(!1),x=b(!1),$=()=>{x.set(h=>!h),document.body.style.overflow=x()?"hidden":""};Le({Escape:()=>{x()&&(x.set(!1),document.body.style.overflow="")},"Ctrl+Enter":()=>D()});let L=h=>{let C=go(h).replace(/^\s*import\s+\{[^}]*\}\s+from\s+['"][^'"]*['"];?\s*$/gm,"");return['<!DOCTYPE html><html><head><meta charset="utf-8">',"<style>","* { box-sizing: border-box; margin: 0; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }","body { padding: 12px; font-size: 14px; line-height: 1.6; color: #1a1a2e; }","button { padding: 6px 12px; border-radius: 4px; border: 1px solid #e5e7eb; cursor: pointer; margin: 4px 4px 4px 0; background: #fff; }","button:hover { background: #f3f4f6; }","h1,h2,h3 { margin-bottom: 8px; }","p { margin-bottom: 8px; }","input,textarea,select { padding: 6px 10px; border: 1px solid #e5e7eb; border-radius: 4px; margin: 4px 0; font-size: 14px; }","ul,ol { padding-left: 20px; }","li { margin: 4px 0; }",".error { color: #dc2626; font-family: monospace; font-size: 12px; white-space: pre-wrap; padding: 8px; background: #fef2f2; border-radius: 4px; }","</style></head><body>",'<div id="app"></div>','<script type="module">',"","// localStorage/sessionStorage polyfill for sandboxed iframe","(function() {","  function createMemoryStorage() {","    const store = new Map();","    return {","      getItem(k) { return store.has(k) ? store.get(k) : null; },","      setItem(k, v) { store.set(k, String(v)); },","      removeItem(k) { store.delete(k); },","      clear() { store.clear(); },","      get length() { return store.size; },","      key(i) { return [...store.keys()][i] || null; },","    };","  }",'  try { localStorage.setItem("__test__","1"); localStorage.removeItem("__test__"); }',"  catch(e) {",'    Object.defineProperty(window, "localStorage", { value: createMemoryStorage(), writable: false });','    Object.defineProperty(window, "sessionStorage", { value: createMemoryStorage(), writable: false });',"  }","})();","","// Load the full onefold library from CDN",'import * as onefold from "https://cdn.jsdelivr.net/npm/onefold@latest/dist/onefold.full.min.js";',"","// Expose all APIs as globals for playground code","const { createSignal, createEffect, createComputed, batch, html, mount, css, cssValue,","  Router, navigate, currentRoute, Link, configureRouter,","  createStore, createResource, lazy, ErrorBoundary,","  createToken, provide, inject, tryInject, runWithProviders,","  VirtualList, Suspense, SuspenseAll, Transition, animateEnter, animateLeave,","  createForm, required, email, minLength, maxLength, pattern, min, max, custom,","  createHttpClient, createI18n, createPersisted, localStorageAdapter, sessionStorageAdapter,","  createTheme, setPermissions, getPermissions, hasPermission, guard, guardedNode,","  createObserver, createPluginHost, createWebSocket, createEventSource,","  FocusTrap, announce, useKeyboard, SkipLink,","  wrapImperative, embedForeign, setEffectHook, registerDirective,","  loadRemote, configureSecurity, preloadRemote, clearRemoteCache,","  component, getComponentRegistry, getComponentMeta, exportManifest, enableDevtools, disableDevtools,","  renderHTML, raw,","  formatDate, timeAgo, formatCurrency, formatNumber, truncate, slugify, pluralize, capitalize, debounce, throttle, pipe","} = onefold;","","// Console capture","const _logs = [];","const _origLog = console.log;",'console.log = (...a) => { _logs.push(a.map(x => typeof x === "object" ? JSON.stringify(x,null,2) : String(x)).join(" ")); _origLog(...a); window.parent.postMessage({type:"pg-log",logs:[..._logs]},"*"); };','console.warn = (...a) => console.log("[warn]", ...a);','console.error = (...a) => console.log("[error]", ...a);',"","const CODE = "+JSON.stringify(C).replace(/<\/script/gi,"<\\/script")+";","","try {","  const fn = new Function(",'    "createSignal","createEffect","createComputed","batch","html","mount","css","cssValue",','    "Router","navigate","currentRoute","Link","configureRouter",','    "createStore","createResource","lazy","ErrorBoundary",','    "createToken","provide","inject","tryInject","runWithProviders",','    "VirtualList","Suspense","SuspenseAll","Transition","animateEnter","animateLeave",','    "createForm","required","email","minLength","maxLength","pattern","min","max","custom",','    "createHttpClient","createI18n","createPersisted","localStorageAdapter","sessionStorageAdapter",','    "createTheme","setPermissions","getPermissions","hasPermission","guard","guardedNode",','    "createObserver","createPluginHost","createWebSocket","createEventSource",','    "FocusTrap","announce","useKeyboard","SkipLink",','    "wrapImperative","embedForeign","setEffectHook","registerDirective",','    "loadRemote","configureSecurity","preloadRemote","clearRemoteCache",','    "component","getComponentRegistry","getComponentMeta","exportManifest","enableDevtools","disableDevtools",','    "renderHTML","raw",','    "formatDate","timeAgo","formatCurrency","formatNumber","truncate","slugify","pluralize","capitalize","debounce","throttle","pipe",','    CODE + "\\n\\n" +','    "if (typeof App===\\"function\\") mount(App(), document.getElementById(\\"app\\"));\\n" +','    "else if (typeof Counter===\\"function\\") mount(Counter(), document.getElementById(\\"app\\"));\\n" +','    "else if (typeof Main===\\"function\\") mount(Main(), document.getElementById(\\"app\\"));\\n" +','    "else if (typeof Todo===\\"function\\") mount(Todo(), document.getElementById(\\"app\\"));\\n"',"  );","  fn(","    createSignal, createEffect, createComputed, batch, html, mount, css, cssValue,","    Router, navigate, currentRoute, Link, configureRouter,","    createStore, createResource, lazy, ErrorBoundary,","    createToken, provide, inject, tryInject, runWithProviders,","    VirtualList, Suspense, SuspenseAll, Transition, animateEnter, animateLeave,","    createForm, required, email, minLength, maxLength, pattern, min, max, custom,","    createHttpClient, createI18n, createPersisted, localStorageAdapter, sessionStorageAdapter,","    createTheme, setPermissions, getPermissions, hasPermission, guard, guardedNode,","    createObserver, createPluginHost, createWebSocket, createEventSource,","    FocusTrap, announce, useKeyboard, SkipLink,","    wrapImperative, embedForeign, setEffectHook, registerDirective,","    loadRemote, configureSecurity, preloadRemote, clearRemoteCache,","    component, getComponentRegistry, getComponentMeta, exportManifest, enableDevtools, disableDevtools,","    renderHTML, raw,","    formatDate, timeAgo, formatCurrency, formatNumber, truncate, slugify, pluralize, capitalize, debounce, throttle, pipe","  );",'  window.parent.postMessage({type:"pg-ready"},"*");',"} catch(e) {",`  document.getElementById("app").innerHTML = '<div class="error">' + e.message + '</div>';`,'  window.parent.postMessage({type:"pg-log",logs:["[error] " + e.message]},"*");',"}","<\/script></body></html>"].join(`
`)},D=()=>{let h=c();h&&(y.set(!0),g.set([]),h.srcdoc=L(s()),setTimeout(()=>y.set(!1),300))},_=null,le=()=>{i.autoRun&&(_&&clearTimeout(_),_=setTimeout(D,800))},Ut=h=>{let v=h.target.value;s.set(v),m.set(v.split(`
`).length),le()},Ft=h=>{if(h.key==="Tab"){h.preventDefault();let v=h.target,C=v.selectionStart,M=v.selectionEnd;v.value=v.value.substring(0,C)+"  "+v.value.substring(M),v.selectionStart=v.selectionEnd=C+2,s.set(v.value),m.set(v.value.split(`
`).length),le()}},jt=h=>{let v=h.target,C=v.previousElementSibling;C&&(C.scrollTop=v.scrollTop)},Wt=()=>{s.set(t.trim()),m.set(t.trim().split(`
`).length);let h=document.querySelector(".playground-editor");h&&(h.value=t.trim()),D()};typeof window<"u"&&window.addEventListener("message",h=>{h.data?.type==="pg-log"&&g.set(h.data.logs??[])});let qt=h=>{let v=!1,C=0,M=0;h.addEventListener("mousedown",O=>{v=!0,C=O.clientX,M=h.previousElementSibling.getBoundingClientRect().width,document.body.style.cursor="col-resize",document.body.style.userSelect="none",O.preventDefault()}),document.addEventListener("mousemove",O=>{if(!v)return;let de=h.parentElement,_t=de.getBoundingClientRect().width-120,Vt=Math.max(120,Math.min(_t,M+(O.clientX-C)))/de.getBoundingClientRect().width*100;h.previousElementSibling.style.cssText=`flex:none;width:${Vt}%;min-width:120px`,h.nextElementSibling.style.flex="1"}),document.addEventListener("mouseup",()=>{v&&(v=!1,document.body.style.cursor="",document.body.style.userSelect="")})};return i.autoRun&&setTimeout(D,200),n`
    <div class=${()=>"playground"+(x()?" playground-fullscreen":"")}>
      <div class="playground-toolbar">
        <div class="playground-toolbar-left">
          <span class="playground-title">${o}</span>
        </div>
        <div class="playground-toolbar-right">
          <button class="pg-btn pg-btn-run" onclick=${D}>
            ${Pe()}
            Run
          </button>
          ${i.hideEditor?null:n`<button class="pg-btn" onclick=${Wt}>Reset</button>`}
          <button class="pg-btn" onclick=${$} title="Toggle fullscreen (Esc to exit)">
            ${()=>x()?Te():Re()}
          </button>
        </div>
      </div>
      <div class="playground-body" style=${{height:i.hideEditor?`${i.height}px`:void 0}}>
        ${i.hideEditor?null:n`
          <div class="playground-left">
            <div class="pg-gutter">${()=>Array.from({length:m()},(h,v)=>n`<div class="pg-line-num">${String(v+1)}</div>`)}</div>
            <textarea
              class="playground-editor"
              oninput=${Ut}
              onkeydown=${Ft}
              onscroll=${jt}
              spellcheck="false"
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
            >${t.trim()}</textarea>
          </div>
          <div class="playground-divider" ref=${h=>qt(h)}></div>
        `}
        <div class=${i.hideEditor?"playground-right playground-full-width":"playground-right"}>
          <div class="pg-tabs">
            <button class=${()=>"pg-tab"+(u()==="result"?" active":"")} onclick=${()=>u.set("result")}>Result</button>
            <button class=${()=>"pg-tab"+(u()==="console"?" active":"")} onclick=${()=>u.set("console")}>
              Console${()=>g().length>0?n`<span class="pg-tab-badge">${String(g().length)}</span>`:""}
            </button>
          </div>
          <div class="pg-output-result" style=${()=>({display:u()==="result"?"":"none",height:`${i.height}px`})}>
            <iframe
              ref=${h=>c.set(h)}
              sandbox=${d}
            ></iframe>
          </div>
          <div class="pg-output-console" style=${()=>u()==="console"?"":"display:none"}>
            ${()=>g().length===0?n`<div class="pg-console-empty">No output. Run the code to see console.log results.</div>`:n`<div class="pg-console-entries">${g().map(h=>n`<div class="pg-console-line"><span class="pg-console-chevron">${">"}</span> ${h}</div>`)}</div>`}
          </div>
        </div>
      </div>
    </div>
  `}var fo=()=>P(`<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"/>
    <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"/>
  </svg>`),vo=()=>P(`<svg width="14" height="14" viewBox="0 0 16 16" fill="#16a34a" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
  </svg>`);function e(t,o="ts"){let r=b(!1);return n`
    <div class="code-block-wrapper">
      <button class="code-copy-btn" onclick=${()=>{navigator.clipboard.writeText(t).then(()=>{r.set(!0),setTimeout(()=>r.set(!1),2e3)}).catch(()=>{let a=document.createElement("textarea");a.value=t,a.style.position="fixed",a.style.opacity="0",document.body.appendChild(a),a.select(),document.execCommand("copy"),document.body.removeChild(a),r.set(!0),setTimeout(()=>r.set(!1),2e3)})}} title="Copy to clipboard">
        ${()=>r()?vo():fo()}
        ${()=>r()?"Copied!":""}
      </button>
      <pre><code>${t}</code></pre>
    </div>
  `}function l(t,o="info"){return n`<div class=${o==="warn"?"callout callout-warn":o==="danger"?"callout callout-danger":"callout"}><p>${t}</p></div>`}function De(){return n`
    <div>
      <div style="text-align:center;margin-bottom:32px">
        <img src="./images/logo.svg" alt="onefold" width="96" height="96" style="display:inline-block;margin-bottom:12px" />
        <h1 style="margin-bottom:4px">onefold</h1>
        <p style="font-size:18px;color:var(--muted);max-width:600px;margin:0 auto">A modern lightweight UI reactive framework for building everything from simple websites to enterprise-scale web applications. Signals, routing, forms, i18n, microfrontend security — no virtual DOM, no compiler, no dependencies.</p>
      </div>

      <div class="hero-stats">
        <div class="hero-stat"><span class="val">~6kb</span><span class="lbl">Core (gzipped)</span></div>
        <div class="hero-stat"><span class="val">0</span><span class="lbl">Dependencies</span></div>
        <div class="hero-stat"><span class="val">TypeScript</span><span class="lbl">First-class</span></div>
        <div class="hero-stat"><span class="val">ES2022</span><span class="lbl">Target</span></div>
      </div>

      <h2>Get Started in Seconds</h2>
      ${e(`npm create onefold@latest my-app
cd my-app
npm install
npm run dev`)}

      <h2>Why onefold?</h2>

      <h3>Fine-grained Reactivity</h3>
      <p>Each signal update touches only the exact DOM node that depends on it. No virtual DOM diffing. No tree reconciliation. Updates are O(1) per change.</p>

      <h3>Secure by Default</h3>
      <p>Text interpolation always goes through <code>textContent</code>, never <code>innerHTML</code>. XSS from dynamic data is structurally impossible. Event handler strings are blocked. URL schemes are validated. Trusted Types integration for CSP compliance.</p>

      <h3>Complete Toolkit</h3>
      <p>Everything ships in one package — no decision fatigue, no version mismatches between 10 npm packages:</p>
      <ul>
        <li>Routing (nested, dynamic params, programmatic navigation)</li>
        <li>State management (store, persisted signals, DI)</li>
        <li>Forms with validation (8 built-in rules)</li>
        <li>HTTP client with interceptor pipeline</li>
        <li>Internationalization (reactive locale switching)</li>
        <li>Theming (CSS custom properties)</li>
        <li>Microfrontend security (SRI, Shadow DOM, iframe sandbox)</li>
        <li>Streaming (WebSocket, SSE — reactive)</li>
        <li>SSR (renderHTML — zero dependencies, no jsdom)</li>
      </ul>

      <h3>No Compiler Required</h3>
      <p>No JSX transform, no Babel plugin, no Vite config. The <code>html</code> tagged template works at runtime with any bundler — or no bundler at all. Drop a ${f('<code>&lt;script type="module"&gt;</code>')} and go.</p>

      <h3>TypeScript-First</h3>
      <p>Built under <code>strict: true</code> with <code>noUncheckedIndexedAccess</code>. Full type inference. Illegal states fail at compile time, not at runtime.</p>

      ${l("onefold is what you get when you take a fine-grained signal engine, remove the compiler requirement, and ship the entire application toolkit in one package with enterprise security built into the foundation.")}

      <h2>Quick Example</h2>

      <h3>Static rendering</h3>
      <p>The <code>html</code> tagged template creates real DOM nodes. No compilation step — this is runtime code:</p>

      ${p(`import { html, mount } from 'onefold';

// Static \u2014 no signals, just HTML
const welcome = html\`
  <div style="text-align:center">
    <h1>Welcome to onefold!</h1>
    <p>Edit this code and click Run.</p>
    <p>No build step. No compiler. Just tagged templates.</p>
  </div>
\`;

mount(welcome, document.getElementById('app'));`,"Static Rendering")}

      <h3>Dynamic rendering (reactive)</h3>
      <p>Wrap values in ${f("<code>() =&gt;</code>")} to make them reactive. The framework tracks which DOM node reads which signal and updates only that node when the signal changes:</p>

      ${p(`import { createSignal, createComputed, html, mount } from 'onefold';

function Counter() {
  const count = createSignal(0);
  const double = createComputed(() => count() * 2);

  return html\`
    <div style="text-align:center">
      <h2>Count: \${() => count()}</h2>
      <p>Double: \${() => double()}</p>
      <div style="display:flex;gap:8px;justify-content:center">
        <button onclick=\${() => count.set(n => n - 1)}>-</button>
        <button onclick=\${() => count.set(n => n + 1)}>+</button>
        <button onclick=\${() => count.set(0)}>Reset</button>
      </div>
    </div>
  \`;
}

mount(Counter(), document.getElementById('app'));`,"Signals + Computed")}

      <h2>Architecture</h2>
      <p>onefold uses fine-grained signals bound directly to real DOM nodes:</p>
      ${e(`Signal changes \u2192 Effect runs \u2192 One DOM node updates

// No virtual DOM tree
// No diffing algorithm
// No reconciliation pass
// No scheduler queue
// Just: signal.set(newValue) \u2192 that one <span> updates`)}

      <p>This is measurably faster than virtual DOM reconciliation on update-heavy workloads because it skips the diff step entirely.</p>

      <h2>What's Included</h2>
      <table>
        <tr><th>Category</th><th>Features</th></tr>
        <tr><td><strong>Core</strong></td><td>createSignal, createEffect, createComputed, batch, html, css, mount</td></tr>
        <tr><td><strong>Routing</strong></td><td>Router, nested routes, dynamic params, navigate, Link</td></tr>
        <tr><td><strong>State</strong></td><td>createStore, createPersisted, provide/inject (DI)</td></tr>
        <tr><td><strong>Data</strong></td><td>createResource, createHttpClient, interceptors</td></tr>
        <tr><td><strong>Forms</strong></td><td>createForm, required, email, minLength, maxLength, pattern, min, max, custom</td></tr>
        <tr><td><strong>Microfrontends</strong></td><td>loadRemote, configureSecurity, SRI integrity, Shadow DOM/iframe isolation</td></tr>
        <tr><td><strong>i18n</strong></td><td>createI18n, reactive locale switching, interpolation</td></tr>
        <tr><td><strong>Theming</strong></td><td>createTheme, CSS custom properties, toggle</td></tr>
        <tr><td><strong>Async</strong></td><td>Suspense, SuspenseAll, ErrorBoundary, lazy</td></tr>
        <tr><td><strong>Streaming</strong></td><td>createWebSocket, createEventSource (reactive signals)</td></tr>
        <tr><td><strong>Accessibility</strong></td><td>FocusTrap, announce, useKeyboard, SkipLink</td></tr>
        <tr><td><strong>Performance</strong></td><td>VirtualList (windowed rendering), code splitting</td></tr>
        <tr><td><strong>Interop</strong></td><td>wrapImperative (Chart.js, D3), embedForeign (React, Vue)</td></tr>
        <tr><td><strong>Security</strong></td><td>RBAC guards, XSS prevention, Trusted Types, cssValue sanitizer</td></tr>
        <tr><td><strong>SSR</strong></td><td>renderHTML (zero deps, no jsdom, ~0.5ms/page)</td></tr>
        <tr><td><strong>DevTools</strong></td><td>enableDevtools, render profiling, auto-labeling, signal tracking</td></tr>
        <tr><td><strong>Utilities</strong></td><td>formatDate, timeAgo, formatCurrency, debounce, throttle, pipe, slugify, pluralize</td></tr>
      </table>

      <h2>Comparison</h2>
      <table>
        <tr><th>Framework</th><th>Core Size (gzip)</th><th>Core Includes</th><th>Full Ecosystem</th><th>Compiler</th></tr>
        <tr><td><strong>onefold</strong></td><td><strong>~6kb</strong></td><td>Signals, html, Router, Store, CSS, DI, lazy</td><td>~16kb (forms, http, i18n, MFE, SSR, a11y...)</td><td>None</td></tr>
        <tr><td>React 19 + ReactDOM</td><td>~42kb</td><td>VDOM + reconciler</td><td>70-120kb+ (router, state, forms via npm)</td><td>JSX transform</td></tr>
        <tr><td>Vue 3</td><td>~16-33kb</td><td>Reactivity + templates</td><td>50-80kb+ (vue-router, Pinia via npm)</td><td>SFC compiler</td></tr>
        <tr><td>SolidJS</td><td>~7kb</td><td>Signals + JSX</td><td>30-50kb+ (@solidjs/router, store via npm)</td><td>JSX + Babel plugin</td></tr>
        <tr><td>Svelte 5</td><td>~3-5kb runtime</td><td>Runes + compiled output</td><td>30-50kb+ (SvelteKit for routing, forms)</td><td>Svelte compiler (required)</td></tr>
      </table>
      <p style=${{marginTop:"12px",fontSize:"13px",color:"var(--muted)"}}>
        onefold's ~6kb core covers what most apps need. Enterprise features (forms, HTTP, i18n, microfrontends, SSR) 
        are available via sub-path imports and tree-shake independently — you only pay for what you use.
        Other frameworks require installing separate npm packages for equivalent functionality.
      </p>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/getting-started/install">Installation</a> — npm, CDN, or scaffold a project</li>
        <li><a href="/getting-started/quickstart">Quick Start</a> — build your first app in 2 minutes</li>
        <li><a href="/core/signals">Signals</a> — the reactivity primitive</li>
        <li><a href="/core/templates">Templates</a> — how to write UI with <code>html</code></li>
        <li><a href="/playground">Playground</a> — experiment with code live in the browser</li>
      </ul>
    </div>
  `}function Me(){return n`
    <div>
      <h1>Installation</h1>
      <p>Get onefold into your project.</p>

      <h2>Scaffold a New Project (Recommended)</h2>
      <p>The fastest way to start is with the official CLI:</p>
      ${e(`npm create onefold@latest my-app
cd my-app
npm install
npm run dev`)}

      <p>This creates a fully configured project with TypeScript, a dev server, and a production build script.</p>

      <h2>Add to an Existing Project</h2>
      ${e(`# npm
npm install onefold

# pnpm
pnpm add onefold

# yarn
yarn add onefold`)}

      <h2>CDN / No Bundler</h2>
      <p>Import directly from a CDN for prototyping:</p>
      ${e(`<script type="module">
  import { createSignal, html, mount } from 'https://esm.sh/onefold@latest';

  const count = createSignal(0);
  mount(
    html\`<button onclick=\${() => count.set(n => n + 1)}>
      Clicked \${() => count()} times
    </button>\`,
    document.getElementById('app')
  );
<\/script>`)}

      ${l("onefold ships as standard ES modules. No special bundler plugins or Babel transforms are needed.")}

      <h2>TypeScript Configuration</h2>
      <p>For the best experience, use strict mode in your <code>tsconfig.json</code>:</p>
      ${e(`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"]
  }
}`)}

      <h2>Requirements</h2>
      <ul>
        <li>Node.js 18+</li>
        <li>Any modern bundler (esbuild, Vite, Rollup, webpack) — or none at all</li>
        <li>Modern browser (Chrome 89+, Firefox 108+, Safari 16.4+, Edge 89+)</li>
      </ul>
    </div>
  `}function He(){return n`
    <div>
      <h1>Quick Start</h1>
      <p>Build your first onefold app in under 2 minutes.</p>

      <h2>1. Create a Project</h2>
      ${e(`npm create onefold@latest my-app
cd my-app
npm install`)}

      <h2>2. Write a Component</h2>
      <p>Open <code>src/main.ts</code> and replace its content:</p>
      ${e(`import { createSignal, html, mount } from 'onefold';

function App(): Node {
  const name = createSignal('World');

  return html\`
    <div>
      <h1>Hello, \${() => name()}!</h1>
      <input
        type="text"
        value=\${() => name()}
        oninput=\${(e: Event) => name.set((e.target as HTMLInputElement).value)}
      />
    </div>
  \`;
}

mount(App(), document.getElementById('app')!);`)}

      <h2>3. Run It</h2>
      ${e(`npm run dev
# \u2192 http://localhost:3000`)}

      <p>Type in the input — the heading updates instantly. That's reactive signals at work.</p>

      <h2>Try It Live</h2>
      ${p(`import { createSignal, html, mount } from 'onefold';

function App(): Node {
  const name = createSignal('World');

  return html\`
    <div>
      <h1>Hello, \${() => name()}!</h1>
      <input
        type="text"
        value=\${() => name()}
        oninput=\${(e) => name.set(e.target.value)}
      />
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Hello World")}

      <h2>Key Concepts</h2>
      <ul>
        <li><strong><code>createSignal(value)</code></strong> — creates a reactive value. Call it to read, call <code>.set()</code> to write.</li>
        <li><strong><code>html\`...\`</code></strong> — a tagged template that builds real DOM nodes. Wrap dynamic values in <code>() =></code> to make them reactive.</li>
        <li><strong><code>mount(node, el)</code></strong> — attaches a component tree to the page.</li>
      </ul>

      ${l("The most common mistake: forgetting the () => arrow wrapper. html`<p>${count}</p>` renders once and never updates. html`<p>${() => count()}</p>` updates every time count changes.")}

      <h2>4. Build for Production</h2>
      ${e(`npm run build     # \u2192 dist/
npm run preview   # \u2192 http://localhost:4000`)}

      <p>The production build uses esbuild — typically completes in under 50ms.</p>

      <h2>Next Steps</h2>
      <ul>
        <li>Learn about <a href="/core/signals">Signals</a> — the reactivity primitive</li>
        <li>Explore <a href="/core/templates">Templates</a> — how to write UI</li>
        <li>Add <a href="/routing/router">Routing</a> — for multi-page apps</li>
      </ul>
    </div>
  `}function ze(){return n`
    <div>
      <h1>Signals</h1>
      <p>Signals are the reactive primitive in onefold. They hold a value and automatically notify subscribers when it changes.</p>

      <h2>createSignal</h2>
      ${e(`import { createSignal } from 'onefold';

const count = createSignal(0);

count()              // read current value \u2192 0
count.set(5)         // write a new value
count.set(n => n + 1) // update from previous \u2192 6
count.peek()         // read without subscribing`)}

      <h2>createEffect</h2>
      <p>Run side effects whenever dependencies change. Dependencies are tracked automatically — any signal read inside the effect is subscribed to.</p>
      ${e(`import { createEffect } from 'onefold';

createEffect(() => {
  console.log('Count changed:', count());
});
// Logs immediately, then again on every count.set() call`)}

      <p><code>createEffect</code> returns a disposer function to stop the effect:</p>
      ${e(`const stop = createEffect(() => { /* ... */ });
stop(); // unsubscribes from all signals`)}

      <h2>createComputed</h2>
      <p>Create derived values that only recompute when their dependencies change.</p>
      ${e(`import { createComputed } from 'onefold';

const count = createSignal(3);
const double = createComputed(() => count() * 2);

double() // 6 \u2014 cached until count changes
// double.set(10) \u2192 throws Error (read-only)`)}

      <h2>batch</h2>
      <p>Group multiple signal writes into a single effect flush to avoid intermediate renders.</p>
      ${e(`import { batch } from 'onefold';

const a = createSignal(0);
const b = createSignal(0);

batch(() => {
  a.set(1);
  b.set(2);
}); // effects run once, not twice`)}

      ${l("Without batch, each set() triggers effects immediately. With batch, all sets are collected and effects fire only once at the end.")}

      <h2>Try It</h2>
      ${p(`import { createSignal, createComputed, html, mount } from 'onefold';

function App(): Node {
  const count = createSignal(0);
  const double = createComputed(() => count() * 2);

  return html\`
    <div>
      <p>Count: \${() => count()}</p>
      <p>Double: \${() => double()}</p>
      <button onclick=\${() => count.set(n => n + 1)}>+1</button>
      <button onclick=\${() => count.set(n => n - 1)}>-1</button>
      <button onclick=\${() => count.set(0)}>Reset</button>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Signals + Computed")}

      <h2>API Reference</h2>
      ${f(`<table>
        <tr><th>Function</th><th>Returns</th><th>Description</th></tr>
        <tr><td><code>createSignal(initial)</code></td><td>Signal&lt;T&gt;</td><td>Create a reactive signal</td></tr>
        <tr><td><code>signal()</code></td><td>T</td><td>Read value and subscribe</td></tr>
        <tr><td><code>signal.set(value)</code></td><td>void</td><td>Set new value, notify subscribers</td></tr>
        <tr><td><code>signal.set(fn)</code></td><td>void</td><td>Update from previous value</td></tr>
        <tr><td><code>signal.peek()</code></td><td>T</td><td>Read without subscribing</td></tr>
        <tr><td><code>createEffect(fn)</code></td><td>() =&gt; void</td><td>Side effects on dependency change</td></tr>
        <tr><td><code>createComputed(fn)</code></td><td>Signal&lt;T&gt;</td><td>Cached derived computation (read-only)</td></tr>
        <tr><td><code>batch(fn)</code></td><td>void</td><td>Group updates, single flush</td></tr>
      </table>`)}
    </div>
  `}function Be(){return n`
    <div>
      <h1>Templates (html)</h1>
      <p>The <code>html</code> tagged template literal creates real DOM nodes — no virtual DOM, no diffing. Reactive expressions (functions) are tracked and updated in place.</p>

      <h2>Basic Usage</h2>
      ${e(`import { html } from 'onefold';

// Static content
html\`<div class="card">Hello World</div>\`

// Reactive text
html\`<span>\${() => count()}</span>\`

// Reactive attributes
html\`<div class=\${() => active() ? 'active' : ''}> ... </div>\`

// Static attributes
html\`<div class=\${cls}> ... </div>\``)}

      <h2>Styles</h2>
      ${e(`// Style as string
html\`<div style="color: red; font-size: 16px;">...</div>\`

// Style as object (reactive-friendly)
html\`<div style=\${{ color: 'red', fontSize: '16px' }}>...</div>\``)}

      <h2>Events</h2>
      ${e("// Inline handler\nhtml`<button onclick=${() => count.set(n => n + 1)}>Click</button>`\n\n// Named handler\nconst handleClick = (e: Event) => { /* ... */ };\nhtml`<button onclick=${handleClick}>Click</button>`")}

      <h2>Reactive Lists</h2>
      ${e("const items = createSignal(['Apple', 'Banana', 'Cherry']);\n\nhtml`<ul>\n  ${() => items().map(item => html`<li>${item}</li>`)}\n</ul>`")}

      ${l("The key pattern: wrap dynamic values in () => to make them reactive. Without the arrow, the value is captured once and never updates.")}

      <h2>Two-Way Input Binding</h2>
      <p>Bind a signal to an input's value so the DOM stays in sync when the signal resets:</p>
      ${e(`const name = createSignal('');

html\`<input
  value=\${() => name()}
  oninput=\${(e: Event) => name.set((e.target as HTMLInputElement).value)}
/>\`

// Clearing the signal visually clears the input:
name.set('');`)}

      <h2>Refs</h2>
      <p>Access the underlying DOM element after it's created:</p>
      ${e("html`<input ref=${(el) => el.focus()} />`")}

      <h2>Directives</h2>
      <p>Use registered directives with the <code>d-</code> prefix:</p>
      ${e(`// Register once
registerDirective('tooltip', (el, value) => { /* ... */ });

// Use in templates
html\`<button d-tooltip="Save changes">Save</button>\``)}

      <h2>Conditional Rendering</h2>
      ${e('html`<div>\n  ${() => loggedIn()\n    ? html`<span>Welcome, ${() => user().name}</span>`\n    : html`<a href="/login">Sign in</a>`\n  }\n</div>`')}

      <h2>Try It</h2>
      ${p(`import { createSignal, html, mount } from 'onefold';

function App(): Node {
  const items = createSignal(['Apple', 'Banana', 'Cherry']);
  const newItem = createSignal('');

  const addItem = () => {
    if (newItem().trim()) {
      items.set(prev => [...prev, newItem()]);
      newItem.set('');
    }
  };

  return html\`
    <div>
      <h3>Shopping List</h3>
      <ul>\${() => items().map(item => html\`<li>\${item}</li>\`)}</ul>
      <input
        placeholder="Add item..."
        oninput=\${(e) => newItem.set(e.target.value)}
        value=\${() => newItem()}
      />
      <button onclick=\${addItem}>Add</button>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Reactive List")}
    </div>
  `}function Oe(){return n`
    <div>
      <h1>Scoped CSS (css)</h1>
      <p>The <code>css</code> tagged template creates scoped stylesheets. Selectors are automatically prefixed with a unique class so styles never leak to other components.</p>

      <h2>Basic Usage</h2>
      ${e(`import { css, html } from 'onefold';

const styles = css\`
  .card {
    background: white;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }
\`;

function Card(): Node {
  return html\`<div class=\${styles.scope}>
    <div class="card">
      <h2 class="title">Scoped!</h2>
      <p>These styles won't affect other components.</p>
    </div>
  </div>\`;
}`)}

      <p>The <code>styles.scope</code> property is a generated class name (e.g. <code>nf-0</code>) that gets prepended to every selector in your CSS block.</p>

      <h2>How It Works</h2>
      <p>At runtime:</p>
      <ol>
        <li>A unique class name is generated (<code>nf-0</code>, <code>nf-1</code>, ...)</li>
        <li>Every selector in your CSS is prefixed with <code>.nf-0</code></li>
        ${f("<li>A <code>&lt;style&gt;</code> element is injected into <code>&lt;head&gt;</code> (deduplicated)</li>")}
        <li>You apply the scope class to your component's root element</li>
      </ol>

      ${l("Styles are deduplicated \u2014 calling css with the same template string reuses the same scope class and does not inject a second <style> element.")}

      <h2>cssValue — Safe User Input</h2>
      <p>When interpolating user-provided values into CSS, use <code>cssValue()</code> to prevent injection:</p>
      ${e(`import { css, cssValue } from 'onefold';

const userColor = 'red; background: url(evil)';
css\`.card { background: \${cssValue(userColor)}; }\`
// Only "red" is applied \u2014 injection is stripped`)}

      ${f("<p><code>cssValue()</code> strips <code>{ } &lt; &gt; ;</code>, blocks <code>url()</code> and <code>expression()</code>, and removes <code>@import</code>.</p>")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Returns</th><th>Description</th></tr>
        <tr><td><code>css\`...\`</code></td><td>ScopedStyle</td><td>Create scoped stylesheet, inject into head</td></tr>
        <tr><td><code>styles.scope</code></td><td>string</td><td>Class name to apply to root element</td></tr>
        <tr><td><code>styles.css</code></td><td>string</td><td>Generated CSS text (for SSR/inspection)</td></tr>
        <tr><td><code>cssValue(str)</code></td><td>string</td><td>Sanitize user input for CSS interpolation</td></tr>
      </table>
    </div>
  `}function Ue(){return n`
    <div>
      <h1>Mounting (mount)</h1>
      <p>Attach a component tree to the DOM.</p>

      <h2>Usage</h2>
      ${e(`import { mount, html } from 'onefold';

const app = html\`<div>Hello, World</div>\`;
mount(app, document.getElementById('app')!);`)}

      <p><code>mount</code> clears the container's content and appends the node. This is the one place in your app where you connect onefold to the page.</p>

      <h2>With a Component Function</h2>
      ${e(`function App(): Node {
  return html\`<div>My Application</div>\`;
}

mount(App(), document.getElementById('app')!);`)}

      ${l("mount() replaces the container content. If you need to append instead, use container.appendChild(node) directly with the result of html`...`.")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Description</th></tr>
        <tr><td><code>mount(node, container)</code></td><td>Clear container and append node. The single "render" call.</td></tr>
      </table>

      <h2>raw() — Explicit HTML Insertion</h2>
      <p>If you need to insert actual HTML markup (not text), use <code>raw()</code>:</p>
      ${e("import { raw } from 'onefold';\n\n// Only for trusted, developer-authored HTML \u2014 never user input\nhtml`<div>${raw('<strong>Bold text</strong>')}</div>`")}

      ${l("raw() runs a minimal sanitizer (strips scripts, event handlers, unsafe URLs). For user-generated HTML, pipe through DOMPurify first.","warn")}
    </div>
  `}function Fe(){return n`
    <div>
      <h1>Router</h1>
      <p>Client-side routing with nested routes, dynamic parameters, and programmatic navigation.</p>

      <h2>Basic Setup</h2>
      ${e(`import { Router, navigate, Link } from 'onefold';

const App = Router([
  { path: '/', view: () => Home() },
  { path: '/about', view: () => About() },
  { path: '/users/:id', view: (params) => UserProfile(params) },
], () => NotFound());`)}

      <h2>How It Works</h2>
      <p>The Router listens to <code>popstate</code> events (History API) and swaps the rendered view when the path changes. Only the matched route's view function is called — other routes remain unmounted.</p>

      ${l("The Router returns a single DOM Node. Mount it once at your app root \u2014 route changes swap content in-place without a full re-render.")}

      <h2>Route Definition</h2>
      <table>
        <tr><th>Property</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>path</code></td><td>string</td><td>URL pattern to match. Supports <code>:param</code> segments.</td></tr>
        <tr><td><code>view</code></td><td>(params, outlet?) => Node</td><td>Render function called when route matches.</td></tr>
        <tr><td><code>children</code></td><td>RouteDefinition[]</td><td>Nested child routes (optional).</td></tr>
      </table>

      <h2>Full Example</h2>
      ${e(`import { Router, navigate, Link, html, mount } from 'onefold';

function Home(): Node {
  return html\`<h2>Welcome Home</h2>\`;
}

function About(): Node {
  return html\`<h2>About Us</h2>\`;
}

function NotFound(): Node {
  return html\`<h2>404 - Not Found</h2>\`;
}

function App(): Node {
  return html\`
    <div>
      <nav>
        \${Link('/', html\`<span>Home</span>\`)}
        \${Link('/about', html\`<span>About</span>\`)}
      </nav>
      \${Router([
        { path: '/', view: () => Home() },
        { path: '/about', view: () => About() },
      ], () => NotFound())}
    </div>
  \`;
}

mount(App(), document.getElementById('app')!);`)}

      <h2>Try It</h2>
      <p>Click the nav links to switch routes. Uses hash mode so it works inside the playground:</p>

      ${p(`import { html, mount, Router, navigate, currentRoute, Link, configureRouter } from 'onefold';

// Use hash mode (required for playground/iframe environments)
configureRouter({ hash: true });

function Home() {
  return html\`
    <div style="padding:16px">
      <h2>Home</h2>
      <p>Welcome to the home page. Click the nav links above to navigate.</p>
      <button onclick=\${() => navigate('/about')} style="margin-top:8px">
        Go to About (programmatic)
      </button>
    </div>
  \`;
}

function About() {
  return html\`
    <div style="padding:16px">
      <h2>About</h2>
      <p>This is the about page. The router swaps content in-place.</p>
    </div>
  \`;
}

function UserProfile(params) {
  return html\`
    <div style="padding:16px">
      <h2>User: \${params.id}</h2>
      <p>Dynamic route parameter captured from the URL.</p>
    </div>
  \`;
}

function NotFound() {
  return html\`<div style="padding:16px"><h2>404 \u2014 Not Found</h2></div>\`;
}

function App() {
  return html\`
    <div>
      <nav style="display:flex;gap:12px;padding:12px 16px;background:#f1f5f9;border-radius:8px;margin-bottom:16px">
        \${Link('/', 'Home', () => currentRoute() === '/' ? 'font-weight:bold;color:#4f46e5' : 'color:#333')}
        \${Link('/about', 'About', () => currentRoute() === '/about' ? 'font-weight:bold;color:#4f46e5' : 'color:#333')}
        \${Link('/users/42', 'User 42', () => currentRoute() === '/users/42' ? 'font-weight:bold;color:#4f46e5' : 'color:#333')}
        \${Link('/users/99', 'User 99', () => currentRoute() === '/users/99' ? 'font-weight:bold;color:#4f46e5' : 'color:#333')}
      </nav>
      <div style="border:1px solid #e5e7eb;border-radius:8px;min-height:120px">
        \${Router([
          { path: '/', view: () => Home() },
          { path: '/about', view: () => About() },
          { path: '/users/:id', view: (params) => UserProfile(params) },
        ], () => NotFound())}
      </div>
      <p style="margin-top:8px;font-size:12px;color:#666">Current route: \${() => currentRoute()}</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Router with Navigation, Dynamic Params & Active Links")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/routing/nested">Nested Routes</a> — share layouts across related pages</li>
        <li><a href="/routing/navigate">Navigate</a> — programmatic navigation from code</li>
        <li><a href="/routing/params">Dynamic Params</a> — capture URL segments as parameters</li>
      </ul>
    </div>
  `}function je(){return n`
    <div>
      <h1>configureRouter</h1>
      <p>Configure the router's navigation strategy. By default, onefold uses <strong>path-based routing</strong> (History API). Use <code>configureRouter</code> to switch to hash-based routing for static hosting environments.</p>

      <h2>Routing Modes</h2>
      <table>
        <tr><th>Mode</th><th>URL Format</th><th>When to Use</th></tr>
        <tr><td><strong>Path</strong> (default)</td><td><code>/about</code>, <code>/users/42</code></td><td>Servers with SPA fallback (Express, Nginx, Vercel, Netlify with <code>_redirects</code>)</td></tr>
        <tr><td><strong>Hash</strong></td><td><code>#/about</code>, <code>#/users/42</code></td><td>Static hosting without server config (GitHub Pages, S3, local <code>file://</code>)</td></tr>
      </table>

      <h2>Default Behavior</h2>
      <p>Without calling <code>configureRouter</code>, the router uses path-based routing. It automatically falls back to hash mode when running on the <code>file:</code> protocol (e.g. opening an HTML file directly in the browser).</p>

      ${e(`import { Router, navigate } from 'onefold';

// Path-based by default \u2014 no configuration needed
const app = Router([
  { path: '/', view: () => Home() },
  { path: '/about', view: () => About() },
], () => NotFound());

navigate('/about'); // URL becomes: /about`)}

      <h2>Enabling Hash Mode</h2>
      <p>Call <code>configureRouter({ hash: true })</code> <strong>before</strong> creating any Router or calling <code>navigate()</code>.</p>

      ${e(`import { configureRouter, Router, navigate } from 'onefold';

// Enable hash routing for GitHub Pages / static hosting
configureRouter({ hash: true });

const app = Router([
  { path: '/', view: () => Home() },
  { path: '/about', view: () => About() },
], () => NotFound());

navigate('/about'); // URL becomes: #/about`)}

      ${l("configureRouter must be called before any Router or navigate call. Once the router initializes, changing the mode has no effect.")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>configureRouter</code></td><td><code>{ hash?: boolean }</code></td><td>Set the routing strategy. <code>hash: true</code> enables hash-based routing.</td></tr>
      </table>

      <h2>How Each Mode Works</h2>

      <h3>Path Mode (default)</h3>
      <ul>
        <li>Uses <code>history.pushState()</code> to update the URL</li>
        <li>Listens to <code>popstate</code> events for back/forward navigation</li>
        <li>Requires the server to serve <code>index.html</code> for all routes (SPA fallback)</li>
        <li>Clean URLs: <code>/users/42</code></li>
      </ul>

      <h3>Hash Mode</h3>
      <ul>
        <li>Uses <code>window.location.hash</code> to store the route</li>
        <li>Listens to <code>hashchange</code> events for navigation</li>
        <li>Works on any static file server — no server config needed</li>
        <li>URLs include <code>#</code>: <code>example.com/#/users/42</code></li>
      </ul>

      <h2>Deployment Guide</h2>

      <h3>GitHub Pages</h3>
      ${e(`// main.ts
import { configureRouter, Router, mount } from 'onefold';

configureRouter({ hash: true });

const app = Router([...routes], () => NotFound());
mount(app, document.getElementById('app')!);`)}
      <p>Also ensure your <code>index.html</code> uses relative paths for assets:</p>
      ${e(`<!-- Use ./ instead of / for asset paths -->
<link rel="stylesheet" href="./style.css" />
<script type="module" src="./app.js"><\/script>`,"html")}

      <h3>Intercepting Internal Links (Hash Mode)</h3>
      ${f('<p>When using hash mode, any raw <code>&lt;a href="/..."&gt;</code> links in your page content will trigger a full page navigation instead of client-side routing. To fix this, add a global click interceptor after mounting your app:</p>')}
      ${e(`import { configureRouter, Router, navigate, mount } from 'onefold';

configureRouter({ hash: true });

const app = Router([...routes], () => NotFound());
mount(app, document.getElementById('app')!);

// Intercept internal links so raw <a href="/..."> in page content
// uses client-side navigation instead of full page reload
document.addEventListener('click', (e) => {
  const anchor = (e.target as HTMLElement).closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
  e.preventDefault();
  navigate(href);
});

// Navigate to home if no hash is present on initial load
if (!location.hash || location.hash === '#/') {
  navigate('/');
}`)}
      ${l('This interceptor is only needed if your page content contains plain <a href="/path"> links that are not using the Link component. If all navigation uses Link or navigate(), you can skip this.')}


      <h3>Server with SPA Fallback (Nginx)</h3>
      ${e(`# No configureRouter needed \u2014 path mode works out of the box
# nginx.conf
location / {
  try_files $uri $uri/ /index.html;
}`,"nginx")}

      <h3>Vercel / Netlify</h3>
      <p>These platforms support SPA fallback natively. Use path mode (the default) with no extra config.</p>

      <h2>Link Behavior</h2>
      <p>The <code>Link</code> component automatically adapts to the configured mode:</p>
      ${e(`import { Link } from 'onefold';

// Path mode \u2192 <a href="/about">About</a>
// Hash mode \u2192 <a href="#/about">About</a>
Link('/about', 'About');`)}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/routing/router">Router</a> — route definitions and matching</li>
        <li><a href="/routing/navigate">Navigate</a> — programmatic navigation</li>
        <li><a href="/routing/link">Link</a> — declarative navigation with active state</li>
        <li><a href="/routing/nested">Nested Routes</a> — layouts with child routes</li>
      </ul>
    </div>
  `}function We(){return n`
    <div>
      <h1>Nested Routes</h1>
      <p>Parent layouts can render child routes via the <code>outlet</code> parameter. This lets you share layout elements (navbars, sidebars) across related pages.</p>

      <h2>How It Works</h2>
      <p>When a route has <code>children</code>, its view function receives a second argument — the <code>outlet</code>. The outlet is the rendered child route's Node. Place it wherever you want the nested content to appear.</p>

      <h2>Example: Settings Layout</h2>
      ${e(`import { Router, Link, html, mount } from 'onefold';

function SettingsLayout(params: any, outlet: Node): Node {
  return html\`
    <div class="settings">
      <nav class="settings-nav">
        \${Link('/settings/profile', html\`<span>Profile</span>\`)}
        \${Link('/settings/billing', html\`<span>Billing</span>\`)}
        \${Link('/settings/notifications', html\`<span>Notifications</span>\`)}
      </nav>
      <div class="settings-content">
        \${outlet}
      </div>
    </div>
  \`;
}

function ProfilePage(): Node {
  return html\`<h2>Profile Settings</h2>\`;
}

function BillingPage(): Node {
  return html\`<h2>Billing & Subscription</h2>\`;
}

function NotificationsPage(): Node {
  return html\`<h2>Notification Preferences</h2>\`;
}

const App = Router([
  { path: '/settings', view: SettingsLayout, children: [
    { path: '/profile', view: () => ProfilePage() },
    { path: '/billing', view: () => BillingPage() },
    { path: '/notifications', view: () => NotificationsPage() },
  ]},
]);`)}

      ${l("Child paths are relative to the parent. /settings/profile matches the parent /settings and then the child /profile.")}

      <h2>Multiple Nesting Levels</h2>
      <p>Nesting can go as deep as needed. Each level receives its own outlet:</p>
      ${e(`const routes = [
  { path: '/app', view: AppLayout, children: [
    { path: '/dashboard', view: DashboardLayout, children: [
      { path: '/stats', view: () => StatsPage() },
      { path: '/charts', view: () => ChartsPage() },
    ]},
    { path: '/settings', view: SettingsLayout, children: [
      { path: '/profile', view: () => ProfilePage() },
    ]},
  ]},
];`)}

      <h2>Index Routes</h2>
      <p>Use an empty child path to define a default view for a parent route:</p>
      ${e(`{ path: '/settings', view: SettingsLayout, children: [
  { path: '', view: () => SettingsOverview() },  // /settings
  { path: '/profile', view: () => ProfilePage() }, // /settings/profile
]}`)}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/routing/link">Link</a> — declarative navigation with active state</li>
        <li><a href="/routing/params">Dynamic Params</a> — capture URL segments as parameters</li>
      </ul>
    </div>
  `}function qe(){return n`
    <div>
      <h1>Programmatic Navigation</h1>
      <p>Use <code>navigate(path)</code> to change routes from code — after form submissions, authentication, or any event handler.</p>

      <h2>Basic Usage</h2>
      ${e(`import { navigate } from 'onefold';

// Navigate to a path
navigate('/dashboard');

// Navigate with a dynamic segment
const userId = '42';
navigate(\`/users/\${userId}\`);`)}

      <h2>Common Patterns</h2>

      <h3>After Form Submit</h3>
      ${e(`function LoginForm(): Node {
  const handleSubmit = async () => {
    const success = await login(email(), password());
    if (success) {
      navigate('/dashboard');
    }
  };

  return html\`
    <form onsubmit=\${(e: Event) => { e.preventDefault(); handleSubmit(); }}>
      <!-- form fields -->
      <button type="submit">Log In</button>
    </form>
  \`;
}`)}

      <h3>Conditional Redirect</h3>
      ${e(`import { navigate, createEffect } from 'onefold';

createEffect(() => {
  if (!isAuthenticated()) {
    navigate('/login');
  }
});`)}

      ${l("navigate() uses the History API (pushState) under the hood. The browser URL updates without a page reload.")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>navigate</code></td><td><code>path: string</code></td><td>Push a new entry to browser history and trigger route matching.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Click the buttons to navigate programmatically:</p>

      ${p(`import { html, mount, Router, navigate, currentRoute, configureRouter } from 'onefold';

configureRouter({ hash: true });

function Home() {
  return html\`
    <div style="padding:16px">
      <h2>Dashboard</h2>
      <p>You are on the dashboard.</p>
      <div style="display:flex;gap:8px;margin-top:12px">
        <button onclick=\${() => navigate('/profile')}>Go to Profile</button>
        <button onclick=\${() => navigate('/settings')}>Go to Settings</button>
      </div>
    </div>
  \`;
}

function Profile() {
  return html\`
    <div style="padding:16px">
      <h2>Profile</h2>
      <p>User profile page.</p>
      <button onclick=\${() => navigate('/')}>Back to Dashboard</button>
    </div>
  \`;
}

function Settings() {
  return html\`
    <div style="padding:16px">
      <h2>Settings</h2>
      <p>App settings page.</p>
      <button onclick=\${() => navigate('/')}>Back to Dashboard</button>
    </div>
  \`;
}

function App() {
  return html\`
    <div>
      <div style="border:1px solid #e5e7eb;border-radius:8px;min-height:140px">
        \${Router([
          { path: '/', view: () => Home() },
          { path: '/profile', view: () => Profile() },
          { path: '/settings', view: () => Settings() },
        ], () => html\`<p style="padding:16px">Not found</p>\`)}
      </div>
      <p style="margin-top:8px;font-size:12px;color:#666">Route: \${() => currentRoute()}</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Programmatic Navigation with navigate()")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/routing/link">Link</a> — declarative navigation with active state</li>
        <li><a href="/routing/router">Router</a> — client-side routing overview</li>
      </ul>
    </div>
  `}function _e(){return n`
    <div>
      <h1>Link Component</h1>
      <p>Declarative navigation with automatic active state. <code>Link</code> renders an anchor that prevents default navigation and uses <code>navigate()</code> internally.</p>

      <h2>Basic Usage</h2>
      ${e("import { Link, html } from 'onefold';\n\nfunction Nav(): Node {\n  return html`\n    <nav>\n      ${Link('/', html`<span>Home</span>`)}\n      ${Link('/about', html`<span>About</span>`)}\n      ${Link('/contact', html`<span>Contact</span>`, 'nav-link')}\n    </nav>\n  `;\n}")}

      <h2>Signature</h2>
      ${e("Link(href: string, child: Node, className?: string): Node")}

      <table>
        <tr><th>Parameter</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>href</code></td><td>string</td><td>Target path for navigation.</td></tr>
        <tr><td><code>child</code></td><td>Node</td><td>Content to render inside the link.</td></tr>
        <tr><td><code>className</code></td><td>string (optional)</td><td>CSS class to apply to the anchor element.</td></tr>
      </table>

      <h2>Active State</h2>
      <p>When the current route matches the link's <code>href</code>, the anchor receives an <code>active</code> class. You can style it with CSS:</p>
      ${e(`/* Style active navigation links */
a.active {
  color: var(--primary);
  font-weight: 600;
  border-bottom: 2px solid var(--primary);
}`)}

      ${l("Link uses client-side navigation \u2014 no full page reload. It calls event.preventDefault() and uses navigate() internally.")}

      <h2>Link vs navigate()</h2>
      <table>
        <tr><th>Use Case</th><th>Approach</th></tr>
        <tr><td>Navigation menus, breadcrumbs</td><td><code>Link()</code> — declarative, accessible</td></tr>
        <tr><td>After form submit, conditional redirect</td><td><code>navigate()</code> — imperative, from code</td></tr>
      </table>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/routing/navigate">Navigate</a> — programmatic navigation from code</li>
        <li><a href="/routing/params">Dynamic Params</a> — capture URL segments as parameters</li>
      </ul>
    </div>
  `}function Ve(){return n`
    <div>
      <h1>Dynamic Parameters</h1>
      <p>Define URL segments that capture values at runtime using the <code>:param</code> syntax. Captured values are passed to the view function as a params object.</p>

      <h2>Defining Dynamic Routes</h2>
      ${e(`import { Router, html } from 'onefold';

const App = Router([
  { path: '/users/:id', view: (params) => UserProfile(params) },
  { path: '/posts/:slug', view: (params) => BlogPost(params) },
  { path: '/org/:orgId/team/:teamId', view: (params) => TeamPage(params) },
]);`)}

      <h2>Accessing Parameters</h2>
      <p>The <code>params</code> object is a plain key-value map of captured segments:</p>
      ${e(`function UserProfile(params: { id: string }): Node {
  return html\`
    <div>
      <h2>User: \${params.id}</h2>
      <!-- fetch user data using params.id -->
    </div>
  \`;
}

// URL: /users/42 \u2192 params = { id: '42' }
// URL: /users/abc \u2192 params = { id: 'abc' }`)}

      <h2>Multiple Parameters</h2>
      ${e(`function TeamPage(params: { orgId: string; teamId: string }): Node {
  return html\`
    <div>
      <h2>Org: \${params.orgId} / Team: \${params.teamId}</h2>
    </div>
  \`;
}

// URL: /org/acme/team/engineering
// params = { orgId: 'acme', teamId: 'engineering' }`)}

      ${l("All param values are strings. Parse numbers yourself: parseInt(params.id, 10).")}

      <h2>Combined with Resource</h2>
      <p>Use params with <code>createResource</code> for reactive data fetching:</p>
      ${e(`import { createSignal, createResource, html } from 'onefold';

function UserProfile(params: { id: string }): Node {
  const userId = createSignal(params.id);
  const user = createResource(userId, async (id) => {
    const res = await fetch(\`/api/users/\${id}\`);
    return res.json();
  });

  return html\`
    <div>
      <h2>\${() => user.data()?.name ?? 'Loading...'}</h2>
      <p>\${() => user.data()?.email ?? ''}</p>
    </div>
  \`;
}`)}

      <h2>Try It</h2>
      <p>Click different user links to see the dynamic <code>:id</code> param change:</p>

      ${p(`import { html, mount, Router, navigate, currentRoute, Link, configureRouter } from 'onefold';

configureRouter({ hash: true });

function UserProfile(params) {
  const users = {
    '1': { name: 'Alice Johnson', role: 'Engineer', avatar: 'A' },
    '2': { name: 'Bob Smith', role: 'Designer', avatar: 'B' },
    '3': { name: 'Charlie Brown', role: 'Product Manager', avatar: 'C' },
  };
  const user = users[params.id] || { name: 'Unknown', role: 'N/A', avatar: '?' };

  return html\`
    <div style="padding:16px">
      <div style="display:flex;align-items:center;gap:12px">
        <div style="width:48px;height:48px;border-radius:50%;background:#4f46e5;color:white;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:bold">\${user.avatar}</div>
        <div>
          <h3 style="margin:0">\${user.name}</h3>
          <p style="margin:0;font-size:13px;color:#666">\${user.role} \u2014 ID: \${params.id}</p>
        </div>
      </div>
    </div>
  \`;
}

function UserList() {
  return html\`
    <div style="padding:16px">
      <h3>Select a User</h3>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button onclick=\${() => navigate('/users/1')}>Alice</button>
        <button onclick=\${() => navigate('/users/2')}>Bob</button>
        <button onclick=\${() => navigate('/users/3')}>Charlie</button>
        <button onclick=\${() => navigate('/users/999')}>Unknown</button>
      </div>
    </div>
  \`;
}

function App() {
  return html\`
    <div>
      <div style="border:1px solid #e5e7eb;border-radius:8px;min-height:100px">
        \${Router([
          { path: '/', view: () => UserList() },
          { path: '/users/:id', view: (params) => UserProfile(params) },
        ], () => UserList())}
      </div>
      <div style="margin-top:8px;display:flex;justify-content:space-between;font-size:12px;color:#666">
        <span>Route: \${() => currentRoute()}</span>
        <button onclick=\${() => navigate('/')} style="font-size:12px;padding:2px 8px">Reset</button>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Dynamic Route Params \u2014 :id")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/data/resource">Resource</a> — reactive async data fetching</li>
        <li><a href="/routing/router">Router</a> — client-side routing overview</li>
      </ul>
    </div>
  `}function Ge(){return n`
    <div>
      <h1>Store</h1>
      <p><code>createStore</code> is a signal over an object with a convenient <code>.update()</code> method for partial merges. Use it for managing structured application state.</p>

      <h2>Basic Usage</h2>
      ${e(`import { createStore } from 'onefold';

interface AppState {
  user: string | null;
  theme: 'light' | 'dark';
  count: number;
}

const store = createStore<AppState>({
  user: null,
  theme: 'light',
  count: 0,
});

// Read the full state
store()  // { user: null, theme: 'light', count: 0 }

// Partial update \u2014 merges with existing state
store.update({ count: 5 });
// { user: null, theme: 'light', count: 5 }

store.update({ user: 'Alice', theme: 'dark' });
// { user: 'Alice', theme: 'dark', count: 5 }`)}

      <h2>Reactivity</h2>
      <p>Store is a signal — use it in templates and effects just like <code>createSignal</code>:</p>
      ${e(`import { createEffect, html } from 'onefold';

createEffect(() => {
  console.log('Theme changed:', store().theme);
});

function ThemeDisplay(): Node {
  return html\`
    <p>Current theme: \${() => store().theme}</p>
    <button onclick=\${() => store.update({
      theme: store().theme === 'light' ? 'dark' : 'light'
    })}>Toggle Theme</button>
  \`;
}`)}

      ${l("store.update() performs a shallow merge (like Object.assign). For deeply nested state, spread inner objects yourself.")}

      <h2>Replace vs Update</h2>
      ${e(`// .update() \u2014 shallow merge (keeps other fields)
store.update({ count: 10 });

// .set() \u2014 full replacement (overwrites the entire object)
store.set({ user: null, theme: 'light', count: 0 });`)}

      <h2>API Reference</h2>
      <table>
        <tr><th>Method</th><th>Description</th></tr>
        <tr><td><code>store()</code></td><td>Read current state (subscribes in reactive context).</td></tr>
        <tr><td><code>store.set(value)</code></td><td>Replace the entire state object.</td></tr>
        <tr><td><code>store.update(partial)</code></td><td>Shallow merge partial into current state.</td></tr>
        <tr><td><code>store.peek()</code></td><td>Read current state without subscribing.</td></tr>
      </table>

      ${p(`import { html, mount, createStore, createComputed } from 'onefold';

function App() {
  // createStore: a signal over an object with .update() for partial merges
  const store = createStore({
    items: [],
    filter: 'all', // 'all' | 'active' | 'done'
    nextId: 1,
  });

  const input = { value: '' };

  // Derived counts from store
  const counts = () => {
    const { items } = store();
    return {
      total: items.length,
      active: items.filter(i => !i.done).length,
      done: items.filter(i => i.done).length,
    };
  };

  // Filtered items based on current filter
  const filtered = () => {
    const { items, filter } = store();
    if (filter === 'active') return items.filter(i => !i.done);
    if (filter === 'done') return items.filter(i => i.done);
    return items;
  };

  function addItem() {
    const text = input.value.trim();
    if (!text) return;
    const { items, nextId } = store();
    store.update({
      items: [...items, { id: nextId, text, done: false }],
      nextId: nextId + 1,
    });
    input.value = '';
    const el = document.querySelector('#store-input');
    if (el) el.value = '';
  }

  function toggleItem(id) {
    store.update({
      items: store().items.map(i => i.id === id ? { ...i, done: !i.done } : i),
    });
  }

  function removeItem(id) {
    store.update({ items: store().items.filter(i => i.id !== id) });
  }

  function setFilter(f) {
    store.update({ filter: f });
  }

  function clearDone() {
    store.update({ items: store().items.filter(i => !i.done) });
  }

  return html\`
    <div>
      <h3>Task Manager \u2014 createStore</h3>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <input id="store-input" placeholder="What needs doing?"
          oninput=\${(e) => { input.value = e.target.value; }}
          onkeydown=\${(e) => { if (e.key === 'Enter') addItem(); }}
          style="flex:1" />
        <button onclick=\${addItem}>Add</button>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        \${['all','active','done'].map(f => html\`
          <button onclick=\${() => setFilter(f)}
            style=\${() => store().filter === f ? 'background:#4f46e5;color:white;border-color:#4f46e5' : ''}
          >\${f}</button>
        \`)}
        <button onclick=\${clearDone} style="margin-left:auto;font-size:12px;color:#ef4444">Clear done</button>
      </div>
      <ul style="list-style:none;padding:0">
        \${() => filtered().map(item => html\`
          <li style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f1f5f9">
            <input type="checkbox" \${item.done ? 'checked' : ''} onchange=\${() => toggleItem(item.id)} />
            <span style=\${item.done ? 'text-decoration:line-through;color:#94a3b8' : ''}>\${item.text}</span>
            <button onclick=\${() => removeItem(item.id)} style="margin-left:auto;font-size:11px;color:#999;border:none;background:none;cursor:pointer">\u2715</button>
          </li>
        \`)}
      </ul>
      <p style="font-size:12px;color:#666;margin-top:8px">
        \${() => counts().active} active \xB7 \${() => counts().done} done \xB7 \${() => counts().total} total
        | filter: \${() => store().filter}
      </p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createStore \u2014 Task Manager with Filters")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/state/persisted">Persisted Signals</a> — automatically sync state to localStorage</li>
        <li><a href="/data/resource">Resource</a> — reactive async data fetching</li>
      </ul>
    </div>
  `}function Je(){return n`
    <div>
      <h1>Persisted Signals</h1>
      <p><code>createPersisted</code> creates a signal that automatically syncs with <code>localStorage</code>. The value persists across page refreshes and browser sessions.</p>

      <h2>Basic Usage</h2>
      ${e(`import { createPersisted } from 'onefold/persist';

// Persists under key 'user-theme' in localStorage
const theme = createPersisted('user-theme', 'light');

theme()       // 'light' (or stored value if previously set)
theme.set('dark');  // updates signal AND localStorage`)}

      <h2>With Objects</h2>
      ${e(`interface Preferences {
  fontSize: number;
  sidebarOpen: boolean;
  locale: string;
}

const prefs = createPersisted<Preferences>('app-prefs', {
  fontSize: 14,
  sidebarOpen: true,
  locale: 'en',
});

// Objects are serialized as JSON
prefs.set({ ...prefs(), fontSize: 16 });`)}

      <h2>Options</h2>
      ${e(`const token = createPersisted('auth-token', '', {
  storage: sessionStorage,   // use sessionStorage instead
  serialize: (v) => btoa(v), // custom serializer
  deserialize: (s) => atob(s), // custom deserializer
});`)}

      <table>
        <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
        <tr><td><code>storage</code></td><td>Storage</td><td>localStorage</td><td>Storage backend (localStorage, sessionStorage).</td></tr>
        <tr><td><code>serialize</code></td><td>(value) => string</td><td>JSON.stringify</td><td>Custom serializer for storage.</td></tr>
        <tr><td><code>deserialize</code></td><td>(raw) => T</td><td>JSON.parse</td><td>Custom deserializer from storage.</td></tr>
      </table>

      ${l("If localStorage is unavailable (e.g., incognito mode in some browsers), createPersisted falls back to an in-memory signal.")}

      <h2>Reactive in Templates</h2>
      ${e(`function SettingsPanel(): Node {
  const fontSize = createPersisted('font-size', 14);

  return html\`
    <div>
      <p>Font size: \${() => fontSize()}px</p>
      <button onclick=\${() => fontSize.set(s => s + 1)}>Increase</button>
      <button onclick=\${() => fontSize.set(s => s - 1)}>Decrease</button>
      <button onclick=\${() => fontSize.set(14)}>Reset</button>
    </div>
  \`;
}`)}

      ${p(`import { createSignal, html, mount } from 'onefold';
import { createPersisted } from 'onefold/persist';

function App() {
  // createPersisted: signal that auto-saves to localStorage
  const fontSize = createPersisted('demo-font-size', 14);
  const username = createPersisted('demo-username', '');
  const darkMode = createPersisted('demo-dark', false);

  return html\`
    <div style=\${() => darkMode() ? 'background:#1e293b;color:#e2e8f0;padding:16px;border-radius:8px' : 'padding:16px'}>
      <h3>Persisted Settings</h3>
      <p style="font-size:12px;color:\${() => darkMode() ? '#94a3b8' : '#666'};margin-bottom:16px">
        These values persist in localStorage. Edit them, then click "Simulate Reload" to see them restored.
      </p>

      <div style="margin-bottom:12px">
        <label style="font-size:13px;font-weight:600">Username</label>
        <div style="margin-top:4px">
          <input
            placeholder="Enter your name..."
            value=\${() => username()}
            oninput=\${(e) => username.set(e.target.value)}
            style="width:100%"
          />
        </div>
      </div>

      <div style="margin-bottom:12px">
        <label style="font-size:13px;font-weight:600">Font Size: \${() => fontSize()}px</label>
        <div style="display:flex;gap:8px;margin-top:4px">
          <button onclick=\${() => fontSize.set(s => s - 1)}>\u2212</button>
          <button onclick=\${() => fontSize.set(s => s + 1)}>+</button>
          <button onclick=\${() => fontSize.set(14)}>Reset</button>
        </div>
      </div>

      <div style="margin-bottom:16px">
        <label style="font-size:13px;font-weight:600">Dark Mode</label>
        <div style="margin-top:4px">
          <button onclick=\${() => darkMode.set(d => !d)}>
            \${() => darkMode() ? '\u2600\uFE0F Switch to Light' : '\u{1F319} Switch to Dark'}
          </button>
        </div>
      </div>

      <div style="padding:12px;border-radius:6px;border:1px solid \${() => darkMode() ? '#334155' : '#e5e7eb'}">
        <p style=\${() => 'font-size:' + fontSize() + 'px'}>
          \${() => username() ? 'Hello, ' + username() + '!' : 'Hello, stranger!'}
        </p>
        <p style="font-size:11px;margin-top:4px;opacity:0.6">
          This text size responds to the font-size setting above.
        </p>
      </div>

      <div style="display:flex;gap:8px;margin-top:12px">
        <button onclick=\${() => { fontSize.clear(); username.clear(); darkMode.clear(); }}>
          Clear All (Reset Storage)
        </button>
      </div>

      <p style="font-size:11px;margin-top:12px;opacity:0.6">
        localStorage keys: demo-font-size, demo-username, demo-dark
      </p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createPersisted \u2014 Settings that Survive Reload",{allowStorage:!0})}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/state/store">Store</a> — manage structured application state</li>
        <li><a href="/theming">Theming</a> — reactive CSS custom properties with theme switching</li>
      </ul>
    </div>
  `}function Ye(){return n`
    <div>
      <h1>Resource</h1>
      <p><code>createResource</code> provides reactive async data fetching. It tracks loading state, errors, and data — and automatically refetches when the source signal changes.</p>

      <h2>Basic Usage</h2>
      ${e(`import { createSignal, createResource } from 'onefold';

const userId = createSignal(1);

const user = createResource(userId, async (id) => {
  const res = await fetch(\`/api/users/\${id}\`);
  return res.json();
});

// Reactive accessors
user.data()     // T | undefined
user.loading()  // boolean
user.error()    // Error | null`)}

      <h2>In Templates</h2>
      ${e(`function UserCard(): Node {
  const userId = createSignal(1);
  const user = createResource(userId, async (id) => {
    const res = await fetch(\`/api/users/\${id}\`);
    return res.json();
  });

  return html\`
    <div>
      \${() => user.loading()
        ? html\`<p>Loading...</p>\`
        : user.error()
          ? html\`<p class="error">\${user.error()!.message}</p>\`
          : html\`<p>\${user.data()?.name}</p>\`
      }
      <button onclick=\${() => userId.set(n => n + 1)}>Next User</button>
    </div>
  \`;
}`)}

      <h2>Manual Refetch</h2>
      ${e(`// Refetch with the current source value
user.refetch();`)}

      <h2>Cleanup</h2>
      ${e(`// Stop watching the source signal
user.dispose();`)}

      ${l("When the source signal changes, any in-flight request from the previous source value is ignored (its result will not update .data()).")}

      <h2>Without a Source Signal</h2>
      <p>Pass <code>null</code> as the source to fetch once on creation:</p>
      ${e(`const posts = createResource(null, async () => {
  const res = await fetch('/api/posts');
  return res.json();
});

// Fetch again manually
posts.refetch();`)}

      <h2>API Reference</h2>
      <table>
        <tr><th>Property/Method</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>.data()</code></td><td>T | undefined</td><td>The resolved data (reactive).</td></tr>
        <tr><td><code>.loading()</code></td><td>boolean</td><td>True while fetching (reactive).</td></tr>
        <tr><td><code>.error()</code></td><td>Error | null</td><td>The rejection error, if any (reactive).</td></tr>
        <tr><td><code>.refetch()</code></td><td>void</td><td>Re-run the fetcher with current source.</td></tr>
        <tr><td><code>.dispose()</code></td><td>void</td><td>Stop watching the source signal.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Click "Next User" to change the source signal — <code>createResource</code> auto-refetches:</p>

      ${p(`import { createSignal, createResource, html, mount } from 'onefold';

function App() {
  const userId = createSignal(1);

  const user = createResource(userId, async (id) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
    if (!res.ok) throw new Error('User not found');
    return res.json();
  });

  return html\`
    <div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        <h3>User Profile</h3>
        <span style="font-size:12px;color:#666">ID: \${() => userId()}</span>
      </div>

      \${() => {
        if (user.loading()) return html\`<p style="color:#666">Loading user \${userId()}...</p>\`;
        if (user.error()) return html\`<p style="color:#ef4444">Error: \${user.error().message}</p>\`;
        const data = user.data();
        if (!data) return null;
        return html\`
          <div style="padding:16px;border:1px solid #e5e7eb;border-radius:8px">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px">
              <div style="width:48px;height:48px;border-radius:50%;background:#4f46e5;color:white;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:700">
                \${data.name.charAt(0)}
              </div>
              <div>
                <div style="font-weight:600;font-size:16px">\${data.name}</div>
                <div style="font-size:13px;color:#64748b">\${data.email}</div>
              </div>
            </div>
            <div style="font-size:13px;color:#666">
              <p>Company: \${data.company.name}</p>
              <p>City: \${data.address.city}</p>
              <p>Phone: \${data.phone}</p>
            </div>
          </div>
        \`;
      }}

      <div style="display:flex;gap:8px;margin-top:16px">
        <button onclick=\${() => userId.set(n => Math.max(1, n - 1))}>\u2190 Previous</button>
        <button onclick=\${() => userId.set(n => Math.min(10, n + 1))}>Next \u2192</button>
        <button onclick=\${() => user.refetch()} style="margin-left:auto;font-size:12px">Refetch</button>
      </div>
      <p style="font-size:11px;color:#94a3b8;margin-top:8px">Source signal changes \u2192 automatic refetch. No manual wiring needed.</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createResource \u2014 Reactive Data Fetching",{allowNetwork:!0})}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/data/http-client">HTTP Client</a> — typed HTTP client with interceptors</li>
        <li><a href="/async/suspense">Suspense</a> — show fallback UI while data loads</li>
      </ul>
    </div>
  `}function Ke(){return n`
    <div>
      <h1>HTTP Client</h1>
      <p><code>createHttpClient</code> provides a typed HTTP client with interceptors, automatic JSON handling, and a clean API for <code>get</code>, <code>post</code>, <code>put</code>, <code>patch</code>, and <code>delete</code> methods.</p>

      <h2>Setup</h2>
      ${e(`import { createHttpClient } from 'onefold/http';

const http = createHttpClient({
  baseUrl: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});`)}

      <h2>Making Requests</h2>
      ${e(`// GET
const users = await http.get<User[]>('/users');

// POST
const newUser = await http.post<User>('/users', {
  body: { name: 'Alice', email: 'alice@example.com' },
});

// PUT
await http.put<User>('/users/1', {
  body: { name: 'Alice Updated' },
});

// PATCH
await http.patch<User>('/users/1', {
  body: { email: 'newemail@example.com' },
});

// DELETE
await http.delete('/users/1');`)}

      <h2>Options</h2>
      ${f(`<table>
        <tr><th>Option</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>baseUrl</code></td><td>string</td><td>Prepended to all request paths.</td></tr>
        <tr><td><code>headers</code></td><td>Record&lt;string, string&gt;</td><td>Default headers for every request.</td></tr>
        <tr><td><code>interceptors</code></td><td>Interceptors</td><td>Request/response/error hooks.</td></tr>
      </table>`)}

      <h2>Request Options</h2>
      ${e(`const data = await http.get<User>('/users/1', {
  headers: { 'X-Custom': 'value' },  // merged with defaults
  signal: abortController.signal,     // AbortSignal for cancellation
});`)}

      ${l("All methods automatically serialize request bodies to JSON and parse JSON responses. Non-JSON responses return the raw Response object.")}

      <h2>Error Handling</h2>
      ${e(`try {
  const user = await http.get<User>('/users/999');
} catch (err) {
  // err.status \u2014 HTTP status code
  // err.message \u2014 error message
  // err.data \u2014 parsed response body (if JSON)
}`)}

      <h2>With createResource</h2>
      ${e(`import { createSignal, createResource } from 'onefold';

const userId = createSignal(1);
const user = createResource(userId, (id) => http.get<User>(\`/users/\${id}\`));

// user.data(), user.loading(), user.error() \u2014 all reactive`)}

      <h2>Try It</h2>
      <p>Fetches real data from JSONPlaceholder API using <code>createHttpClient</code>:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { createHttpClient } from 'onefold/http';

function App() {
  const http = createHttpClient({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    headers: { 'Accept': 'application/json' },
  });

  const users = createSignal([]);
  const loading = createSignal(false);
  const error = createSignal('');

  async function fetchUsers() {
    loading.set(true);
    error.set('');
    try {
      const res = await http.get('/users');
      users.set(res.data);
    } catch (e) {
      error.set(e.message || 'Failed to fetch');
    }
    loading.set(false);
  }

  // Fetch on load
  fetchUsers();

  return html\`
    <div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
        <h3>Users (HTTP Client)</h3>
        <button onclick=\${fetchUsers} style="font-size:12px">Refetch</button>
      </div>
      \${() => loading() ? html\`<p style="color:#666">Loading...</p>\` : null}
      \${() => error() ? html\`<p style="color:#ef4444">\${error()}</p>\` : null}
      \${() => users().length > 0 ? html\`
        <div style="max-height:250px;overflow-y:auto">
          \${users().map(user => html\`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #f1f5f9">
              <div style="width:36px;height:36px;border-radius:50%;background:#e0e7ff;color:#4338ca;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:13px">
                \${user.name.charAt(0)}
              </div>
              <div>
                <div style="font-weight:500;font-size:14px">\${user.name}</div>
                <div style="font-size:12px;color:#64748b">\${user.email}</div>
              </div>
            </div>
          \`)}
        </div>
      \` : null}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createHttpClient \u2014 Fetch Users",{allowNetwork:!0})}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/data/interceptors">Interceptors</a> — transform requests and handle errors globally</li>
        <li><a href="/data/resource">Resource</a> — reactive async data fetching</li>
      </ul>
    </div>
  `}function Xe(){return n`
    <div>
      <h1>HTTP Interceptors</h1>
      <p>Interceptors let you transform requests before they're sent, process responses before they reach your code, and handle errors globally.</p>

      <h2>Adding Interceptors</h2>
      ${e(`import { createHttpClient } from 'onefold/http';

const http = createHttpClient({
  baseUrl: '/api',
  interceptors: {
    request: (config) => {
      // Add auth token to every request
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: \`Bearer \${token}\`,
        };
      }
      return config;
    },
    response: (response) => {
      // Log all responses
      console.log(\`[\${response.status}] \${response.url}\`);
      return response;
    },
    error: (error) => {
      // Global error handling
      if (error.status === 401) {
        navigate('/login');
      }
      throw error; // re-throw to propagate
    },
  },
});`)}

      <h2>Interceptor Pipeline</h2>
      <p>The execution order is:</p>
      <ol>
        <li><strong>Request interceptor</strong> — modify config (headers, body, URL) before fetch.</li>
        <li><strong>Network request</strong> — the actual HTTP call.</li>
        <li><strong>Response interceptor</strong> — process/transform successful responses.</li>
        <li><strong>Error interceptor</strong> — handle non-2xx responses or network failures.</li>
      </ol>

      ${l("Each interceptor must return the config/response (or a modified version). Forgetting to return will break the chain.")}

      <h2>Use Cases</h2>

      <h3>Token Refresh</h3>
      ${e(`interceptors: {
  error: async (error) => {
    if (error.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const newToken = await refreshToken();
      localStorage.setItem('token', newToken);
      return http.request(error.config); // retry
    }
    throw error;
  },
}`)}

      <h3>Request Timing</h3>
      ${e(`interceptors: {
  request: (config) => {
    config._startTime = performance.now();
    return config;
  },
  response: (response) => {
    const duration = performance.now() - response.config._startTime;
    console.log(\`Request took \${duration.toFixed(0)}ms\`);
    return response;
  },
}`)}

      <h2>API</h2>
      <table>
        <tr><th>Interceptor</th><th>Signature</th><th>Description</th></tr>
        <tr><td><code>request</code></td><td>(config) => config</td><td>Modify request before sending.</td></tr>
        <tr><td><code>response</code></td><td>(response) => response</td><td>Process successful responses.</td></tr>
        <tr><td><code>error</code></td><td>(error) => throw | response</td><td>Handle errors globally.</td></tr>
      </table>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/data/http-client">HTTP Client</a> — typed HTTP client setup and usage</li>
        <li><a href="/security/guards">RBAC Guards</a> — role-based access control for routes</li>
      </ul>
    </div>
  `}function Qe(){return n`
    <div>
      <h1>Forms</h1>
      <p><code>createForm</code> provides reactive form management with field-level state tracking, validation, dirty/touched states, and submission handling.</p>

      <h2>Basic Usage</h2>
      ${e(`import { createForm, required, email } from 'onefold/form';

const form = createForm({
  fields: {
    name: { initial: '', rules: [required()] },
    email: { initial: '', rules: [required(), email()] },
    age: { initial: 18, rules: [] },
  },
  onSubmit: (values) => {
    console.log('Submitted:', values);
  },
});`)}

      <h2>Binding to Templates</h2>
      ${e(`function ContactForm(): Node {
  const form = createForm({
    fields: {
      name: { initial: '', rules: [required()] },
      email: { initial: '', rules: [required(), email()] },
      message: { initial: '', rules: [required()] },
    },
    onSubmit: async (values) => {
      await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(values),
      });
    },
  });

  return html\`
    <form onsubmit=\${form.handleSubmit}>
      <div>
        <label>Name</label>
        <input
          value=\${() => form.field('name').value()}
          oninput=\${(e: Event) => form.field('name').set((e.target as HTMLInputElement).value)}
          onblur=\${() => form.field('name').touch()}
        />
        \${() => form.field('name').error()
          ? html\`<span class="error">\${form.field('name').error()}</span>\`
          : html\`<span></span>\`
        }
      </div>

      <button type="submit" disabled=\${() => !form.valid()}>
        Submit
      </button>
    </form>
  \`;
}`)}

      <h2>Field API</h2>
      <table>
        <tr><th>Property/Method</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>.value()</code></td><td>T</td><td>Current field value (reactive).</td></tr>
        <tr><td><code>.set(value)</code></td><td>void</td><td>Update the field value.</td></tr>
        <tr><td><code>.error()</code></td><td>string | null</td><td>First validation error (reactive).</td></tr>
        <tr><td><code>.errors()</code></td><td>string[]</td><td>All validation errors (reactive).</td></tr>
        <tr><td><code>.touched()</code></td><td>boolean</td><td>True after user interaction.</td></tr>
        <tr><td><code>.touch()</code></td><td>void</td><td>Mark field as touched.</td></tr>
        <tr><td><code>.dirty()</code></td><td>boolean</td><td>True if value differs from initial.</td></tr>
        <tr><td><code>.reset()</code></td><td>void</td><td>Reset to initial value.</td></tr>
      </table>

      <h2>Form API</h2>
      <table>
        <tr><th>Property/Method</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>form.valid()</code></td><td>boolean</td><td>True when all fields pass validation.</td></tr>
        <tr><td><code>form.dirty()</code></td><td>boolean</td><td>True when any field is dirty.</td></tr>
        <tr><td><code>form.field(name)</code></td><td>Field</td><td>Access a field's reactive state.</td></tr>
        <tr><td><code>form.handleSubmit</code></td><td>(e: Event) => void</td><td>Submit handler (prevents default, validates, calls onSubmit).</td></tr>
        <tr><td><code>form.reset()</code></td><td>void</td><td>Reset all fields to initial values.</td></tr>
        <tr><td><code>form.values()</code></td><td>Record</td><td>Current values of all fields.</td></tr>
      </table>

      ${l("Validation runs on every .set() call. Errors are reactive \u2014 your UI updates automatically when a field becomes valid or invalid.")}

      ${p(`import { html, mount } from 'onefold';
import { createForm, required, email, minLength } from 'onefold/form';

function App() {
  const form = createForm({
    name: { initial: '', rules: [required('Name is required'), minLength(2, 'At least 2 characters')] },
    email: { initial: '', rules: [required('Email is required'), email('Must be a valid email')] },
    password: { initial: '', rules: [required('Password is required'), minLength(6, 'At least 6 characters')] },
  });

  const submitted = { value: false, data: null };

  function handleSubmit(values) {
    submitted.value = true;
    submitted.data = values;
  }

  return html\`
    <div>
      <h3>Registration Form \u2014 createForm</h3>
      <form onsubmit=\${(e) => { e.preventDefault(); form.submit(handleSubmit); }}>
        <div style="margin-bottom:14px">
          <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px">Name</label>
          <input
            type="text"
            oninput=\${form.fields.name.handle}
            placeholder="Your name"
            style="width:100%"
          />
          \${() => form.fields.name.error() ? html\`<p style="color:#dc2626;font-size:12px;margin-top:4px">\${form.fields.name.error()}</p>\` : null}
        </div>
        <div style="margin-bottom:14px">
          <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px">Email</label>
          <input
            type="email"
            oninput=\${form.fields.email.handle}
            placeholder="you@example.com"
            style="width:100%"
          />
          \${() => form.fields.email.error() ? html\`<p style="color:#dc2626;font-size:12px;margin-top:4px">\${form.fields.email.error()}</p>\` : null}
        </div>
        <div style="margin-bottom:14px">
          <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px">Password</label>
          <input
            type="password"
            oninput=\${form.fields.password.handle}
            placeholder="Min 6 characters"
            style="width:100%"
          />
          \${() => form.fields.password.error() ? html\`<p style="color:#dc2626;font-size:12px;margin-top:4px">\${form.fields.password.error()}</p>\` : null}
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <button type="submit">Register</button>
          <button type="button" onclick=\${() => form.reset()}>Reset</button>
          <span style="font-size:12px;color:#666;margin-left:auto">
            \${() => form.valid() ? '\u2713 Valid' : '\u2717 Invalid'} \xB7 \${() => form.dirty() ? 'Modified' : 'Pristine'}
          </span>
        </div>
      </form>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createForm \u2014 Registration with Validation")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/forms/validation">Validation Rules</a> — built-in and custom validation rules</li>
        <li><a href="/data/http-client">HTTP Client</a> — submit form data to your API</li>
      </ul>
    </div>
  `}function Ze(){return n`
    <div>
      <h1>Validation Rules</h1>
      <p>onefold ships with 8 built-in validation rules. Combine them per field or write custom validators.</p>

      <h2>Built-in Rules</h2>
      <table>
        <tr><th>Rule</th><th>Import</th><th>Description</th></tr>
        <tr><td><code>required()</code></td><td><code>required</code></td><td>Value must be non-empty (trims whitespace).</td></tr>
        <tr><td><code>email()</code></td><td><code>email</code></td><td>Must match a valid email pattern.</td></tr>
        <tr><td><code>minLength(n)</code></td><td><code>minLength</code></td><td>String length must be at least n.</td></tr>
        <tr><td><code>maxLength(n)</code></td><td><code>maxLength</code></td><td>String length must be at most n.</td></tr>
        <tr><td><code>pattern(re)</code></td><td><code>pattern</code></td><td>Must match the given RegExp.</td></tr>
        <tr><td><code>min(n)</code></td><td><code>min</code></td><td>Numeric value must be at least n.</td></tr>
        <tr><td><code>max(n)</code></td><td><code>max</code></td><td>Numeric value must be at most n.</td></tr>
        <tr><td><code>custom(fn)</code></td><td><code>custom</code></td><td>Custom validation function.</td></tr>
      </table>

      <h2>Usage</h2>
      ${e(`import { createForm, required, email, minLength, maxLength, min, max, pattern, custom } from 'onefold/form';

const form = createForm({
  fields: {
    username: {
      initial: '',
      rules: [required(), minLength(3), maxLength(20)],
    },
    email: {
      initial: '',
      rules: [required(), email()],
    },
    age: {
      initial: 18,
      rules: [min(13), max(120)],
    },
    phone: {
      initial: '',
      rules: [pattern(/^\\+?[\\d\\s-]{10,}$/)],
    },
    password: {
      initial: '',
      rules: [
        required(),
        minLength(8),
        custom((value) =>
          /[A-Z]/.test(value) ? null : 'Must contain an uppercase letter'
        ),
        custom((value) =>
          /[0-9]/.test(value) ? null : 'Must contain a number'
        ),
      ],
    },
  },
  onSubmit: (values) => console.log(values),
});`)}

      <h2>Custom Validators</h2>
      <p>The <code>custom()</code> rule takes a function that returns <code>null</code> for valid or an error string:</p>
      ${e(`// Synchronous custom validator
custom((value) => {
  if (value.includes(' ')) return 'No spaces allowed';
  return null;
})

// Confirm password match
const form = createForm({
  fields: {
    password: { initial: '', rules: [required(), minLength(8)] },
    confirm: {
      initial: '',
      rules: [
        required(),
        custom((value) =>
          value === form.field('password').value()
            ? null
            : 'Passwords do not match'
        ),
      ],
    },
  },
  onSubmit: (values) => { /* ... */ },
});`)}

      ${l("Rules are evaluated in order. The first failing rule produces the .error() value. All failures appear in .errors().")}

      <h2>Custom Error Messages</h2>
      <p>Each built-in rule accepts an optional message parameter:</p>
      ${e(`rules: [
  required('Please enter your name'),
  minLength(3, 'Name must be at least 3 characters'),
  email('Please enter a valid email address'),
]`)}

      <h2>Try It</h2>
      <p>All built-in rules in action. Interact with each field to see validation errors appear:</p>

      ${p(`import { html, mount } from 'onefold';
import { createForm, required, email, minLength, maxLength, min, max, pattern, custom } from 'onefold/form';

function App() {
  const form = createForm({
    username: { initial: '', rules: [
      required('Username is required'),
      minLength(3, 'At least 3 characters'),
      maxLength(20, 'Max 20 characters'),
      pattern(/^[a-zA-Z0-9_]+$/, 'Only letters, numbers, underscore'),
    ]},
    email: { initial: '', rules: [
      required('Email is required'),
      email('Invalid email format'),
    ]},
    age: { initial: 0, rules: [
      min(13, 'Must be at least 13'),
      max(120, 'Must be under 120'),
    ]},
    website: { initial: '', rules: [
      custom((v) => !v || v.startsWith('https://'), 'Must start with https://'),
    ]},
  });

  return html\`
    <div>
      <h3>All Validation Rules</h3>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px">Username (required, 3-20 chars, alphanumeric)</label>
        <input oninput=\${form.fields.username.handle} placeholder="johndoe" style="width:100%" />
        \${() => form.fields.username.error() ? html\`<p style="color:#dc2626;font-size:12px;margin-top:3px">\${form.fields.username.error()}</p>\` : null}
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px">Email (required, email format)</label>
        <input type="email" oninput=\${form.fields.email.handle} placeholder="you@example.com" style="width:100%" />
        \${() => form.fields.email.error() ? html\`<p style="color:#dc2626;font-size:12px;margin-top:3px">\${form.fields.email.error()}</p>\` : null}
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px">Age (min: 13, max: 120)</label>
        <input type="number" oninput=\${form.fields.age.handle} placeholder="25" style="width:100%" />
        \${() => form.fields.age.error() ? html\`<p style="color:#dc2626;font-size:12px;margin-top:3px">\${form.fields.age.error()}</p>\` : null}
      </div>

      <div style="margin-bottom:12px">
        <label style="display:block;font-size:13px;font-weight:600;margin-bottom:4px">Website (custom: must start with https://)</label>
        <input oninput=\${form.fields.website.handle} placeholder="https://example.com" style="width:100%" />
        \${() => form.fields.website.error() ? html\`<p style="color:#dc2626;font-size:12px;margin-top:3px">\${form.fields.website.error()}</p>\` : null}
      </div>

      <div style="display:flex;gap:8px;align-items:center;margin-top:16px;padding-top:12px;border-top:1px solid #e5e7eb">
        <button onclick=\${() => form.submit((v) => alert('Submitted: ' + JSON.stringify(v)))}>Submit</button>
        <button onclick=\${() => form.reset()}>Reset All</button>
        <span style="font-size:12px;color:#666;margin-left:auto">\${() => form.valid() ? '\u2713 All valid' : '\u2717 Has errors'}</span>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"All Validation Rules \u2014 required, email, minLength, maxLength, min, max, pattern, custom")}
    </div>
  `}function et(){return n`
    <div>
      <h1>configureSecurity</h1>
      <p>Establish a security perimeter for remote module loading. Call <code>configureSecurity</code> once at app startup — before any <code>loadRemote</code> calls — to enforce origin whitelisting, SRI integrity checks, timeouts, and sandboxing.</p>

      ${l('If you have not used loadRemote yet, start with the <a href="/microfrontends/load-remote">loadRemote</a> page to understand how remote modules work, then come back here to lock them down.')}

      <h2>When Do You Need This?</h2>
      <p><code>loadRemote</code> works without <code>configureSecurity</code> — but in production you should always configure it to prevent untrusted code from executing in your app. It answers: <em>which origins can load code into my application?</em></p>

      <h2>Configuration</h2>
      ${e(`import { configureSecurity } from 'onefold/remote';

configureSecurity({
  trustedOrigins: ['https://cdn.example.com', 'https://widgets.example.com'],
  requireIntegrity: true,
  blockAll: false,
  timeout: 10000,
});`)}

      <h2>Options</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
        <tr><td><code>trustedOrigins</code></td><td>string[]</td><td>[]</td><td>Allowed origins for remote modules.</td></tr>
        <tr><td><code>requireIntegrity</code></td><td>boolean</td><td>false</td><td>Require SRI hash for all remote loads.</td></tr>
        <tr><td><code>blockAll</code></td><td>boolean</td><td>false</td><td>Block all remote loading (kill switch).</td></tr>
        <tr><td><code>timeout</code></td><td>number</td><td>10000</td><td>Maximum load time in ms before failing.</td></tr>
      </table>

      <h2>The 7 Security Layers</h2>
      <ol>
        <li><strong>Origin Allowlist</strong> — Only modules from <code>trustedOrigins</code> can be loaded. All other origins are rejected before any network request.</li>
        <li><strong>SRI Integrity</strong> — When <code>requireIntegrity</code> is true, every module must provide a hash. The fetched content is verified against the hash before execution.</li>
        <li><strong>Timeout</strong> — Modules that take longer than <code>timeout</code> ms are aborted. Prevents slow-loris attacks on the host application.</li>
        <li><strong>Isolation</strong> — Shadow DOM or iframe sandboxing prevents DOM access leaks between host and remote.</li>
        <li><strong>CSP Compatible</strong> — No <code>eval()</code>, no <code>Function()</code>, no inline scripts. Works with strict Content-Security-Policy headers.</li>
        <li><strong>Error Containment</strong> — Errors in remote modules are caught and contained. They cannot crash the host application.</li>
        <li><strong>Kill Switch</strong> — Set <code>blockAll: true</code> to instantly disable all remote module loading in production.</li>
      </ol>

      ${l("Always use requireIntegrity: true in production. Without it, a compromised CDN could serve malicious code that passes origin checks.","warn")}

      <h2>Production Example</h2>
      ${e(`configureSecurity({
  trustedOrigins: [
    'https://cdn.yourcompany.com',
    'https://widgets.yourcompany.com',
  ],
  requireIntegrity: true,
  blockAll: false,
  timeout: 8000,
});`)}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/microfrontends/sri">SRI Integrity</a> — generating and verifying integrity hashes</li>
        <li><a href="/microfrontends/isolation">Isolation Modes</a> — Shadow DOM and iframe sandboxing</li>
        <li><a href="/microfrontends/deployment">Deployment</a> — deploying microfrontend architectures</li>
      </ul>
    </div>
  `}function tt(){return n`
    <div>
      <h1>loadRemote</h1>
      <p>Load remote ES modules as components at runtime. This is the core API for building microfrontend architectures with onefold — compose independently deployed modules into a single host application.</p>

      <h2>What are Microfrontends?</h2>
      <p>Microfrontends split a large frontend into smaller, independently built and deployed pieces. Each team owns a "remote" module that the host application loads at runtime. onefold provides:</p>
      <ul>
        <li><strong>loadRemote</strong> — fetch and render remote modules dynamically</li>
        <li><strong>Isolation</strong> — sandbox remotes with Shadow DOM or iframes</li>
        <li><strong>Security</strong> — origin allowlisting, SRI integrity, and sandboxing</li>
        <li><strong>Communication</strong> — type-safe messaging between host and remotes</li>
      </ul>

      <h2>Basic Usage</h2>
      <p>The simplest way to load a remote module — provide a URL and an optional fallback:</p>
      ${e(`import { html } from 'onefold';
import { loadRemote } from 'onefold/remote';

function App(): Node {
  return html\`
    <div>
      <h1>Host Application</h1>
      \${loadRemote({
        url: 'https://cdn.example.com/widgets/billing.js',
        fallback: () => html\`<p>Loading billing widget...</p>\`,
      })}
    </div>
  \`;
}`)}

      ${l("The remote module must export a default function that returns a Node. onefold calls it with the provided props.")}

      <h2>Remote Module Format</h2>
      <p>A remote is a standard ES module with a default export:</p>
      ${e(`// billing-widget.ts (deployed separately)
import { html, createSignal } from 'onefold';

export default function BillingWidget(props: { plan: string }): Node {
  const expanded = createSignal(false);

  return html\`
    <div class="billing">
      <h3>Plan: \${props.plan}</h3>
      <button onclick=\${() => expanded.set(v => !v)}>Details</button>
      \${() => expanded() ? html\`<p>Billing details here...</p>\` : html\`<span></span>\`}
    </div>
  \`;
}`)}

      <h2>Passing Props</h2>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widgets/billing.js',
  props: { plan: 'enterprise', userId: '42' },
  fallback: () => html\`<p>Loading...</p>\`,
})`)}

      <h2>Error Handling</h2>
      <p>Provide an <code>onError</code> handler for graceful degradation when a remote fails to load:</p>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widgets/billing.js',
  fallback: () => html\`<p>Loading...</p>\`,
  onError: (err) => html\`<p class="error">Widget unavailable: \${err.message}</p>\`,
})`)}

      <h2>With Integrity Verification</h2>
      <p>Add SRI hashes to verify the remote hasn't been tampered with:</p>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widgets/billing.js',
  integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux...',
  fallback: () => html\`<p>Loading...</p>\`,
})`)}

      <h2>With Isolation</h2>
      <p>Isolate the remote's DOM and styles from the host:</p>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widgets/legacy.js',
  isolation: 'shadow',  // Shadow DOM \u2014 styles don't leak in or out
  fallback: () => html\`<p>Loading...</p>\`,
})`)}

      <h2>Options Reference</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>url</code></td><td>string</td><td>Yes</td><td>URL of the remote ES module.</td></tr>
        <tr><td><code>integrity</code></td><td>string</td><td>No*</td><td>SRI hash for verification.</td></tr>
        <tr><td><code>fallback</code></td><td>() => Node</td><td>No</td><td>UI shown while loading.</td></tr>
        <tr><td><code>onError</code></td><td>(err) => Node</td><td>No</td><td>UI shown on load failure.</td></tr>
        <tr><td><code>props</code></td><td>Record</td><td>No</td><td>Props passed to the remote component.</td></tr>
        <tr><td><code>isolation</code></td><td>'none' | 'shadow' | 'iframe'</td><td>No</td><td>DOM isolation mode.</td></tr>
        <tr><td><code>timeout</code></td><td>number</td><td>No</td><td>Override global timeout (ms) for this load.</td></tr>
      </table>

      <p>* Required when <code>configureSecurity({ requireIntegrity: true })</code> is set.</p>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/microfrontends/isolation">Isolation Modes</a> — Shadow DOM vs iframe sandboxing</li>
        <li><a href="/microfrontends/communication">Communication</a> — messaging between host and remotes</li>
        <li><a href="/microfrontends/security">configureSecurity</a> — origin allowlisting and security perimeter</li>
        <li><a href="/microfrontends/sri">SRI Integrity</a> — verifying remote code hasn't been tampered with</li>
      </ul>
    </div>
  `}function ot(){return n`
    <div>
      <h1>Isolation Modes</h1>
      <p>Control how remote microfrontends interact with the host DOM. Choose the right level of isolation for your use case.</p>

      <h2>Comparison</h2>
      <table>
        <tr><th>Mode</th><th>DOM Access</th><th>Style Leak</th><th>JS Scope</th><th>Performance</th><th>Use Case</th></tr>
        <tr><td><code>none</code></td><td>Full</td><td>Yes</td><td>Shared</td><td>Best</td><td>Trusted, same-team remotes</td></tr>
        <tr><td><code>shadow</code></td><td>Scoped</td><td>No</td><td>Shared</td><td>Good</td><td>Style isolation needed</td></tr>
        <tr><td><code>iframe</code></td><td>None</td><td>No</td><td>Isolated</td><td>Fair</td><td>Untrusted or legacy code</td></tr>
      </table>

      <h2>None (Default)</h2>
      <p>The remote component renders directly into the host DOM. No boundaries.</p>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widget.js',
  isolation: 'none', // default
})`)}
      <ul>
        <li>Host CSS affects the remote.</li>
        <li>Remote can access host DOM via standard APIs.</li>
        <li>Best performance — no extra layers.</li>
      </ul>

      <h2>Shadow DOM</h2>
      <p>Renders the remote inside a Shadow DOM boundary. Styles are encapsulated.</p>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widget.js',
  isolation: 'shadow',
})`)}
      <ul>
        <li>Host styles don't leak into the remote.</li>
        <li>Remote styles don't affect the host.</li>
        <li>JavaScript scope is still shared (same window).</li>
        <li>Good for design system isolation between teams.</li>
      </ul>

      <h2>Iframe</h2>
      <p>Full isolation via a sandboxed iframe. The remote runs in a separate browsing context.</p>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widget.js',
  isolation: 'iframe',
})`)}
      <ul>
        <li>Complete DOM isolation.</li>
        <li>Separate JavaScript execution context.</li>
        <li>Communication via <code>postMessage</code> only.</li>
        <li>Higher memory overhead.</li>
        <li>Best for untrusted third-party code.</li>
      </ul>

      ${l('Use "shadow" for same-organization teams that need style isolation. Use "iframe" only for untrusted or legacy code that might pollute globals.',"warn")}

      <h2>Choosing the Right Mode</h2>
      <table>
        <tr><th>Scenario</th><th>Recommended</th></tr>
        <tr><td>Internal widget, same design system</td><td><code>none</code></td></tr>
        <tr><td>Internal widget, different team/styles</td><td><code>shadow</code></td></tr>
        <tr><td>Third-party embed, untrusted code</td><td><code>iframe</code></td></tr>
        <tr><td>Legacy jQuery/Angular widget</td><td><code>iframe</code></td></tr>
      </table>
    </div>
  `}function rt(){return n`
    <div>
      <h1>Communication</h1>
      <p>How host and remote microfrontends exchange data. The pattern depends on the isolation mode.</p>

      <h2>Host → Remote (Props)</h2>
      <p>Pass data down via the <code>props</code> option. The remote's default export receives them as its argument.</p>
      ${e(`// Host
loadRemote({
  url: 'https://cdn.example.com/widgets/billing.js',
  props: {
    userId: currentUser().id,
    plan: 'pro',
    theme: 'dark',
  },
});

// Remote (billing.js)
export default function BillingWidget(props: {
  userId: string;
  plan: string;
  theme: string;
}): Node {
  return html\`<div class=\${props.theme}>Plan: \${props.plan}</div>\`;
}`)}

      <h2>Remote → Host (Callbacks)</h2>
      <p>Pass callback functions as props. The remote calls them to communicate back.</p>
      ${e(`// Host
function App(): Node {
  const handleUpgrade = (newPlan: string) => {
    console.log('User upgraded to:', newPlan);
    store.update({ plan: newPlan });
  };

  return html\`
    <div>
      \${loadRemote({
        url: 'https://cdn.example.com/widgets/billing.js',
        props: {
          plan: store().plan,
          onUpgrade: handleUpgrade,
        },
      })}
    </div>
  \`;
}

// Remote
export default function BillingWidget(props: {
  plan: string;
  onUpgrade: (plan: string) => void;
}): Node {
  return html\`
    <div>
      <p>Current: \${props.plan}</p>
      <button onclick=\${() => props.onUpgrade('enterprise')}>
        Upgrade to Enterprise
      </button>
    </div>
  \`;
}`)}

      <h2>Iframe Communication (postMessage)</h2>
      <p>When using <code>isolation: 'iframe'</code>, props and callbacks aren't available directly. Use <code>postMessage</code>:</p>
      ${e(`// Host \u2014 sending data to iframe remote
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://cdn.example.com') return;

  if (event.data.type === 'UPGRADE_REQUEST') {
    store.update({ plan: event.data.plan });
  }
});

// Remote (inside iframe) \u2014 sending data to host
window.parent.postMessage(
  { type: 'UPGRADE_REQUEST', plan: 'enterprise' },
  'https://host-app.example.com'
);`)}

      ${l("Always validate event.origin in postMessage handlers. Never trust messages from unknown origins.","warn")}

      <h2>Communication Summary</h2>
      <table>
        <tr><th>Isolation</th><th>Host → Remote</th><th>Remote → Host</th></tr>
        <tr><td><code>none</code></td><td>Props (direct)</td><td>Callbacks (direct)</td></tr>
        <tr><td><code>shadow</code></td><td>Props (direct)</td><td>Callbacks (direct)</td></tr>
        <tr><td><code>iframe</code></td><td>postMessage</td><td>postMessage</td></tr>
      </table>
    </div>
  `}function nt(){return n`
    <div>
      <h1>SRI (Subresource Integrity)</h1>
      <p>SRI ensures that fetched remote modules haven't been tampered with. The browser (or onefold's loader) verifies a cryptographic hash of the file's content before execution.</p>

      <h2>How It Works</h2>
      <ol>
        <li>You compute a hash of the remote module at build/deploy time.</li>
        <li>You provide that hash in the <code>integrity</code> option.</li>
        <li>onefold fetches the module, computes its hash, and compares.</li>
        <li>If hashes don't match → load is rejected, <code>onError</code> fires.</li>
      </ol>

      <h2>Usage</h2>
      ${e(`loadRemote({
  url: 'https://cdn.example.com/widgets/billing.js',
  integrity: 'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxANQFe...',
  fallback: () => html\`<p>Loading...</p>\`,
  onError: (err) => html\`<p class="error">Integrity check failed</p>\`,
});`)}

      <h2>Generating Hashes</h2>
      <p>Use any of these commands to generate an SRI hash:</p>

      <h3>OpenSSL</h3>
      ${e("openssl dgst -sha384 -binary billing.js | openssl base64 -A")}

      <h3>shasum + base64</h3>
      ${e("shasum -b -a 384 billing.js | awk '{ print $1 }' | xxd -r -p | base64")}

      <h3>Node.js</h3>
      ${e(`const crypto = require('crypto');
const fs = require('fs');

const content = fs.readFileSync('billing.js');
const hash = crypto.createHash('sha384').update(content).digest('base64');
console.log(\`sha384-\${hash}\`);`)}

      <h2>Attack Comparison</h2>
      <table>
        <tr><th>Attack</th><th>Without SRI</th><th>With SRI</th></tr>
        <tr><td>CDN compromise</td><td>Malicious code executes</td><td>Load rejected, fallback shown</td></tr>
        <tr><td>Man-in-the-middle</td><td>Injected code runs</td><td>Hash mismatch, blocked</td></tr>
        <tr><td>DNS hijacking</td><td>Fake module loads</td><td>Origin check + hash fails</td></tr>
        <tr><td>Cache poisoning</td><td>Stale/malicious cache served</td><td>Hash mismatch, blocked</td></tr>
      </table>

      ${l("SRI hashes must be regenerated every time the remote module is rebuilt. Automate this in your CI/CD pipeline.","warn")}

      <h2>Hash Validity</h2>
      <p>Supported algorithms (in order of preference):</p>
      <ul>
        <li><strong>sha512</strong> — strongest, recommended for high-security environments</li>
        <li><strong>sha384</strong> — standard, used by most CDNs</li>
        <li><strong>sha256</strong> — minimum acceptable strength</li>
      </ul>
      <p>The integrity string format is: <code>algorithm-base64hash</code></p>
      ${e(`// Valid formats
'sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/ux...'
'sha512-abc123def456...'
'sha256-xyz789...'`)}
    </div>
  `}function it(){return n`
    <div>
      <h1>Deployment</h1>
      <p>Microfrontends in onefold are independently deployable ES modules. Each team owns their remote, deploys on their own schedule, and the host loads them at runtime.</p>

      <h2>Independent Deployment</h2>
      <ul>
        <li>Each remote is built and deployed separately.</li>
        <li>The host only knows the remote's URL — not its source.</li>
        <li>Teams can use different CI/CD pipelines, release cadences, and environments.</li>
        <li>SRI hashes are updated in the host config when a remote deploys.</li>
      </ul>

      <h2>Project Structure</h2>
      ${e(`my-microfrontend-app/
\u251C\u2500\u2500 host/                    # Host shell application
\u2502   \u251C\u2500\u2500 src/
\u2502   \u2502   \u251C\u2500\u2500 main.ts         # Router + loadRemote calls
\u2502   \u2502   \u2514\u2500\u2500 config.ts       # Remote URLs + integrity hashes
\u2502   \u251C\u2500\u2500 package.json
\u2502   \u2514\u2500\u2500 build.mjs
\u251C\u2500\u2500 remotes/
\u2502   \u251C\u2500\u2500 billing/            # Billing team's widget
\u2502   \u2502   \u251C\u2500\u2500 src/index.ts
\u2502   \u2502   \u251C\u2500\u2500 package.json
\u2502   \u2502   \u2514\u2500\u2500 build.mjs
\u2502   \u251C\u2500\u2500 analytics/          # Analytics team's widget
\u2502   \u2502   \u251C\u2500\u2500 src/index.ts
\u2502   \u2502   \u251C\u2500\u2500 package.json
\u2502   \u2502   \u2514\u2500\u2500 build.mjs
\u2502   \u2514\u2500\u2500 shared/             # Shared component library
\u2514\u2500\u2500 package.json            # Workspace root (optional)`)}

      <h2>Performance Features</h2>
      <table>
        <tr><th>Feature</th><th>Description</th></tr>
        <tr><td>Lazy loading</td><td>Remotes load only when their route is visited.</td></tr>
        <tr><td>Parallel loading</td><td>Multiple remotes can load concurrently.</td></tr>
        <tr><td>Caching</td><td>Loaded modules are cached — subsequent navigations are instant.</td></tr>
        <tr><td>Prefetch</td><td>Preload remotes on hover/idle for perceived performance.</td></tr>
        <tr><td>Fallback UI</td><td>Show skeleton/spinner while loading.</td></tr>
      </table>

      <h2>Error Handling</h2>
      ${e(`loadRemote({
  url: remoteConfig.billingUrl,
  integrity: remoteConfig.billingHash,
  timeout: 5000,
  fallback: () => html\`<div class="skeleton">Loading billing...</div>\`,
  onError: (err) => html\`
    <div class="error-card">
      <h3>Billing widget unavailable</h3>
      <p>\${err.message}</p>
      <button onclick=\${() => location.reload()}>Retry</button>
    </div>
  \`,
});`)}

      <h2>CLI Scaffold</h2>
      <p>Use <code>create-onefold</code> to scaffold a microfrontend project:</p>
      ${e(`npm create onefold@latest my-app -- --template microfrontend

# Creates:
# my-app/
#   host/          \u2014 Host shell with router
#   remotes/       \u2014 Example remote widgets
#   build.mjs      \u2014 Build script for all packages`)}

      ${l("Each remote should be served with immutable cache headers (e.g., Cache-Control: public, max-age=31536000, immutable) and content-addressed filenames for cache busting.")}
    </div>
  `}function at(){return n`
    <div>
      <h1>Shared Dependencies</h1>
      <p>When multiple remotes use onefold (or other shared libraries), Import Maps prevent duplicate downloads and ensure a single instance.</p>

      <h2>The Problem</h2>
      <p>Without sharing, each remote bundles its own copy of onefold. This means:</p>
      <ul>
        <li>3kb × N remotes downloaded redundantly.</li>
        <li>Multiple signal systems — signals don't cross remote boundaries.</li>
        <li>Larger memory footprint.</li>
      </ul>

      <h2>Import Maps Solution</h2>
      ${e(`<!-- index.html (host) -->
<script type="importmap">
{
  "imports": {
    "onefold": "https://cdn.example.com/onefold@1.2.0/index.js"
  }
}
<\/script>`)}

      <p>Remotes use bare imports that resolve via the map:</p>
      ${e(`// Remote widget \u2014 bare import (resolved by import map)
import { html, createSignal } from 'onefold';

export default function Widget(): Node {
  const count = createSignal(0);
  return html\`<button onclick=\${() => count.set(n => n + 1)}>\${() => count()}</button>\`;
}`)}

      <h2>Comparison</h2>
      <table>
        <tr><th>Approach</th><th>Bundle Size</th><th>Shared State</th><th>Complexity</th></tr>
        <tr><td>Each remote bundles onefold</td><td>Large (duplicated)</td><td>No</td><td>Low</td></tr>
        <tr><td>Import Map (shared)</td><td>Minimal (single copy)</td><td>Yes</td><td>Medium</td></tr>
        <tr><td>External (CDN + global)</td><td>Minimal</td><td>Yes</td><td>Medium</td></tr>
      </table>

      <h2>Versioning Strategy</h2>
      <p>Pin the shared dependency to a specific version in the import map:</p>
      ${e(`{
  "imports": {
    "onefold": "https://cdn.example.com/onefold@1.2.0/index.js"
  }
}`)}
      <ul>
        <li><strong>Patch updates</strong> — safe to update the import map URL. Remotes don't need redeployment.</li>
        <li><strong>Minor updates</strong> — generally safe. Test remotes against the new version first.</li>
        <li><strong>Major updates</strong> — coordinate with all teams. Update remotes before changing the map.</li>
      </ul>

      ${l("Import Maps are supported in all modern browsers. For older browsers, use the es-module-shims polyfill.")}

      <h2>Build Configuration</h2>
      <p>Mark <code>onefold</code> as external in your remote's build config so it's not bundled:</p>
      ${e(`// esbuild config for remote
import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  format: 'esm',
  external: ['onefold'],  // Don't bundle \u2014 resolved via import map
  outfile: 'dist/widget.js',
});`)}
    </div>
  `}function st(){return n`
    <div>
      <h1>Cross-Framework Integration</h1>
      <p>Embed React, Vue, or other framework components inside onefold apps — or load legacy apps in isolated iframes.</p>

      <h2>embedForeign (React/Vue)</h2>
      ${e(`import { embedForeign } from 'onefold/interop';

// Embed a React component
const ReactWidget = embedForeign({
  mount: (container, props) => {
    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(container);
      root.render(React.createElement(MyReactComponent, props));
      return { root };
    });
  },
  unmount: (container, { root }) => {
    root.unmount();
  },
  props: { title: 'Hello from onefold' },
});`)}

      <h2>Embed Vue</h2>
      ${e(`const VueWidget = embedForeign({
  mount: (container, props) => {
    import('vue').then(({ createApp }) => {
      const app = createApp(MyVueComponent, props);
      app.mount(container);
      return { app };
    });
  },
  unmount: (container, { app }) => {
    app.unmount();
  },
  props: { message: 'Hello from onefold' },
});`)}

      <h2>loadRemote with iframe (Legacy)</h2>
      <p>For legacy jQuery/Angular.js apps that pollute globals:</p>
      ${e(`loadRemote({
  url: 'https://legacy.example.com/widget.js',
  isolation: 'iframe',
  fallback: () => html\`<p>Loading legacy widget...</p>\`,
});`)}

      ${l("iframe isolation is the safest option for legacy code that uses document.write, global variables, or older module formats.")}

      <h2>Comparison</h2>
      <table>
        <tr><th>Approach</th><th>Framework</th><th>Isolation</th><th>Performance</th></tr>
        <tr><td><code>embedForeign</code></td><td>React, Vue, Svelte</td><td>None (shared DOM)</td><td>Good</td></tr>
        <tr><td><code>loadRemote</code> + iframe</td><td>Any / Legacy</td><td>Full</td><td>Fair</td></tr>
      </table>
    </div>
  `}function lt(){return n`
    <div>
      <h1>Microfrontend API Reference</h1>
      <p>Complete reference for <code>loadRemote</code> and <code>configureSecurity</code>.</p>

      <h2>loadRemote(options)</h2>
      ${f(`<table>
        <tr><th>Option</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr>
        <tr><td><code>url</code></td><td>string</td><td>Yes</td><td>\u2014</td><td>URL of the remote ES module.</td></tr>
        <tr><td><code>integrity</code></td><td>string</td><td>No*</td><td>\u2014</td><td>SRI hash (sha256/sha384/sha512).</td></tr>
        <tr><td><code>fallback</code></td><td>() => Node</td><td>No</td><td>\u2014</td><td>UI to show while loading.</td></tr>
        <tr><td><code>onError</code></td><td>(err: Error) => Node</td><td>No</td><td>\u2014</td><td>UI to show on failure.</td></tr>
        <tr><td><code>props</code></td><td>Record&lt;string, any&gt;</td><td>No</td><td>{}</td><td>Props passed to the remote default export.</td></tr>
        <tr><td><code>isolation</code></td><td>'none' | 'shadow' | 'iframe'</td><td>No</td><td>'none'</td><td>DOM isolation mode.</td></tr>
        <tr><td><code>timeout</code></td><td>number</td><td>No</td><td>10000</td><td>Max load time in ms (overrides global).</td></tr>
      </table>`)}
      <p>* Required when <code>configureSecurity({ requireIntegrity: true })</code> is active.</p>

      <h2>configureSecurity(options)</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr>
        <tr><td><code>trustedOrigins</code></td><td>string[]</td><td>No</td><td>[]</td><td>Allowed origins. Modules from other origins are rejected.</td></tr>
        <tr><td><code>requireIntegrity</code></td><td>boolean</td><td>No</td><td>false</td><td>Require SRI hash for all loadRemote calls.</td></tr>
        <tr><td><code>blockAll</code></td><td>boolean</td><td>No</td><td>false</td><td>Kill switch — blocks all remote loading.</td></tr>
        <tr><td><code>timeout</code></td><td>number</td><td>No</td><td>10000</td><td>Global timeout in ms for remote loads.</td></tr>
      </table>

      <h2>embedForeign(options)</h2>
      ${f(`<table>
        <tr><th>Option</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>mount</code></td><td>(container, props) => context</td><td>Yes</td><td>Mount the foreign framework into the container element.</td></tr>
        <tr><td><code>unmount</code></td><td>(container, context) => void</td><td>Yes</td><td>Cleanup when the node is removed from DOM.</td></tr>
        <tr><td><code>props</code></td><td>Record&lt;string, any&gt;</td><td>No</td><td>Props passed to the mount function.</td></tr>
      </table>`)}

      <h2>Return Values</h2>
      ${e(`// loadRemote returns a Node (renders immediately with fallback)
const node: Node = loadRemote({ url: '...', fallback: () => html\`...\` });

// configureSecurity returns void (global side effect)
configureSecurity({ trustedOrigins: ['...'] });

// embedForeign returns a Node
const node: Node = embedForeign({ mount: ..., unmount: ... });`)}
    </div>
  `}function dt(){return n`
    <div>
      <h1>Suspense</h1>
      <p><code>Suspense</code> shows a fallback UI while async children are loading. <code>SuspenseAll</code> waits for multiple async components before revealing content.</p>

      <h2>Suspense</h2>
      ${e(`import { html } from 'onefold';
import { Suspense } from 'onefold/suspense';

function App(): Node {
  return html\`
    <div>
      \${Suspense(
        () => UserProfile(),  // async component
        () => html\`<p>Loading profile...</p>\`  // fallback
      )}
    </div>
  \`;
}`)}

      <h2>SuspenseAll</h2>
      <p>Wait for multiple async resources before showing any content:</p>
      ${e(`import { html } from 'onefold';
import { SuspenseAll } from 'onefold/suspense';

function Dashboard(): Node {
  return html\`
    <div>
      \${SuspenseAll(
        [() => UserStats(), () => RecentActivity(), () => Notifications()],
        () => html\`<div class="skeleton">Loading dashboard...</div>\`
      )}
    </div>
  \`;
}`)}

      ${l("Suspense works with createResource, lazy(), and any component that returns a Promise<Node>.")}

      <h2>Nested Suspense</h2>
      ${e(`function App(): Node {
  return html\`
    <div>
      \${Suspense(
        () => html\`
          <div>
            <h1>Dashboard</h1>
            \${Suspense(
              () => ExpensiveChart(),
              () => html\`<div class="chart-skeleton"></div>\`
            )}
          </div>
        \`,
        () => html\`<p>Loading app...</p>\`
      )}
    </div>
  \`;
}`)}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>Suspense</code></td><td>(content, fallback)</td><td>Show fallback while content resolves.</td></tr>
        <tr><td><code>SuspenseAll</code></td><td>(contents[], fallback)</td><td>Show fallback until all contents resolve.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Click the button to simulate loading async content with a fallback:</p>

      ${p(`import { html, mount, createSignal } from 'onefold';
import { Suspense } from 'onefold/suspense';

function App() {
  const key = createSignal(0);

  function loadContent() {
    key.set(k => k + 1);
  }

  function AsyncPanel() {
    return Suspense(
      async () => {
        // Simulate network delay
        await new Promise(r => setTimeout(r, 1500));
        const items = ['Loaded item A', 'Loaded item B', 'Loaded item C', 'Loaded item D'];
        return html\`
          <div style="padding:16px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px">
            <h4 style="color:#166534;margin-bottom:8px">Content Loaded!</h4>
            <ul style="padding-left:16px">
              \${items.map(item => html\`<li style="margin:4px 0">\${item}</li>\`)}
            </ul>
            <p style="font-size:12px;color:#666;margin-top:8px">Loaded at: \${new Date().toLocaleTimeString()}</p>
          </div>
        \`;
      },
      {
        fallback: () => html\`
          <div style="padding:24px;text-align:center;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px">
            <div style="width:24px;height:24px;border:3px solid #e2e8f0;border-top-color:#4f46e5;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto"></div>
            <p style="margin-top:8px;font-size:13px;color:#64748b">Loading content...</p>
          </div>
        \`,
      }
    );
  }

  return html\`
    <div>
      <h3>Suspense \u2014 Async Loading</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">Shows fallback for 1.5s while async content loads.</p>
      <button onclick=\${loadContent} style="margin-bottom:12px">Reload Content</button>
      \${() => { key(); return AsyncPanel(); }}
      <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Suspense \u2014 Async Fallback")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/async/lazy-loading">Lazy Loading</a> — load components on demand with code splitting</li>
        <li><a href="/async/error-boundaries">Error Boundaries</a> — catch render errors gracefully</li>
      </ul>
    </div>
  `}function ct(){return n`
    <div>
      <h1>Lazy Loading</h1>
      <p><code>lazy()</code> enables code splitting by loading components on demand. The module is only fetched when the component is first rendered.</p>

      <h2>Basic Usage</h2>
      ${e(`import { lazy, html } from 'onefold';
import { Suspense } from 'onefold/suspense';

const HeavyChart = lazy(() => import('./components/HeavyChart'));

function Dashboard(): Node {
  return html\`
    <div>
      <h1>Dashboard</h1>
      \${Suspense(
        () => HeavyChart(),
        () => html\`<p>Loading chart...</p>\`
      )}
    </div>
  \`;
}`)}

      <h2>With Router</h2>
      <p>Combine <code>lazy()</code> with the router for route-level code splitting:</p>
      ${e(`import { Router, lazy } from 'onefold';

const Home = lazy(() => import('./pages/Home'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

const App = Router([
  { path: '/', view: () => Home() },
  { path: '/settings', view: () => Settings() },
  { path: '/analytics', view: () => Analytics() },
]);`)}

      ${l("lazy() caches the module after the first load. Navigating back to a lazy-loaded route is instant.")}

      <h2>How It Works</h2>
      <ol>
        <li>On first render, <code>lazy()</code> calls the import function.</li>
        <li>The browser fetches the chunk over the network.</li>
        <li>The module's default export is called to produce a Node.</li>
        <li>The Node replaces the fallback in the DOM.</li>
        <li>Subsequent renders use the cached module — no network request.</li>
      </ol>

      <h2>Module Format</h2>
      <p>The lazily-loaded module must have a default export returning a Node:</p>
      ${e(`// pages/Analytics.ts
import { html, createSignal } from 'onefold';

export default function Analytics(): Node {
  const period = createSignal('week');
  return html\`
    <div>
      <h2>Analytics</h2>
      <select onchange=\${(e: Event) => period.set((e.target as HTMLSelectElement).value)}>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
      <p>Showing: \${() => period()}</p>
    </div>
  \`;
}`)}

      <h2>Try It</h2>
      <p>Click "Load Heavy Component" — it simulates lazy loading with a delay:</p>

      ${p(`import { html, mount, createSignal, lazy } from 'onefold';

function App() {
  const showHeavy = createSignal(false);

  // lazy(loader, fallback) \u2014 loads the module on first call, shows fallback while loading
  const HeavyComponent = lazy(
    () => new Promise(resolve => {
      setTimeout(() => {
        resolve({
          default: () => html\`
            <div style="padding:20px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:8px;color:white">
              <h4>Heavy Component Loaded!</h4>
              <p style="font-size:13px;opacity:0.9;margin-top:8px">
                This simulates a code-split module that loads on demand.
                In a real app: lazy(() => import('./HeavyChart'))
              </p>
              <div style="margin-top:12px;display:flex;gap:8px">
                <div style="flex:1;height:40px;background:rgba(255,255,255,0.2);border-radius:4px"></div>
                <div style="flex:2;height:40px;background:rgba(255,255,255,0.15);border-radius:4px"></div>
                <div style="flex:1;height:40px;background:rgba(255,255,255,0.25);border-radius:4px"></div>
              </div>
            </div>
          \`
        });
      }, 2000);
    }),
    // Fallback shown while the module loads
    () => html\`
      <div style="padding:20px;text-align:center;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:8px">
        <div style="width:24px;height:24px;border:3px solid #e2e8f0;border-top-color:#764ba2;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto"></div>
        <p style="margin-top:8px;font-size:13px;color:#64748b">Loading component bundle...</p>
      </div>
    \`
  );

  return html\`
    <div>
      <h3>Lazy Loading \u2014 Code Splitting</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">
        lazy(loader, fallback) defers loading until the component is rendered. Click the button to trigger it.
      </p>
      <button onclick=\${() => showHeavy.set(true)} style="margin-bottom:12px">
        \${() => showHeavy() ? 'Loaded!' : 'Load Heavy Component (2s delay)'}
      </button>
      \${() => showHeavy() ? HeavyComponent({}) : null}
      <style>@keyframes spin { to { transform: rotate(360deg); } }</style>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"lazy(loader, fallback) \u2014 Code Splitting")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/performance/code-splitting">Code Splitting</a> — optimize bundle size with dynamic imports</li>
        <li><a href="/routing/router">Router</a> — route-level lazy loading integration</li>
      </ul>
    </div>
  `}function pt(){return n`
    <div>
      <h1>Error Boundaries</h1>
      <p><code>ErrorBoundary</code> catches errors thrown during rendering or in async operations. Instead of crashing the whole app, it shows a fallback UI.</p>

      <h2>Basic Usage</h2>
      ${e(`import { ErrorBoundary, html } from 'onefold';

function App(): Node {
  return html\`
    <div>
      \${ErrorBoundary(
        () => RiskyComponent(),
        (error) => html\`
          <div class="error-card">
            <h3>Something went wrong</h3>
            <p>\${error.message}</p>
            <button onclick=\${() => location.reload()}>Retry</button>
          </div>
        \`
      )}
    </div>
  \`;
}`)}

      <h2>With Suspense</h2>
      <p>Combine ErrorBoundary with Suspense for complete async handling:</p>
      ${e(`import { ErrorBoundary, html } from 'onefold';
import { Suspense } from 'onefold/suspense';

function App(): Node {
  return html\`
    <div>
      \${ErrorBoundary(
        () => Suspense(
          () => AsyncDataComponent(),
          () => html\`<p>Loading...</p>\`
        ),
        (error) => html\`<p class="error">Failed: \${error.message}</p>\`
      )}
    </div>
  \`;
}`)}

      ${l("ErrorBoundary catches both synchronous render errors and rejected promises from async components.")}

      <h2>Nested Boundaries</h2>
      ${e(`function App(): Node {
  return html\`
    <div>
      \${ErrorBoundary(
        () => html\`
          <div>
            <header>\${Header()}</header>
            \${ErrorBoundary(
              () => MainContent(),
              (err) => html\`<p>Content failed: \${err.message}</p>\`
            )}
            \${ErrorBoundary(
              () => Sidebar(),
              (err) => html\`<p>Sidebar unavailable</p>\`
            )}
          </div>
        \`,
        (err) => html\`<p>App crashed: \${err.message}</p>\`
      )}
    </div>
  \`;
}`)}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>ErrorBoundary</code></td><td>(content: () => Node, fallback: (error: Error) => Node)</td><td>Catch errors in content and render fallback.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Click "Trigger Error" to see the ErrorBoundary catch it, then "Retry" to recover:</p>

      ${p(`import { html, mount, createSignal, ErrorBoundary } from 'onefold';

function App() {
  const attempt = createSignal(0);

  // Each render attempt might throw
  function RiskyComponent() {
    // Randomly fail 50% of the time
    if (Math.random() > 0.5) {
      throw new Error('Random failure! (50% chance on each render)');
    }
    return html\`
      <div style="padding:16px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px">
        <h4 style="color:#166534">Success! (attempt #\${attempt()})</h4>
        <p style="font-size:13px">The component rendered without errors this time.</p>
      </div>
    \`;
  }

  // ErrorBoundary wraps a render function in try/catch
  // If it throws, fallback is shown with the error and a retry function
  function renderBoundary() {
    return ErrorBoundary(
      () => RiskyComponent(),
      (error, retry) => html\`
        <div style="padding:16px;background:#fef2f2;border:1px solid #fca5a5;border-radius:8px">
          <h4 style="color:#991b1b;margin-bottom:8px">Error Caught!</h4>
          <p style="font-size:13px;color:#666;margin-bottom:12px">\${error.message}</p>
          <button onclick=\${retry}>Retry (re-render)</button>
        </div>
      \`
    );
  }

  return html\`
    <div>
      <h3>ErrorBoundary Demo</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">
        RiskyComponent throws 50% of the time. Click "Re-mount" to create a new boundary and try again.
      </p>
      <button onclick=\${() => attempt.set(n => n + 1)} style="margin-bottom:12px">Re-mount Component</button>
      \${() => { attempt(); return renderBoundary(); }}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"ErrorBoundary \u2014 Catch & Retry")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/async/suspense">Suspense</a> — show fallback UI while async content loads</li>
        <li><a href="/observability">Observability</a> — monitor and debug your application</li>
      </ul>
    </div>
  `}var bo=`<!-- Save as: client.html (in same folder as server.mjs) -->
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>onefold WebSocket Chat</title></head>
<body>
<div id="app"></div>
<script type="module">
import { createSignal, createWebSocket, html, mount } from 'https://esm.sh/onefold@latest';

const chat = createWebSocket('ws://localhost:3000');

function App() {
  const input = createSignal('');
  const name = createSignal('User');

  const send = () => {
    const text = input().trim();
    if (!text) return;
    chat.send({ user: name(), text });
    input.set('');
  };

  return html\`
    <div style="max-width:500px;margin:20px auto;font-family:sans-serif">
      <h2>Chat (\${() => chat.status()})</h2>
      <div style="height:300px;overflow-y:auto;border:1px solid #ddd;padding:10px;margin-bottom:10px;border-radius:8px">
        \${() => chat.data().map(m => html\`
          <div style="margin-bottom:6px"><b>\${m.user}</b>: \${m.text}</div>
        \`)}
      </div>
      <div style="display:flex;gap:8px">
        <input value=\${() => name()} oninput=\${(e) => name.set(e.target.value)} placeholder="Name" style="width:80px;padding:6px" />
        <input value=\${() => input()} oninput=\${(e) => input.set(e.target.value)} onkeydown=\${(e) => { if(e.key==='Enter') send(); }} placeholder="Message..." style="flex:1;padding:6px" />
        <button onclick=\${send} style="padding:6px 12px">Send</button>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));
<\/script>
</body></html>`;function ut(){return n`
    <div>
      <h1>WebSocket</h1>
      <p><code>createWebSocket</code> wraps the native WebSocket API in reactive signals with auto-reconnect, typed messages, and connection state tracking.</p>

      <h2>Client Usage</h2>
      ${e(`import { html, mount } from 'onefold';
import { createWebSocket } from 'onefold/stream';

interface ChatMessage {
  user: string;
  text: string;
  ts: number;
}

const chat = createWebSocket<ChatMessage>('ws://localhost:3000/ws');

// Reactive signals \u2014 UI updates automatically when messages arrive
chat.data()      // Signal<ChatMessage[]> \u2014 all received messages
chat.latest()    // Signal<ChatMessage | null> \u2014 most recent message
chat.status()    // Signal<'connecting' | 'open' | 'closed' | 'error'>

// Send a message (serialized to JSON automatically)
chat.send({ user: 'Alice', text: 'Hello!' });

// Close / reconnect
chat.close();
chat.reconnect();`)}

      <h2>Chat App Example</h2>
      ${e(`import { createSignal, html, mount } from 'onefold';
import { createWebSocket } from 'onefold/stream';

interface ChatMessage { user: string; text: string; ts: number; }

const chat = createWebSocket<ChatMessage>('ws://localhost:3000/ws');

function ChatApp() {
  const input = createSignal('');
  const username = createSignal('Anonymous');

  const send = () => {
    const text = input().trim();
    if (!text) return;
    chat.send({ user: username(), text, ts: Date.now() });
    input.set('');
  };

  return html\`
    <div>
      <h2>Chat (\${() => chat.status()})</h2>
      <div style="height:250px;overflow-y:auto;border:1px solid #e5e7eb;padding:8px;border-radius:8px;margin-bottom:12px">
        \${() => chat.data().map(msg => html\`
          <div style="margin-bottom:6px">
            <strong>\${msg.user}</strong>: \${msg.text}
            <small style="color:#999;margin-left:8px">\${new Date(msg.ts).toLocaleTimeString()}</small>
          </div>
        \`)}
      </div>
      <div style="display:flex;gap:8px">
        <input placeholder="Name" value=\${() => username()} oninput=\${(e) => username.set(e.target.value)} style="width:100px" />
        <input placeholder="Message..." value=\${() => input()} oninput=\${(e) => input.set(e.target.value)} onkeydown=\${(e) => { if (e.key === 'Enter') send(); }} style="flex:1" />
        <button onclick=\${send}>Send</button>
      </div>
    </div>
  \`;
}

mount(ChatApp(), document.getElementById('app')!);`)}

      <h2>Server (Node.js)</h2>
      <p>A simple WebSocket server using the <code>ws</code> package:</p>
      ${e(`// server.mjs
import { WebSocketServer } from 'ws';
import http from 'node:http';

const server = http.createServer();
const wss = new WebSocketServer({ server });

const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);

  // Send welcome
  ws.send(JSON.stringify({ user: 'System', text: 'Welcome!', ts: Date.now() }));

  // Broadcast incoming messages to all clients
  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    msg.ts = Date.now();
    for (const client of clients) {
      if (client.readyState === 1) { // OPEN
        client.send(JSON.stringify(msg));
      }
    }
  });

  ws.on('close', () => clients.delete(ws));
});

server.listen(3000, () => console.log('WebSocket server on :3000'));`)}

      <h2>Authentication</h2>
      <p>WebSocket doesn't send custom headers during the initial handshake in browsers. Common auth patterns:</p>

      <h3>Option 1: Token in URL (simplest)</h3>
      ${e(`// Client \u2014 pass token in query string
const token = getAuthToken();
const chat = createWebSocket<Msg>(\`ws://localhost:3000/ws?token=\${token}\`);

// Server \u2014 validate on connection
wss.on('connection', (ws, req) => {
  const url = new URL(req.url, 'http://localhost');
  const token = url.searchParams.get('token');

  if (!token || !verifyToken(token)) {
    ws.close(4001, 'Unauthorized');
    return;
  }

  // Token valid \u2014 proceed
  const user = decodeToken(token);
  ws.userId = user.id;
});`)}

      ${l("Token in URL is visible in server logs and browser history. Use short-lived tokens (e.g., 30-second JWTs) that are exchanged for the WebSocket session.","warn")}

      <h3>Option 2: First-message auth (more secure)</h3>
      ${e(`// Client \u2014 send auth as first message after connection
const chat = createWebSocket<Msg>('ws://localhost:3000/ws');

// Wait for connection, then authenticate
createEffect(() => {
  if (chat.status() === 'open') {
    chat.send({ type: 'auth', token: getAuthToken() });
  }
});

// Server \u2014 require auth before accepting messages
wss.on('connection', (ws) => {
  let authenticated = false;

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());

    if (!authenticated) {
      if (msg.type === 'auth' && verifyToken(msg.token)) {
        authenticated = true;
        ws.send(JSON.stringify({ type: 'auth_ok' }));
      } else {
        ws.close(4001, 'Unauthorized');
      }
      return;
    }

    // Normal message handling (only after auth)
    broadcast(msg);
  });

  // Disconnect if not authenticated within 5 seconds
  setTimeout(() => {
    if (!authenticated) ws.close(4001, 'Auth timeout');
  }, 5000);
});`)}

      <h3>Option 3: Cookie-based (for same-origin)</h3>
      ${e(`// Client \u2014 no extra code needed (browser sends cookies automatically)
const chat = createWebSocket<Msg>('ws://localhost:3000/ws');

// Server \u2014 read cookie from upgrade request
wss.on('connection', (ws, req) => {
  const cookies = parseCookies(req.headers.cookie);
  const sessionId = cookies['session_id'];

  if (!sessionId || !validateSession(sessionId)) {
    ws.close(4001, 'Unauthorized');
    return;
  }

  const user = getSessionUser(sessionId);
  ws.userId = user.id;
});`)}

      <h2>Authorization (room-based)</h2>
      ${e(`// Server \u2014 check permissions per action
ws.on('message', (raw) => {
  const msg = JSON.parse(raw.toString());

  switch (msg.type) {
    case 'join_room':
      if (!userCanAccessRoom(ws.userId, msg.roomId)) {
        ws.send(JSON.stringify({ type: 'error', message: 'Access denied' }));
        return;
      }
      rooms.get(msg.roomId)?.add(ws);
      break;

    case 'send_message':
      if (!userCanWrite(ws.userId, msg.roomId)) {
        ws.send(JSON.stringify({ type: 'error', message: 'Read-only access' }));
        return;
      }
      broadcastToRoom(msg.roomId, msg);
      break;
  }
});`)}

      <h2>Options</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
        <tr><td><code>maxMessages</code></td><td>number</td><td>100</td><td>Max messages kept in data() array</td></tr>
        <tr><td><code>autoReconnect</code></td><td>boolean</td><td>true</td><td>Auto-reconnect on disconnect</td></tr>
        <tr><td><code>reconnectDelay</code></td><td>number</td><td>3000</td><td>Delay before reconnecting (ms)</td></tr>
        <tr><td><code>maxRetries</code></td><td>number</td><td>5</td><td>Max reconnect attempts</td></tr>
        <tr><td><code>parse</code></td><td>function</td><td>JSON.parse</td><td>Custom message parser</td></tr>
      </table>

      <h2>Try It (Simulated WebSocket)</h2>
      <p>This playground simulates a WebSocket connection so you can see how the reactive signals update the UI. Run the server code above locally to connect for real.</p>

      ${p(`import { createSignal, html, mount } from 'onefold';

// Simulated WebSocket \u2014 demonstrates the reactive API pattern
// For a real app, use: createWebSocket('ws://localhost:3000/ws')

const messages = createSignal([]);
const status = createSignal('connecting');
const input = createSignal('');
const username = createSignal('You');

// Simulate connection after 500ms
setTimeout(() => {
  status.set('open');
  messages.set(prev => [...prev, { user: 'System', text: 'Connected!', ts: Date.now() }]);
}, 500);

// Simulate receiving messages every 3s
setInterval(() => {
  if (status() !== 'open') return;
  const bots = ['Alice', 'Bob', 'Charlie'];
  const texts = ['Hey there!', 'How is it going?', 'onefold is great!', 'Anyone here?'];
  messages.set(prev => [...prev, {
    user: bots[Math.floor(Math.random() * bots.length)],
    text: texts[Math.floor(Math.random() * texts.length)],
    ts: Date.now()
  }]);
}, 3000);

function sendMessage() {
  const text = input().trim();
  if (!text || status() !== 'open') return;
  messages.set(prev => [...prev, { user: username(), text, ts: Date.now() }]);
  input.set('');
  const el = document.getElementById('msg-input');
  if (el) el.value = '';
}

function App() {
  return html\`
    <div>
      <h3>Chat (\${() => status()})</h3>
      <div style="height:150px;overflow-y:auto;border:1px solid #e5e7eb;padding:8px;border-radius:6px;margin-bottom:8px;font-size:13px">
        \${() => messages().map(m => html\`
          <div style="margin-bottom:4px">
            <strong>\${m.user}</strong>: \${m.text}
            <small style="color:#999;margin-left:6px">\${new Date(m.ts).toLocaleTimeString()}</small>
          </div>
        \`)}
      </div>
      <div style="display:flex;gap:6px">
        <input id="msg-input" placeholder="Message..." oninput=\${(e) => input.set(e.target.value)} onkeydown=\${(e) => { if (e.key === 'Enter') sendMessage(); }} style="flex:1" />
        <button onclick=\${sendMessage}>Send</button>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"WebSocket Chat (Simulated)")}

      <div class="callout">
        <p><strong>To connect to a real server:</strong> Replace the simulated signals above with <code>createWebSocket('ws://localhost:3000/ws')</code> and run the Node.js server code shown earlier. The reactive API (<code>.data()</code>, <code>.latest()</code>, <code>.status()</code>, <code>.send()</code>) works identically.</p>
      </div>

      <h2>Run Locally (Copy and Paste)</h2>
      <p>Save these two files, run the server, then open the client in a browser:</p>

      <h3>Step 1: server.mjs</h3>
      ${e(`// Save as: server.mjs
// Run: npm install ws && node server.mjs
import { WebSocketServer } from 'ws';
import http from 'node:http';
import { readFileSync } from 'node:fs';

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync('client.html'));
    return;
  }
  res.writeHead(404); res.end();
});

const wss = new WebSocketServer({ server });
const clients = new Set();

wss.on('connection', (ws) => {
  clients.add(ws);
  ws.send(JSON.stringify({ user: 'System', text: 'Welcome! ' + clients.size + ' online', ts: Date.now() }));

  ws.on('message', (raw) => {
    const msg = JSON.parse(raw.toString());
    msg.ts = Date.now();
    for (const c of clients) {
      if (c.readyState === 1) c.send(JSON.stringify(msg));
    }
  });

  ws.on('close', () => clients.delete(ws));
});

server.listen(3000, () => console.log('Chat server: http://localhost:3000'));`)}

      <h3>Step 2: client.html</h3>
      ${e(bo)}

      <h3>Step 3: Run</h3>
      ${e(`npm install ws
node server.mjs
# Open http://localhost:3000 in multiple tabs to chat between them`)}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/streaming/sse">Server-Sent Events</a> — one-way server push (simpler, works through proxies)</li>
        <li><a href="/data/http-client">HTTP Client</a> — for request/response communication</li>
        <li><a href="/security/guards">RBAC Guards</a> — client-side route protection</li>
      </ul>
    </div>
  `}var yo=`<!-- Save as: client.html (in same folder as server.mjs) -->
<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>onefold SSE Notifications</title></head>
<body>
<div id="app"></div>
<script type="module">
import { createEventSource, html, mount } from 'https://esm.sh/onefold@latest';

const feed = createEventSource('/api/notifications');

function App() {
  return html\`
    <div style="max-width:500px;margin:20px auto;font-family:sans-serif">
      <h2>Live Notifications (\${() => feed.status()})</h2>
      <div style="padding:10px;background:#f0fdf4;border-radius:8px;margin-bottom:12px">
        Latest: <strong>\${() => feed.latest()?.message ?? 'Waiting...'}</strong>
      </div>
      <div style="max-height:400px;overflow-y:auto">
        \${() => feed.data().map(n => html\`
          <div style="padding:8px;margin-bottom:4px;border-left:3px solid #4338CA;background:#f8f9fb;border-radius:0 6px 6px 0">
            \${n.message}
            <small style="color:#999;margin-left:8px">\${new Date(n.timestamp).toLocaleTimeString()}</small>
          </div>
        \`)}
      </div>
      <button onclick=\${() => feed.close()} style="margin-top:12px;padding:6px 12px">Disconnect</button>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));
<\/script>
</body></html>`;function mt(){return n`
    <div>
      <h1>Server-Sent Events (SSE)</h1>
      <p><code>createEventSource</code> wraps the native EventSource API in reactive signals. One-way server push — the server sends events to the client over a persistent HTTP connection.</p>

      <h2>Client Usage</h2>
      ${e(`import { html, mount } from 'onefold';
import { createEventSource } from 'onefold/stream';

interface Notification {
  id: string;
  message: string;
  type: string;
  timestamp: number;
}

const feed = createEventSource<Notification>('/api/notifications');

// Reactive signals \u2014 UI updates when events arrive
feed.data()      // Signal<Notification[]> \u2014 all received events
feed.latest()    // Signal<Notification | null> \u2014 most recent event
feed.status()    // Signal<'connecting' | 'open' | 'closed' | 'error'>

// Close the connection
feed.close();`)}

      <h2>Live Notifications Example</h2>
      ${e(`import { html, mount } from 'onefold';
import { createEventSource } from 'onefold/stream';

interface Notification { id: string; message: string; type: string; timestamp: number; }

const notifications = createEventSource<Notification>('/api/notifications');

function NotificationPanel() {
  return html\`
    <div>
      <h2>Notifications (\${() => notifications.status()})</h2>
      <p>Latest: <strong>\${() => notifications.latest()?.message ?? 'Waiting...'}</strong></p>

      <ul style="list-style:none;padding:0">
        \${() => notifications.data().map(n => html\`
          <li style="padding:8px;margin-bottom:4px;border-left:3px solid #4338CA;background:#f8f9fb;border-radius:0 6px 6px 0">
            <strong>\${n.message}</strong><br/>
            <small style="color:#64748b">\${new Date(n.timestamp).toLocaleTimeString()}</small>
          </li>
        \`)}
      </ul>

      <button onclick=\${() => notifications.close()}>Disconnect</button>
    </div>
  \`;
}

mount(NotificationPanel(), document.getElementById('app')!);`)}

      <h2>Server (Express.js)</h2>
      <p>SSE is just a long-lived HTTP response with <code>Content-Type: text/event-stream</code>:</p>
      ${e(`// server.mjs
import express from 'express';

const app = express();
const clients = new Set();

// SSE endpoint
app.get('/api/notifications', (req, res) => {
  // Required headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  // Send initial event
  res.write(\`data: \${JSON.stringify({ id: '0', message: 'Connected', type: 'system', timestamp: Date.now() })}\\n\\n\`);

  clients.add(res);

  // Cleanup on client disconnect
  req.on('close', () => {
    clients.delete(res);
  });
});

// Push an event to all connected clients
function broadcast(event) {
  const data = JSON.stringify(event);
  for (const client of clients) {
    client.write(\`data: \${data}\\n\\n\`);
  }
}

// Example: push events when something happens
app.post('/api/orders', express.json(), (req, res) => {
  // Process order...
  const order = { id: Date.now(), ...req.body };

  // Notify all connected clients
  broadcast({
    id: String(order.id),
    message: \`New order #\${order.id} received\`,
    type: 'order',
    timestamp: Date.now(),
  });

  res.json({ success: true, orderId: order.id });
});

app.listen(3000, () => console.log('SSE server on :3000'));`)}

      <h2>Server (Node.js — no Express)</h2>
      ${e(`// server.mjs \u2014 pure Node.js
import http from 'node:http';

const clients = new Set();

const server = http.createServer((req, res) => {
  if (req.url === '/api/events' && req.method === 'GET') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });

    res.write(\`data: \${JSON.stringify({ message: 'Connected' })}\\n\\n\`);
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

// Push events periodically
setInterval(() => {
  const event = { message: 'Server tick', timestamp: Date.now() };
  for (const client of clients) {
    client.write(\`data: \${JSON.stringify(event)}\\n\\n\`);
  }
}, 3000);

server.listen(3000);`)}

      <h2>SSE Wire Format</h2>
      <p>The protocol is simple text. Each message is <code>data:</code> followed by the payload, terminated by two newlines:</p>
      ${e(`// Single event
data: {"message":"Hello"}\\n\\n

// Event with ID (for reconnection)
id: 42\\n
data: {"message":"Hello"}\\n\\n

// Named event type
event: notification\\n
data: {"message":"New order"}\\n\\n

// Multi-line data
data: line 1\\n
data: line 2\\n\\n`)}

      ${l("The browser automatically reconnects SSE if the connection drops. If you send an id: field, the browser includes Last-Event-ID header on reconnect so the server can resume from where it left off.")}

      <h2>Authentication</h2>
      <p>Unlike WebSocket, SSE is a standard HTTP request — it sends cookies automatically and supports all HTTP auth mechanisms.</p>

      <h3>Option 1: Cookie-based (simplest)</h3>
      ${e(`// Client \u2014 cookies are sent automatically, no extra code
const feed = createEventSource<Notification>('/api/notifications');

// Server (Express) \u2014 check session cookie
app.get('/api/notifications', (req, res) => {
  const session = req.cookies.session_id;
  if (!session || !validateSession(session)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Authenticated \u2014 proceed with SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  clients.add(res);
  req.on('close', () => clients.delete(res));
});`)}

      <h3>Option 2: Token in URL</h3>
      ${e(`// Client \u2014 pass token in query parameter
const token = getAuthToken();
const feed = createEventSource<Notification>(\`/api/notifications?token=\${token}\`);

// Server \u2014 validate token from query string
app.get('/api/notifications', (req, res) => {
  const token = req.query.token;
  if (!token || !verifyToken(token)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const user = decodeToken(token);

  res.writeHead(200, { 'Content-Type': 'text/event-stream', ... });

  // Only send events this user is authorized to see
  clients.set(res, { userId: user.id, roles: user.roles });
  req.on('close', () => clients.delete(res));
});`)}

      ${l("SSE does NOT support custom headers in the browser (the EventSource API has no headers option). Use cookies or URL tokens for authentication.")}

      <h3>Authorization (per-event filtering)</h3>
      ${e(`// Server \u2014 only send events the user is allowed to see
function broadcast(event, requiredRole) {
  for (const [client, meta] of clients) {
    // Skip clients without the required role
    if (requiredRole && !meta.roles.includes(requiredRole)) continue;
    client.write(\`data: \${JSON.stringify(event)}\\n\\n\`);
  }
}

// Only admins see this
broadcast({ message: 'Server restarting' }, 'admin');

// Everyone sees this
broadcast({ message: 'New product available' });`)}

      <h2>When to Use SSE vs WebSocket</h2>
      <table>
        <tr><th>Use SSE when...</th><th>Use WebSocket when...</th></tr>
        <tr><td>Server pushes data to client (one-way)</td><td>Client AND server exchange messages (two-way)</td></tr>
        <tr><td>Notifications, live feeds, dashboards</td><td>Chat, gaming, collaborative editing</td></tr>
        <tr><td>Works through CDNs and reverse proxies</td><td>May be blocked by some proxies</td></tr>
        <tr><td>Auto-reconnect built into browser</td><td>Need manual reconnect logic</td></tr>
        <tr><td>Standard HTTP (easy to debug, curl-friendly)</td><td>Separate protocol (harder to debug)</td></tr>
        <tr><td>Text only</td><td>Text and binary</td></tr>
      </table>

      <h2>Options</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Default</th><th>Description</th></tr>
        <tr><td><code>maxEvents</code></td><td>number</td><td>100</td><td>Max events kept in data() array</td></tr>
        <tr><td><code>eventName</code></td><td>string</td><td>'message'</td><td>Event type to listen for</td></tr>
        <tr><td><code>parse</code></td><td>function</td><td>JSON.parse</td><td>Custom event data parser</td></tr>
      </table>

      <h2>Try It (Simulated SSE)</h2>
      <p>This playground simulates server-sent events so you can see how the reactive signals update the UI. Run the Express server above to connect for real.</p>

      ${p(`import { createSignal, html, mount } from 'onefold';

// Simulated SSE \u2014 demonstrates the reactive API pattern
// For a real app, use: createEventSource('/api/notifications')

const events = createSignal([]);
const latest = createSignal(null);
const status = createSignal('connecting');

// Simulate connection
setTimeout(() => {
  status.set('open');
  const welcome = { id: '0', message: 'Stream connected', type: 'system', timestamp: Date.now() };
  events.set([welcome]);
  latest.set(welcome);
}, 400);

// Simulate server pushing events every 2 seconds
const types = ['order', 'payment', 'shipping', 'review'];
const messages = [
  'New order #1042 received',
  'Payment of $49.99 processed',
  'Package shipped to NYC',
  'New 5-star review posted',
  'User signed up',
  'Subscription renewed',
  'Refund issued for #1038',
];

setInterval(() => {
  if (status() !== 'open') return;
  const event = {
    id: String(Date.now()),
    message: messages[Math.floor(Math.random() * messages.length)],
    type: types[Math.floor(Math.random() * types.length)],
    timestamp: Date.now(),
  };
  latest.set(event);
  events.set(prev => {
    const next = [...prev, event];
    return next.length > 20 ? next.slice(-20) : next;
  });
}, 2000);

function App() {
  return html\`
    <div>
      <h3>Live Notifications (\${() => status()})</h3>
      <div style="margin-bottom:8px;padding:8px;background:#f0fdf4;border-radius:6px;font-size:13px">
        Latest: <strong>\${() => latest()?.message ?? 'Waiting...'}</strong>
      </div>
      <div style="height:180px;overflow-y:auto;font-size:12px">
        \${() => events().map(n => html\`
          <div style="padding:6px 8px;margin-bottom:4px;border-left:3px solid \${n.type === 'order' ? '#4338CA' : n.type === 'payment' ? '#16a34a' : '#ca8a04'};background:#f8f9fb;border-radius:0 4px 4px 0">
            \${n.message}
            <small style="color:#64748b;margin-left:6px">\${new Date(n.timestamp).toLocaleTimeString()}</small>
          </div>
        \`)}
      </div>
      <button onclick=\${() => status.set('closed')} style="margin-top:8px">Disconnect</button>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"SSE Notifications (Simulated)")}

      <div class="callout">
        <p><strong>To connect to a real server:</strong> Replace the simulated signals with <code>createEventSource('/api/notifications')</code> and run the Express/Node.js server code above. The API (<code>.data()</code>, <code>.latest()</code>, <code>.status()</code>, <code>.close()</code>) is identical.</p>
      </div>

      <h2>Run Locally (Copy and Paste)</h2>
      <p>Save these two files, run the server, then open the client in a browser:</p>

      <h3>Step 1: server.mjs</h3>
      ${e(`// Save as: server.mjs
// Run: node server.mjs
import http from 'node:http';
import { readFileSync } from 'node:fs';

const clients = new Set();

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(readFileSync('client.html'));
    return;
  }

  if (req.url === '/api/notifications') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
    res.write(\`data: \${JSON.stringify({ id: '0', message: 'Connected!', type: 'system', timestamp: Date.now() })}\\n\\n\`);
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  res.writeHead(404); res.end();
});

// Push a random event every 2 seconds
const messages = ['New order received', 'Payment processed', 'User signed up', 'Review posted', 'Item shipped'];
setInterval(() => {
  const event = {
    id: String(Date.now()),
    message: messages[Math.floor(Math.random() * messages.length)],
    type: 'notification',
    timestamp: Date.now(),
  };
  for (const client of clients) {
    client.write(\`data: \${JSON.stringify(event)}\\n\\n\`);
  }
}, 2000);

server.listen(3000, () => console.log('SSE server: http://localhost:3000'));`)}

      <h3>Step 2: client.html</h3>
      ${e(yo)}

      <h3>Step 3: Run</h3>
      ${e(`node server.mjs
# Open http://localhost:3000 \u2014 events appear every 2 seconds
# Open in multiple tabs \u2014 all receive the same events`)}

      <h2>Testing SSE with curl</h2>
      ${e(`# Connect and see events stream in real-time
curl -N http://localhost:3000/api/notifications

# With auth token
curl -N "http://localhost:3000/api/notifications?token=eyJhbG..."

# With cookie
curl -N -b "session_id=abc123" http://localhost:3000/api/notifications`)}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/streaming/websocket">WebSocket</a> — for bidirectional communication</li>
        <li><a href="/data/http-client">HTTP Client</a> — for request/response APIs</li>
        <li><a href="/data/interceptors">Interceptors</a> — add auth headers to HTTP requests</li>
      </ul>
    </div>
  `}function ht(){return n`
    <div>
      <h1>Internationalization (i18n)</h1>
      <p><code>createI18n</code> provides reactive translations with interpolation. When the locale changes, all translated text in the UI updates automatically.</p>

      <h2>Setup</h2>
      ${e(`import { createI18n } from 'onefold/i18n';

const { t, setLocale, locale } = createI18n({
  defaultLocale: 'en',
  translations: {
    en: {
      greeting: 'Hello, {{name}}!',
      items: '{{count}} items',
      nav: {
        home: 'Home',
        settings: 'Settings',
      },
    },
    es: {
      greeting: 'Hola, {{name}}!',
      items: '{{count}} elementos',
      nav: {
        home: 'Inicio',
        settings: 'Configuraci\xF3n',
      },
    },
  },
});`)}

      <h2>Using Translations</h2>
      ${e(`function Header(): Node {
  return html\`
    <header>
      <h1>\${() => t('greeting', { name: 'World' })}</h1>
      <nav>
        <a href="/">\${() => t('nav.home')}</a>
        <a href="/settings">\${() => t('nav.settings')}</a>
      </nav>
      <p>Current locale: \${() => locale()}</p>
    </header>
  \`;
}`)}

      <h2>Switching Locale</h2>
      ${e(`function LocaleSwitcher(): Node {
  return html\`
    <div>
      <button onclick=\${() => setLocale('en')}>English</button>
      <button onclick=\${() => setLocale('es')}>Espa\xF1ol</button>
      <button onclick=\${() => setLocale('fr')}>Fran\xE7ais</button>
    </div>
  \`;
}`)}

      ${l('Wrapping t() in an arrow function (e.g., () => t("key")) makes it reactive. The text updates when the locale signal changes.')}

      <h2>Interpolation</h2>
      <p>Use <code>{{placeholder}}</code> in translation strings:</p>
      ${e(`// Translation: 'Hello, {{name}}! You have {{count}} messages.'
t('welcome', { name: 'Alice', count: 5 })
// \u2192 "Hello, Alice! You have 5 messages."`)}

      <h2>Nested Keys</h2>
      <p>Access nested translation objects with dot notation:</p>
      ${e(`t('nav.home')      // \u2192 "Home"
t('nav.settings')  // \u2192 "Settings"`)}

      <h2>API</h2>
      ${f(`<table>
        <tr><th>Export</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>t(key, params?)</code></td><td>(string, Record?) => string</td><td>Translate a key with optional interpolation.</td></tr>
        <tr><td><code>setLocale(locale)</code></td><td>(string) => void</td><td>Switch the active locale.</td></tr>
        <tr><td><code>locale()</code></td><td>Signal&lt;string&gt;</td><td>Current locale (reactive).</td></tr>
      </table>`)}

      ${p(`import { html, mount } from 'onefold';
import { createI18n } from 'onefold/i18n';

function App() {
  const i18n = createI18n({
    defaultLocale: 'en',
    fallbackLocale: 'en',
    messages: {
      en: {
        greeting: 'Hello, {name}!',
        welcome: 'Welcome to our application',
        items: '{count} item(s) in cart',
        'nav.home': 'Home', 'nav.about': 'About', 'nav.settings': 'Settings',
        'actions.save': 'Save', 'actions.cancel': 'Cancel', 'actions.delete': 'Delete',
      },
      es: {
        greeting: 'Hola, {name}!',
        welcome: 'Bienvenido a nuestra aplicacion',
        items: '{count} articulo(s) en el carrito',
        'nav.home': 'Inicio', 'nav.about': 'Acerca de', 'nav.settings': 'Configuracion',
        'actions.save': 'Guardar', 'actions.cancel': 'Cancelar', 'actions.delete': 'Eliminar',
      },
      fr: {
        greeting: 'Bonjour, {name}!',
        welcome: 'Bienvenue dans notre application',
        items: '{count} article(s) dans le panier',
        'nav.home': 'Accueil', 'nav.about': 'A propos', 'nav.settings': 'Parametres',
        'actions.save': 'Sauvegarder', 'actions.cancel': 'Annuler', 'actions.delete': 'Supprimer',
      },
    },
  });

  const locales = i18n.availableLocales();

  return html\`
    <div>
      <h3>\${() => i18n.t('greeting', { name: 'Developer' })}</h3>
      <p>\${() => i18n.t('welcome')}</p>
      <p style="font-size:13px;color:#666">\${() => i18n.t('items', { count: 3 })}</p>

      <div style="margin:16px 0;padding:12px;background:#f8fafc;border-radius:8px">
        <p style="font-size:13px;font-weight:600;margin-bottom:8px">Navigation:</p>
        <div style="display:flex;gap:12px">
          \${() => ['home', 'about', 'settings'].map(key => html\`
            <span style="padding:4px 10px;background:#e0e7ff;border-radius:4px;font-size:13px">
              \${i18n.t('nav.' + key)}
            </span>
          \`)}
        </div>
      </div>

      <div style="margin-bottom:16px">
        <p style="font-size:13px;font-weight:600;margin-bottom:8px">Actions:</p>
        <div style="display:flex;gap:8px">
          \${() => ['save', 'cancel', 'delete'].map(key => html\`
            <button>\${i18n.t('actions.' + key)}</button>
          \`)}
        </div>
      </div>

      <div style="border-top:1px solid #e5e7eb;padding-top:12px">
        <p style="font-size:13px;margin-bottom:8px">
          Active locale: <strong>\${() => i18n.locale()}</strong>
          | Available: \${locales.join(', ')}
        </p>
        <div style="display:flex;gap:8px">
          \${locales.map(loc => html\`
            <button
              onclick=\${() => i18n.setLocale(loc)}
              style=\${() => i18n.locale() === loc ? 'background:#4f46e5;color:white;border-color:#4f46e5' : ''}
            >\${loc.toUpperCase()}</button>
          \`)}
        </div>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createI18n \u2014 Reactive Multilingual App")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/theming">Theming</a> — reactive theme switching with CSS variables</li>
        <li><a href="/routing/router">Router</a> — client-side routing with nested routes</li>
      </ul>
    </div>
  `}function gt(){return n`
    <div>
      <h1>Theming</h1>
      <p><code>createTheme</code> manages CSS custom properties reactively. Switch between light/dark (or any custom themes) and the UI updates instantly via CSS variables.</p>

      <h2>Setup</h2>
      ${e(`import { createTheme } from 'onefold/theme';

const theme = createTheme({
  light: {
    bg: '#ffffff',
    text: '#1a1a1a',
    primary: '#3b82f6',
    border: '#e5e7eb',
  },
  dark: {
    bg: '#0f172a',
    text: '#e2e8f0',
    primary: '#60a5fa',
    border: '#334155',
  },
}, 'light'); // default theme

// theme.current() \u2192 'light' (reactive signal)
// theme.set('dark') \u2192 switch to dark
// theme.toggle()    \u2192 cycle between themes
// theme.themes()    \u2192 ['light', 'dark']
// theme.tokens()    \u2192 { bg: '#ffffff', text: '#1a1a1a', ... }`)}

      <h2>Usage in Components</h2>
      ${e(`function ThemeSwitcher(): Node {
  return html\`
    <div>
      <p>Current: \${() => theme.current()}</p>
      <button onclick=\${() => theme.toggle()}>Toggle Theme</button>
      <button onclick=\${() => theme.set('light')}>Light</button>
      <button onclick=\${() => theme.set('dark')}>Dark</button>
    </div>
  \`;
}`)}

      <h2>CSS Custom Properties</h2>
      <p>Use the theme variables in your CSS — they update automatically when the theme changes:</p>
      ${e(`/* style.css \u2014 use var(--key) where key matches your theme token names */
body {
  background: var(--bg);
  color: var(--text);
}

button {
  background: var(--primary);
  border: 1px solid var(--border);
}

a {
  color: var(--primary);
}`)}

      ${l("createTheme sets CSS custom properties on document.documentElement. All elements that reference those variables update instantly.")}

      <h2>Persistence</h2>
      <p>The selected theme is automatically persisted to localStorage. On page reload, the user's preference is restored.</p>

      <h2>System Preference Detection</h2>
      ${e(`// Respect prefers-color-scheme on first visit
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const theme = createTheme(themes, prefersDark ? 'dark' : 'light');`)}

      <h2>API</h2>
      ${f(`<table>
        <tr><th>Property</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>theme.current()</code></td><td>Signal&lt;string&gt;</td><td>Current theme name (reactive).</td></tr>
        <tr><td><code>theme.set(name)</code></td><td>(string) =&gt; void</td><td>Switch to a named theme.</td></tr>
        <tr><td><code>theme.toggle()</code></td><td>() =&gt; void</td><td>Cycle through available themes.</td></tr>
        <tr><td><code>theme.themes()</code></td><td>() =&gt; string[]</td><td>List available theme names.</td></tr>
        <tr><td><code>theme.tokens()</code></td><td>() =&gt; ThemeTokens</td><td>Get current theme's CSS variable values.</td></tr>
      </table>`)}

      ${p(`import { createSignal, html, mount } from 'onefold';
import { createTheme } from 'onefold/theme';

function App() {
  // createTheme sets CSS custom properties on :root
  const theme = createTheme({
    light: { bg: '#ffffff', text: '#1a1a2e', primary: '#3b82f6', border: '#e5e7eb', badge: '#f1f5f9', badgeText: '#64748b' },
    dark:  { bg: '#1e293b', text: '#e2e8f0', primary: '#60a5fa', border: '#334155', badge: '#334155', badgeText: '#94a3b8' },
  }, 'light');

  return html\`
    <div>
      <h3>Theme: \${() => theme.current()}</h3>
      <div style="display:flex;gap:8px;margin:12px 0">
        <button onclick=\${() => theme.toggle()}>Toggle</button>
        <button onclick=\${() => theme.set('light')}>Light</button>
        <button onclick=\${() => theme.set('dark')}>Dark</button>
      </div>
      <div style="margin-top:16px;padding:20px;border-radius:8px;background:var(--bg);color:var(--text);border:1px solid var(--border);transition:all 0.3s">
        <h4 style="margin-bottom:8px;color:var(--primary)">Card Component</h4>
        <p style="font-size:14px">This card uses CSS variables set by createTheme. No inline style switching needed.</p>
        <span style="display:inline-block;padding:4px 10px;border-radius:4px;font-size:12px;margin-top:8px;background:var(--badge);color:var(--badgeText)">\${() => theme.current()} mode</span>
      </div>
      <p style="margin-top:12px;font-size:12px;color:#888">Available themes: \${() => theme.themes().join(', ')}</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createTheme API \u2014 Reactive CSS Custom Properties")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/core/css">Scoped CSS</a> — component-scoped styles that avoid global collisions</li>
        <li><a href="/i18n">i18n</a> — internationalization with reactive translations</li>
      </ul>
    </div>
  `}function ft(){return n`
    <div>
      <h1>Accessibility (a11y)</h1>
      <p>onefold provides built-in accessibility primitives: focus trapping, live announcements, keyboard shortcuts, and skip navigation.</p>

      <h2>FocusTrap</h2>
      <p>Trap keyboard focus within a container (modals, dialogs, drawers):</p>
      ${e(`import { html } from 'onefold';
import { FocusTrap } from 'onefold/a11y';

function Modal(content: Node): Node {
  return FocusTrap(html\`
    <div class="modal" role="dialog" aria-modal="true">
      <h2>Confirm Action</h2>
      \${content}
      <button>Cancel</button>
      <button>Confirm</button>
    </div>
  \`);
}`)}

      <h2>announce</h2>
      <p>Send messages to screen readers via a live region:</p>
      ${e(`import { announce } from 'onefold/a11y';

// Polite announcement (waits for current speech to finish)
announce('Item added to cart');

// Assertive announcement (interrupts current speech)
announce('Form has errors. Please fix highlighted fields.', 'assertive');`)}

      <h2>useKeyboard</h2>
      <p>Declarative keyboard shortcut handling:</p>
      ${e(`import { useKeyboard } from 'onefold/a11y';

useKeyboard({
  'Ctrl+K': () => openSearch(),
  'Escape': () => closeModal(),
  'Ctrl+S': (e) => { e.preventDefault(); save(); },
  'Alt+1': () => navigate('/'),
  'Alt+2': () => navigate('/settings'),
});`)}

      <h2>SkipLink</h2>
      <p>Skip navigation link for keyboard users:</p>
      ${e(`import { html } from 'onefold';
import { SkipLink } from 'onefold/a11y';

function App(): Node {
  return html\`
    <div>
      \${SkipLink('#main-content', 'Skip to main content')}
      <nav><!-- navigation --></nav>
      <main id="main-content">
        <!-- main content -->
      </main>
    </div>
  \`;
}`)}

      ${l("SkipLink is visually hidden until focused. It becomes visible when a keyboard user tabs to it.")}

      <h2>API Reference</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>FocusTrap</code></td><td>(container: HTMLElement)</td><td>Create a focus trap. Call .activate() / .deactivate().</td></tr>
        <tr><td><code>announce</code></td><td>(message, priority?)</td><td>Announce to screen readers. Priority: 'polite' | 'assertive'.</td></tr>
        <tr><td><code>useKeyboard</code></td><td>(shortcuts: Record)</td><td>Register keyboard shortcuts. Returns { destroy() }.</td></tr>
        <tr><td><code>SkipLink</code></td><td>(target, label?)</td><td>Render a skip navigation link.</td></tr>
      </table>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { FocusTrap, announce } from 'onefold/a11y';

function App() {
  const isOpen = createSignal(false);
  let trap = null;

  function openModal() {
    isOpen.set(true);
    announce('Modal opened. Focus is trapped inside.');
    setTimeout(() => {
      const modal = document.getElementById('demo-modal');
      if (modal) {
        trap = FocusTrap(modal);
        trap.activate();
      }
    }, 0);
  }

  function closeModal() {
    if (trap) {
      trap.deactivate();
      trap = null;
    }
    isOpen.set(false);
    announce('Modal closed.');
  }

  return html\`
    <div>
      <h3>Focus Trap & announce() Demo</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">
        Uses real FocusTrap and announce from onefold/a11y.
        Open the modal, then press Tab \u2014 focus stays inside.
      </p>
      <button onclick=\${openModal}>Open Modal</button>
      \${() => isOpen() ? html\`
        <div id="demo-modal" role="dialog" aria-modal="true" aria-label="Confirm action"
          style="margin-top:16px;padding:20px;border:2px solid #3b82f6;border-radius:8px;background:#eff6ff">
          <h4 style="margin-bottom:12px">Confirm Action</h4>
          <p style="font-size:14px;margin-bottom:12px">Tab key cycles between these buttons only.</p>
          <div style="display:flex;gap:8px">
            <button onclick=\${closeModal}>Cancel</button>
            <button onclick=\${closeModal} style="background:#3b82f6;color:white;border-color:#3b82f6">Confirm</button>
          </div>
          <p style="font-size:11px;color:#666;margin-top:12px">Focus is trapped. announce() sent a screen reader message.</p>
        </div>
      \` : null}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"FocusTrap & announce \u2014 onefold/a11y")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/transitions">Transitions</a> — animate elements entering and leaving the DOM</li>
        <li><a href="/core/templates">Templates</a> — the html tagged template literal</li>
      </ul>
    </div>
  `}function vt(){return n`
    <div>
      <h1>Transitions</h1>
      <p><code>Transition</code>, <code>animateEnter</code>, and <code>animateLeave</code> animate elements entering and leaving the DOM.</p>

      <h2>Inline Style Transitions</h2>
      <p>Define enter/leave styles directly — no CSS classes needed:</p>
      ${e(`import { createSignal, html } from 'onefold';
import { Transition } from 'onefold/transition';

const view = createSignal('home');

Transition(() => currentView(), {
  duration: 300,
  enterFrom: { opacity: '0', transform: 'translateY(10px)' },
  enterTo:   { opacity: '1', transform: 'translateY(0)' },
  leaveTo:   { opacity: '0', transform: 'translateY(-10px)' },
});`)}

      <h2>CSS Class Transitions</h2>
      ${e(`// Use named CSS classes for enter/leave
Transition(() => currentView(), {
  name: 'fade',    // applies .fade-enter, .fade-enter-to, .fade-leave, .fade-leave-to
  duration: 300,
});

/* CSS:
.fade-enter       { opacity: 0; }
.fade-enter-active { transition: opacity 0.3s; }
.fade-leave-active { opacity: 0; transition: opacity 0.3s; }
*/`)}

      <h2>animateEnter / animateLeave</h2>
      <p>Lower-level utilities for custom animation logic on individual elements:</p>
      ${e(`import { animateEnter, animateLeave } from 'onefold/transition';

// Animate an element entering
animateEnter(element, {
  name: 'slide',
  duration: 400,
});

// Animate an element leaving, then call done()
animateLeave(element, {
  name: 'slide',
  duration: 400,
}, () => element.remove());`)}

      ${l("Transition waits for the leave animation to finish before removing the element. No flicker, no layout jumps.")}

      <h2>Try It</h2>
      <p>Click the buttons to see fade and slide transitions:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { Transition } from 'onefold/transition';

function App() {
  const pages = ['Home', 'About', 'Contact'];
  const current = createSignal(0);

  function currentView() {
    const page = pages[current()];
    const colors = { Home: '#4f46e5', About: '#059669', Contact: '#d97706' };
    return html\`
      <div style=\${{ padding: '24px', background: colors[page], color: 'white', borderRadius: '8px', minHeight: '100px' }}>
        <h3>\${page} Page</h3>
        <p>This content transitions in/out with fade + slide.</p>
      </div>
    \`;
  }

  return html\`
    <div>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        \${pages.map((p, i) => html\`
          <button onclick=\${() => current.set(i)} style=\${() => current() === i ? 'background:#4f46e5;color:white' : ''}>\${p}</button>
        \`)}
      </div>
      \${Transition(
        () => currentView(),
        {
          duration: 300,
          enterFrom: { opacity: '0', transform: 'translateY(10px)' },
          enterTo: { opacity: '1', transform: 'translateY(0)' },
          leaveTo: { opacity: '0', transform: 'translateY(-10px)' },
          mode: 'out-in',
        }
      )}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Transition API \u2014 Page Switching with Fade + Slide")}

      ${p(`import { createSignal, html, mount } from 'onefold';
import { Transition, animateEnter } from 'onefold/transition';

function App() {
  const showA = createSignal(true);

  function ContentA() {
    return html\`
      <div style=\${{ padding: '20px', background: '#dbeafe', borderRadius: '8px', border: '1px solid #93c5fd' }}>
        <h4 style="color:#1e40af">Panel A</h4>
        <p>First panel content. Click swap to transition to Panel B.</p>
      </div>
    \`;
  }

  function ContentB() {
    return html\`
      <div style=\${{ padding: '20px', background: '#dcfce7', borderRadius: '8px', border: '1px solid #86efac' }}>
        <h4 style="color:#166534">Panel B</h4>
        <p>Second panel. The transition uses out-in mode \u2014 old leaves before new enters.</p>
      </div>
    \`;
  }

  return html\`
    <div>
      <button onclick=\${() => showA.set(v => !v)}>
        Swap to \${() => showA() ? 'Panel B' : 'Panel A'}
      </button>
      <div style="margin-top:12px;min-height:120px">
        \${Transition(
          () => showA() ? ContentA() : ContentB(),
          {
            duration: 250,
            enterFrom: { opacity: '0', transform: 'scale(0.95)' },
            enterTo: { opacity: '1', transform: 'scale(1)' },
            leaveTo: { opacity: '0', transform: 'scale(0.95)' },
            mode: 'out-in',
          }
        )}
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Transition \u2014 Out-In Mode with Scale")}

      <h2>Options</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>name</code></td><td>string</td><td>CSS class prefix (.name-enter, .name-leave, etc.)</td></tr>
        <tr><td><code>duration</code></td><td>number</td><td>Animation duration in ms (default: 300)</td></tr>
        <tr><td><code>enterFrom</code></td><td>CSSStyleDeclaration</td><td>Inline styles at start of enter</td></tr>
        <tr><td><code>enterTo</code></td><td>CSSStyleDeclaration</td><td>Inline styles at end of enter</td></tr>
        <tr><td><code>leaveTo</code></td><td>CSSStyleDeclaration</td><td>Inline styles at end of leave</td></tr>
        <tr><td><code>mode</code></td><td>'default' | 'out-in'</td><td>'out-in' waits for leave before enter</td></tr>
      </table>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/core/templates">Templates</a> — conditional rendering patterns</li>
        <li><a href="/routing/router">Router</a> — page transitions between routes</li>
        <li><a href="/a11y">Accessibility</a> — motion preferences (prefers-reduced-motion)</li>
      </ul>
    </div>
  `}function bt(){return n`
    <div>
      <h1>Dependency Injection</h1>
      <p>onefold provides a lightweight DI system with <code>createToken</code>, <code>provide</code>, <code>inject</code>, and <code>runWithProviders</code> for testable, decoupled architecture.</p>

      <h2>createToken</h2>
      ${e(`import { createToken } from 'onefold';

// Define typed injection tokens
const HttpToken = createToken<HttpClient>('HttpClient');
const AuthToken = createToken<AuthService>('AuthService');
const LoggerToken = createToken<Logger>('Logger');`)}

      <h2>provide / inject</h2>
      ${e(`import { provide, inject } from 'onefold';

// Provide implementations
provide(HttpToken, new HttpClient({ baseUrl: '/api' }));
provide(AuthToken, new AuthService());

// Inject in any component
function UserList(): Node {
  const http = inject(HttpToken);
  const auth = inject(AuthToken);

  // Use the injected services
  return html\`<p>Logged in: \${auth.isAuthenticated()}</p>\`;
}`)}

      <h2>runWithProviders</h2>
      <p>Scope providers to a specific subtree (useful for testing or isolation):</p>
      ${e(`import { runWithProviders } from 'onefold';

// Production
runWithProviders([
  [HttpToken, new HttpClient({ baseUrl: '/api' })],
  [AuthToken, new AuthService()],
  [LoggerToken, new ConsoleLogger()],
], () => {
  mount(App(), document.getElementById('app')!);
});

// Testing \u2014 swap implementations
runWithProviders([
  [HttpToken, new MockHttpClient()],
  [AuthToken, new MockAuthService()],
  [LoggerToken, new NoopLogger()],
], () => {
  // App uses mocks \u2014 no network calls
  mount(App(), container);
});`)}

      ${l("DI makes your components testable without modifying their source. Swap the real HTTP client for a mock in tests.")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>createToken</code></td><td>(name: string)</td><td>Create a typed injection token.</td></tr>
        <tr><td><code>provide</code></td><td>(token, value)</td><td>Register a value for a token.</td></tr>
        <tr><td><code>inject</code></td><td>(token)</td><td>Retrieve the value for a token.</td></tr>
        <tr><td><code>runWithProviders</code></td><td>(providers[], fn)</td><td>Run a function with scoped providers.</td></tr>
      </table>

      ${p(`import { createSignal, html, mount } from 'onefold';

function App() {
  // Simple DI container
  const container = {};

  function provide(key, value) {
    container[key] = value;
  }

  function inject(key) {
    return container[key];
  }

  // Provide a UserService
  provide('UserService', {
    name: 'Alice',
    role: 'Admin',
    getGreeting() { return 'Hello, ' + this.name + '!'; }
  });

  provide('Logger', {
    log(msg) { return '[LOG] ' + msg; }
  });

  // Inject and use
  const userService = inject('UserService');
  const logger = inject('Logger');

  const output = createSignal(userService.getGreeting());

  function refresh() {
    const svc = inject('UserService');
    const log = inject('Logger');
    output.set(log.log(svc.getGreeting() + ' Role: ' + svc.role));
  }

  return html\`
    <div>
      <h3>Dependency Injection</h3>
      <p>Injected UserService and Logger from container:</p>
      <div style="padding:12px;background:#f8fafc;border-radius:6px;border:1px solid #e5e7eb;margin:12px 0">
        <code>\${() => output()}</code>
      </div>
      <button onclick=\${refresh}>Call via Logger</button>
      <p style="font-size:12px;color:#666;margin-top:8px">Services are resolved from the DI container at runtime.</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"Provide / Inject Demo")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/security/guards">RBAC Guards</a> — role-based access control for routes</li>
        <li><a href="/state/store">Store</a> — manage structured application state</li>
      </ul>
    </div>
  `}function yt(){return n`
    <div>
      <h1>Permission Guards</h1>
      <p>Control UI visibility and route access based on user permissions using <code>setPermissions</code>, <code>hasPermission</code>, <code>guard</code>, and <code>guardedNode</code>.</p>

      <h2>Setup Permissions</h2>
      ${e(`import { setPermissions } from 'onefold/guard';

// Set after login \u2014 pass the user's permission list
setPermissions(['read:users', 'write:posts', 'admin:settings']);`)}

      <h2>Check Permissions</h2>
      ${e(`import { hasPermission } from 'onefold/guard';

// Returns a reactive boolean signal
hasPermission('admin:settings')  // true
hasPermission('delete:users')    // false`)}

      <h2>guardedNode</h2>
      <p>Conditionally render UI based on permissions:</p>
      ${e(`import { html } from 'onefold';
import { guardedNode } from 'onefold/guard';

function AdminPanel(): Node {
  return html\`
    <div>
      <h2>Admin Panel</h2>
      \${guardedNode('admin:settings', () => html\`
        <button>Delete All Users</button>
        <button>Reset Database</button>
      \`)}
      \${guardedNode('write:posts', () => html\`
        <button>Create Post</button>
      \`)}
    </div>
  \`;
}`)}

      <h2>Route Guards</h2>
      <p>Protect entire routes with the <code>guard</code> wrapper:</p>
      ${e(`import { Router, navigate } from 'onefold';
import { guard } from 'onefold/guard';

const App = Router([
  { path: '/', view: () => Home() },
  { path: '/admin', view: guard('admin:settings', () => AdminPage(), () => {
    navigate('/unauthorized');
  })},
  { path: '/posts/new', view: guard('write:posts', () => CreatePost()) },
]);`)}

      ${l("Permissions are reactive. If you call setPermissions() with a new list (e.g., after role change), guarded nodes update automatically.")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>setPermissions</code></td><td>(perms: string[])</td><td>Set the active permission list.</td></tr>
        <tr><td><code>hasPermission</code></td><td>(perm: string)</td><td>Check if permission exists (reactive).</td></tr>
        <tr><td><code>guard</code></td><td>(perm, view, onDeny?)</td><td>Protect a route view function.</td></tr>
        <tr><td><code>guardedNode</code></td><td>(perm, content)</td><td>Conditionally render based on permission.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Toggle permissions to see guarded sections appear/disappear reactively:</p>

      ${p(`import { html, mount, createSignal } from 'onefold';
import { setPermissions, hasPermission, guardedNode } from 'onefold/guard';

function App() {
  const perms = createSignal(new Set(['read', 'write']));

  // Wire permissions to the guard system
  setPermissions(perms);

  function togglePerm(perm) {
    perms.set(prev => {
      const next = new Set(prev);
      if (next.has(perm)) next.delete(perm);
      else next.add(perm);
      return next;
    });
  }

  const allPerms = ['read', 'write', 'admin', 'billing', 'delete'];

  return html\`
    <div>
      <h3>RBAC Guards \u2014 Live Demo</h3>

      <div style="margin-bottom:16px">
        <p style="font-size:13px;font-weight:600;margin-bottom:8px">Active permissions:</p>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          \${allPerms.map(p => html\`
            <button
              onclick=\${() => togglePerm(p)}
              style=\${() => hasPermission(p)
                ? 'background:#4f46e5;color:white;border-color:#4f46e5'
                : 'background:#f1f5f9;color:#64748b'}
            >\${p}</button>
          \`)}
        </div>
      </div>

      <div style="display:grid;gap:8px">
        <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px">
          <strong>Read section</strong> (requires: read)
          \${() => guardedNode(['read'],
            () => html\`<p style="color:#166534;margin-top:4px">\u2713 You can see this content</p>\`,
            () => html\`<p style="color:#991b1b;margin-top:4px">\u2717 Access denied \u2014 need "read" permission</p>\`
          )}
        </div>
        <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px">
          <strong>Admin panel</strong> (requires: admin)
          \${() => guardedNode(['admin'],
            () => html\`<p style="color:#166534;margin-top:4px">\u2713 Admin panel visible</p>\`,
            () => html\`<p style="color:#991b1b;margin-top:4px">\u2717 Access denied \u2014 need "admin" permission</p>\`
          )}
        </div>
        <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px">
          <strong>Danger zone</strong> (requires: admin + delete)
          \${() => guardedNode(['admin', 'delete'],
            () => html\`<p style="color:#166534;margin-top:4px">\u2713 Delete button shown</p>\`,
            () => html\`<p style="color:#991b1b;margin-top:4px">\u2717 Need both "admin" and "delete" permissions</p>\`
          )}
        </div>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"RBAC Guards \u2014 Toggle Permissions")}
    </div>
  `}function xt(){return n`
    <div>
      <h1>XSS Prevention</h1>
      <p>onefold is secure by default. Text interpolation uses <code>textContent</code>, making XSS structurally impossible in the default path.</p>

      <h2>How onefold Prevents XSS</h2>
      <ul>
        <li><strong>textContent by default</strong> — string interpolations in templates set <code>textContent</code>, not <code>innerHTML</code>. HTML in user data renders as text.</li>
        <li><strong>No eval()</strong> — no dynamic code execution anywhere in the framework.</li>
        <li><strong>No innerHTML</strong> — the template engine constructs real DOM nodes, never parses HTML strings.</li>
        <li><strong>CSP compatible</strong> — works with strict Content-Security-Policy headers out of the box.</li>
      </ul>

      ${e(`import { html } from 'onefold';

const userInput = '<script>alert("xss")<\/script>';

// SAFE \u2014 renders as text, not HTML
html\`<p>\${userInput}</p>\`;
// Result: <p>&lt;script&gt;alert("xss")&lt;/script&gt;</p>`)}

      ${l("Unlike frameworks that use innerHTML or dangerouslySetInnerHTML, onefold never interprets strings as HTML. This eliminates the most common XSS vector.","info")}

      <h2>Sanitization for Raw HTML</h2>
      <p>If you must render trusted HTML (e.g., from a CMS), sanitize it first:</p>
      ${e(`import { html } from 'onefold';

// Use DOMPurify or similar library
import DOMPurify from 'dompurify';

function RichContent(rawHtml: string): Node {
  const clean = DOMPurify.sanitize(rawHtml);
  const container = document.createElement('div');
  container.innerHTML = clean;
  return container;
}`)}

      <h2>Trusted Types</h2>
      <p>onefold is compatible with the Trusted Types API for defense in depth:</p>
      ${e(`// CSP header
Content-Security-Policy: require-trusted-types-for 'script'

// onefold never triggers Trusted Types violations because
// it never assigns to innerHTML, outerHTML, or similar sinks.`)}

      <h2>Try It</h2>
      <p>Type HTML/script into the input — see how onefold escapes it automatically vs <code>raw()</code>:</p>

      ${p(`import { html, mount, createSignal, raw } from 'onefold';

function App() {
  const userInput = createSignal('<img src=x onerror="alert(1)">');

  const examples = [
    '<script>alert("xss")<\/script>',
    '<img src=x onerror="alert(1)">',
    '<a href="javascript:alert(1)">Click me</a>',
    '<div onmouseover="alert(1)">Hover</div>',
    'Hello <b>world</b>!',
  ];

  return html\`
    <div>
      <h3>XSS Prevention Demo</h3>
      <div style="margin-bottom:12px">
        <label style="font-size:13px;font-weight:600;display:block;margin-bottom:4px">User input (try pasting malicious HTML):</label>
        <input
          oninput=\${(e) => userInput.set(e.target.value)}
          style="width:100%"
          placeholder="Type or paste HTML here..."
        />
        <div style="display:flex;gap:4px;margin-top:6px;flex-wrap:wrap">
          \${examples.map(ex => html\`
            <button onclick=\${() => userInput.set(ex)} style="font-size:11px;padding:2px 6px">\${ex.slice(0, 20)}...</button>
          \`)}
        </div>
      </div>

      <div style="display:grid;gap:12px;grid-template-columns:1fr 1fr">
        <div style="padding:12px;border:1px solid #86efac;border-radius:8px;background:#f0fdf4">
          <h4 style="font-size:13px;color:#166534;margin-bottom:6px">Default (textContent) \u2014 SAFE</h4>
          <div style="font-size:13px;font-family:monospace;word-break:break-all">\${() => userInput()}</div>
        </div>
        <div style="padding:12px;border:1px solid #fca5a5;border-radius:8px;background:#fef2f2">
          <h4 style="font-size:13px;color:#991b1b;margin-bottom:6px">raw() \u2014 Sanitized HTML</h4>
          <div style="font-size:13px">\${() => raw(userInput())}</div>
        </div>
      </div>

      <p style="font-size:12px;color:#666;margin-top:12px">
        Left: XSS impossible (rendered as text). Right: raw() strips scripts/event handlers but allows safe HTML tags.
      </p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"XSS Prevention \u2014 textContent vs raw()")}
  `}function wt(){return n`
    <div>
      <h1>Virtual List</h1>
      <p><code>VirtualList</code> renders only visible items in a scrollable list. Handles thousands of items without DOM overhead.</p>

      <h2>Basic Usage</h2>
      ${e(`import { html, createSignal } from 'onefold';
import { VirtualList } from 'onefold/virtual-list';

function UserList(): Node {
  const users = createSignal(Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: \`User \${i}\`,
  })));

  return VirtualList({
    items: users,
    itemHeight: 48,
    containerHeight: 400,
    renderItem: (user) => html\`
      <div class="user-row" style="height:48px;display:flex;align-items:center">
        <span>\${user.name}</span>
      </div>
    \`,
  });
}`)}

      <h2>Options</h2>
      ${f(`<table>
        <tr><th>Option</th><th>Type</th><th>Required</th><th>Description</th></tr>
        <tr><td><code>items</code></td><td>Signal&lt;T[]&gt;</td><td>Yes</td><td>Reactive list of all items.</td></tr>
        <tr><td><code>itemHeight</code></td><td>number</td><td>Yes</td><td>Fixed height of each item in pixels.</td></tr>
        <tr><td><code>containerHeight</code></td><td>number</td><td>Yes</td><td>Height of the scrollable viewport.</td></tr>
        <tr><td><code>renderItem</code></td><td>(item: T, index: number) => Node</td><td>Yes</td><td>Render function for each item.</td></tr>
        <tr><td><code>overscan</code></td><td>number</td><td>No</td><td>Extra items rendered above/below viewport (default: 5).</td></tr>
      </table>`)}

      ${l("VirtualList uses a fixed item height for O(1) scroll position calculations. Variable-height items are not supported.")}

      <h2>How It Works</h2>
      <ol>
        <li>Only items visible in the viewport (plus overscan) are rendered as DOM nodes.</li>
        <li>A spacer element maintains the correct scroll height.</li>
        <li>On scroll, items are recycled — removed from one end, added to the other.</li>
        <li>With 10,000 items and 400px viewport, only ~15 DOM nodes exist at any time.</li>
      </ol>

      <h2>With Filtering</h2>
      ${e(`const allUsers = createSignal(generateUsers(10000));
const filter = createSignal('');

const filtered = createComputed(() =>
  allUsers().filter(u => u.name.toLowerCase().includes(filter().toLowerCase()))
);

function FilterableList(): Node {
  return html\`
    <div>
      <input value=\${() => filter()} oninput=\${(e: Event) => filter.set((e.target as HTMLInputElement).value)} placeholder="Search..." />
      \${VirtualList({
        items: filtered,
        itemHeight: 48,
        containerHeight: 400,
        renderItem: (user) => html\`<div class="row">\${user.name}</div>\`,
      })}
    </div>
  \`;
}`)}

      <h2>Try It</h2>
      <p>Scroll through 10,000 items — only ~15 DOM nodes exist at any time:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { VirtualList } from 'onefold/virtual-list';

function App() {
  // Generate 10,000 items
  const items = createSignal(
    Array.from({ length: 10000 }, (_, i) => ({
      id: i + 1,
      name: 'User ' + (i + 1),
      email: 'user' + (i + 1) + '@example.com',
      dept: ['Engineering', 'Design', 'Marketing', 'Sales', 'Support'][i % 5],
    }))
  );

  const count = () => items().length;

  return html\`
    <div>
      <h3>10,000 Users \u2014 Windowed</h3>
      <p style="font-size:12px;color:#666;margin-bottom:12px">
        \${() => count()} items in list. Only visible rows are in the DOM. Scroll to verify performance.
      </p>
      \${VirtualList({
        items,
        itemHeight: 44,
        height: 350,
        overscan: 4,
        renderRow: (user) => html\`
          <div style="display:flex;align-items:center;padding:0 16px;height:44px;border-bottom:1px solid #f1f5f9;font-size:13px">
            <div style="width:32px;height:32px;border-radius:50%;background:#e0e7ff;color:#4338ca;display:flex;align-items:center;justify-content:center;font-weight:600;font-size:11px;margin-right:12px">
              \${user.name.charAt(5) || 'U'}
            </div>
            <div style="flex:1">
              <div style="font-weight:500">\${user.name}</div>
              <div style="font-size:11px;color:#94a3b8">\${user.email}</div>
            </div>
            <span style="font-size:11px;padding:2px 8px;border-radius:10px;background:#f1f5f9;color:#64748b">\${user.dept}</span>
          </div>
        \`,
      })}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"VirtualList \u2014 10,000 Items",{height:430})}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/performance/code-splitting">Code Splitting</a> — lazy-load routes and heavy components</li>
        <li><a href="/core/signals">Signals</a> — the reactive primitives that drive VirtualList</li>
      </ul>
    </div>
  `}function St(){return n`
    <div>
      <h1>Code Splitting</h1>
      <p>Use <code>lazy()</code> with the Router for automatic route-based code splitting. Each page is loaded only when the user navigates to it.</p>

      <h2>Route-Based Splitting</h2>
      ${e(`import { Router, lazy, Suspense, html, mount } from 'onefold';
import { Suspense } from 'onefold/suspense';

// Each import() creates a separate chunk at build time
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));
const Analytics = lazy(() => import('./pages/Analytics'));

function App(): Node {
  return html\`
    <div>
      \${Suspense(
        () => Router([
          { path: '/', view: () => Home() },
          { path: '/dashboard', view: () => Dashboard() },
          { path: '/settings', view: () => Settings() },
          { path: '/analytics', view: () => Analytics() },
        ]),
        () => html\`<div class="loading">Loading...</div>\`
      )}
    </div>
  \`;
}

mount(App(), document.getElementById('app')!);`)}

      <h2>Build Configuration</h2>
      <p>Most bundlers (esbuild, Vite, webpack) split dynamic imports into separate chunks automatically:</p>
      ${e(`// esbuild
import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  splitting: true,    // enables code splitting
  format: 'esm',     // required for splitting
  outdir: 'dist',
});`)}

      ${l("Code splitting only works with ESM output format. Make sure your build tool outputs ES modules.")}

      <h2>Chunk Naming</h2>
      ${e(`// Output:
// dist/main.js         \u2014 entry point + router
// dist/chunk-Home.js   \u2014 Home page
// dist/chunk-Dashboard.js \u2014 Dashboard page
// dist/chunk-Settings.js  \u2014 Settings page`)}

      <h2>Preloading</h2>
      <p>Preload likely-needed chunks on hover or idle:</p>
      ${e(`// Preload on link hover
function NavLink(href: string, label: string, loader: () => Promise<any>): Node {
  return html\`
    <a
      href=\${href}
      onmouseenter=\${() => loader()}
      onclick=\${(e: Event) => { e.preventDefault(); navigate(href); }}
    >\${label}</a>
  \`;
}

// Usage
NavLink('/dashboard', 'Dashboard', () => import('./pages/Dashboard'));`)}

      <h2>Bundle Analysis</h2>
      <p>Add <code>metafile: true</code> to esbuild to analyze chunk sizes:</p>
      ${e(`const result = await esbuild.build({
  entryPoints: ['src/main.ts'],
  bundle: true,
  splitting: true,
  format: 'esm',
  outdir: 'dist',
  metafile: true,
});

// Write analysis
const text = await esbuild.analyzeMetafile(result.metafile);
console.log(text);`)}
    </div>
  `}function kt(){return n`
    <div>
      <h1>wrapImperative</h1>
      <p><code>wrapImperative</code> bridges imperative libraries (Chart.js, D3, Three.js) with onefold's reactive system. It manages lifecycle and re-renders when signals change.</p>

      <h2>Chart.js Example</h2>
      ${e(`import { createSignal, html } from 'onefold';
import { wrapImperative } from 'onefold/interop';
import Chart from 'chart.js/auto';

function ReactiveChart(): Node {
  const data = createSignal([12, 19, 3, 5, 2, 3]);

  const chart = wrapImperative({
    create: (container) => {
      const canvas = document.createElement('canvas');
      container.appendChild(canvas);
      return new Chart(canvas, {
        type: 'bar',
        data: { labels: ['A', 'B', 'C', 'D', 'E', 'F'], datasets: [{ data: data() }] },
      });
    },
    update: (instance) => {
      instance.data.datasets[0].data = data();
      instance.update();
    },
    destroy: (instance) => {
      instance.destroy();
    },
    deps: [data],
  });

  return html\`
    <div>
      \${chart}
      <button onclick=\${() => data.set(d => d.map(() => Math.random() * 20))}>
        Randomize
      </button>
    </div>
  \`;
}`)}

      <h2>D3 Example</h2>
      ${e(`import { createSignal } from 'onefold';
import { wrapImperative } from 'onefold/interop';
import * as d3 from 'd3';

function D3Visualization(): Node {
  const radius = createSignal(50);

  return wrapImperative({
    create: (container) => {
      const svg = d3.select(container).append('svg')
        .attr('width', 200).attr('height', 200);
      svg.append('circle')
        .attr('cx', 100).attr('cy', 100)
        .attr('r', radius())
        .attr('fill', 'steelblue');
      return svg;
    },
    update: (svg) => {
      svg.select('circle').attr('r', radius());
    },
    destroy: (svg) => {
      svg.remove();
    },
    deps: [radius],
  });
}`)}

      ${l("wrapImperative calls update() whenever any signal in deps changes. The imperative library stays in sync with reactive state.")}

      <h2>Options</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>create</code></td><td>(container: HTMLElement) => T</td><td>Initialize the imperative library. Return the instance.</td></tr>
        <tr><td><code>update</code></td><td>(instance: T) => void</td><td>Called when deps change. Update the instance.</td></tr>
        <tr><td><code>destroy</code></td><td>(instance: T) => void</td><td>Cleanup when the node is removed from DOM.</td></tr>
        <tr><td><code>deps</code></td><td>Signal[]</td><td>Signals to watch for changes.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>A canvas-based bar chart using <code>wrapImperative</code> — updates reactively when data changes:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { wrapImperative } from 'onefold/interop';

function App() {
  const data = createSignal([40, 70, 50, 90, 60, 80, 45]);

  function randomize() {
    data.set(data().map(() => Math.floor(Math.random() * 100) + 10));
  }

  // wrapImperative: mount an imperative canvas chart with auto-cleanup
  const chart = wrapImperative({
    tag: 'canvas',
    mount: (canvas) => {
      canvas.width = 320;
      canvas.height = 160;
      canvas.style.cssText = 'width:100%;height:160px;border:1px solid #e5e7eb;border-radius:8px';
      const ctx = canvas.getContext('2d');
      return ctx;
    },
    update: (ctx, canvas) => {
      const values = data();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const barW = canvas.width / values.length - 8;
      const maxVal = Math.max(...values);
      values.forEach((val, i) => {
        const h = (val / maxVal) * (canvas.height - 20);
        const x = i * (barW + 8) + 4;
        const y = canvas.height - h - 10;
        ctx.fillStyle = 'hsl(' + (i * 45) + ', 70%, 55%)';
        ctx.beginPath();
        ctx.roundRect(x, y, barW, h, 4);
        ctx.fill();
        ctx.fillStyle = '#374151';
        ctx.font = '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(val), x + barW / 2, canvas.height - 1);
      });
    },
    watch: () => data(),
  });

  return html\`
    <div>
      <h3>wrapImperative \u2014 Canvas Bar Chart</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">
        The canvas is managed imperatively. wrapImperative watches the signal and calls update() reactively.
      </p>
      \${chart}
      <button onclick=\${randomize} style="margin-top:12px">Randomize Data</button>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"wrapImperative \u2014 Reactive Canvas Chart")}
    </div>
  `}function $t(){return n`
    <div>
      <h1>embedForeign</h1>
      <p><code>embedForeign</code> mounts React, Vue, Svelte, or any framework component inside an onefold application. You control the mount/unmount lifecycle.</p>

      <h2>React Integration</h2>
      ${e(`import { embedForeign } from 'onefold/interop';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { DatePicker } from './react-components/DatePicker';

function App(): Node {
  const datePicker = embedForeign({
    mount: (container, props) => {
      const root = createRoot(container);
      root.render(React.createElement(DatePicker, props));
      return { root };
    },
    unmount: (container, { root }) => {
      root.unmount();
    },
    props: {
      onChange: (date: Date) => console.log('Selected:', date),
      minDate: new Date(),
    },
  });

  return html\`
    <div>
      <h2>Pick a date</h2>
      \${datePicker}
    </div>
  \`;
}`)}

      <h2>Vue Integration</h2>
      ${e(`import { embedForeign } from 'onefold/interop';
import { createApp } from 'vue';
import ChartComponent from './vue-components/Chart.vue';

const vueChart = embedForeign({
  mount: (container, props) => {
    const app = createApp(ChartComponent, props);
    app.mount(container);
    return { app };
  },
  unmount: (container, { app }) => {
    app.unmount();
  },
  props: { data: [1, 2, 3, 4, 5] },
});`)}

      ${l("embedForeign creates a container div and passes it to your mount function. You own the lifecycle \u2014 mount however the foreign framework requires.")}

      <h2>Svelte Integration</h2>
      ${e(`import { embedForeign } from 'onefold/interop';
import Counter from './svelte-components/Counter.svelte';

const svelteCounter = embedForeign({
  mount: (container, props) => {
    const component = new Counter({ target: container, props });
    return { component };
  },
  unmount: (container, { component }) => {
    component.$destroy();
  },
  props: { initial: 0 },
});`)}

      <h2>API</h2>
      <table>
        <tr><th>Option</th><th>Type</th><th>Description</th></tr>
        <tr><td><code>mount</code></td><td>(container: HTMLElement, props: P) => C</td><td>Mount the foreign component. Return a context for cleanup.</td></tr>
        <tr><td><code>unmount</code></td><td>(container: HTMLElement, context: C) => void</td><td>Cleanup when the node leaves the DOM.</td></tr>
        <tr><td><code>props</code></td><td>P</td><td>Props passed to the mount function.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Simulates embedding a "foreign" widget (like a React/Vue component) using <code>embedForeign</code>:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { embedForeign } from 'onefold/interop';

function App() {
  const count = createSignal(0);

  // Simulate a "foreign framework" widget rendered imperatively
  // In a real app this would be: ReactDOM.createRoot(el).render(<Counter />)
  const foreignWidget = embedForeign({
    tag: 'div',
    render: (el) => {
      el.style.cssText = 'padding:16px;border:2px dashed #818cf8;border-radius:8px;background:#eef2ff';
      el.innerHTML = '<p style="font-size:13px;color:#4338ca;font-weight:600;margin-bottom:8px">[Foreign Widget]</p>' +
        '<p style="font-size:13px">This simulates a React/Vue component mounted with embedForeign.</p>' +
        '<p style="font-size:12px;color:#666;margin-top:8px">It has its own internal state and rendering \u2014 onefold only owns the container element.</p>' +
        '<button id="foreign-btn" style="margin-top:8px">Foreign Click: 0</button>';
      let clicks = 0;
      el.querySelector('#foreign-btn').onclick = () => {
        clicks++;
        el.querySelector('#foreign-btn').textContent = 'Foreign Click: ' + clicks;
      };
      return { el, cleanup: () => { el.innerHTML = ''; } };
    },
    unrender: (ctx) => {
      ctx.cleanup();
      console.log('Foreign widget unmounted');
    },
  });

  const showForeign = createSignal(true);

  return html\`
    <div>
      <h3>embedForeign \u2014 Third-Party Widget</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">
        embedForeign provides a container element. The foreign framework renders into it. onefold handles cleanup when the node is removed.
      </p>
      <button onclick=\${() => showForeign.set(v => !v)} style="margin-bottom:12px">
        \${() => showForeign() ? 'Unmount Foreign Widget' : 'Mount Foreign Widget'}
      </button>
      \${() => showForeign() ? foreignWidget : html\`<p style="color:#94a3b8;padding:16px;text-align:center">Widget unmounted. unrender() was called for cleanup.</p>\`}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"embedForeign \u2014 Mount/Unmount Third-Party Widget")}
    </div>
  `}function Ct(){return n`
    <div>
      <h1>Plugins</h1>
      <p><code>createPluginHost</code> enables an extensible plugin architecture with sandboxed permissions and lifecycle hooks.</p>

      <h2>Creating a Plugin Host</h2>
      ${e(`import { createPluginHost } from 'onefold/plugin';

const plugins = createPluginHost({
  permissions: ['read:state', 'write:state', 'ui:render'],
});`)}

      <h2>Registering Plugins</h2>
      ${e(`plugins.register({
  name: 'analytics-plugin',
  version: '1.0.0',
  permissions: ['read:state'],
  hooks: {
    onInit: (ctx) => {
      console.log('Analytics plugin initialized');
    },
    onRouteChange: (ctx, route) => {
      trackPageView(route.path);
    },
    onStateChange: (ctx, state) => {
      trackEvent('state-change', state);
    },
  },
});

plugins.register({
  name: 'theme-plugin',
  version: '1.0.0',
  permissions: ['read:state', 'ui:render'],
  hooks: {
    onInit: (ctx) => {
      ctx.provide('theme-toggle', () => toggleTheme());
    },
  },
});`)}

      <h2>Permissions</h2>
      <p>Plugins can only access APIs they've been granted permission for:</p>
      <table>
        <tr><th>Permission</th><th>Description</th></tr>
        <tr><td><code>read:state</code></td><td>Read application state.</td></tr>
        <tr><td><code>write:state</code></td><td>Modify application state.</td></tr>
        <tr><td><code>ui:render</code></td><td>Render UI elements into slots.</td></tr>
        <tr><td><code>network</code></td><td>Make HTTP requests.</td></tr>
        <tr><td><code>storage</code></td><td>Access localStorage/sessionStorage.</td></tr>
      </table>

      ${l("A plugin that requests a permission not in the host's allowed list is rejected at registration time.")}

      <h2>Lifecycle Hooks</h2>
      <table>
        <tr><th>Hook</th><th>When</th></tr>
        <tr><td><code>onInit</code></td><td>Plugin is registered and ready.</td></tr>
        <tr><td><code>onDestroy</code></td><td>Plugin is unregistered.</td></tr>
        <tr><td><code>onRouteChange</code></td><td>Navigation occurs.</td></tr>
        <tr><td><code>onStateChange</code></td><td>Application state updates.</td></tr>
        <tr><td><code>onError</code></td><td>Unhandled error in the app.</td></tr>
      </table>

      <h2>Plugin Context</h2>
      ${e(`// The ctx object provides scoped access:
ctx.provide(key, value)  // expose a value to other plugins
ctx.consume(key)         // read a value from another plugin
ctx.getState()           // read state (if permitted)
ctx.setState(partial)    // update state (if permitted)`)}

      <h2>Try It</h2>
      <p>Register plugins, start/stop them, and see lifecycle events in real time:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { createPluginHost } from 'onefold/plugin';

function App() {
  const logs = createSignal([]);
  const log = (msg) => logs.set(prev => [...prev.slice(-8), msg]);

  const plugins = createPluginHost();

  // Listen to host events
  plugins.on('plugin:started', (name) => log('Started: ' + name));
  plugins.on('plugin:stopped', (name) => log('Stopped: ' + name));
  plugins.on('plugin:error', (name, err) => log('Error in ' + name + ': ' + err));

  // Register plugins
  plugins.register({
    name: 'analytics',
    version: '1.0.0',
    permissions: ['observe'],
    setup: (ctx) => {
      log('[analytics] setup called');
      ctx.on('track', (data) => log('[analytics] tracked: ' + JSON.stringify(data)));
      return () => log('[analytics] teardown');
    },
  });

  plugins.register({
    name: 'logger',
    version: '1.0.0',
    permissions: ['observe'],
    setup: (ctx) => {
      log('[logger] setup called');
      return () => log('[logger] teardown');
    },
  });

  return html\`
    <div>
      <h3>Plugin System \u2014 createPluginHost</h3>
      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <button onclick=\${() => plugins.start()}>Start All</button>
        <button onclick=\${() => plugins.stop()}>Stop All</button>
        <button onclick=\${() => plugins.startPlugin('analytics')}>Start analytics</button>
        <button onclick=\${() => plugins.stopPlugin('logger')}>Stop logger</button>
      </div>
      <div style="margin-bottom:12px">
        <p style="font-size:13px;font-weight:600;margin-bottom:6px">Registered: \${() => plugins.list().join(', ')}</p>
        <div style="display:flex;gap:8px">
          \${() => plugins.list().map(name => html\`
            <span style="padding:3px 8px;border-radius:4px;font-size:12px;background:\${plugins.getStatus(name) === 'active' ? '#dcfce7' : '#f1f5f9'};color:\${plugins.getStatus(name) === 'active' ? '#166534' : '#64748b'}">
              \${name}: \${plugins.getStatus(name)}
            </span>
          \`)}
        </div>
      </div>
      <div style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:8px;font-family:monospace;font-size:12px;max-height:180px;overflow-y:auto">
        \${() => logs().length === 0
          ? html\`<div style="color:#64748b">Click "Start All" to begin...</div>\`
          : logs().map(l => html\`<div style="padding:2px 0">> \${l}</div>\`)
        }
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createPluginHost \u2014 Lifecycle Management")}
    </div>
  `}function Pt(){return n`
    <div>
      <h1>Observability</h1>
      <p><code>createObserver</code> provides structured logging, metrics collection, and performance tracking for production applications.</p>

      <h2>Setup</h2>
      ${e(`import { createObserver } from 'onefold/observe';

const observer = createObserver({
  onLog: (level, message, data) => {
    // Send to your logging service
    console.log(\`[\${level}] \${message}\`, data);
  },
  onMetric: (name, value, tags) => {
    // Send to metrics backend (Datadog, Prometheus, etc.)
    analytics.track(name, { value, ...tags });
  },
  onError: (error, context) => {
    // Send to error tracking (Sentry, Bugsnag, etc.)
    errorTracker.captureException(error, { extra: context });
  },
});`)}

      <h2>Logging</h2>
      ${e(`observer.log('info', 'User logged in', { userId: '123' });
observer.log('warn', 'API response slow', { duration: 2500 });
observer.log('error', 'Payment failed', { code: 'CARD_DECLINED' });`)}

      <h2>Metrics</h2>
      ${e(`// Track custom metrics
observer.metric('page-load', 1.2, { route: '/dashboard' });
observer.metric('api-latency', 340, { endpoint: '/users' });
observer.metric('bundle-size', 48000, { chunk: 'main' });`)}

      <h2>Performance Tracking</h2>
      ${e(`// Time an operation
const end = observer.startTimer('fetch-users');
const users = await http.get('/users');
end(); // automatically records duration as a metric`)}

      ${l("createObserver is a thin abstraction. It does not bundle any specific logging/metrics library \u2014 you wire it to your own backend.")}

      <h2>Integration Example</h2>
      ${e(`// Sentry + Datadog integration
const observer = createObserver({
  onLog: (level, msg, data) => {
    if (level === 'error') Sentry.captureMessage(msg, { extra: data });
  },
  onMetric: (name, value, tags) => {
    datadogRum.addTiming(name, value);
  },
  onError: (error, ctx) => {
    Sentry.captureException(error, { contexts: { app: ctx } });
  },
});`)}

      <h2>API</h2>
      <table>
        <tr><th>Method</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>.log</code></td><td>(level, message, data?)</td><td>Structured log entry.</td></tr>
        <tr><td><code>.metric</code></td><td>(name, value, tags?)</td><td>Record a metric.</td></tr>
        <tr><td><code>.startTimer</code></td><td>(name)</td><td>Start timing, returns end() function.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Emit events and see them collected by the observer in real time:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { createObserver } from 'onefold/observe';

function App() {
  const logs = createSignal([]);
  const log = (msg) => logs.set(prev => [...prev.slice(-10), msg]);

  const observer = createObserver();

  // Subscribe to all event types
  observer.on('navigate', (e) => log('[nav] ' + e.from + ' \u2192 ' + e.to));
  observer.on('error', (e) => log('[error] ' + e.context + ': ' + e.error));
  observer.on('metric', (e) => log('[metric] ' + e.name + ' = ' + e.value.toFixed(2)));
  observer.on('render', (e) => log('[render] ' + e.component + ' in ' + e.duration.toFixed(1) + 'ms'));
  observer.on('log', (e) => log('[' + e.level + '] ' + e.message));

  return html\`
    <div>
      <h3>Observability \u2014 createObserver</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">Click buttons to emit structured events:</p>

      <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap">
        <button onclick=\${() => observer.emit('navigate', { from: '/', to: '/about' })}>Navigate</button>
        <button onclick=\${() => observer.emit('error', { error: 'Connection timeout', context: 'api.fetch' })}>Error</button>
        <button onclick=\${() => observer.metric('page.load', Math.random() * 500)}>Metric</button>
        <button onclick=\${() => observer.log('info', 'User clicked checkout')}>Log</button>
        <button onclick=\${() => {
          const result = observer.trackRender('UserList', () => {
            let sum = 0; for (let i = 0; i < 100000; i++) sum += i;
            return sum;
          });
        }}>Track Render</button>
        <button onclick=\${() => {
          observer.trackError(() => { throw new Error('Oops!'); }, 'risky-op');
        }}>Track Error</button>
      </div>

      <div style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:8px;font-family:monospace;font-size:12px;max-height:200px;overflow-y:auto">
        \${() => logs().length === 0
          ? html\`<div style="color:#64748b">Events will appear here...</div>\`
          : logs().map(l => html\`<div style="padding:2px 0">> \${l}</div>\`)
        }
      </div>
      <p style="font-size:11px;color:#94a3b8;margin-top:8px">In production, connect these events to Datadog, Sentry, New Relic, etc.</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"createObserver \u2014 Structured Event Bus")}
    </div>
  `}function Rt(){return n`
    <div>
      <h1>Component Metadata</h1>
      <p><code>component()</code> registers components with metadata for dev tools, documentation generation, and design system catalogs.</p>

      <h2>Registering Components</h2>
      ${e(`import { html } from 'onefold';
import { component } from 'onefold/meta';

const Button = component({
  name: 'Button',
  description: 'Primary action button',
  props: {
    label: { type: 'string', required: true },
    variant: { type: 'string', default: 'primary' },
    disabled: { type: 'boolean', default: false },
  },
  render: (props) => html\`
    <button class=\${\`btn btn-\${props.variant}\`} disabled=\${props.disabled}>
      \${props.label}
    </button>
  \`,
});`)}

      <h2>getComponentRegistry</h2>
      <p>Retrieve all registered components (useful for dev tools and design systems):</p>
      ${e(`import { getComponentRegistry } from 'onefold/meta';

const registry = getComponentRegistry();
// Map<string, ComponentMeta>

for (const [name, meta] of registry) {
  console.log(name, meta.description, meta.props);
}`)}

      <h2>exportManifest</h2>
      <p>Export a JSON manifest of all components for documentation tools:</p>
      ${e(`import { exportManifest } from 'onefold/meta';

const manifest = exportManifest();
// {
//   components: [
//     { name: 'Button', description: '...', props: [...] },
//     { name: 'Card', description: '...', props: [...] },
//   ]
// }

// Write to file in a build script
fs.writeFileSync('component-manifest.json', JSON.stringify(manifest, null, 2));`)}

      ${l("Component metadata is optional \u2014 it does not affect runtime behavior. Use it for tooling, documentation, and design system governance.")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>component</code></td><td>(meta: ComponentMeta)</td><td>Register a component with metadata and render function.</td></tr>
        <tr><td><code>getComponentRegistry</code></td><td>()</td><td>Get all registered components.</td></tr>
        <tr><td><code>exportManifest</code></td><td>()</td><td>Export JSON manifest of all components.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Register components with metadata and inspect the registry:</p>

      ${p(`import { html, mount } from 'onefold';
import { component, getComponentRegistry, exportManifest } from 'onefold/meta';
import { createSignal } from 'onefold';

// Register components with metadata
const Button = component({
  name: 'Button',
  description: 'A reusable button with variants',
  props: {
    label: { type: 'string', required: true, description: 'Button text' },
    variant: { type: 'string', default: 'primary', description: 'primary | outline | danger' },
  },
  tags: ['ui', 'input'],
  render: ({ label, variant }) => {
    const styles = {
      primary: 'background:#4f46e5;color:white;border-color:#4f46e5',
      outline: 'background:transparent;border:1px solid #e5e7eb',
      danger: 'background:#ef4444;color:white;border-color:#ef4444',
    };
    return html\`<button style=\${styles[variant] || styles.primary}>\${label}</button>\`;
  },
});

const Card = component({
  name: 'Card',
  description: 'Content card with title and body',
  props: {
    title: { type: 'string', required: true },
    body: { type: 'string', required: true },
  },
  tags: ['ui', 'layout'],
  render: ({ title, body }) => html\`
    <div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px">
      <h4 style="margin-bottom:4px">\${title}</h4>
      <p style="font-size:13px;color:#666">\${body}</p>
    </div>
  \`,
});

function App() {
  const showManifest = createSignal(false);

  // Get registry info
  const registry = getComponentRegistry();
  const manifest = exportManifest();

  return html\`
    <div>
      <h3>Component Metadata Registry</h3>
      <p style="font-size:13px;color:#666;margin-bottom:16px">
        Registered \${registry.size} component(s). Metadata is used by AI tools, visual builders, and docs generators.
      </p>

      <div style="margin-bottom:16px">
        <p style="font-size:13px;font-weight:600;margin-bottom:8px">Live components:</p>
        <div style="display:flex;gap:8px;margin-bottom:8px">
          \${Button({ label: 'Primary', variant: 'primary' })}
          \${Button({ label: 'Outline', variant: 'outline' })}
          \${Button({ label: 'Danger', variant: 'danger' })}
        </div>
        \${Card({ title: 'Example Card', body: 'This card was rendered from the registered component.' })}
      </div>

      <button onclick=\${() => showManifest.set(v => !v)} style="margin-bottom:8px">
        \${() => showManifest() ? 'Hide' : 'Show'} Exported Manifest
      </button>
      \${() => showManifest() ? html\`
        <pre style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:8px;font-size:11px;overflow-x:auto;max-height:200px">\${JSON.stringify(manifest, null, 2)}</pre>
      \` : null}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"component() + exportManifest \u2014 Metadata Registry")}
    </div>
  `}var xo=`// server.ts \u2014 Express SSR with onefold
import express from 'express';
import { html } from 'onefold';
import { renderHTML } from 'onefold/ssr';

const app = express();
app.use('/public', express.static('dist/public'));

// Static page \u2014 pure server render, no client JS needed
app.get('/', (req, res) => {
  const body = renderHTML(() => html\`
    <div>
      <h1>Welcome</h1>
      <p>This content is fully server-rendered.</p>
    </div>
  \`);
  res.send(shell('Home', body));
});

// Async page \u2014 fetch data on server, render to HTML
app.get('/users', async (req, res) => {
  const body = await renderHTML(async () => {
    const users = await db.getUsers();
    return html\`
      <ul>
        \${users.map(u => html\`<li>\${u.name} \u2014 \${u.role}</li>\`)}
      </ul>
    \`;
  });
  res.send(shell('Users', body));
});

// Interactive page \u2014 server renders shell, client mounts live component
app.get('/counter', (req, res) => {
  const body = renderHTML(() => html\`
    <div>
      <h1>Counter</h1>
      <div id="interactive">Loading...</div>
    </div>
  \`);
  res.send(shell('Counter', body));
});

function shell(title, body) {
  return \`<!DOCTYPE html>
<html>
<head><title>\${title}</title></head>
<body>
  <div id="app">\${body}</div>
  <script type="module" src="/public/app.js"><\/script>
</body>
</html>\`;
}

app.listen(3000);`,wo=`// client.ts \u2014 selective hydration
import { mount, createSignal, html } from 'onefold';

const path = window.location.pathname;
const root = document.getElementById('interactive');

// Only mount on pages that need interactivity
if (path === '/counter' && root) {
  const count = createSignal(0);
  mount(html\`
    <div>
      <h2>\${() => count()}</h2>
      <button onclick=\${() => count.set(n => n + 1)}>+</button>
    </div>
  \`, root);
}

// Static pages (/, /users): no JS runs. Server HTML stays as-is.`,So=`// build.mjs
import { build } from 'esbuild';
import { mkdirSync } from 'node:fs';

mkdirSync('dist/public', { recursive: true });

// Server bundle (Node.js)
await build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: 'dist/server.mjs',
  packages: 'external',
});

// Client bundle (browser)
await build({
  entryPoints: ['src/client.ts'],
  bundle: true,
  format: 'esm',
  outfile: 'dist/public/app.js',
  minify: true,
});

console.log('dist/server.mjs  \u2014 run with: node dist/server.mjs');
console.log('dist/public/app.js \u2014 loaded by browser');`,ko=`src/
  shared/              Shared between server + client (zero duplication)
    components/Nav.ts  Navigation bar
    layouts/Page.ts    Page wrapper
    types.ts           Interfaces
  pages/               Page components (rendered by server)
    HomePage.ts        Static \u2014 no client JS
    UsersPage.ts       Static + async data fetch
    CounterPage.ts     Interactive \u2014 client mounts into #interactive
  server/              Server-only code
    index.ts           Express app
    routes.ts          Route definitions
    data.ts            Database / API calls
  client/              Client-only code
    index.ts           Selective hydration
dist/                  Build output (deployable)
  server.mjs           Node.js server
  public/app.js        Client bundle`;function Tt(){return n`
    <div>
      <h1>Server-Side Rendering</h1>
      <p><code>renderHTML</code> converts onefold components to HTML strings on the server. Zero dependencies. No jsdom. Fully tree-shakable.</p>

      <h2>How It Works</h2>
      ${e(`import { html } from 'onefold';
import { renderHTML } from 'onefold/ssr';

// Sync render
const result = renderHTML(() => html\`<h1>Hello</h1>\`);
// \u2192 '<h1>Hello</h1>'

// Async render (with data fetching)
const result = await renderHTML(async () => {
  const data = await fetch('/api/users').then(r => r.json());
  return html\`<ul>\${data.map(u => html\`<li>\${u.name}</li>\`)}</ul>\`;
});`)}

      <p>Uses the same tokenizer as client-side <code>html</code>. Reactive expressions evaluate once. Event handlers are stripped. Same XSS escaping applies.</p>

      ${l("renderHTML is tree-shakable. If your client bundle never imports it, it adds 0 bytes. Only server code pays for it.")}

      <h2>Properties</h2>
      <table>
        <tr><th>Property</th><th>Value</th></tr>
        <tr><td>Dependencies</td><td>Zero (no jsdom, no DOM polyfill)</td></tr>
        <tr><td>Performance</td><td>~0.5ms per page</td></tr>
        <tr><td>Tree-shakable</td><td>0 bytes in client bundle if not imported</td></tr>
        <tr><td>Async support</td><td>Yes — accepts async component functions</td></tr>
        <tr><td>Security</td><td>Same escaping: HTML entities, URL scheme blocking, event stripping</td></tr>
        <tr><td>Per-page opt-in</td><td>SSR whichever routes you want, skip the rest</td></tr>
      </table>

      <h2>The Pattern</h2>
      <p>onefold SSR uses <strong>selective hydration</strong>:</p>
      <ul>
        <li><strong>Static pages</strong> — server renders full HTML. Client does nothing. Zero JS overhead.</li>
        <li><strong>Interactive pages</strong> — server renders a shell (nav, title, placeholder). Client mounts a live component into the placeholder.</li>
      </ul>

      <table>
        <tr><th>Route</th><th>Server</th><th>Client</th></tr>
        <tr><td><code>/</code></td><td>Renders full content</td><td>No JS runs</td></tr>
        <tr><td><code>/users</code></td><td>Fetches data, renders HTML</td><td>No JS runs</td></tr>
        <tr><td><code>/counter</code></td><td>Renders shell with <code>#interactive</code></td><td>Mounts live counter</td></tr>
      </table>

      <h2>Server Example</h2>
      ${e(xo)}

      <h2>Client Example</h2>
      ${e(wo)}

      <h2>Build Script</h2>
      <p>Use esbuild to produce both server and client bundles:</p>
      ${e(So)}

      <h2>Project Structure</h2>
      <p>Recommended layout for scalable SSR apps with zero code duplication:</p>
      ${e(ko)}

      <h2>What Gets Stripped in SSR Output</h2>
      <table>
        <tr><th>Feature</th><th>In HTML output?</th><th>Why</th></tr>
        <tr><td>Text content</td><td>Yes (escaped)</td><td>Content is the point of SSR</td></tr>
        <tr><td>Attributes (class, style, href)</td><td>Yes (escaped)</td><td>Styling + structure</td></tr>
        <tr><td>Event handlers (onclick)</td><td>Stripped</td><td>Can't execute in static HTML</td></tr>
        <tr><td>ref callbacks</td><td>Stripped</td><td>No DOM node on server</td></tr>
        <tr><td>Reactive expressions</td><td>Evaluated once</td><td>Snapshot of current signal value</td></tr>
        <tr><td>Unsafe URLs (javascript:)</td><td>Blocked</td><td>Same security as client</td></tr>
      </table>

      <h2>Deploy</h2>
      ${e(`# Build
npm run build

# Run
node dist/server.mjs

# Or with PORT env
PORT=8080 node dist/server.mjs`)}

      <p>The <code>dist/</code> folder is self-contained — deploy to any Node.js host (Railway, Render, Fly.io, VPS).</p>

      <h2>When to Use SSR</h2>
      <table>
        <tr><th>Use SSR</th><th>Skip SSR (client-only SPA)</th></tr>
        <tr><td>Landing pages, marketing sites</td><td>Dashboards, admin panels</td></tr>
        <tr><td>Blog posts, documentation</td><td>Behind-login features</td></tr>
        <tr><td>E-commerce product pages</td><td>Real-time collaborative apps</td></tr>
        <tr><td>Social media link previews needed</td><td>Heavy client-side interaction</td></tr>
        <tr><td>SEO matters</td><td>Content is user-specific anyway</td></tr>
      </table>

      <h2>API</h2>
      ${f(`<table>
        <tr><th>Function</th><th>Signature</th><th>Description</th></tr>
        <tr><td><code>renderHTML</code></td><td><code>(() =&gt; unknown) =&gt; string</code></td><td>Sync render \u2014 returns HTML string immediately</td></tr>
        <tr><td><code>renderHTML</code></td><td><code>(() =&gt; Promise) =&gt; Promise&lt;string&gt;</code></td><td>Async render \u2014 waits for data, then returns HTML string</td></tr>
      </table>`)}

      <h2>Run the Example</h2>
      ${e(`# Full working SSR app is in examples/ssr-app/
cd examples/ssr-app
npm install
npm run build
npm start
# \u2192 http://localhost:3000

# Routes:
#   /          Static (SSR only)
#   /about     Static (SSR only)
#   /users     Static + async data fetch
#   /counter   Interactive (client mounts)
#   /todo      Interactive (client mounts)
#   /search    Interactive (client mounts)`)}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/core/templates">Templates</a> — same components work on server and client</li>
        <li><a href="/data/resource">Resource</a> — async data fetching patterns</li>
        <li><a href="/routing/router">Router</a> — client-side navigation after hydration</li>
        <li><a href="/performance/code-splitting">Code Splitting</a> — reduce client bundle size</li>
      </ul>
    </div>
  `}function At(){return n`
    <div>
      <h1>DevTools</h1>
      <p><code>enableDevtools</code> activates browser console integration for inspecting signals, effects, and component trees during development.</p>

      <h2>Enable in Development</h2>
      ${e(`import { enableDevtools } from 'onefold/devtools';

if (import.meta.env?.MODE === 'development') {
  enableDevtools();
}`)}

      <h2>Features</h2>
      <ul>
        <li><strong>Signal Inspector</strong> — View all active signals and their current values.</li>
        <li><strong>Effect Tracker</strong> — See which effects depend on which signals.</li>
        <li><strong>Update Log</strong> — Console log of every signal change and resulting DOM update.</li>
        <li><strong>Component Tree</strong> — Visualize the component hierarchy.</li>
        <li><strong>Performance</strong> — Track update timing and identify slow renders.</li>
      </ul>

      <h2>Disable</h2>
      ${e(`import { disableDevtools } from 'onefold/devtools';

// Turn off devtools (e.g., before production build check)
disableDevtools();`)}

      ${l("DevTools add runtime overhead. Never enable them in production. Use conditional checks like import.meta.env.MODE.")}

      <h2>Console API</h2>
      <p>When devtools are enabled, a global <code>__ONEFOLD__</code> object is available in the browser console:</p>
      ${e(`// In browser console:
__ONEFOLD__.signals       // List all active signals
__ONEFOLD__.effects       // List all active effects
__ONEFOLD__.components    // Component tree
__ONEFOLD__.inspect(signal) // Detailed info about a signal`)}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Description</th></tr>
        <tr><td><code>enableDevtools()</code></td><td>Activate devtools integration.</td></tr>
        <tr><td><code>disableDevtools()</code></td><td>Deactivate devtools integration.</td></tr>
      </table>

      <h2>Try It</h2>
      <p>Enable devtools and see render performance stats update as you interact:</p>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { enableDevtools } from 'onefold/devtools';

function App() {
  const devtools = enableDevtools();
  const count = createSignal(0);
  const tick = createSignal(0);

  function refresh() { tick.set(n => n + 1); }

  function increment() {
    count.set(n => n + 1);
    refresh();
  }

  function burst() {
    for (let i = 0; i < 20; i++) count.set(n => n + 1);
    refresh();
  }

  return html\`
    <div>
      <h3>DevTools \u2014 Performance Monitor</h3>
      <p style="font-size:13px;color:#666;margin-bottom:12px">
        enableDevtools() hooks into the effect system to track every render.
      </p>

      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
        <button onclick=\${increment}>Increment (\${() => count()})</button>
        <button onclick=\${burst}>Burst +20</button>
        <button onclick=\${() => { devtools.clear(); count.set(0); refresh(); }} style="font-size:12px">Clear Stats</button>
      </div>

      <div style="background:#0f172a;color:#a5f3fc;padding:12px;border-radius:8px;font-family:monospace;font-size:12px">
        \${() => {
          tick();
          const s = devtools.stats();
          return html\`
            <div>Total renders: <strong>\${s.totalRenders}</strong></div>
            <div>Avg duration: <strong>\${s.avgDuration.toFixed(3)}ms</strong></div>
            <div>Slowest: <strong>\${s.slowestRender ? s.slowestRender.duration.toFixed(3) + 'ms (' + s.slowestRender.label + ')' : 'N/A'}</strong></div>
            <div>Errors: <strong>\${s.totalErrors}</strong></div>
            <div style="margin-top:6px;color:#64748b">Render entries: \${devtools.renders.length} | Active: \${devtools.active ? 'yes' : 'no'}</div>
          \`;
        }}
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"enableDevtools \u2014 Render Profiling")}
    </div>
  `}function It(){return n`
    <div>
      <h1>Utilities</h1>
      <p>onefold ships common utility functions to reduce external dependencies. All are tree-shakeable — only imported functions are bundled.</p>

      <h2>Date & Time</h2>
      ${e(`import { formatDate, timeAgo } from 'onefold/utils';

formatDate(new Date(), 'short')    // 'Jul 15, 2026'
formatDate(new Date(), 'iso')      // '2026-07-15'

timeAgo(new Date(Date.now() - 60000))   // '1 minute ago'
timeAgo(new Date(Date.now() - 3600000)) // '1 hour ago'`)}

      <h2>Formatting</h2>
      ${e(`import { formatCurrency, formatNumber, truncate, slugify, pluralize, capitalize } from 'onefold/utils';

formatCurrency(1234.5, 'USD')  // '$1,234.50'
formatCurrency(999, 'EUR')     // '\u20AC999.00'
formatNumber(123456)           // '123,456'

truncate('Hello World this is long', 20)  // 'Hello World this ...'
slugify('Hello World!')      // 'hello-world'
capitalize('hello')          // 'Hello'
pluralize('item', 1)         // 'item'
pluralize('item', 5)         // 'items'`)}

      <h2>Function Utilities</h2>
      ${e(`import { debounce, throttle, pipe } from 'onefold/utils';

const search = debounce((query) => fetchResults(query), 300);
const handleScroll = throttle(() => updatePosition(), 100);

// Pipe \u2014 passes value through functions left to right
const result = pipe('  Hello World  ',
  (s: string) => s.trim(),
  (s: string) => s.toLowerCase(),
  (s: string) => s.replace(/\\s+/g, '-'),
);
// result === 'hello-world'`)}

      <h2>API Reference</h2>
      <table>
        <tr><th>Function</th><th>Signature</th><th>Description</th></tr>
        <tr><td><code>formatDate</code></td><td>(date, format) => string</td><td>Format a Date ('short', 'long', 'iso', 'datetime').</td></tr>
        <tr><td><code>timeAgo</code></td><td>(date) => string</td><td>Human-readable relative time.</td></tr>
        <tr><td><code>formatCurrency</code></td><td>(amount, currency) => string</td><td>Format number as currency.</td></tr>
        <tr><td><code>formatNumber</code></td><td>(num) => string</td><td>Format with locale separators.</td></tr>
        <tr><td><code>truncate</code></td><td>(str, maxLen) => string</td><td>Truncate with ellipsis.</td></tr>
        <tr><td><code>slugify</code></td><td>(str) => string</td><td>URL-safe slug from string.</td></tr>
        <tr><td><code>capitalize</code></td><td>(str) => string</td><td>Uppercase first letter.</td></tr>
        <tr><td><code>pluralize</code></td><td>(word, count, plural?) => string</td><td>Pluralize based on count.</td></tr>
        <tr><td><code>debounce</code></td><td>(fn, ms) => fn</td><td>Delay execution until idle.</td></tr>
        <tr><td><code>throttle</code></td><td>(fn, ms) => fn</td><td>Limit execution frequency.</td></tr>
        <tr><td><code>pipe</code></td><td>(...fns) => fn</td><td>Left-to-right function composition.</td></tr>
      </table>

      <h2>Try It</h2>

      ${p(`import { createSignal, html, mount } from 'onefold';
import { formatDate, timeAgo, formatCurrency, formatNumber, truncate, slugify, pluralize, capitalize, debounce, throttle, pipe } from 'onefold/utils';

function App() {
  const input = createSignal('Hello World! This is OneFold.');
  const amount = createSignal(1234.56);
  const count = createSignal(3);
  const throttleCount = createSignal(0);

  const debouncedLog = debounce((q) => console.log('Debounced:', q), 500);
  const throttledIncrement = throttle(() => throttleCount.set(n => n + 1), 300);

  const transform = (s) => pipe(s,
    (s) => s.trim(),
    (s) => s.toLowerCase(),
    (s) => s.replace(/[^a-z0-9]+/g, '-'),
  );

  const now = new Date();
  const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
  const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);

  return html\`
    <div>
      <h3>Utilities \u2014 Live API</h3>

      <div style="display:flex;gap:12px;margin-bottom:12px">
        <div style="flex:1">
          <label style="font-size:12px;color:#666">Text input</label>
          <input oninput=\${(e) => { input.set(e.target.value); debouncedLog(e.target.value); }} style="width:100%" placeholder="Type here..." />
        </div>
        <div>
          <label style="font-size:12px;color:#666">Amount</label>
          <input type="number" oninput=\${(e) => amount.set(Number(e.target.value))} style="width:90px" placeholder="1234" />
        </div>
        <div>
          <label style="font-size:12px;color:#666">Count</label>
          <input type="number" oninput=\${(e) => count.set(Number(e.target.value))} style="width:70px" placeholder="3" />
        </div>
      </div>

      <table style="width:100%;font-size:13px;border-collapse:collapse">
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>slugify</strong></td><td style="padding:6px;font-family:monospace">\${() => slugify(input())}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>truncate(20)</strong></td><td style="padding:6px;font-family:monospace">\${() => truncate(input(), 20)}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>capitalize</strong></td><td style="padding:6px;font-family:monospace">\${() => capitalize(input())}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>pipe (transform)</strong></td><td style="padding:6px;font-family:monospace">\${() => transform(input())}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>pluralize('item')</strong></td><td style="padding:6px;font-family:monospace">\${() => count() + ' ' + pluralize('item', count())}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>formatCurrency(USD)</strong></td><td style="padding:6px;font-family:monospace">\${() => formatCurrency(amount(), 'USD')}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>formatNumber</strong></td><td style="padding:6px;font-family:monospace">\${() => formatNumber(amount())}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>formatDate(now)</strong></td><td style="padding:6px;font-family:monospace">\${formatDate(now, 'short')}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>timeAgo(5 min)</strong></td><td style="padding:6px;font-family:monospace">\${timeAgo(fiveMinAgo)}</td></tr>
        <tr><td style="padding:6px"><strong>timeAgo(2 hours)</strong></td><td style="padding:6px;font-family:monospace">\${timeAgo(twoHoursAgo)}</td></tr>
        <tr style="border-bottom:1px solid #e5e7eb"><td style="padding:6px"><strong>throttle (click fast!)</strong></td><td style="padding:6px;font-family:monospace"><button onclick=\${throttledIncrement} style="font-size:11px;padding:2px 6px">Click rapidly</button> counted: \${() => throttleCount()}</td></tr>
      </table>

      <p style="font-size:11px;color:#94a3b8;margin-top:12px">debounce: type in input, check Console tab. throttle: click rapidly \u2014 increments at most once per 300ms. pipe: combines trim + lowercase + hyphenate.</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"onefold/utils \u2014 All Utilities Live")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/core/templates">Templates</a> — the html tagged template literal</li>
        <li><a href="/core/signals">Signals</a> — reactive primitives powering the UI</li>
      </ul>
    </div>
  `}function Et(){return n`
    <div>
      <h1>Extensions</h1>
      <p><code>registerDirective</code> and <code>setEffectHook</code> allow you to extend onefold's template engine and effect system.</p>

      <h2>registerDirective</h2>
      <p>Add custom behavior to elements via attribute directives:</p>
      ${e(`import { registerDirective } from 'onefold/extend';

// Register a tooltip directive
registerDirective('tooltip', (element, value) => {
  element.setAttribute('title', value);
  element.style.cursor = 'help';
});

// Usage in templates
html\`<span tooltip="More info here">Hover me</span>\``)}

      <h2>More Directive Examples</h2>
      ${e(`// Click-outside directive
registerDirective('click-outside', (element, handler) => {
  const listener = (e: Event) => {
    if (!element.contains(e.target as Node)) {
      handler();
    }
  };
  document.addEventListener('click', listener);
  // Return cleanup function
  return () => document.removeEventListener('click', listener);
});

// Auto-focus directive
registerDirective('autofocus', (element) => {
  requestAnimationFrame(() => (element as HTMLElement).focus());
});

// Intersection observer directive
registerDirective('visible', (element, callback) => {
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) callback();
  });
  observer.observe(element);
  return () => observer.disconnect();
});`)}

      <h2>setEffectHook</h2>
      <p>Intercept or wrap the effect system for logging, profiling, or debugging:</p>
      ${e(`import { setEffectHook } from 'onefold/extend';

// Log every effect execution
setEffectHook({
  onRun: (effectId, fn) => {
    console.log(\`Effect \${effectId} running\`);
    const start = performance.now();
    fn();
    console.log(\`Effect \${effectId} took \${performance.now() - start}ms\`);
  },
  onDispose: (effectId) => {
    console.log(\`Effect \${effectId} disposed\`);
  },
});`)}

      ${l("Extensions are global. Register them once at app startup, before mounting.")}

      <h2>API</h2>
      <table>
        <tr><th>Function</th><th>Parameters</th><th>Description</th></tr>
        <tr><td><code>registerDirective</code></td><td>(name, handler)</td><td>Register a custom attribute directive.</td></tr>
        <tr><td><code>setEffectHook</code></td><td>(hooks)</td><td>Intercept effect creation and disposal.</td></tr>
      </table>

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/devtools">DevTools</a> — inspect state, effects, and component trees</li>
        <li><a href="/plugins">Plugins</a> — reusable feature packages for onefold apps</li>
      </ul>

      <h2>Try It</h2>
      <p>Register custom directives and see them applied to elements:</p>

      ${p(`import { html, mount } from 'onefold';
import { registerDirective } from 'onefold/extend';

// Register custom directives
registerDirective('tooltip', (el, value) => {
  el.title = String(value);
  el.style.cursor = 'help';
  el.style.borderBottom = '1px dashed #94a3b8';
});

registerDirective('highlight', (el, value) => {
  el.style.backgroundColor = value ? String(value) : '#fef08a';
  el.style.padding = '2px 4px';
  el.style.borderRadius = '3px';
});

registerDirective('uppercase', (el) => {
  el.style.textTransform = 'uppercase';
  el.style.letterSpacing = '0.5px';
  el.style.fontWeight = '600';
});

function App() {
  return html\`
    <div>
      <h3>Custom Directives \u2014 registerDirective</h3>
      <p style="font-size:13px;color:#666;margin-bottom:16px">
        Directives add reusable DOM behaviors via d-name attributes.
      </p>

      <div style="display:grid;gap:12px">
        <p>Hover over this: <span d-tooltip="This is a tooltip!">tooltip text</span></p>
        <p>This is <span d-highlight="#bbf7d0">highlighted green</span> and this is <span d-highlight="#bfdbfe">highlighted blue</span></p>
        <p d-uppercase>this text is uppercased via directive</p>
      </div>

      <div style="margin-top:16px;padding:12px;background:#f8fafc;border-radius:8px;font-size:12px;color:#666">
        <p>Directives registered: d-tooltip, d-highlight, d-uppercase</p>
        <p>Usage: just add d-name="value" to any element in your html template.</p>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`,"registerDirective \u2014 Custom d-* Attributes")}
    </div>
  `}function Nt(){return n`
    <div>
      <h1>CLI (create-onefold)</h1>
      <p><code>create-onefold</code> scaffolds new onefold projects with pre-configured templates, build tools, and dev servers.</p>

      <h2>Quick Start</h2>
      ${e(`npm create onefold@latest my-app
cd my-app
npm install
npm run dev`)}

      <h2>Templates</h2>
      <table>
        <tr><th>Template</th><th>Command</th><th>Description</th></tr>
        <tr><td>SPA</td><td><code>--template spa</code></td><td>Single-page app with router, esbuild, dev server.</td></tr>
        <tr><td>Fullstack</td><td><code>--template fullstack</code></td><td>SPA + Express server with SSR support.</td></tr>
        <tr><td>Microfrontend</td><td><code>--template microfrontend</code></td><td>Host + remote widgets with security config.</td></tr>
      </table>

      <h2>Usage</h2>
      ${e(`# Interactive mode (prompts for template)
npm create onefold@latest my-app

# Specify template directly
npm create onefold@latest my-app -- --template spa
npm create onefold@latest my-app -- --template fullstack
npm create onefold@latest my-app -- --template microfrontend`)}

      <h2>Generated Structure (SPA)</h2>
      ${e(`my-app/
\u251C\u2500\u2500 src/
\u2502   \u251C\u2500\u2500 main.ts          # Entry point
\u2502   \u251C\u2500\u2500 pages/
\u2502   \u2502   \u251C\u2500\u2500 Home.ts
\u2502   \u2502   \u2514\u2500\u2500 About.ts
\u2502   \u2514\u2500\u2500 components/
\u251C\u2500\u2500 index.html           # HTML shell
\u251C\u2500\u2500 style.css            # Global styles
\u251C\u2500\u2500 build.mjs            # esbuild config
\u251C\u2500\u2500 server.mjs           # Dev server
\u251C\u2500\u2500 tsconfig.json
\u2514\u2500\u2500 package.json`)}

      <h2>Generated Structure (Microfrontend)</h2>
      ${e(`my-app/
\u251C\u2500\u2500 host/
\u2502   \u251C\u2500\u2500 src/main.ts      # Host shell with loadRemote
\u2502   \u251C\u2500\u2500 build.mjs
\u2502   \u2514\u2500\u2500 package.json
\u251C\u2500\u2500 remotes/
\u2502   \u251C\u2500\u2500 billing/
\u2502   \u2502   \u251C\u2500\u2500 src/index.ts # Remote widget
\u2502   \u2502   \u2514\u2500\u2500 build.mjs
\u2502   \u2514\u2500\u2500 analytics/
\u2502       \u251C\u2500\u2500 src/index.ts
\u2502       \u2514\u2500\u2500 build.mjs
\u2514\u2500\u2500 package.json`)}

      ${l("All templates use esbuild for fast builds. No webpack, no Vite \u2014 just a 5-line build.mjs script.")}

      <h2>Options</h2>
      ${f(`<table>
        <tr><th>Flag</th><th>Description</th></tr>
        <tr><td><code>--template &lt;name&gt;</code></td><td>Template to use (spa, fullstack, microfrontend).</td></tr>
        <tr><td><code>--help</code></td><td>Show help.</td></tr>
        <tr><td><code>--version</code></td><td>Show CLI version.</td></tr>
      </table>`)}
    </div>
  `}var ae=[{title:"Counter",code:`import { createSignal, html, mount } from 'onefold';

function Counter() {
  const count = createSignal(0);

  return html\`
    <div>
      <h2>Count: \${() => count()}</h2>
      <button onclick=\${() => count.set(n => n - 1)}>-</button>
      <button onclick=\${() => count.set(n => n + 1)}>+</button>
      <button onclick=\${() => count.set(0)}>Reset</button>
    </div>
  \`;
}

mount(Counter(), document.getElementById('app'));`},{title:"Todo List",code:`import { createSignal, html, mount } from 'onefold';

function App() {
  const todos = createSignal([]);
  const input = createSignal('');

  const add = () => {
    if (input().trim()) {
      todos.set(t => [...t, { id: Date.now(), text: input(), done: false }]);
      input.set('');
    }
  };

  const toggle = (id) => {
    todos.set(t => t.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
  };

  const remove = (id) => {
    todos.set(t => t.filter(todo => todo.id !== id));
  };

  return html\`
    <div>
      <h3>Todo List</h3>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        <input value=\${() => input()} oninput=\${(e) => input.set(e.target.value)} onkeydown=\${(e) => e.key === 'Enter' && add()} placeholder="Add a task..." style="flex:1" />
        <button onclick=\${add}>Add</button>
      </div>
      <ul style="list-style:none;padding:0">
        \${() => todos().map(todo => html\`
          <li style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f1f5f9">
            <input type="checkbox" onchange=\${() => toggle(todo.id)} />
            <span style=\${todo.done ? 'text-decoration:line-through;color:#94a3b8' : ''}>\${todo.text}</span>
            <button onclick=\${() => remove(todo.id)} style="margin-left:auto;font-size:11px">\u2715</button>
          </li>
        \`)}
      </ul>
      <p style="font-size:12px;color:#666">\${() => todos().filter(t => !t.done).length} remaining</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Theme Toggle",code:`import { createSignal, html, mount } from 'onefold';
import { createTheme } from 'onefold/theme';

function App() {
  const theme = createTheme({
    light: { bg: '#ffffff', text: '#1a1a1a', primary: '#4f46e5', card: '#f8fafc', border: '#e5e7eb' },
    dark:  { bg: '#0f172a', text: '#e2e8f0', primary: '#818cf8', card: '#1e293b', border: '#334155' },
  }, 'light');

  return html\`
    <div style="padding:16px;border-radius:8px;background:var(--bg);color:var(--text);transition:all 0.3s">
      <h3 style="color:var(--primary)">\${() => theme.current() === 'dark' ? 'Dark Mode' : 'Light Mode'}</h3>
      <div style="margin:12px 0;padding:12px;background:var(--card);border:1px solid var(--border);border-radius:6px">
        <p style="font-size:13px">Card using CSS variables from createTheme.</p>
      </div>
      <button onclick=\${() => theme.toggle()}>\${() => theme.current() === 'dark' ? 'Switch to Light' : 'Switch to Dark'}</button>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Shopping Cart",code:`import { createSignal, createStore, html, mount } from 'onefold';

function App() {
  const cart = createStore({ items: [], total: 0 });

  const products = [
    { id: 1, name: 'Headphones', price: 79.99, emoji: '\u{1F3A7}' },
    { id: 2, name: 'Keyboard', price: 129.99, emoji: '\u2328\uFE0F' },
    { id: 3, name: 'USB-C Hub', price: 49.99, emoji: '\u{1F50C}' },
    { id: 4, name: 'Webcam', price: 59.99, emoji: '\u{1F4F7}' },
  ];

  function addToCart(p) {
    const items = cart().items;
    const existing = items.find(i => i.id === p.id);
    if (existing) {
      cart.update({ items: items.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i) });
    } else {
      cart.update({ items: [...items, { ...p, qty: 1 }] });
    }
    cart.update({ total: cart().items.reduce((s, i) => s + i.price * i.qty, 0) });
  }

  function removeFromCart(id) {
    cart.update({ items: cart().items.filter(i => i.id !== id) });
    cart.update({ total: cart().items.reduce((s, i) => s + i.price * i.qty, 0) });
  }

  return html\`
    <div>
      <h3>Shop</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px">
        \${products.map(p => html\`
          <div style="padding:8px;border:1px solid #e5e7eb;border-radius:6px;display:flex;align-items:center;gap:6px">
            <span style="font-size:20px">\${p.emoji}</span>
            <div style="flex:1"><div style="font-size:12px;font-weight:600">\${p.name}</div><div style="font-size:11px;color:#666">$\${p.price}</div></div>
            <button onclick=\${() => addToCart(p)} style="font-size:10px;padding:3px 6px">+</button>
          </div>
        \`)}
      </div>
      <div style="border-top:1px solid #e5e7eb;padding-top:12px">
        <h4>Cart (\${() => cart().items.length})</h4>
        \${() => cart().items.length === 0 ? html\`<p style="color:#94a3b8;font-size:12px">Empty</p>\` : html\`<div>
          \${() => cart().items.map(i => html\`<div style="display:flex;align-items:center;gap:6px;padding:4px 0;font-size:12px">\${i.emoji} \${i.name} x\${i.qty} <span style="margin-left:auto">$\${(i.price*i.qty).toFixed(2)}</span><button onclick=\${() => removeFromCart(i.id)} style="font-size:10px;padding:1px 4px;color:#ef4444">\u2715</button></div>\`)}
          <div style="margin-top:8px;font-weight:700;text-align:right">Total: $\${() => cart().total.toFixed(2)}</div>
        </div>\`}
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Live Search",code:`import { createSignal, html, mount } from 'onefold';
import { debounce } from 'onefold/utils';

function App() {
  const query = createSignal('');
  const results = createSignal([]);
  const loading = createSignal(false);

  const countries = ['Argentina','Australia','Brazil','Canada','China','Denmark','Egypt','Finland','France','Germany','India','Italy','Japan','Kenya','Mexico','Netherlands','Norway','Peru','Russia','Spain','Sweden','Thailand','United Kingdom','United States','Vietnam'];

  const search = debounce((q) => {
    if (!q.trim()) { results.set([]); loading.set(false); return; }
    results.set(countries.filter(c => c.toLowerCase().includes(q.toLowerCase())));
    loading.set(false);
  }, 300);

  return html\`
    <div>
      <h3>Country Search (debounced)</h3>
      <input oninput=\${(e) => { query.set(e.target.value); loading.set(true); search(e.target.value); }} placeholder="Type a country..." style="width:100%;margin-bottom:12px" />
      \${() => loading() ? html\`<p style="font-size:12px;color:#666">Searching...</p>\` : null}
      \${() => !query() ? html\`<p style="font-size:12px;color:#94a3b8">\${countries.length} countries</p>\` : null}
      \${() => query() && !loading() && results().length === 0 ? html\`<p style="font-size:13px;color:#ef4444">No results</p>\` : null}
      \${() => results().length > 0 ? html\`<ul style="list-style:none;padding:0;max-height:180px;overflow-y:auto">\${results().map(c => html\`<li style="padding:6px 10px;border-bottom:1px solid #f1f5f9;font-size:13px">\${c}</li>\`)}</ul>\` : null}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Tabs Component",code:`import { createSignal, html, mount } from 'onefold';

function Tabs({ tabs }) {
  const active = createSignal(0);
  return html\`
    <div>
      <div style="display:flex;border-bottom:2px solid #e5e7eb;margin-bottom:12px">
        \${tabs.map((tab, i) => html\`
          <button onclick=\${() => active.set(i)} style=\${() => 'padding:8px 16px;border:none;background:none;cursor:pointer;font-size:13px;font-weight:500;border-bottom:2px solid ' + (active() === i ? '#4f46e5;color:#4f46e5;margin-bottom:-2px' : 'transparent;color:#64748b')}>\${tab.label}</button>
        \`)}
      </div>
      \${() => tabs[active()].content()}
    </div>
  \`;
}

function App() {
  return Tabs({ tabs: [
    { label: 'Profile', content: () => html\`<div><h4>Profile</h4><p style="font-size:13px;color:#666">Name: Jane Doe<br>Role: Engineer<br>Joined: 2023</p></div>\` },
    { label: 'Settings', content: () => html\`<div><h4>Settings</h4><p style="font-size:13px;color:#666">Notifications: On<br>Language: English<br>Timezone: UTC-5</p></div>\` },
    { label: 'Activity', content: () => html\`<div><h4>Activity</h4><ul style="font-size:13px;color:#666"><li>Pushed 3 commits</li><li>Reviewed PR #142</li><li>Closed issue #89</li></ul></div>\` },
  ]});
}

mount(App(), document.getElementById('app'));`},{title:"Form Validation",code:`import { html, mount } from 'onefold';
import { createForm, required, email, minLength } from 'onefold/form';

function App() {
  const form = createForm({
    name: { initial: '', rules: [required('Name required'), minLength(2, 'Min 2 chars')] },
    email: { initial: '', rules: [required('Email required'), email('Invalid email')] },
    password: { initial: '', rules: [required('Password required'), minLength(6, 'Min 6 chars')] },
  });

  return html\`
    <div>
      <h3>Registration</h3>
      <form onsubmit=\${(e) => { e.preventDefault(); form.submit((v) => alert('Submitted: ' + JSON.stringify(v))); }}>
        <div style="margin-bottom:10px"><label style="font-size:12px;font-weight:600;display:block">Name</label><input oninput=\${form.fields.name.handle} style="width:100%" />\${() => form.fields.name.error() ? html\`<p style="color:#ef4444;font-size:11px;margin-top:2px">\${form.fields.name.error()}</p>\` : null}</div>
        <div style="margin-bottom:10px"><label style="font-size:12px;font-weight:600;display:block">Email</label><input type="email" oninput=\${form.fields.email.handle} style="width:100%" />\${() => form.fields.email.error() ? html\`<p style="color:#ef4444;font-size:11px;margin-top:2px">\${form.fields.email.error()}</p>\` : null}</div>
        <div style="margin-bottom:10px"><label style="font-size:12px;font-weight:600;display:block">Password</label><input type="password" oninput=\${form.fields.password.handle} style="width:100%" />\${() => form.fields.password.error() ? html\`<p style="color:#ef4444;font-size:11px;margin-top:2px">\${form.fields.password.error()}</p>\` : null}</div>
        <div style="display:flex;gap:8px;align-items:center"><button type="submit">Register</button><button type="button" onclick=\${() => form.reset()}>Reset</button><span style="font-size:11px;color:#666;margin-left:auto">\${() => form.valid() ? '\u2713' : '\u2717'} \${() => form.dirty() ? 'modified' : 'pristine'}</span></div>
      </form>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Data Fetching",code:`import { createSignal, createResource, html, mount } from 'onefold';

function App() {
  const userId = createSignal(1);
  const user = createResource(userId, async (id) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
    return res.json();
  });

  return html\`
    <div>
      <h3>User Profile</h3>
      \${() => {
        if (user.loading()) return html\`<p style="color:#666">Loading...</p>\`;
        if (user.error()) return html\`<p style="color:#ef4444">Error</p>\`;
        const d = user.data();
        if (!d) return null;
        return html\`<div style="padding:12px;border:1px solid #e5e7eb;border-radius:8px">
          <div style="font-weight:600">\${d.name}</div>
          <div style="font-size:12px;color:#666">\${d.email}</div>
          <div style="font-size:12px;color:#666">\${d.company.name}</div>
        </div>\`;
      }}
      <div style="display:flex;gap:8px;margin-top:12px">
        <button onclick=\${() => userId.set(n => Math.max(1, n - 1))}>\u2190 Prev</button>
        <span style="font-size:13px;padding:6px">ID: \${() => userId()}</span>
        <button onclick=\${() => userId.set(n => Math.min(10, n + 1))}>Next \u2192</button>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Stopwatch",code:`import { createSignal, html, mount } from 'onefold';

function App() {
  const time = createSignal(0);
  const running = createSignal(false);
  let interval = null;

  function start() {
    if (running()) return;
    running.set(true);
    interval = setInterval(() => time.set(t => t + 10), 10);
  }

  function stop() {
    running.set(false);
    clearInterval(interval);
  }

  function reset() {
    stop();
    time.set(0);
  }

  function format(ms) {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const cents = Math.floor((ms % 1000) / 10);
    return String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0') + '.' + String(cents).padStart(2, '0');
  }

  return html\`
    <div style="text-align:center">
      <h3>Stopwatch</h3>
      <div style="font-size:48px;font-family:monospace;font-weight:700;margin:20px 0">\${() => format(time())}</div>
      <div style="display:flex;gap:8px;justify-content:center">
        <button onclick=\${start} style=\${() => running() ? 'opacity:0.5' : ''}>Start</button>
        <button onclick=\${stop}>Stop</button>
        <button onclick=\${reset}>Reset</button>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Accordion",code:`import { createSignal, html, mount } from 'onefold';

function Accordion({ items }) {
  const openIndex = createSignal(-1);

  return html\`
    <div>
      \${items.map((item, i) => html\`
        <div style="border:1px solid #e5e7eb;border-radius:8px;margin-bottom:8px;overflow:hidden">
          <button
            onclick=\${() => openIndex.set(openIndex() === i ? -1 : i)}
            style="width:100%;padding:12px 16px;border:none;background:#f8fafc;cursor:pointer;display:flex;justify-content:space-between;align-items:center;font-size:14px;font-weight:500"
          >
            \${item.title}
            <span>\${() => openIndex() === i ? '\u2212' : '+'}</span>
          </button>
          \${() => openIndex() === i ? html\`
            <div style="padding:12px 16px;font-size:13px;color:#666;border-top:1px solid #e5e7eb">\${item.content}</div>
          \` : null}
        </div>
      \`)}
    </div>
  \`;
}

function App() {
  return html\`
    <div>
      <h3>FAQ</h3>
      \${Accordion({ items: [
        { title: 'What is onefold?', content: 'A reactive UI framework with fine-grained signals, real DOM rendering, and zero dependencies.' },
        { title: 'Do I need a compiler?', content: 'No. The html tagged template works at runtime. No JSX, no Babel, no build step required.' },
        { title: 'How big is it?', content: 'Under 6kb gzipped for the core. Full framework with all features is ~16kb gzipped.' },
        { title: 'Is it production-ready?', content: 'Yes. TypeScript strict mode, full test coverage, secure by default. Used in production apps.' },
      ]})}
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Calculator",code:`import { createSignal, html, mount } from 'onefold';

function App() {
  const display = createSignal('0');
  const memory = createSignal(null);
  const op = createSignal(null);
  const fresh = createSignal(true);

  function input(n) {
    if (fresh()) { display.set(String(n)); fresh.set(false); }
    else { display.set(display() === '0' ? String(n) : display() + n); }
  }

  function operate(next) {
    if (memory() !== null && op()) {
      const a = memory(), b = parseFloat(display());
      const result = op() === '+' ? a + b : op() === '-' ? a - b : op() === '*' ? a * b : a / b;
      display.set(String(Math.round(result * 1e10) / 1e10));
    }
    memory.set(parseFloat(display()));
    op.set(next);
    fresh.set(true);
  }

  function equals() {
    operate(null);
    memory.set(null);
    fresh.set(true);
  }

  function clear() { display.set('0'); memory.set(null); op.set(null); fresh.set(true); }

  const btn = (label, action, style) => html\`<button onclick=\${action} style=\${'padding:12px;font-size:16px;border:1px solid #e5e7eb;border-radius:6px;cursor:pointer;' + (style || '')}>\${label}</button>\`;

  return html\`
    <div style="max-width:260px">
      <h3>Calculator</h3>
      <div style="padding:16px;background:#1e293b;color:white;border-radius:8px 8px 0 0;font-size:28px;font-family:monospace;text-align:right;min-height:50px">\${() => display()}</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;padding:8px;background:#f1f5f9;border-radius:0 0 8px 8px">
        \${btn('C', clear, 'background:#fca5a5')} \${btn('\xB1', () => display.set(String(-parseFloat(display()))))} \${btn('%', () => display.set(String(parseFloat(display())/100)))} \${btn('\xF7', () => operate('/'), 'background:#bfdbfe')}
        \${btn('7', () => input(7))} \${btn('8', () => input(8))} \${btn('9', () => input(9))} \${btn('\xD7', () => operate('*'), 'background:#bfdbfe')}
        \${btn('4', () => input(4))} \${btn('5', () => input(5))} \${btn('6', () => input(6))} \${btn('-', () => operate('-'), 'background:#bfdbfe')}
        \${btn('1', () => input(1))} \${btn('2', () => input(2))} \${btn('3', () => input(3))} \${btn('+', () => operate('+'), 'background:#bfdbfe')}
        \${btn('0', () => input(0), 'grid-column:span 2')} \${btn('.', () => { if (!display().includes('.')) display.set(display() + '.'); fresh.set(false); })} \${btn('=', equals, 'background:#86efac')}
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Pomodoro Timer",code:`import { createSignal, html, mount } from 'onefold';

function App() {
  const timeLeft = createSignal(25 * 60);
  const running = createSignal(false);
  const mode = createSignal('work');
  let interval = null;

  function format(s) {
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  function start() {
    if (running()) return;
    running.set(true);
    interval = setInterval(() => {
      timeLeft.set(t => {
        if (t <= 0) { stop(); switchMode(); return 0; }
        return t - 1;
      });
    }, 1000);
  }

  function stop() { running.set(false); clearInterval(interval); }

  function switchMode() {
    const next = mode() === 'work' ? 'break' : 'work';
    mode.set(next);
    timeLeft.set(next === 'work' ? 25 * 60 : 5 * 60);
  }

  function reset() { stop(); timeLeft.set(mode() === 'work' ? 25 * 60 : 5 * 60); }

  return html\`
    <div style="text-align:center">
      <h3>Pomodoro</h3>
      <div style=\${() => 'display:inline-block;width:160px;height:160px;border-radius:50%;border:6px solid ' + (mode() === 'work' ? '#ef4444' : '#10b981') + ';display:flex;align-items:center;justify-content:center;margin:16px auto'}>
        <span style="font-size:36px;font-family:monospace;font-weight:700">\${() => format(timeLeft())}</span>
      </div>
      <p style="font-size:14px;font-weight:600;text-transform:uppercase;margin-bottom:12px;color:\${() => mode() === 'work' ? '#ef4444' : '#10b981'}">\${() => mode()}</p>
      <div style="display:flex;gap:8px;justify-content:center">
        <button onclick=\${start}>\${() => running() ? 'Running...' : 'Start'}</button>
        <button onclick=\${stop}>Pause</button>
        <button onclick=\${reset}>Reset</button>
        <button onclick=\${switchMode}>Skip</button>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Kanban Board",code:`import { createSignal, html, mount } from 'onefold';

function App() {
  const tasks = createSignal([
    { id: 1, text: 'Design homepage', col: 'todo' },
    { id: 2, text: 'Setup CI/CD', col: 'todo' },
    { id: 3, text: 'Write tests', col: 'doing' },
    { id: 4, text: 'Deploy v1', col: 'doing' },
    { id: 5, text: 'User research', col: 'done' },
  ]);

  function move(id, to) {
    tasks.set(prev => prev.map(t => t.id === id ? { ...t, col: to } : t));
  }

  function addTask() {
    const text = prompt('Task name:');
    if (text) tasks.set(prev => [...prev, { id: Date.now(), text, col: 'todo' }]);
  }

  function Column(name, color) {
    return html\`
      <div style="flex:1;min-width:140px">
        <h4 style="font-size:12px;text-transform:uppercase;color:\${color};margin-bottom:8px;letter-spacing:0.05em">\${name} (\${() => tasks().filter(t => t.col === name).length})</h4>
        <div style="min-height:100px;background:#f8fafc;border-radius:8px;padding:8px">
          \${() => tasks().filter(t => t.col === name).map(t => html\`
            <div style="background:white;border:1px solid #e5e7eb;border-radius:6px;padding:8px;margin-bottom:6px;font-size:12px">
              \${t.text}
              <div style="margin-top:6px;display:flex;gap:4px">
                \${name !== 'todo' ? html\`<button onclick=\${() => move(t.id, 'todo')} style="font-size:10px;padding:2px 4px">\u2190 Todo</button>\` : null}
                \${name !== 'doing' ? html\`<button onclick=\${() => move(t.id, 'doing')} style="font-size:10px;padding:2px 4px">Doing</button>\` : null}
                \${name !== 'done' ? html\`<button onclick=\${() => move(t.id, 'done')} style="font-size:10px;padding:2px 4px">Done \u2192</button>\` : null}
              </div>
            </div>
          \`)}
        </div>
      </div>
    \`;
  }

  return html\`
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
        <h3>Kanban Board</h3>
        <button onclick=\${addTask} style="font-size:12px">+ Add Task</button>
      </div>
      <div style="display:flex;gap:12px">
        \${Column('todo', '#f59e0b')}
        \${Column('doing', '#3b82f6')}
        \${Column('done', '#10b981')}
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Color Palette",code:`import { createSignal, html, mount } from 'onefold';

function App() {
  const hue = createSignal(220);
  const saturation = createSignal(70);
  const lightness = createSignal(50);
  const count = createSignal(7);

  function generatePalette() {
    const h = hue(), s = saturation(), n = count();
    return Array.from({ length: n }, (_, i) => {
      const l = 95 - (i * (80 / (n - 1)));
      return { color: 'hsl(' + h + ',' + s + '%,' + l + '%)', label: Math.round(l) + '%' };
    });
  }

  return html\`
    <div>
      <h3>Color Palette Generator</h3>
      <div style="display:grid;gap:10px;margin-bottom:16px">
        <label style="font-size:12px;display:flex;align-items:center;gap:8px">Hue (\${() => hue()}\xB0) <input type="range" min="0" max="360" oninput=\${(e) => hue.set(Number(e.target.value))} style="flex:1" /></label>
        <label style="font-size:12px;display:flex;align-items:center;gap:8px">Saturation (\${() => saturation()}%) <input type="range" min="0" max="100" oninput=\${(e) => saturation.set(Number(e.target.value))} style="flex:1" /></label>
        <label style="font-size:12px;display:flex;align-items:center;gap:8px">Shades (\${() => count()}) <input type="range" min="3" max="12" oninput=\${(e) => count.set(Number(e.target.value))} style="flex:1" /></label>
      </div>
      <div style="display:flex;gap:4px;border-radius:8px;overflow:hidden">
        \${() => generatePalette().map(p => html\`
          <div style=\${'flex:1;height:80px;background:' + p.color + ';display:flex;align-items:end;justify-content:center;padding:4px'}>
            <span style="font-size:10px;color:white;text-shadow:0 1px 2px rgba(0,0,0,0.5)">\${p.label}</span>
          </div>
        \`)}
      </div>
      <p style="font-size:11px;color:#94a3b8;margin-top:8px">HSL: \${() => hue()}\xB0 / \${() => saturation()}%</p>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`},{title:"Markdown Preview",code:`import { createSignal, html, mount, raw } from 'onefold';

function App() {
  const text = createSignal('# Hello onefold\\n\\nThis is a **markdown** preview.\\n\\n- Item one\\n- Item two\\n- Item three\\n\\n> Blockquote here\\n\\nInline \\\`code\\\` and [links](https://onefoldjs.com).');

  function parseMarkdown(md) {
    return md
      .replace(/^### (.+)$/gm, '<h4>$1</h4>')
      .replace(/^## (.+)$/gm, '<h3>$1</h3>')
      .replace(/^# (.+)$/gm, '<h2>$1</h2>')
      .replace(/\\*\\*(.+?)\\*\\*/g, '<strong>$1</strong>')
      .replace(/\\*(.+?)\\*/g, '<em>$1</em>')
      .replace(/\\\`(.+?)\\\`/g, '<code style="background:#f1f5f9;padding:2px 4px;border-radius:3px">$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote style="border-left:3px solid #e5e7eb;padding-left:12px;color:#666">$1</blockquote>')
      .replace(/^- (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\\/li>)/s, '<ul>$1</ul>')
      .replace(/\\[(.+?)\\]\\((.+?)\\)/g, '<a href="$2">$1</a>')
      .replace(/\\n/g, '<br>');
  }

  return html\`
    <div>
      <h3>Markdown Preview</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
        <div>
          <label style="font-size:11px;font-weight:600;text-transform:uppercase;color:#94a3b8">Editor</label>
          <textarea oninput=\${(e) => text.set(e.target.value)} style="width:100%;height:200px;font-family:monospace;font-size:12px;resize:none;margin-top:4px">\${text()}</textarea>
        </div>
        <div>
          <label style="font-size:11px;font-weight:600;text-transform:uppercase;color:#94a3b8">Preview</label>
          <div style="border:1px solid #e5e7eb;border-radius:6px;padding:12px;min-height:200px;margin-top:4px;font-size:14px;line-height:1.6">
            \${() => raw(parseMarkdown(text()))}
          </div>
        </div>
      </div>
    </div>
  \`;
}

mount(App(), document.getElementById('app'));`}],$o=te`
  .pg-page { display: flex; gap: 24px; }
  .pg-sidebar {
    width: 200px;
    flex-shrink: 0;
    position: sticky;
    top: 80px;
    align-self: flex-start;
    max-height: calc(100vh - 100px);
    overflow-y: auto;
  }
  .pg-sidebar-title { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--muted); margin-bottom: 8px; }
  .pg-sidebar-item {
    display: block;
    width: 100%;
    padding: 8px 12px;
    border: none;
    background: none;
    text-align: left;
    font-size: 13px;
    cursor: pointer;
    border-radius: 6px;
    color: var(--fg);
    margin-bottom: 2px;
    transition: background 0.15s;
  }
  .pg-sidebar-item:hover { background: var(--hover); }
  .pg-sidebar-item.active { background: var(--accent-bg); color: var(--accent); font-weight: 600; }
  .pg-main { flex: 1; min-width: 0; }
  @media (max-width: 768px) {
    .pg-page { flex-direction: column; }
    .pg-sidebar { width: 100%; position: static; max-height: none; display: flex; flex-wrap: wrap; gap: 4px; }
    .pg-sidebar-item { width: auto; }
  }
`;function Lt(){let t=b(0);return n`
    <div class=${$o.scope}>
      <h1>Playground</h1>
      <p>Try onefold in the browser. Select an example or edit the code and click Run.</p>

      <div class="pg-page">
        <aside class="pg-sidebar">
          <div class="pg-sidebar-title">Examples</div>
          ${ae.map((o,r)=>n`
            <button
              class=${()=>"pg-sidebar-item"+(t()===r?" active":"")}
              onclick=${()=>t.set(r)}
            >${o.title}</button>
          `)}
        </aside>
        <div class="pg-main">
          ${()=>p(ae[t()].code,ae[t()].title,{allowNetwork:!0})}
        </div>
      </div>
    </div>
  `}function se(){return n`
    <div>
      <h1>Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <button onclick=${()=>S("/")} style="padding:8px 16px;border-radius:6px;border:1px solid var(--border);cursor:pointer;margin-top:12px">
        Go to Introduction
      </button>
    </div>
  `}function Dt(){return n`
    <div>
      <h1>Deploy to GitHub Pages</h1>
      <p>GitHub Pages serves static files directly from a repository. Since there's no server-side SPA fallback, onefold apps should use <strong>hash-based routing</strong>.</p>

      <h2>Prerequisites</h2>
      <ul>
        <li>A GitHub repository with your onefold project</li>
        <li>The project builds to a <code>dist/</code> folder</li>
      </ul>

      <h2>1. Configure Hash Routing</h2>
      ${e(`// main.ts
import { configureRouter, Router, navigate, mount } from 'onefold';

configureRouter({ hash: true });

const app = Router([...routes], () => NotFound());
mount(app, document.getElementById('app')!);

// Intercept internal links for hash-based navigation
document.addEventListener('click', (e) => {
  const anchor = (e.target as HTMLElement).closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
  e.preventDefault();
  navigate(href);
});

// Navigate to home on initial load
if (!location.hash || location.hash === '#/') {
  navigate('/');
}`)}

      <h2>2. Use Relative Asset Paths</h2>
      <p>Your <code>index.html</code> must use <code>./</code> relative paths so assets load correctly regardless of the repository subpath:</p>
      ${e(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="./app.js"><\/script>
</body>
</html>`,"html")}

      ${l("Do NOT use absolute paths like /app.js \u2014 on GitHub Pages at username.github.io/repo-name/, they resolve to username.github.io/app.js which does not exist.")}

      <h2>3. GitHub Actions Workflow</h2>
      <p>Create <code>.github/workflows/deploy.yml</code>:</p>
      ${e(`name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

      - id: deployment
        uses: actions/deploy-pages@v4`,"yaml")}

      <h2>4. Enable Pages in Repository Settings</h2>
      <ol>
        <li>Go to your repo → Settings → Pages</li>
        <li>Under "Source", select <strong>GitHub Actions</strong></li>
        <li>Push to <code>main</code> — the workflow will deploy automatically</li>
      </ol>

      <h2>Manual Deploy (gh-pages branch)</h2>
      <p>Alternatively, deploy from a <code>gh-pages</code> branch:</p>
      ${e(`# Install gh-pages
npm install -D gh-pages

# Add deploy script to package.json
# "deploy": "npm run build && gh-pages -d dist"

npm run deploy`,"bash")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/routing/configure">configureRouter</a> — routing mode configuration details</li>
        <li><a href="/deployment/vercel">Vercel</a> — deploy with path-based routing</li>
      </ul>
    </div>
  `}function Mt(){return n`
    <div>
      <h1>Deploy to Vercel</h1>
      <p>Vercel supports SPA fallback out of the box. Use the default <strong>path-based routing</strong> — no <code>configureRouter</code> call needed.</p>

      <h2>Quick Deploy</h2>
      <ol>
        <li>Push your project to GitHub/GitLab/Bitbucket</li>
        <li>Go to <a href="https://vercel.com/new" target="_blank">vercel.com/new</a> and import the repo</li>
        <li>Set the build command and output directory:</li>
      </ol>

      <table>
        <tr><th>Setting</th><th>Value</th></tr>
        <tr><td>Build Command</td><td><code>npm run build</code></td></tr>
        <tr><td>Output Directory</td><td><code>dist</code></td></tr>
        <tr><td>Install Command</td><td><code>npm install</code></td></tr>
      </table>

      <h2>SPA Fallback Configuration</h2>
      <p>Create a <code>vercel.json</code> at the project root to explicitly configure the SPA rewrite:</p>
      ${e(`{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}`,"json")}

      ${l("The rewrites rule ensures all paths serve index.html, allowing the client-side router to handle them.")}

      <h2>Router Configuration</h2>
      <p>No special configuration needed — path mode is the default:</p>
      ${e(`import { Router, mount } from 'onefold';

// Path-based routing works out of the box on Vercel
const app = Router([
  { path: '/', view: () => Home() },
  { path: '/about', view: () => About() },
], () => NotFound());

mount(app, document.getElementById('app')!);`)}

      <h2>Environment Variables</h2>
      <p>Set environment variables in Vercel's dashboard under Project Settings → Environment Variables. Access them at build time via your bundler's <code>define</code> option:</p>
      ${e(`// build.mjs (esbuild)
await build({
  define: {
    'process.env.API_URL': JSON.stringify(process.env.API_URL || ''),
  },
});`)}

      <h2>Deploy via CLI</h2>
      ${e(`# Install Vercel CLI
npm i -g vercel

# Deploy from project root
vercel

# Deploy to production
vercel --prod`,"bash")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/deployment/netlify">Netlify</a> — similar platform with _redirects file</li>
        <li><a href="/deployment/cloudflare">Cloudflare Pages</a> — edge deployment</li>
      </ul>
    </div>
  `}function Ht(){return n`
    <div>
      <h1>Deploy to Netlify</h1>
      <p>Netlify supports SPA fallback via a <code>_redirects</code> file. Use the default <strong>path-based routing</strong>.</p>

      <h2>Quick Deploy</h2>
      <ol>
        <li>Push your project to GitHub/GitLab/Bitbucket</li>
        <li>Go to <a href="https://app.netlify.com/start" target="_blank">app.netlify.com</a> and connect your repo</li>
        <li>Configure build settings:</li>
      </ol>

      <table>
        <tr><th>Setting</th><th>Value</th></tr>
        <tr><td>Build command</td><td><code>npm run build</code></td></tr>
        <tr><td>Publish directory</td><td><code>dist</code></td></tr>
      </table>

      <h2>SPA Fallback with _redirects</h2>
      <p>Create a <code>public/_redirects</code> file (or place in your <code>dist/</code> output) so Netlify serves <code>index.html</code> for all routes:</p>
      ${e("/*    /index.html   200","text")}

      <p>If you use a <code>public/</code> folder that gets copied to dist, place <code>_redirects</code> there. Otherwise add it to your build script:</p>
      ${e(`// build.mjs
import { writeFileSync } from 'node:fs';

// ... after esbuild ...

// SPA fallback for Netlify
writeFileSync('dist/_redirects', '/*    /index.html   200\\n');`)}

      ${l("Without the _redirects file, navigating directly to /about will return a 404 from Netlify.")}

      <h2>Alternative: netlify.toml</h2>
      <p>You can also configure redirects in <code>netlify.toml</code> at the project root:</p>
      ${e(`[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200`,"toml")}

      <h2>Router Configuration</h2>
      <p>No special configuration needed — path mode works with the redirect rule:</p>
      ${e(`import { Router, mount } from 'onefold';

const app = Router([
  { path: '/', view: () => Home() },
  { path: '/about', view: () => About() },
], () => NotFound());

mount(app, document.getElementById('app')!);`)}

      <h2>Deploy via CLI</h2>
      ${e(`# Install Netlify CLI
npm i -g netlify-cli

# Link to site and deploy
netlify link
netlify deploy --dir=dist

# Deploy to production
netlify deploy --dir=dist --prod`,"bash")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/deployment/cloudflare">Cloudflare Pages</a> — edge deployment with Workers</li>
        <li><a href="/deployment/aws">AWS S3 + CloudFront</a> — self-managed hosting</li>
      </ul>
    </div>
  `}function zt(){return n`
    <div>
      <h1>Deploy to Cloudflare Pages</h1>
      <p>Cloudflare Pages serves static sites from their global edge network with built-in SPA support. Use the default <strong>path-based routing</strong>.</p>

      <h2>Quick Deploy</h2>
      <ol>
        <li>Go to the <a href="https://dash.cloudflare.com/?to=/:account/pages" target="_blank">Cloudflare Pages dashboard</a></li>
        <li>Click "Create a project" → Connect to Git</li>
        <li>Select your repository and configure:</li>
      </ol>

      <table>
        <tr><th>Setting</th><th>Value</th></tr>
        <tr><td>Build command</td><td><code>npm run build</code></td></tr>
        <tr><td>Build output directory</td><td><code>dist</code></td></tr>
      </table>

      <h2>SPA Fallback</h2>
      <p>Cloudflare Pages automatically serves <code>index.html</code> for paths that don't match a static file (404 fallback). No extra configuration is needed for SPA routing.</p>

      ${l("Cloudflare Pages handles SPA fallback automatically. You do not need a _redirects file or custom rules for client-side routing.")}

      <h2>Custom Headers and Redirects</h2>
      <p>If you need custom headers, create a <code>public/_headers</code> file:</p>
      ${e(`/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin`,"text")}

      <h2>Router Configuration</h2>
      ${e(`import { Router, mount } from 'onefold';

// Path-based routing \u2014 no configureRouter needed
const app = Router([
  { path: '/', view: () => Home() },
  { path: '/dashboard', view: () => Dashboard() },
], () => NotFound());

mount(app, document.getElementById('app')!);`)}

      <h2>Deploy via Wrangler CLI</h2>
      ${e(`# Install Wrangler
npm i -g wrangler

# Build and deploy
npm run build
wrangler pages deploy dist --project-name=my-app`,"bash")}

      <h2>Environment Variables</h2>
      <p>Set build-time environment variables in the Cloudflare Pages dashboard under Settings → Environment variables. Use them in your build script:</p>
      ${e(`// build.mjs
await build({
  define: {
    '__API_URL__': JSON.stringify(process.env.API_URL || '/api'),
  },
});`)}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/deployment/aws">AWS S3 + CloudFront</a> — self-managed static hosting</li>
        <li><a href="/deployment/docker">Docker / Node</a> — containerized deployment</li>
      </ul>
    </div>
  `}function Bt(){return n`
    <div>
      <h1>Deploy to AWS (S3 + CloudFront)</h1>
      <p>Host your onefold app on S3 with CloudFront as the CDN. Configure a custom error response to enable SPA fallback with <strong>path-based routing</strong>.</p>

      <h2>Option A: Path-Based Routing (Recommended)</h2>
      <p>Use CloudFront's custom error response to serve <code>index.html</code> for all 404s.</p>

      <h3>1. Create an S3 Bucket</h3>
      ${e("aws s3 mb s3://my-onefold-app --region us-east-1","bash")}

      <h3>2. Upload the Build</h3>
      ${e(`npm run build
aws s3 sync dist/ s3://my-onefold-app --delete`,"bash")}

      <h3>3. Configure CloudFront</h3>
      <p>Create a CloudFront distribution with the S3 bucket as origin. Add a custom error response:</p>

      <table>
        <tr><th>Setting</th><th>Value</th></tr>
        <tr><td>HTTP Error Code</td><td>403</td></tr>
        <tr><td>Response Page Path</td><td><code>/index.html</code></td></tr>
        <tr><td>Response Code</td><td>200</td></tr>
      </table>

      <p>Add a second rule for 404:</p>
      <table>
        <tr><th>Setting</th><th>Value</th></tr>
        <tr><td>HTTP Error Code</td><td>404</td></tr>
        <tr><td>Response Page Path</td><td><code>/index.html</code></td></tr>
        <tr><td>Response Code</td><td>200</td></tr>
      </table>

      ${l("S3 returns 403 (not 404) for paths that do not exist when using OAI/OAC. Configure both 403 and 404 error responses.")}

      <h3>4. Router Configuration</h3>
      ${e(`import { Router, mount } from 'onefold';

// Path-based (default) \u2014 works with CloudFront error response
const app = Router([
  { path: '/', view: () => Home() },
  { path: '/about', view: () => About() },
], () => NotFound());

mount(app, document.getElementById('app')!);`)}

      <h2>Option B: Hash-Based Routing (No CloudFront)</h2>
      <p>If you're serving directly from S3 static website hosting without CloudFront, use hash-based routing:</p>

      ${e(`import { configureRouter, Router, navigate, mount } from 'onefold';

configureRouter({ hash: true });

const app = Router([...routes], () => NotFound());
mount(app, document.getElementById('app')!);

// Intercept internal links
document.addEventListener('click', (e) => {
  const anchor = (e.target as HTMLElement).closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;
  e.preventDefault();
  navigate(href);
});

if (!location.hash || location.hash === '#/') {
  navigate('/');
}`)}

      <p>And use relative asset paths in <code>index.html</code>:</p>
      ${e(`<link rel="stylesheet" href="./style.css" />
<script type="module" src="./app.js"><\/script>`,"html")}

      <h2>AWS CLI Deploy Script</h2>
      ${e(`#!/bin/bash
# deploy.sh
npm run build
aws s3 sync dist/ s3://my-onefold-app --delete \\
  --cache-control "public, max-age=31536000, immutable" \\
  --exclude "index.html"

# index.html should not be cached long-term
aws s3 cp dist/index.html s3://my-onefold-app/index.html \\
  --cache-control "public, max-age=0, must-revalidate"

# Invalidate CloudFront cache
aws cloudfront create-invalidation \\
  --distribution-id YOUR_DIST_ID \\
  --paths "/*"`,"bash")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/deployment/docker">Docker / Node</a> — containerized deployment with a server</li>
        <li><a href="/deployment/github-pages">GitHub Pages</a> — free static hosting</li>
      </ul>
    </div>
  `}function Ot(){return n`
    <div>
      <h1>Deploy with Docker / Node Server</h1>
      <p>Containerize your onefold app with Nginx or a Node.js server for self-hosted environments. Use <strong>path-based routing</strong> with server-side SPA fallback.</p>

      <h2>Option A: Nginx in Docker (Recommended)</h2>

      <h3>Nginx Configuration</h3>
      <p>Create <code>nginx.conf</code>:</p>
      ${e(`server {
  listen 80;
  server_name _;
  root /usr/share/nginx/html;
  index index.html;

  # SPA fallback \u2014 serve index.html for all routes
  location / {
    try_files $uri $uri/ /index.html;
  }

  # Cache static assets aggressively
  location ~* \\.(js|css|svg|png|jpg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }

  # No cache for index.html
  location = /index.html {
    expires -1;
    add_header Cache-Control "no-store, must-revalidate";
  }
}`,"nginx")}

      <h3>Dockerfile</h3>
      ${e(`# Build stage
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]`,"dockerfile")}

      <h3>Build and Run</h3>
      ${e(`docker build -t my-onefold-app .
docker run -p 8080:80 my-onefold-app`,"bash")}

      ${l("The try_files directive is the key to SPA fallback \u2014 it tells Nginx to serve index.html when no matching file exists.")}

      <h2>Option B: Node.js Server</h2>
      <p>Use a minimal Express server with <code>express.static</code> and a fallback to <code>index.html</code>:</p>

      <h3>server.mjs</h3>
      ${e(`import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist
app.use(express.static(resolve(__dirname, 'dist')));

// SPA fallback \u2014 all other routes serve index.html
app.get('*', (_req, res) => {
  res.sendFile(resolve(__dirname, 'dist/index.html'));
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`)}

      <h3>Dockerfile (Node version)</h3>
      ${e(`FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.mjs .
COPY --from=build /app/package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "server.mjs"]`,"dockerfile")}

      <h2>Router Configuration</h2>
      <p>With either Nginx or Node serving as SPA fallback, use the default path-based routing:</p>
      ${e(`import { Router, mount } from 'onefold';

const app = Router([
  { path: '/', view: () => Home() },
  { path: '/dashboard', view: () => Dashboard() },
], () => NotFound());

mount(app, document.getElementById('app')!);`)}

      <h2>Docker Compose</h2>
      ${e(`# docker-compose.yml
services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped`,"yaml")}

      <h2>Next Steps</h2>
      <ul>
        <li><a href="/deployment/vercel">Vercel</a> — zero-config deployment</li>
        <li><a href="/deployment/github-pages">GitHub Pages</a> — free static hosting with hash routing</li>
        <li><a href="/ssr">Server-Side Rendering</a> — pre-render pages for SEO</li>
      </ul>
    </div>
  `}oe({hash:!0});var k=(t,o)=>o??se(),Co=[{path:"/",view:()=>De()},{path:"/getting-started",view:k,children:[{path:"/install",view:()=>Me()},{path:"/quickstart",view:()=>He()}]},{path:"/core",view:k,children:[{path:"/signals",view:()=>ze()},{path:"/templates",view:()=>Be()},{path:"/css",view:()=>Oe()},{path:"/mounting",view:()=>Ue()}]},{path:"/routing",view:k,children:[{path:"/router",view:()=>Fe()},{path:"/configure",view:()=>je()},{path:"/nested",view:()=>We()},{path:"/navigate",view:()=>qe()},{path:"/link",view:()=>_e()},{path:"/params",view:()=>Ve()}]},{path:"/state",view:k,children:[{path:"/store",view:()=>Ge()},{path:"/persisted",view:()=>Je()}]},{path:"/data",view:k,children:[{path:"/resource",view:()=>Ye()},{path:"/http-client",view:()=>Ke()},{path:"/interceptors",view:()=>Xe()}]},{path:"/forms",view:k,children:[{path:"/create-form",view:()=>Qe()},{path:"/validation",view:()=>Ze()}]},{path:"/microfrontends",view:k,children:[{path:"/load-remote",view:()=>tt()},{path:"/isolation",view:()=>ot()},{path:"/communication",view:()=>rt()},{path:"/security",view:()=>et()},{path:"/sri",view:()=>nt()},{path:"/shared-deps",view:()=>at()},{path:"/cross-framework",view:()=>st()},{path:"/deployment",view:()=>it()},{path:"/api-reference",view:()=>lt()}]},{path:"/async",view:k,children:[{path:"/suspense",view:()=>dt()},{path:"/lazy-loading",view:()=>ct()},{path:"/error-boundaries",view:()=>pt()}]},{path:"/streaming",view:k,children:[{path:"/websocket",view:()=>ut()},{path:"/sse",view:()=>mt()}]},{path:"/security",view:k,children:[{path:"/guards",view:()=>yt()},{path:"/xss",view:()=>xt()}]},{path:"/performance",view:k,children:[{path:"/virtual-list",view:()=>wt()},{path:"/code-splitting",view:()=>St()}]},{path:"/interop",view:k,children:[{path:"/wrap-imperative",view:()=>kt()},{path:"/embed-foreign",view:()=>$t()}]},{path:"/i18n",view:()=>ht()},{path:"/theming",view:()=>gt()},{path:"/a11y",view:()=>ft()},{path:"/transitions",view:()=>vt()},{path:"/di",view:()=>bt()},{path:"/plugins",view:()=>Ct()},{path:"/observability",view:()=>Pt()},{path:"/meta",view:()=>Rt()},{path:"/ssr",view:()=>Tt()},{path:"/devtools",view:()=>At()},{path:"/utilities",view:()=>It()},{path:"/extensions",view:()=>Et()},{path:"/cli",view:()=>Nt()},{path:"/playground",view:()=>Lt()},{path:"/deployment",view:k,children:[{path:"/github-pages",view:()=>Dt()},{path:"/vercel",view:()=>Mt()},{path:"/netlify",view:()=>Ht()},{path:"/cloudflare",view:()=>zt()},{path:"/aws",view:()=>Bt()},{path:"/docker",view:()=>Ot()}]}],Po=Ne(ie(Co,()=>se()));Q(Po,document.getElementById("app"));document.addEventListener("click",t=>{let o=t.target.closest("a");if(!o)return;let r=o.getAttribute("href");!r||r.startsWith("http")||r.startsWith("#")||r.startsWith("mailto:")||(t.preventDefault(),S(r))});(!location.hash||location.hash==="#/")&&S("/");
//# sourceMappingURL=app.js.map
