import{N as f,u as x,r as b,j as e,P as m,a as n}from"./index-BdVTcDul.js";import{A as u}from"./index-BIg947uO.js";import{M as j}from"./index-BVe2A3rK.js";import{C}from"./index-BhNUxCWD.js";import{T as v}from"./index-DyDWlBm7.js";import{P as h}from"./index-BXxGmVdb.js";import{P}from"./index-CmytMqWs.js";import"./request-KJyQ3YrS.js";import"./systemDept-DhqNZY_f.js";const E=f.create(({data:l,type:t="add",treeData:d=[]})=>{const p=(l==null?void 0:l.menuIds)||[],o=x(),s=b.useRef(),c=async()=>{var r,i;const a=await((i=(r=s.current)==null?void 0:r.validateFields)==null?void 0:i.call(r));t==="add"?await u.systemRole.roleCreate(a):await u.systemRole.roleUpdate({id:l.id},a),o.resolve(a)};return e.jsx(j,{title:t==="add"?"新增":"编辑",open:o.visible,onOk:c,onCancel:o.remove,maskClosable:!1,children:e.jsxs(m,{formRef:s,initialValues:l||{status:1},labelCol:{span:6},wrapperCol:{span:16},submitter:!1,layout:"horizontal",children:[e.jsx(n,{rules:[{required:!0}],name:"name",label:"角色名称"}),e.jsx(n,{rules:[{required:!0}],name:"value",label:"角色值"}),e.jsx(h.Group,{name:"status",label:"状态",options:[{label:"启用",value:1},{label:"禁用",value:0}]}),e.jsx(P,{name:"remark",label:"备注"}),e.jsx(m.Item,{label:"菜单权限",name:"menuIds",children:e.jsx(C,{style:{maxHeight:200,overflowY:"auto",padding:0},children:e.jsx(v,{checkable:!0,checkStrictly:!0,defaultExpandAll:!0,onCheck:a=>{var r;(r=s.current)==null||r.setFieldValue("menuIds",a==null?void 0:a.checked)},defaultCheckedKeys:p,fieldNames:{title:"name",key:"id"},treeData:d})})})]})})});export{E as default};