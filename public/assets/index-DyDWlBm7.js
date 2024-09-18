import{r as l,A,p as L,R as g,C as Q,ck as te,cl as ne,bS as se,cm as re,t as U,cn as oe,co as W,b$ as M,cp as ce,c8 as ae,cq as le,cr as ie,cs as de}from"./index-BdVTcDul.js";var fe={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 00-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z"}}]},name:"folder-open",theme:"outlined"};const ue=fe;var pe=function(r,s){return l.createElement(A,L({},r,{ref:s,icon:ue}))},ye=l.forwardRef(pe);const me=ye;var he={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z"}}]},name:"folder",theme:"outlined"};const ve=he;var ge=function(r,s){return l.createElement(A,L({},r,{ref:s,icon:ve}))},xe=l.forwardRef(ge);const Oe=xe;var be={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z"}}]},name:"holder",theme:"outlined"};const Ee=be;var Ke=function(r,s){return l.createElement(A,L({},r,{ref:s,icon:Ee}))},we=l.forwardRef(Ke);const Ce=we,B=4;function Ne(n){const{dropPosition:r,dropLevelOffset:s,prefixCls:t,indent:o,direction:e="ltr"}=n,c=e==="ltr"?"left":"right",a=e==="ltr"?"right":"left",i={[c]:-s*o+B,[a]:0};switch(r){case-1:i.top=-3;break;case 1:i.bottom=-3;break;default:i.bottom=-3,i[c]=o+B;break}return g.createElement("div",{style:i,className:`${t}-drop-indicator`})}const Se=g.forwardRef((n,r)=>{var s;const{getPrefixCls:t,direction:o,virtual:e,tree:c}=g.useContext(Q),{prefixCls:a,className:i,showIcon:f=!1,showLine:E,switcherIcon:S,switcherLoadingIcon:R,blockNode:T=!1,children:H,checkable:K=!1,selectable:w=!0,draggable:x,motion:C,style:j}=n,y=t("tree",a),k=t(),N=C??Object.assign(Object.assign({},te(k)),{motionAppear:!1}),D=Object.assign(Object.assign({},n),{checkable:K,selectable:w,showIcon:f,motion:N,blockNode:T,showLine:!!E,dropIndicatorRender:Ne}),[h,u,v]=ne(y),[,O]=se(),b=O.paddingXS/2+(((s=O.Tree)===null||s===void 0?void 0:s.titleHeight)||O.controlHeightSM),I=g.useMemo(()=>{if(!x)return!1;let d={};switch(typeof x){case"function":d.nodeDraggable=x;break;case"object":d=Object.assign({},x);break}return d.icon!==!1&&(d.icon=d.icon||g.createElement(Ce,null)),d},[x]),p=d=>g.createElement(oe,{prefixCls:y,switcherIcon:S,switcherLoadingIcon:R,treeNodeProps:d,showLine:E});return h(g.createElement(re,Object.assign({itemHeight:b,ref:r,virtual:e},D,{style:Object.assign(Object.assign({},c==null?void 0:c.style),j),prefixCls:y,className:U({[`${y}-icon-hide`]:!f,[`${y}-block-node`]:T,[`${y}-unselectable`]:!w,[`${y}-rtl`]:o==="rtl"},c==null?void 0:c.className,i,u,v),direction:o,checkable:K&&g.createElement("span",{className:`${y}-checkbox-inner`}),selectable:w,switcherIcon:p,draggable:I}),H))}),Y=Se,q=0,z=1,X=2;function _(n,r,s){const{key:t,children:o}=s;function e(c){const a=c[t],i=c[o];r(a,c)!==!1&&_(i||[],r,s)}n.forEach(e)}function Re(n){let{treeData:r,expandedKeys:s,startKey:t,endKey:o,fieldNames:e}=n;const c=[];let a=q;if(t&&t===o)return[t];if(!t||!o)return[];function i(f){return f===t||f===o}return _(r,f=>{if(a===X)return!1;if(i(f)){if(c.push(f),a===q)a=z;else if(a===z)return a=X,!1}else a===z&&c.push(f);return s.includes(f)},W(e)),c}function F(n,r,s){const t=M(r),o=[];return _(n,(e,c)=>{const a=t.indexOf(e);return a!==-1&&(o.push(c),t.splice(a,1)),!!t.length},W(s)),o}var G=function(n,r){var s={};for(var t in n)Object.prototype.hasOwnProperty.call(n,t)&&r.indexOf(t)<0&&(s[t]=n[t]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,t=Object.getOwnPropertySymbols(n);o<t.length;o++)r.indexOf(t[o])<0&&Object.prototype.propertyIsEnumerable.call(n,t[o])&&(s[t[o]]=n[t[o]]);return s};function Te(n){const{isLeaf:r,expanded:s}=n;return r?l.createElement(ce,null):s?l.createElement(me,null):l.createElement(Oe,null)}function J(n){let{treeData:r,children:s}=n;return r||ie(s)}const $e=(n,r)=>{var{defaultExpandAll:s,defaultExpandParent:t,defaultExpandedKeys:o}=n,e=G(n,["defaultExpandAll","defaultExpandParent","defaultExpandedKeys"]);const c=l.useRef(),a=l.useRef(),i=()=>{const{keyEntities:h}=ae(J(e));let u;return s?u=Object.keys(h):t?u=le(e.expandedKeys||o||[],h):u=e.expandedKeys||o||[],u},[f,E]=l.useState(e.selectedKeys||e.defaultSelectedKeys||[]),[S,R]=l.useState(()=>i());l.useEffect(()=>{"selectedKeys"in e&&E(e.selectedKeys)},[e.selectedKeys]),l.useEffect(()=>{"expandedKeys"in e&&R(e.expandedKeys)},[e.expandedKeys]);const T=(h,u)=>{var v;return"expandedKeys"in e||R(h),(v=e.onExpand)===null||v===void 0?void 0:v.call(e,h,u)},H=(h,u)=>{var v;const{multiple:O,fieldNames:b}=e,{node:I,nativeEvent:p}=u,{key:d=""}=I,$=J(e),P=Object.assign(Object.assign({},u),{selected:!0}),Z=(p==null?void 0:p.ctrlKey)||(p==null?void 0:p.metaKey),ee=p==null?void 0:p.shiftKey;let m;O&&Z?(m=h,c.current=d,a.current=m,P.selectedNodes=F($,m,b)):O&&ee?(m=Array.from(new Set([].concat(M(a.current||[]),M(Re({treeData:$,expandedKeys:S,startKey:d,endKey:c.current,fieldNames:b}))))),P.selectedNodes=F($,m,b)):(m=[d],c.current=d,a.current=m,P.selectedNodes=F($,m,b)),(v=e.onSelect)===null||v===void 0||v.call(e,m,P),"selectedKeys"in e||E(m)},{getPrefixCls:K,direction:w}=l.useContext(Q),{prefixCls:x,className:C,showIcon:j=!0,expandAction:y="click"}=e,k=G(e,["prefixCls","className","showIcon","expandAction"]),N=K("tree",x),D=U(`${N}-directory`,{[`${N}-directory-rtl`]:w==="rtl"},C);return l.createElement(Y,Object.assign({icon:Te,ref:r,blockNode:!0},k,{showIcon:j,expandAction:y,prefixCls:N,className:D,expandedKeys:S,selectedKeys:f,onSelect:H,onExpand:T}))},Pe=l.forwardRef($e),He=Pe,V=Y;V.DirectoryTree=He;V.TreeNode=de;const ke=V;export{ke as T};