import{N as u,u as m,r as c,j as a,P as f,a as n}from"./index-BdVTcDul.js";import{A as p}from"./index-BIg947uO.js";import{M as x}from"./index-BVe2A3rK.js";import"./request-KJyQ3YrS.js";import"./systemDept-DhqNZY_f.js";const M=u.create(({data:o,type:i="add"})=>{const r=m(),l=c.useRef(),d=async()=>{var e,t;const s=await((t=(e=l.current)==null?void 0:e.validateFields)==null?void 0:t.call(e));i==="add"?await p.relationshipSupplier.relationshipSupplierCreate(s):await p.relationshipSupplier.relationshipSupplierUpdate({id:o.id},s),r.resolve(s)};return a.jsx(x,{title:i==="add"?"新增":"编辑",open:r.visible,onOk:d,onCancel:r.remove,maskClosable:!1,children:a.jsxs(f,{formRef:l,initialValues:o||{status:1},labelCol:{span:6},wrapperCol:{span:16},submitter:!1,layout:"horizontal",children:[a.jsx(n,{rules:[{required:!0}],name:"name",label:"供应商名称"}),a.jsx(n,{rules:[{required:!0}],name:"code",label:"供应商编码"})]})})});export{M as EditModal};