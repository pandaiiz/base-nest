import{u as p,r as d,j as i,i as m,B as s,A as c}from"./index-C-g3yOAE.js";import{baseColumns as u}from"./columns-D1w5BT1l.js";import x from"./index-D-jT0lQB.js";import{P as y,a as f}from"./Table-OlwSqMJK.js";import"./dateUtil-BnlWTJph.js";import"./index-CmPvz_FA.js";import"./index-hJJE_L4a.js";import"./index-BsOYpZyI.js";const l=async(r,e,o)=>{var t;o?await r.show({data:o,type:"edit"}):await r.show(),r.remove(),(t=e.current)==null||t.reload()},P=()=>{const r=p(x),e=d.useRef(),o=[...u,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(t,a)=>[i.jsx(s,{type:"link",onClick:()=>l(r,e,a),children:"编辑"},"edit"),i.jsx(f,{title:"确认删除吗？",onConfirm:async()=>{var n;await c.ioOrder.ioOrderDelete({id:a.id}),(n=e==null?void 0:e.current)==null||n.reload()},children:i.jsx(s,{type:"link",danger:!0,children:"删除"})},"delete")]}];return i.jsx(y,{columns:o,actionRef:e,request:t=>m(t),rowKey:"id",pagination:{defaultPageSize:10,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],showQuickJumper:!0},columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[i.jsx(s,{type:"primary",onClick:()=>l(r,e),children:"新增"},"primary")]})};export{P as default};
