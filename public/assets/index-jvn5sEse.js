import{u as c,r as l,j as r,A as d,B as i}from"./index-C-g3yOAE.js";import{baseColumns as u}from"./columns-Bwj2tat0.js";import y from"./index-UQt_oG4y.js";import{P as x,a as f}from"./Table-OlwSqMJK.js";import"./dateUtil-BnlWTJph.js";import"./index-hJJE_L4a.js";import"./index-CmPvz_FA.js";import"./index-BsOYpZyI.js";const m=async(t,e,o)=>{var s;o?await t.show({data:o,type:"edit"}):await t.show(),t.remove(),(s=e.current)==null||s.reload()},B=()=>{const t=c(y),e=l.useRef(),o=l.useRef(),s=[...u,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(a,n)=>[r.jsx(i,{type:"link",onClick:()=>m(t,e,n),children:"编辑"},"edit"),r.jsx(f,{title:"确认删除吗？",onConfirm:async()=>{var p;await d.systemDept.deptDelete({id:n.id}),(p=e==null?void 0:e.current)==null||p.reload()},children:r.jsx(i,{type:"link",danger:!0,children:"删除"})},"delete")]}];return r.jsx(x,{onDataSourceChange:a=>{o.current=a},columns:s,actionRef:e,request:a=>d.systemDept.deptList(a),rowKey:"id",columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[r.jsx(i,{type:"primary",onClick:()=>m(t,e),children:"新增"},"primary")]})};export{B as default};
