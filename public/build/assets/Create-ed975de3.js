import{u as n,j as e,a}from"./main-7817f3b1.js";import{D as o}from"./DefaultLayout-c44391f7.js";import{F as m}from"./index.esm-fffe3f01.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";function w(){const{data:s,post:r,setData:l,processing:d,errors:i}=n({name_situation:""});return e(o,{children:a("div",{children:[e("div",{className:"flex items-center justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Situation sociale"})}),e("div",{className:"datatables grid grid-rows-3",children:e("div",{className:" flex justify-between flex-nowrap dark:text-white gap-4",children:e("div",{className:"md:w-3/5 sm:w-full",children:a("div",{className:"panel",children:[e("h2",{className:"text-lg mb-3 font-bold",children:"Créer une situation sociale"}),e("form",{onSubmit:t=>{t.preventDefault(),r(route("dashboard.situation-sociale.store"),{})},children:a("div",{className:"grid gap-3",children:[a("div",{className:"my-2",children:[a("label",{htmlFor:"name",className:"text-base",children:["Type de la situation sociale ",e("span",{className:"text-danger",children:"*"})]}),e("input",{type:"text",value:s.name_situation,onChange:t=>l("name_situation",t.target.value),className:"form-input border-dark ",placeholder:"Type situation sociale"}),i.name_situation&&e("div",{className:"text-danger",children:i.name_situation})]}),a("button",{type:"submit",className:"btn bg-lime-500 text-white border-lime-500",children:[e(m,{className:"mr-4 rtl:order-2"}),e("span",{children:"Sauvegarder"})]})]})})]})})})})]})})}export{w as default};