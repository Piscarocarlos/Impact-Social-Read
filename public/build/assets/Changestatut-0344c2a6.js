import{c,u as m,j as t,a}from"./main-7817f3b1.js";import{D as u}from"./DefaultLayout-c44391f7.js";import{F as p}from"./index.esm-fffe3f01.js";import{S as h}from"./react-select.esm-b3a586dc.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";import"./floating-ui.dom.browser.min-71618afd.js";function L(){const{convention:n,statut:o}=c().props,r=JSON.parse(n.data),{data:s,put:l,setData:v,processing:b,errors:i}=m({statutConvention:r.statutConvention}),d=o.map(e=>({key:e.id,value:e.title,label:e.title}));return t(u,{children:a("div",{children:[t("div",{className:"flex items-center justify-between mb-5",children:t("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Conventions"})}),t("div",{className:"datatables",children:t("div",{className:" flex justify-between flex-nowrap dark:text-white gap-4",children:t("div",{className:" sm:w-full",children:t("div",{className:"panel",children:a("form",{onSubmit:e=>{e.preventDefault(),l(route("dashboard.convention-update.update",n.id),{})},children:[t("div",{className:"grid gap-3 mb-4",children:a("div",{className:"my-2",children:[a("label",{htmlFor:"statutConvention",className:"text-base",children:["Statut de la convention ",t("span",{className:"text-danger",children:"*"})]}),t(h,{onChange:e=>{s.statutConvention=e},defaultValue:s.statutConvention,options:d,isSearchable:!1}),i.statutConvention&&t("div",{className:"text-danger",children:i.statutConvention})]})}),t("div",{className:"grid  gap-3 pt-4",children:t("div",{className:"my-2",children:a("button",{type:"submit",className:"btn btn-success",children:[t(p,{className:"mr-4 rtl:order-2"}),t("span",{children:"Sauvegarder"})]})})})]})})})})})]})})}export{L as default};
