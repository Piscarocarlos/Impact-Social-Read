import{c,u as d,j as e,a}from"./main-7817f3b1.js";import{D as m}from"./DefaultLayout-c44391f7.js";import{F as o}from"./index.esm-fffe3f01.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";function _(){const{beneficiaires:i}=c().props,{data:s,put:l,setData:n,processing:p,errors:r}=d({type_beneficiary:i.type_beneficiary,id:i.id});return e(m,{children:a("div",{children:[e("div",{className:"flex items-center justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Type de bénéficiare"})}),e("div",{className:"datatables",children:e("div",{className:" flex justify-between flex-nowrap dark:text-white gap-4",children:e("div",{className:"md:w-3/5 sm:w-full",children:a("div",{className:"panel",children:[e("h2",{className:"text-lg mb-3 font-bold",children:"Modification "}),e("form",{onSubmit:t=>{t.preventDefault(),l(route("dashboard.type-beneficiaire.update",i.id),{})},children:a("div",{className:"grid gap-3",children:[a("div",{className:"my-2",children:[a("label",{htmlFor:"name",className:"text-base",children:["Nom du type de bénéficiare ",e("span",{className:"text-danger",children:"*"})]}),e("input",{type:"text",value:s.type_beneficiary,onChange:t=>n("type_beneficiary",t.target.value),className:"form-input",placeholder:"Type de bénéficiaire"}),r.type_beneficiary&&e("div",{className:"text-danger",children:r.type_beneficiary})]}),a("button",{type:"submit",className:"btn bg-lime-500 text-white border-lime-500",children:[e(o,{className:"mr-4 rtl:order-2"}),e("span",{children:"Sauvegarder"})]})]})})]})})})})]})})}export{_ as default};