import{cA as n,u as p,r as m,j as c,B as u,E as l}from"./index-CaOge65T.js";import{baseColumns as y}from"./columns-z6aKdlOA.js";import f from"./index-B-sNcLIa.js";import{M as h}from"./request-C3tBYgRz.js";import{P as x}from"./Table-BQMs0OhS.js";import"./dateUtil-C5Px1K3M.js";import"./index-Byc2rBLS.js";import"./systemDept-CC_2xMZU.js";import"./index-Cuoo7or1.js";import"./index-emN4IGsW.js";import"./index-Cz_LybSK.js";import"./index-9KecWm-N.js";import"./Pagination-CS4LgQge.js";import"./index-CrClVjcz.js";async function w(t){return n.get("/system/users",{params:{page:"1",pageSize:"10",...t}})}async function d(t){return n.get("/system/menus/list",{method:"GET",params:{show:1,status:1,...t}})}async function g(t){return n.post("/system/users",{data:t})}async function C(t){const{id:e,...a}=t;return n.get(`/system/users/${e}`,{params:{...a}})}async function j(t,e){const{id:a,...o}=t;return n.put(`/system/users/${a}`,{params:{...o},data:e})}async function k(t){const{id:e,...a}=t;return n.delete(`/system/users/${e}`,{params:{...a}})}const{confirm:R}=h,E=(t,e)=>{R({title:"确认删除吗？",icon:c.jsx(l,{}),content:"删除后不可恢复！",onOk(){k({id:t.id}).then(()=>e.current.reload())}})},M=async(t,e)=>{var r;const a=await d(),o=await t.show({treeData:a});try{await g(o),t.remove(),(r=e.current)==null||r.reload()}catch{}},q=async(t,e,a)=>{var i;const o=await d(),r=await C({id:e.id}),s=await t.show({data:r,treeData:o,type:"edit"});try{await j({id:e.id},s),t.remove(),(i=a.current)==null||i.reload()}catch{}},O=()=>{const t=p(f),e=m.useRef(),a=[...y,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(r,s)=>[c.jsx(u,{type:"link",onClick:()=>q(t,s,e),children:"编辑"},"edit"),c.jsx(u,{type:"link",onClick:()=>E(s,e),children:"删除"},"delete")]}],o=m.useRef();return c.jsx(x,{headerTitle:"用户列表",onDataSourceChange:r=>{o.current=r},columns:a,actionRef:e,request:async r=>{var i;const s=await w(r);return{data:s.list,success:!0,total:(i=s.pagination)==null?void 0:i.total}},rowKey:"id",columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[c.jsx(u,{type:"primary",onClick:()=>M(t,e),children:"新增"},"primary")]})};export{O as default};