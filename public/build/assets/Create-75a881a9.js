import{u as n,j as e,a as t}from"./main-7817f3b1.js";import{D as d}from"./DefaultLayout-c44391f7.js";import{F as m}from"./index.esm-fffe3f01.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";function v(){const{data:r,post:i,setData:l,processing:p,errors:s}=n({type_partner:""});return e(d,{children:t("div",{children:[e("div",{className:"flex items-center justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Type de bpartenaire"})}),e("div",{className:"datatables",children:e("div",{className:" flex justify-between flex-nowrap dark:text-white gap-4",children:e("div",{className:"md:w-3/5 sm:w-full",children:t("div",{className:"panel",children:[e("h2",{className:"text-lg mb-3 font-bold",children:"Créer un type "}),e("form",{onSubmit:a=>{console.log(r),a.preventDefault(),i(route("dashboard.liste-partenaire-type.store"),{})},children:t("div",{className:"grid gap-3",children:[t("div",{className:"my-2",children:[t("label",{htmlFor:"type_partner",className:"text-base",children:["Type de partenaire ",e("span",{className:"text-danger",children:"*"})]}),e("input",{type:"text",value:r.type_partner,onChange:a=>l("type_partner",a.target.value),className:"form-input",placeholder:"Type de partenaire"}),s.type_partner&&e("div",{className:"text-danger",children:s.type_partner})]}),t("button",{type:"submit",className:"btn bg-lime-500 text-white border-lime-500",children:[e(m,{className:"mr-4 rtl:order-2"}),e("span",{children:"Sauvegarder"})]})]})})]})})})})]})})}export{v as default};