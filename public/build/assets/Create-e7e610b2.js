import{c,u as o,j as e,a as t}from"./main-7817f3b1.js";import{D as d}from"./DefaultLayout-c44391f7.js";import{F as m}from"./index.esm-fffe3f01.js";import"./sweetalert2.all-b373c7ca.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./useDispatch-d01b19de.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";function j(){const{type_partenaires:s}=c().props,{data:l,post:n,setData:i,processing:p,errors:r}=o({name_categorie:"",type_partner:""});return e(d,{children:t("div",{children:[e("div",{className:"flex items-center justify-between mb-5",children:e("h5",{className:"font-semibold text-lg dark:text-white-light",children:"Catégorie"})}),e("div",{className:"datatables",children:e("div",{className:" flex justify-between flex-nowrap dark:text-white gap-4",children:e("div",{className:"md:w-3/5 sm:w-full",children:t("div",{className:"panel",children:[e("h2",{className:"text-lg mb-3 font-bold",children:"Créer une catégorie "}),e("form",{onSubmit:a=>{a.preventDefault(),n(route("dashboard.liste-categorie-partenaire.store"),{})},children:t("div",{className:"grid gap-3",children:[t("div",{className:"my-2",children:[t("label",{htmlFor:"type_partner",className:"text-base",children:["Type de partenaire ",e("span",{className:"text-danger",children:"*"})]}),t("select",{type:"text",value:l.type_partner,onChange:a=>i("type_partner",a.target.value),className:"form-select",placeholder:"",children:[e("option",{defaultValue:"selected",children:"Selectionner un type de partenaire"}),s.map(a=>e("option",{value:a.id,children:a.type_partner},a.id))]}),r.type_partner&&e("div",{className:"text-danger",children:r.type_partner})]}),t("div",{className:"my-2",children:[e("label",{htmlFor:"name",className:"text-base",children:"Nom de la catégorie"}),e("input",{type:"text",value:l.name_categorie,onChange:a=>i("name_categorie",a.target.value),className:"form-input",placeholder:"Nom de la catégorie"}),r.name_categorie&&e("div",{className:"text-danger",children:r.name_categorie})]}),t("button",{type:"submit",className:"btn bg-lime-500 text-white border-lime-500",children:[e(m,{className:"mr-4 rtl:order-2"}),e("span",{children:"Sauvegarder"})]})]})})]})})})})]})})}export{j as default};
