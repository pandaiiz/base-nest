import{r as n,j as t}from"./index-CaOge65T.js";function h(){const[a,s]=n.useState(),[c,r]=n.useState(""),i=async()=>{const e=await navigator.serial.requestPort();s(e)},l=async()=>{const e={baudRate:9600,dataBits:8,stopBits:1,parity:"none",bufferSize:1024,flowControl:"none"};a&&(await a.open(e),await d())},d=async()=>{for(;a.readable;){const e=a.readable.getReader();try{for(;e;){const{value:o,done:p}=await e.read();if(p)break;r(x=>x+new TextDecoder().decode(o))}}catch(o){console.log(o)}finally{}}await a.close()},u=async()=>{const e=a.readable.getReader();await(e==null?void 0:e.cancel()),r("")};return t.jsxs("div",{children:[t.jsx("button",{onClick:i,children:"Connect Serial Port"}),t.jsx("button",{onClick:l,children:"Read Data"}),t.jsx("button",{onClick:u,children:"Close Port"}),t.jsxs("div",{children:[t.jsx("h3",{children:"Serial Output:"}),t.jsx("textarea",{rows:10,cols:50,value:c,readOnly:!0})]})]})}export{h as default};