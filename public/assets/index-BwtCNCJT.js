import{u as m,r as l,j as o,B as s}from"./index-BdVTcDul.js";import{baseColumns as u}from"./columns-BmIIkMha.js";import d from"./index-CHTbjQzp.js";import{r as c,A as h}from"./index-BIg947uO.js";import{P as f}from"./index-pO-TSuVN.js";import{P as x}from"./Table-BPazN3dF.js";import"./dateUtil-D6r_EuKQ.js";import"./index-BVe2A3rK.js";import"./request-KJyQ3YrS.js";import"./systemDept-DhqNZY_f.js";import"./Table-BBhwPCwl.js";import"./index-DyDWlBm7.js";import"./index-BcGmPhu8.js";const p=async(t,e,i)=>{var r;i?await t.show({data:i,type:"edit"}):await t.show(),t.remove(),(r=e.current)==null||r.reload()},v=()=>{const t=m(d),e=l.useRef(),i=[...u,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(r,a)=>[o.jsx(s,{type:"link",onClick:()=>p(t,e,a),children:"编辑"},"edit"),o.jsx(f,{title:"确认删除吗？",onConfirm:async()=>{var n;await h.relationshipCustomer.relationshipCustomerDelete({id:a.id}),(n=e==null?void 0:e.current)==null||n.reload()},children:o.jsx(s,{type:"link",danger:!0,children:"删除"})},"delete")]}];return o.jsx(x,{columns:i,actionRef:e,request:r=>c(r),rowKey:"id",pagination:{defaultPageSize:10,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],showQuickJumper:!0},columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[o.jsx(s,{type:"primary",onClick:()=>p(t,e),children:"新增"},"primary")]})};export{v as default};