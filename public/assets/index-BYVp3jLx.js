import{u as m,r as l,j as o,B as s}from"./index-CaOge65T.js";import{baseColumns as d}from"./columns-DMEGtbL-.js";import c from"./index-CmHcOjMt.js";import{i as u,A as f}from"./index-B3XjnExU.js";import{P as x}from"./index-9KecWm-N.js";import{P as y}from"./Table-BQMs0OhS.js";import"./dateUtil-C5Px1K3M.js";import"./request-C3tBYgRz.js";import"./index-nmN99p6a.js";import"./systemDept-CC_2xMZU.js";import"./Pagination-CS4LgQge.js";import"./index-CrClVjcz.js";const p=async(r,e,i)=>{var t;i?await r.show({data:i,type:"edit"}):await r.show(),r.remove(),(t=e.current)==null||t.reload()},T=()=>{const r=m(c),e=l.useRef(),i=[...d,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(t,a)=>[o.jsx(s,{type:"link",onClick:()=>p(r,e,a),children:"编辑"},"edit"),o.jsx(x,{title:"确认删除吗？",onConfirm:async()=>{var n;await f.ioOrder.ioOrderDelete({id:a.id}),(n=e==null?void 0:e.current)==null||n.reload()},children:o.jsx(s,{type:"link",danger:!0,children:"删除"})},"delete")]}];return o.jsx(y,{columns:i,actionRef:e,request:t=>u(t),rowKey:"id",pagination:{defaultPageSize:10,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],showQuickJumper:!0},columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[o.jsx(s,{type:"primary",onClick:()=>p(r,e),children:"新增"},"primary")]})};export{T as default};
