import{N as u,u as p,r as c,j as a,P as f,a as n}from"./index-CaOge65T.js";import{A as d}from"./index-B3XjnExU.js";import{M as x}from"./request-C3tBYgRz.js";import"./systemDept-CC_2xMZU.js";const v=u.create(({data:o,type:t="add"})=>{const s=p(),l=c.useRef(),m=async()=>{var e,i;const r=await((i=(e=l.current)==null?void 0:e.validateFields)==null?void 0:i.call(e));t==="add"?await d.relationshipCustomer.relationshipCustomerCreate(r):await d.relationshipCustomer.relationshipCustomerUpdate({id:o.id},r),s.resolve(r)};return a.jsx(x,{title:t==="add"?"新增":"编辑",open:s.visible,onOk:m,onCancel:s.remove,maskClosable:!1,children:a.jsxs(f,{formRef:l,initialValues:o||{status:1},labelCol:{span:6},wrapperCol:{span:16},submitter:!1,layout:"horizontal",children:[a.jsx(n,{rules:[{required:!0}],name:"name",label:"客户名称"}),a.jsx(n,{rules:[{required:!0}],name:"code",label:"客户编码"})]})})});export{v as default};
