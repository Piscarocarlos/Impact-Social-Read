import{r as o,j as t,a as r,d as c}from"./main-7817f3b1.js";import{D as h}from"./DefaultLayout-c44391f7.js";import{N as f}from"./index-a42b5db0.js";import{b as u,c as E}from"./index.esm-35a63bc3.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index.esm-fffe3f01.js";import"./index-d410f391.js";import"./floating-ui.dom.browser.min-71618afd.js";function C({handicap:s}){const[a,n]=o.useState(1),[i,d]=o.useState(s.slice(0,15));o.useEffect(()=>{const e=(a-1)*15,m=e+15;d(s.slice(e,m))},[a]);const l=e=>{c.Inertia.get(route("dashboard.type-handicap.edit",{id:e}))},p=e=>{c.Inertia.get(route("dashboard.type-handicap.show",e))};return t(h,{children:r("div",{className:"panel",children:[t("div",{className:"flex justify-between",children:t("h3",{className:"text-xl font-bold",children:"Les types d'handicap"})}),t(f,{columns:[{accessor:"type_handicap",title:"Type d'handicap"},{accessor:"",title:"Actions",render:e=>r("div",{className:"flex space-x-2",children:[t("button",{className:"btn btn-primary",onClick:()=>l(e.id),children:t(u,{})}),t("button",{className:"btn btn-danger",onClick:()=>p(e.id),children:t(E,{})})]})}],records:i,totalRecords:s.length,recordsPerPage:15,page:a,onPageChange:e=>n(e)})]})})}export{C as default};
