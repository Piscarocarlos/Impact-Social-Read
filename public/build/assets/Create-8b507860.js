import{u as n,j as e,a}from"./main-7817f3b1.js";import{D as d}from"./DefaultLayout-c44391f7.js";import{F as m}from"./index.esm-fffe3f01.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";function v(){const{data:s,post:i,setData:l,processing:o,errors:r}=n({name_type:""});return e(d,{children:a("div",{children:[e("div",{className:"flex items-center justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Type d'orphelin"})}),e("div",{className:"datatables grid grid-rows-3",children:e("div",{className:" flex justify-between flex-nowrap dark:text-white gap-4",children:e("div",{className:"md:w-3/5 sm:w-full",children:a("div",{className:"panel",children:[e("h2",{className:"text-lg mb-3 font-bold",children:"Créer un cas d'orphelin"}),e("form",{onSubmit:t=>{t.preventDefault(),i(route("dashboard.type-orphelin.store"),{})},children:a("div",{className:"grid gap-3",children:[a("div",{className:"my-2",children:[a("label",{htmlFor:"name",className:"text-base",children:["Type d'orphelin ",e("span",{className:"text-danger",children:"*"})]}),e("input",{type:"text",value:s.name_type,onChange:t=>l("name_type",t.target.value),className:"form-input border-dark ",placeholder:"Type d'orphelin"}),r.name_type&&e("div",{className:"text-danger",children:r.name_type})]}),a("button",{type:"submit",className:"btn bg-lime-500 text-white border-lime-500",children:[e(m,{className:"mr-4 rtl:order-2"}),e("span",{children:"Sauvegarder"})]})]})})]})})})})]})})}export{v as default};