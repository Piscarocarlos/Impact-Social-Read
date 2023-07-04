import{r as a,s as X,a as s,j as t,L as Z,F as q,d as S}from"./main-7817f3b1.js";import{D as K,a as Q}from"./DefaultLayout-c44391f7.js";import{N as U}from"./index-a42b5db0.js";import{s as _}from"./sortBy-2ed23318.js";import{c as Y}from"./index.esm-35a63bc3.js";import{d as ee,f as D}from"./index.esm-fffe3f01.js";import{S as te}from"./sweetalert2.all-b373c7ca.js";import{u as ae}from"./useDispatch-d01b19de.js";import{t as u,S as h}from"./transition-35f1fbff.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index-d410f391.js";import"./floating-ui.dom.browser.min-71618afd.js";import"./keyboard-bc2fdc5c.js";function ve({familles:N,success:p}){const F=ae();a.useEffect(()=>{F(X("Column Chooser Table"))});const[f,b]=a.useState(1),w=[10,20,30,50,100],[o,I]=a.useState(w[0]),[c,y]=a.useState(_(N,"id")),[L,P]=a.useState(c),[i,E]=a.useState(""),[m,j]=a.useState({columnAccessor:"id",direction:"asc"}),[l,g]=a.useState(["created_at","engagement"]),T=(e,r)=>{l.includes(e)?g(n=>l.filter(v=>v!==n)):g([...l,e])},M=[{accessor:"id",title:"Id"},{accessor:"name_family",title:"Famille"},{accessor:"cible",title:"Cible"},{accessor:"type_convention",title:"Type convention"},{accessor:"engagement",title:"Engagement"},{accessor:"created_at",title:"Date"}];a.useEffect(()=>{b(1)},[o]),a.useEffect(()=>{const e=(f-1)*o,r=e+o;P([...c.slice(e,r)])},[f,o,c]),a.useEffect(()=>{y(()=>N.filter(e=>e.id.toString().includes(i.toLowerCase())||e.name_family.toLowerCase().includes(i.toLowerCase())||e.cible.toLowerCase().includes(i.toLowerCase())||e.engagement.toLowerCase().includes(i.toLowerCase())))},[i]),a.useEffect(()=>{const e=_(c,m.columnAccessor);y(m.direction==="desc"?e.reverse():e),b(1)},[m]);const[C,d]=a.useState(!1),[z,O]=a.useState(""),[k,x]=a.useState(!1),[R,A]=a.useState(""),H=(e="",r="success")=>{te.mixin({toast:!0,position:"top",showConfirmButton:!1,timer:3e3,customClass:{container:"toast"}}).fire({icon:r,title:e,padding:"10px 20px"})};a.useEffect(()=>{p&&H(p)},[p]);const V=e=>{d(!0),O(e)},B=e=>{S.Inertia.get(route("dashboard.famille-convention.edit",e))},$=e=>{x(!0),A(e)},G=e=>{S.Inertia.get(route("dashboard.famille-convention.show",e))},J=e=>JSON.parse(e).map(v=>v.value),W=e=>JSON.parse(e).value;return s(K,{children:[s("div",{className:"panel datatables",children:[t("div",{className:"flex justify-between mb-5",children:t("h3",{className:"text-lg",children:"Famille des conventions"})}),s("div",{className:"flex md:items-center md:flex-row flex-col mb-5 gap-5",children:[t(Z,{href:route("dashboard.famille-convention.create"),className:"btn btn-success",children:"Création"}),s("div",{className:"flex items-center gap-5 ltr:ml-auto rtl:mr-auto",children:[t("div",{className:"flex md:items-center md:flex-row flex-col gap-5",children:t("div",{className:"dropdown",children:t(Q,{btnClassName:"!flex items-center border font-semibold border-white-light dark:border-[#253b5c] rounded-md px-4 py-2 text-sm dark:bg-[#1b2e4b] dark:text-white-dark",button:s(q,{children:[t("span",{className:"ltr:mr-1 rtl:ml-1",children:"Colonnes"}),t("svg",{className:"w-5 h-5",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:t("path",{d:"M19 9L12 15L5 9",stroke:"currentColor",strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})]}),children:t("ul",{className:"!min-w-[140px]",children:M.map((e,r)=>t("li",{className:"flex flex-col",onClick:n=>{n.stopPropagation()},children:t("div",{className:"flex items-center px-4 py-1",children:s("label",{className:"cursor-pointer mb-0",children:[t("input",{type:"checkbox",checked:!l.includes(e.accessor),className:"form-checkbox",defaultValue:e.accessor,onChange:n=>{g(n.target.value),T(e.accessor,n.target.checked)}}),t("span",{className:"ltr:ml-2 rtl:mr-2",children:e.title})]})})},r))})})})}),t("div",{className:"text-right",children:t("input",{type:"text",className:"form-input",placeholder:"Recherche....",value:i,onChange:e=>E(e.target.value)})})]})]}),t(U,{className:"whitespace-nowrap table-hover",records:L,columns:[{accessor:"id",title:"Id",sortable:!0,hidden:l.includes("id")},{accessor:"name_family",title:"Famille",sortable:!0,hidden:l.includes("name_family"),render:e=>e.name_family},{accessor:"cible",title:"Cible",sortable:!0,hidden:l.includes("cible"),render:e=>J(e.cible).join(" , ")},{accessor:"engagement",title:"Engagement",sortable:!0,hidden:l.includes("engagement"),render:e=>W(e.engagement)},{accessor:"created_at",title:"Date création",sortable:!0,hidden:l.includes("created_at")},{accessor:"",title:"Action",sortable:!0,hidden:l.includes("Action"),render:e=>s("div",{className:"flex space-x-2",children:[t("button",{className:"btn btn-danger",onClick:()=>$(e.id),children:t(Y,{})}),t("button",{className:"btn btn-info",onClick:()=>V(e.id),children:t(ee,{})})]})}],highlightOnHover:!0,totalRecords:c.length,recordsPerPage:o,page:f,onPageChange:e=>b(e),recordsPerPageOptions:w,onRecordsPerPageChange:I,sortStatus:m,onSortStatusChange:j,minHeight:200,paginationText:({from:e,to:r,totalRecords:n})=>`Showing  ${e} to ${r} of ${n} entries`})]}),t("div",{children:t(u,{appear:!0,show:C,as:a.Fragment,children:s(h,{as:"div",open:C,onClose:()=>d(!1),children:[t(u.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:t("div",{className:"fixed inset-0"})}),t("div",{id:"slideIn_down_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:t("div",{className:"flex min-h-screen items-start justify-center px-4",children:s(h.Panel,{className:"panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[s("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[t("h5",{className:"text-lg font-bold",children:"Modification"}),t("button",{onClick:()=>d(!1),type:"button",className:"text-white-dark hover:text-dark",children:t(D,{})})]}),s("div",{className:"p-5",children:[t("p",{children:"Voulez-vous modifier cet élément ?"}),s("div",{className:"mt-8 flex items-center justify-end",children:[t("button",{onClick:()=>d(!1),type:"button",className:"btn btn-outline-danger",children:"Non"}),t("button",{onClick:()=>B(z),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Oui"})]})]})]})})})]})})}),t("div",{children:t(u,{appear:!0,show:k,as:a.Fragment,children:s(h,{as:"div",open:k,onClose:()=>d(!1),children:[t(u.Child,{as:a.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:t("div",{className:"fixed inset-0"})}),t("div",{id:"slideIn_down_modal",className:"fixed inset-0 z-[999] overflow-y-auto bg-[black]/60",children:t("div",{className:"flex min-h-screen items-start justify-center px-4",children:s(h.Panel,{className:"panel animate__animated animate__slideInDown my-8 w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark",children:[s("div",{className:"flex items-center justify-between bg-[#fbfbfb] px-5 py-3 dark:bg-[#121c2c]",children:[t("h5",{className:"text-lg font-bold",children:"Suppression"}),t("button",{onClick:()=>x(!1),type:"button",className:"text-white-dark hover:text-dark",children:t(D,{})})]}),s("div",{className:"p-5",children:[t("p",{children:"Voulez-vous supprimer cet élément ?"}),s("div",{className:"mt-8 flex items-center justify-end",children:[t("button",{onClick:()=>x(!1),type:"button",className:"btn btn-outline-danger",children:"Non"}),t("button",{onClick:()=>G(R),type:"button",className:"btn btn-primary ltr:ml-4 rtl:mr-4",children:"Oui"})]})]})]})})})]})})})]})}export{ve as default};