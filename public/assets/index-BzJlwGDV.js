import{r as n,j as m}from"./index-CaOge65T.js";import{g as p}from"./common-CIYGB5T6.js";import{baseColumns as l}from"./columns-BuWjEf3q.js";import{P as c}from"./Table-BQMs0OhS.js";import"./request-C3tBYgRz.js";import"./index-9KecWm-N.js";import"./Pagination-CS4LgQge.js";import"./index-CrClVjcz.js";const g=()=>{const a=n.useRef(),i=[...l];return m.jsx(c,{columns:i,actionRef:a,request:async e=>{let o=await p("io/knife-tool/report",e);if(e.keyword){const t=e.keyword.toLowerCase();o=o.filter(r=>r.name.toLowerCase().includes(t)||r.departments.some(s=>s.deptName.toLowerCase().includes(t))||r.suppliers.some(s=>s.supplierName.toLowerCase().includes(t)))}return{data:o,success:!0}},rowKey:"code",pagination:!1,columnEmptyText:!1,dateFormatter:"string",scroll:{y:800},options:{search:!0}})};export{g as default};