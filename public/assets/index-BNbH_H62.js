import{R as p,_ as m,j as o,h as u,i as n,N as h,u as P,r as f,P as C,a as x}from"./index-BdVTcDul.js";import{A as c}from"./index-BIg947uO.js";import{M as k}from"./index-BVe2A3rK.js";import{P as F}from"./index-aKKb7-FE.js";import"./request-KJyQ3YrS.js";import"./systemDept-DhqNZY_f.js";var v=["fieldProps","unCheckedChildren","checkedChildren","proFieldProps"],j=p.forwardRef(function(e,i){var a=e.fieldProps,t=e.unCheckedChildren,l=e.checkedChildren,s=e.proFieldProps,r=m(e,v);return o.jsx(u,n({valueType:"switch",fieldProps:n({unCheckedChildren:t,checkedChildren:l},a),ref:i,valuePropName:"checked",proFieldProps:s,filedConfig:{valuePropName:"checked",ignoreWidth:!0,customLightMode:!0}},r))});const b=j,N=h.create(({data:e,type:i="add"})=>{const a=P(),t=f.useRef(),l=async()=>{var r,d;const s=await((d=(r=t.current)==null?void 0:r.validateFields)==null?void 0:d.call(r));i==="add"?await c.systemDept.deptCreate(s):await c.systemDept.deptUpdate({id:e.id},s),a.resolve(s)};return o.jsx(k,{title:i==="add"?"新增":"编辑",open:a.visible,onOk:l,onCancel:a.remove,maskClosable:!1,children:o.jsxs(C,{formRef:t,initialValues:e,labelCol:{span:6},wrapperCol:{span:16},submitter:!1,layout:"horizontal",children:[o.jsx(x,{rules:[{required:!0}],name:"name",label:"部门名称"}),o.jsx(b,{name:"useKnifeTool",label:"使用刀具"}),o.jsx(F,{label:"排序号",name:"sort",min:0,max:255,fieldProps:{precision:0}})]})})});export{N as default};
