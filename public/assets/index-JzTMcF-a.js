import{u as m,r as l,j as o,B as s}from"./index-BdVTcDul.js";import{baseColumns as d}from"./columns-DoYOkwNj.js";import c from"./index-cwQ8fO1u.js";import{i as u,A as f}from"./index-BIg947uO.js";import{P as x}from"./index-pO-TSuVN.js";import{P as y}from"./Table-BPazN3dF.js";import"./dateUtil-D6r_EuKQ.js";import"./index-BVe2A3rK.js";import"./index-aKKb7-FE.js";import"./request-KJyQ3YrS.js";import"./systemDept-DhqNZY_f.js";import"./Table-BBhwPCwl.js";import"./index-DyDWlBm7.js";import"./index-BcGmPhu8.js";const p=async(r,e,i)=>{var t;i?await r.show({data:i,type:"edit"}):await r.show(),r.remove(),(t=e.current)==null||t.reload()},v=()=>{const r=m(c),e=l.useRef(),i=[...d,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(t,a)=>[o.jsx(s,{type:"link",onClick:()=>p(r,e,a),children:"编辑"},"edit"),o.jsx(x,{title:"确认删除吗？",onConfirm:async()=>{var n;await f.ioOrder.ioOrderDelete({id:a.id}),(n=e==null?void 0:e.current)==null||n.reload()},children:o.jsx(s,{type:"link",danger:!0,children:"删除"})},"delete")]}];return o.jsx(y,{columns:i,actionRef:e,request:t=>u(t),rowKey:"id",pagination:{defaultPageSize:10,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],showQuickJumper:!0},columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[o.jsx(s,{type:"primary",onClick:()=>p(r,e),children:"新增"},"primary")]})};export{v as default};
