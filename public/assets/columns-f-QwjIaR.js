import{j as a,d as i}from"./index-BdVTcDul.js";import{f as n}from"./dateUtil-D6r_EuKQ.js";import{T as d}from"./index-BtgdXNti.js";const h=[{align:"center",title:"用户名",width:120,dataIndex:"username"},{align:"center",title:"呢称",width:120,hideInSearch:!0,dataIndex:"nickname"},{align:"center",title:"所在部门",dataIndex:"dept",hideInSearch:!0,width:180,render:(r,e)=>{var t;return a.jsx(d,{children:(t=e.dept)==null?void 0:t.name})}},{align:"center",title:"所属角色",dataIndex:"roleNames",hideInSearch:!0,width:220,render:(r,e)=>a.jsx(i,{children:e.roles.map(t=>a.jsx(d,{color:"success",children:t.name},t.id))})},{align:"center",title:"备注",width:120,dataIndex:"remark"},{align:"center",title:"状态",dataIndex:"status",width:80,valueType:"select",valueEnum:{0:{text:"禁用",status:"Error"},1:{text:"启用",status:"Success"}}},{align:"center",title:"创建时间",dataIndex:"createdAt",width:120,hideInSearch:!0,render:(r,e)=>n(e.createdAt)},{align:"center",title:"修改时间",dataIndex:"updatedAt",width:120,hideInSearch:!0,render:(r,e)=>n(e.createdAt)}];export{h as baseColumns};
