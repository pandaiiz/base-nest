import{N as n,u as x,r as c,j as e,D as p,B as b,P as j,a as h}from"./index-CaOge65T.js";import{A as d}from"./index-B3XjnExU.js";import{P as f}from"./index-emN4IGsW.js";import{P as r}from"./index-nmN99p6a.js";import"./request-C3tBYgRz.js";import"./systemDept-CC_2xMZU.js";const v=n.create(({data:s,type:o="add"})=>{const a=x(),i=c.useRef(),m=async()=>{var t,u;const l=await((u=(t=i.current)==null?void 0:t.validateFields)==null?void 0:u.call(t));o==="add"?await d.ioOrder.ioOrderCreate(l):await d.ioOrder.ioOrderUpdate({id:s.id},l),a.resolve(l)};return e.jsx(p,{title:o==="add"?"新增":"编辑",open:a.visible,placement:"bottom",onClose:a.remove,maskClosable:!1,height:"100%",destroyOnClose:!0,footer:e.jsx(b,{type:"primary",onClick:m,children:"确定"}),children:e.jsxs(j,{formRef:i,initialValues:s||{status:1},labelCol:{span:4},submitter:!1,layout:"horizontal",children:[e.jsx(r,{rules:[{required:!0}],name:"quantity",label:"流程单号"}),e.jsx(r,{rules:[{required:!0}],name:"singleWeight",label:"部门名称"}),e.jsx(r,{rules:[{required:!0}],name:"totalWeight",label:"类型"}),e.jsx(r,{rules:[{required:!0}],name:"totalWeight",label:"出入库"}),e.jsx(r,{rules:[{required:!0}],name:"totalWeight",label:"重量"}),e.jsx(r,{rules:[{required:!0}],name:"totalWeight",label:"件数"}),e.jsx(f,{rules:[{required:!0}],name:"totalWeight",label:"备注"}),e.jsx(r,{rules:[{required:!0}],name:"totalWeight",label:"品名"}),e.jsx(h,{rules:[{required:!0}],name:"remark",label:"备注"})]})})});export{v as default};