import{N as x,u as d,r as f,m as h,j as o,P as y,a as v,S as g,B as p}from"./index-CaOge65T.js";import{g as C,d as P}from"./common-CIYGB5T6.js";import{ReportModal as j}from"./index-DObCHnWX.js";import{M as k}from"./request-C3tBYgRz.js";import{EditModal as M}from"./index-CYqho-Os.js";import{baseColumns as b}from"./columns-CQ-Wxtz-.js";import{P as T}from"./Table-BQMs0OhS.js";import{P as S}from"./index-9KecWm-N.js";import"./in-out-report-CsSei-VC.js";import"./index-ETeoPN6b.js";import"./Pagination-CS4LgQge.js";import"./work-shop-report-BENW9RG-.js";import"./fix-report-CI4QXN_6.js";import"./index-Cz_LybSK.js";import"./index-Cuoo7or1.js";import"./index-nmN99p6a.js";import"./dateUtil-C5Px1K3M.js";import"./index-CrClVjcz.js";const R=x.create(()=>{const e=d(),n=f.useRef(),[a,t]=h.useMessage(),c=async()=>{var l,r;(await((r=(l=n.current)==null?void 0:l.validateFields)==null?void 0:r.call(l))).password!=="123123"&&(e.resolve(!1),a.error("密码错误！")),e.resolve(!0)};return o.jsxs(k,{title:"请输入密码",onOk:c,open:e.visible,onClose:e.remove,onCancel:e.remove,maskClosable:!1,children:[t,o.jsx(y,{formRef:n,labelCol:{span:6},wrapperCol:{span:16},submitter:!1,layout:"horizontal",children:o.jsx(v.Password,{name:"password",label:"密码"})})]})}),w=async(e,n,a)=>{var t;a?await e.show({data:a,type:"edit"}):await e.show(),e.remove(),(t=n.current)==null||t.reload()},G=()=>{const[e,n]=f.useState("全部"),a=d(M),t=d(R),c=d(j),s=f.useRef(),l=[...b,{title:"操作",valueType:"option",key:"option",align:"center",width:160,fixed:"right",render:(r,i)=>[o.jsx(p,{type:"link",onClick:async()=>{await t.show()&&(t.remove(),w(a,s,i))},children:"编辑"},"edit"),o.jsx(S,{title:"确认删除吗？",onConfirm:async()=>{var m;await t.show()&&(t.remove(),await P("io/knife-tool",i.id),(m=s==null?void 0:s.current)==null||m.reload())},children:o.jsx(p,{type:"link",danger:!0,children:"删除"})},"delete")]}];return o.jsx(T,{columns:l,actionRef:s,request:async r=>{const{data:i,total:u,success:m}=await C("io/knife-tool",{...r,tableType:e});return{data:i,success:m,total:u}},rowKey:"id",pagination:{defaultPageSize:10,showSizeChanger:!0,pageSizeOptions:["10","20","50","100"],showQuickJumper:!0},columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},toolBarRender:()=>[o.jsx(g,{options:["全部","部门","厂商","修磨","报废"],value:e,onChange:r=>{var i;n(r),(i=s.current)==null||i.reload()}}),o.jsx(p,{onClick:()=>c.show(),children:"报表"}),o.jsx(p,{type:"primary",onClick:()=>w(a,s),children:"新增"},"primary")]})};export{G as default};