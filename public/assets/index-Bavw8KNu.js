import{u as m,r as l,j as r,B as s}from"./index-CaOge65T.js";import{baseColumns as d}from"./columns-Dvs5RsLV.js";import c from"./index-8KvxUBRy.js";import{i as u,A as x}from"./index-B3XjnExU.js";import{P as f}from"./index-9KecWm-N.js";import{P as y}from"./Table-BQMs0OhS.js";import"./common-CIYGB5T6.js";import"./request-C3tBYgRz.js";import"./index-emN4IGsW.js";import"./index-nmN99p6a.js";import"./systemDept-CC_2xMZU.js";import"./Pagination-CS4LgQge.js";import"./index-CrClVjcz.js";const p=async(t,e,i)=>{var o;i?await t.show({data:i,type:"edit"}):await t.show(),t.remove(),(o=e.current)==null||o.reload()},T=()=>{const t=m(c),e=l.useRef(),i=[...d,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(o,n)=>[r.jsx(s,{type:"link",onClick:()=>p(t,e,n),children:"编辑"},"edit"),r.jsx(f,{title:"确认删除吗？",onConfirm:async()=>{var a;await x.ioOrder.ioOrderDelete({id:n.id}),(a=e==null?void 0:e.current)==null||a.reload()},children:r.jsx(s,{type:"link",danger:!0,children:"删除"})},"delete")]}];return r.jsx(r.Fragment,{children:r.jsx(y,{columns:i,actionRef:e,request:o=>u(o),rowKey:"id",pagination:{defaultPageSize:10,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],showQuickJumper:!0},columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[r.jsx(s,{type:"primary",onClick:()=>p(t,e),children:"新增"},"primary")]})})};export{T as default};