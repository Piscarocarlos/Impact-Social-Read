import{c as n,u as c,j as e,a as t}from"./main-7817f3b1.js";import{D as m}from"./DefaultLayout-c44391f7.js";import{F as o}from"./index.esm-fffe3f01.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";function j(){const{actes:i}=n().props,{data:s,put:r,setData:d,processing:u,errors:l}=c({title:i.title});return e(m,{children:t("div",{children:[e("div",{className:"flex items-center justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Les intitulés de actes"})}),e("div",{className:"datatables",children:e("div",{className:" flex justify-between flex-nowrap dark:text-white gap-4",children:e("div",{className:"md:w-3/5 sm:w-full",children:t("div",{className:"panel",children:[e("h2",{className:"text-lg mb-3 font-bold",children:"Création "}),e("form",{onSubmit:a=>{a.preventDefault(),r(route("dashboard.intitule-acte.update",i.id),{})},children:t("div",{className:"grid gap-3",children:[t("div",{className:"my-2",children:[t("label",{htmlFor:"title",className:"text-base",children:["Intitulé d'acte ",e("span",{className:"text-danger",children:"*"})]}),e("input",{type:"text",value:s.title,onChange:a=>d("title",a.target.value),className:"form-input",placeholder:"Intitulé d'acte"}),l.title&&e("div",{className:"text-danger",children:l.title})]}),t("button",{type:"submit",className:"btn bg-lime-500 text-white border-lime-500",children:[e(o,{className:"mr-4 rtl:order-2"}),e("span",{children:"Sauvegarder"})]})]})})]})})})})]})})}export{j as default};