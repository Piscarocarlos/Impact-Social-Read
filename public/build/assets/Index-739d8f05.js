import{r as a,j as t,a as d,d as m}from"./main-7817f3b1.js";import{D as u}from"./DefaultLayout-c44391f7.js";import{N as p}from"./index-a42b5db0.js";import{G as x,a as f}from"./index.esm-35a63bc3.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index.esm-fffe3f01.js";import"./index-d410f391.js";import"./floating-ui.dom.browser.min-71618afd.js";function A({cities:s}){const[r,o]=a.useState(1),[n,c]=a.useState(s.slice(0,15));a.useEffect(()=>{const e=(r-1)*15,l=e+15;c(s.slice(e,l))},[r]);const i=e=>{m.Inertia.get(route("dashboard.villes.edit",{id:e}))};return t(u,{children:d("div",{className:"panel",children:[t("div",{className:"flex justify-between",children:t("h3",{className:"text-xl font-bold",children:"Liste des villes"})}),t(p,{columns:[{accessor:"name_city",title:"Nom de la ville"},{accessor:"province_id",title:"Province"},{accessor:"status_cities",title:"Statut de la ville",render:e=>e.status_cities==!0?t("span",{className:"bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300",children:"Activé"}):t("span",{className:"bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300",children:"Désactivé"})},{accessor:"created_at",title:"Date de création"},{accessor:"",title:"Actions sur la ville",render:e=>e.status_cities==!0?t("button",{className:"btn btn-warning",onClick:()=>i(e.id),children:t(x,{})}):t("button",{className:"btn btn-primary",onClick:()=>i(e.id),children:t(f,{})})}],records:n,totalRecords:s.length,recordsPerPage:15,page:r,onPageChange:e=>o(e)})]})})}export{A as default};