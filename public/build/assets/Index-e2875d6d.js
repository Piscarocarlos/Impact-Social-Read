import{r as s,j as t,a as r,L as u,d as l}from"./main-7817f3b1.js";import{D as h}from"./DefaultLayout-c44391f7.js";import{N as p}from"./index-a42b5db0.js";import{G as g,a as x,b as f,c as N}from"./index.esm-35a63bc3.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index.esm-fffe3f01.js";import"./index-d410f391.js";import"./floating-ui.dom.browser.min-71618afd.js";function R({section:n}){const[d,c]=s.useState(1),[m,b]=s.useState(n.slice(0,15));s.useEffect(()=>{const e=(d-1)*15,a=e+15;b(n.slice(e,a))},[d]);const o=e=>{l.Inertia.get(route("dashboard.section-one-candidate.edit",{id:e}))},i=[{id:1,label:"btn btn-info",labIcon:f,methode:e=>{l.Inertia.get(route("dashboard.section-one-candidate.show",e))}},{id:2,label:"btn btn-danger",labIcon:N,methode:e=>{l.Inertia.delete(route("dashboard.section-one-candidate.destroy",e)),window.location.reload()}}];return s.useState(!1),t(h,{children:r("div",{className:"panel",children:[r("div",{className:"flex justify-between",children:[t("h3",{className:"text-xl font-bold",children:"Liste des messages"}),t(u,{href:route("dashboard.section-one-candidate.create"),className:"btn btn-success",children:"Créer un message"})]}),t(p,{columns:[{accessor:"",title:"Message",render:e=>e.msg_info_candidature!=null>0?t("button",{className:"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",onClick:()=>o(e.id),children:"Voir le message sauvegardé"}):"error"},{accessor:"status",title:"Statut du message",render:e=>e.status==!0?t("span",{className:"bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300",children:"Activé"}):t("span",{className:"bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300",children:"Désactivé"})},{accessor:"",title:"Action",render:e=>e.status==!0?r("div",{className:"flex space-x-2",children:[t("button",{className:"btn btn-warning",onClick:()=>o(e.id),children:t(g,{})}),i.map(a=>t("button",{className:a.label,onClick:()=>a.methode(e.id),children:t(a.labIcon,{})},a.id))]}):r("div",{className:"flex space-x-2",children:[t("button",{className:"btn btn-primary",onClick:()=>o(e.id),children:t(x,{})}),i.map(a=>t("button",{className:a.label,onClick:()=>a.methode(e.id),children:t(a.labIcon,{})},a.id))]})}],records:m,totalRecords:n.length,recordsPerPage:15,page:d,onPageChange:e=>c(e)})]})})}export{R as default};
