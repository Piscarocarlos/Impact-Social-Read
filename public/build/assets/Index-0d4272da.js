import{r as a,s as W,a as s,j as t,L as X,F as Z,d as S}from"./main-7817f3b1.js";import{D as q,a as J}from"./DefaultLayout-c44391f7.js";import{N as K}from"./index-a42b5db0.js";import{s as _}from"./sortBy-2ed23318.js";import{c as Q}from"./index.esm-35a63bc3.js";import{d as Y,f as L}from"./index.esm-fffe3f01.js";import{S as ee}from"./sweetalert2.all-b373c7ca.js";import{u as te}from"./useDispatch-d01b19de.js";import{t as h,S as p}from"./transition-35f1fbff.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";import"./floating-ui.dom.browser.min-71618afd.js";import"./keyboard-bc2fdc5c.js";function xe({operator:v,success:f}){const I=te();a.useEffect(()=>{I(W("Column Chooser Table"))});const[b,g]=a.useState(1),N=[10,20,30,50,100],[c,P]=a.useState(N[0]),[d,C]=a.useState(_(v,"id")),[D,E]=a.useState(d),[i,F]=a.useState(""),[u,j]=a.useState({columnAccessor:"id",direction:"asc"}),[r,x]=a.useState(["created_at","adresse","ville","rib","ice"]),T=(e,o)=>{r.includes(e)?x(l=>r.filter(U=>U!==l)):x([...r,e])},R=[{accessor:"id",title:"Id"},{accessor:"name_operator",title:"Nom"},{accessor:"type_operator",title:"Opérateur"},{accessor:"phone",title:"Téléphone"},{accessor:"email",title:"Email"},{accessor:"adresse",title:"Adresse"},{accessor:"ville",title:"Ville"},{accessor:"rib",title:"Rib"},{accessor:"ice",title:"Ice"},{accessor:"created_at",title:"Date"}];a.useEffect(()=>{g(1)},[c]),a.useEffect(()=>{const e=(b-1)*c,o=e+c;E([...d.slice(e,o)])},[b,c,d]),a.useEffect(()=>{C(()=>v.filter(e=>e.id.toString().includes(i.toLowerCase())||e.name_operator.toLowerCase().includes(i.toLowerCase())||e.type_operator.toLowerCase().includes(i.toLowerCase())||e.phone.toLowerCase().includes(i.toLowerCase())||e.email.toLowerCase().includes(i.toLowerCase())||e.adresss.toLowerCase().includes(i.toLowerCase())||e.rib.toLowerCase().includes(i.toLowerCase())||e.ice.toLowerCase().includes(i.toLowerCase())))},[i]),a.useEffect(()=>{const e=_(d,u.columnAccessor);C(u.direction==="desc"?e.reverse():e),g(1)},[u]);const A=(e="",o="success")=>{ee.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,customClass:{container:"toast"}}).fire({icon:o,title:e,padding:"10px 20px"})};a.useEffect(()=>{f&&A(f)},[f]);const[y,m]=a.useState(!1),[M,z]=a.useState(""),[k,w]=a.useState(!1),[O,V]=a.useState(""),B=e=>{m(!0),z(e)},H=e=>{S.Inertia.get(route("dashboard.operateur-service.edit",e))},$=e=>{w(!0),V(e)},G=e=>{S.Inertia.get(route("dashboard.operateur-service.show",e))};function n(e){return e.replace(/\w+/g,function(o){return o.charAt(0).toUpperCase()+o.slice(1).toLowerCase()}).replace(/\s/g,"")}return s(q,{children:[s("div",{className:"panel datatables",children:[t("div",{className:"flex justify-between mb-5",children:t("h3",{className:"text-lg",children:"Liste des opérateurs de services"})}),s("div",{className:"flex md:items-center md:flex-row flex-col mb-5 gap-5",children:[t(X,{href:route("dashboard.operateur-service.create"),className:"btn btn-success",children:"Création"}),s("div",{className:"flex items-center gap-5 ltr:ml-auto rtl:mr-auto",children:[t("div",{className:"flex md:items-center md:flex-row flex-col gap-5",children:t("div",{className:"dropdown",children:t(J,{btnClassName:"!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark",button:s(Z,{children:[t("span",{className:"ltr:mr-1 rtl:ml-1",children:"Colonnes"}),t("svg",{className:"w-5 h-5",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:t("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),children:t("ul",{className:"!min-w-[140px]",children:R.map((e,o)=>t("li",{className:"flex flex-col",onClick:l=>{l.stopPropagation()},children:t("div",{className:"flex items-center px-4 py-1",children:s("label",{className:"cursor-pointer mb-0",children:[t("input",{type:"checkbox",checked:!r.includes(e.accessor),className:"form-checkbox",defaultValue:e.accessor,onChange:l=>{x(l.target.value),T(e.accessor,l.target.checked)}}),t("span",{className:"ltr:ml-2 rtl:mr-2",children:e.title})]})})},o))})})})}),t("div",{className:"text-right",children:t("input",{type:"text",className:"form-input",placeholder:"Recherche....",value:i,onChange:e=>F(e.target.value)})})]})]}),t(K,{className:"whitespace-nowrap table-hover",records:D,columns:[{accessor:"id",title:"Id",sortable:!0,hidden:r.includes("id")},{accessor:"name_operator",title:"Nom opérateur",sortable:!0,hidden:r.includes("name_operator"),render:e=>n(e.name_operator)},{accessor:"type_operator",title:"Opérateur",sortable:!0,hidden:r.includes("type_operator"),render:e=>n(e.type_operator)},{accessor:"phone",title:"Téléphone",sortable:!0,hidden:r.includes("phone"),render:e=>e.phone},{accessor:"email",title:"Email",sortable:!0,hidden:r.includes("email"),render:e=>n(e.email)},{accessor:"adresse",title:"Adresse",sortable:!0,hidden:r.includes("adresse"),render:e=>e.adresse},{accessor:"ville",title:"Ville",sortable:!0,hidden:r.includes("ville"),render:e=>n(e.ville)},{accessor:"rib",title:"RIB",sortable:!0,hidden:r.includes("rib"),render:e=>n(e.rib)},{accessor:"ice",title:"ICE",sortable:!0,hidden:r.includes("ice"),render:e=>n(e.ice)},{accessor:"created_at",title:"Date création",sortable:!0,hidden:r.includes("created_at")},{accessor:"",title:"Action",sortable:!0,hidden:r.includes("type_operator"),render:e=>s("div",{className:"flex space-x-2",children:[t("button",{className:"btn btn-danger",onClick:()=>$(e.id),children:t(Q,{})}),t("button",{className:"btn btn-info",onClick:()=>B(e.id),children:t(Y,{})})]})}],highlightOnHover:!0,totalRecords:d.length,recordsPerPage:c,page:b,onPageChange:e=>g(e),recordsPerPageOptions:N,onRecordsPerPageChange:P,sortStatus:u,onSortStatusChange:j,minHeight:200,paginationText:({from:e,to:o,totalRecords:l})=>`Showing  ${e} to ${o} of ${l} entries`})]}),t("div",{children:t(h,{appear:!0,show:y,as:a.Fragment,children:s(p,{as:"div",open:y,onClose:()=>m(!1),children:[t(h.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:t("div",{className:"fixed inset-0"})}),t("div",{id:"slideIn_down_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:t("div",{className:"flex min-h-screen items-start justify-center px-4",children:s(p.Panel,{className:"panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[s("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[t("h5",{className:"text-lg font-bold",children:"Modification"}),t("button",{onClick:()=>m(!1),type:"button",className:"text-white-dark hover:text-dark",children:t(L,{})})]}),s("div",{className:"p-5",children:[t("p",{children:"Voulez-vous modifier cet élément ?"}),s("div",{className:"mt-8 flex items-center justify-end",children:[t("button",{onClick:()=>m(!1),type:"button",className:"btn btn-outline-danger",children:"Non"}),t("button",{onClick:()=>H(M),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Oui"})]})]})]})})})]})})}),t("div",{children:t(h,{appear:!0,show:k,as:a.Fragment,children:s(p,{as:"div",open:k,onClose:()=>m(!1),children:[t(h.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:t("div",{className:"fixed inset-0"})}),t("div",{id:"slideIn_down_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:t("div",{className:"flex min-h-screen items-start justify-center px-4",children:s(p.Panel,{className:"panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[s("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[t("h5",{className:"text-lg font-bold",children:"Suppression"}),t("button",{onClick:()=>w(!1),type:"button",className:"text-white-dark hover:text-dark",children:t(L,{})})]}),s("div",{className:"p-5",children:[t("p",{children:"Voulez-vous supprimer cet élément ?"}),s("div",{className:"mt-8 flex items-center justify-end",children:[t("button",{onClick:()=>w(!1),type:"button",className:"btn btn-outline-danger",children:"Non"}),t("button",{onClick:()=>G(O),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Oui"})]})]})]})})})]})})})]})}export{xe as default};
