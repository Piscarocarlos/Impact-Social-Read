import{r as t,s as H,j as a,a as g}from"./main-7817f3b1.js";import{D as z}from"./DefaultLayout-c44391f7.js";import"./index-a42b5db0.js";import{u as K}from"./useDispatch-d01b19de.js";import"./App-6286d217.js";import"./useSelector-73b17a09.js";import"./slicedToArray-faa72b39.js";import"./index-4d501b15.js";import"./index.esm-fffe3f01.js";import"./index-d410f391.js";import"./floating-ui.dom.browser.min-71618afd.js";function ce({inscription:E,myInscription:_,scoringOpenField:T,fieldScoring:p,scoringCloseField:y,cities:Q,provinces:j,regions:B,filiere_bacs:W,ecoles:X,logements:Y,orphelinats:Z,situation__socials:$,information__pluses:s}){const[R,k]=t.useState(0),m=E.map((i,d)=>({...JSON.parse(i.dataForm),status:i.status,id:i.user_id,indepoint:d+1})),C=T.filter(i=>i.type==="tranche"),I=K();t.useEffect(()=>{I(H("Detail"))}),console.log("close",y);const N=()=>{const d=(()=>m.map(o=>{const e=B.find(n=>n.id==o.regionOfOrigin),f=j.find(n=>n.id==o.provinceOfOrigin);return{...o,regionOfOrigin:e.name_region,provinceOfOrigin:f.name_province}}))();console.log("ertyttg",d);const h=y.filter(o=>p.some(e=>e.id===o.field_id)).map(o=>{const e=p.find(n=>n.id===o.field_id);return{...JSON.parse(o.data),field_id:o.field_id,value:e.value,field_name:e.name,coef:e.coef}}),J=C.filter(o=>p.some(e=>e.id===o.field_id)).map(o=>{const e=p.find(n=>n.id===o.field_id);return{...JSON.parse(o.data),field_id:o.field_id,value:e.value,field_name:e.name,coef:e.coef}}),L=null,P=J.map(o=>d.map(e=>{if(e[o.value]&&+e[o.value]>=+o.min&&+e[o.value]<+o.max)return{...L,id:e.id,val:e[o.value],name:e.name,field_name:o.field_name,city:e.cityOfOrigin,region:e.regionOfOrigin,school:e.schoolName,province:e.provinceOfOrigin,point:+o.val,field:o.value,coef:o.coef}})),A=P.map(o=>o.filter(e=>e!==void 0)).filter(o=>o.length>0);console.log("ee",P),console.log("recup2",A),console.log("resultee",h),console.log("recup--",d);const l=null,D=h.map(o=>d.map(e=>{if(e[o.value]=="Famille d'accueil")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Avec les parents")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="EPS")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[3],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Internat")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[4],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Normale")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Orphelin")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Abandonné")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[3],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Parent divorcés")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[4],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="de pere")return{...l,id:e.id,val:"de pére",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="de mere")return{...l,id:e.id,val:"de mére",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="les deux")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[3],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Réseaux sociaux")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Caravane JADARA")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Boursiers JADARA")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[3],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Site d’orientation")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[4],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Affichage au Lycée")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[5],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="2020")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="2021")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="2022")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[3],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="2O23")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[4],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="25%")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="50%")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="75%")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[3],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="100%")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[4],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Masculin")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Féminin")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Mon pere")return{...l,id:e.id,val:"Mon pére",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Ma mere")return{...l,id:e.id,val:"Ma mére",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="yes")return{...l,id:e.id,val:"Oui",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="no")return{...l,id:e.id,val:"Non",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="trueF")return{...l,id:e.id,val:"Oui",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="falseF")return{...l,id:e.id,val:"Non",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="trueFB")return{...l,id:e.id,val:"Oui",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="falseFB")return{...l,id:e.id,val:"Non",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="trueM")return{...l,id:e.id,val:"Oui",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="falseM")return{...l,id:e.id,val:"Non",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="trueMB")return{...l,id:e.id,val:"Oui",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="falseMB")return{...l,id:e.id,val:"Non",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Oui")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Non")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="retraiteM")return{...l,id:e.id,val:"Retraite",name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="retraite")return{...l,id:e.id,val:"Retraite",name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Moteur")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Mental")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Psychique")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sensoriel")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences Agronomiques")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[1],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences Economiques")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[2],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Techniques de Gestion Et Comptabilité")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[3],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Science de Vie Et Terre")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[4],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Lettres")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[5],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences Humaines")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[6],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences Mathématiques A")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[7],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences Mathématiques B")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[8],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences de la Chariaa")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[9],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Langue Arabe")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[10],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Arts Appliqués")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[11],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences Physiques")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[12],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences et Technologies Electriques")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[13],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name};if(e[o.value]=="Sciences et Technologies Mécaniques")return{...l,id:e.id,val:e[o.value],name:e.name,point:o[14],field:o.value,coef:o.coef,school:e.schoolName,city:e.cityOfOrigin,region:e.regionOfOrigin,province:e.provinceOfOrigin,field_name:o.field_name}})).map(o=>o.filter(e=>e!==void 0));console.log("eeeeeeeeeeeeeeeeeeeeeeeeee",D);function b(o){const e={};o.forEach((r,c)=>{r.forEach(O=>{const{id:v,point:F,coef:q}=O;e[v]?e[v].push(O):e[v]=[O],e[v].totalPoints?e[v].totalPoints+=+F*(q/100):e[v].totalPoints=+F*(q/100)})});const f=Object.values(e);console.log("taberc(((((((((",f);const n=f.map((r,c)=>{const O=r[0].id;r[0].name;const v=r.totalPoints.toFixed(2);return r[0].city,r[0].province,r[0].region,r[0].school,{tableauFinal:f,totalPoints:v,id:O}});return console.log("ddddddddd",n),n.map((r,c)=>{r.id,r.totalPoints}).reduce((r,c)=>{const O=parseFloat(c);return isNaN(O)?r:r+O},0),f}const U=b(D),M=b(A);console.log("please",M);const V=M.map((o,e)=>o.map(f=>({...f,totalPoints:o.totalPoints}))),w=U.map((o,e)=>o.map(f=>({...f,totalPoints:o.totalPoints}))),G=V.flat().filter(o=>o.id===_.user_id),u=w.flat().filter(o=>o.id===_.user_id).concat(G),S=u.reduce((o,e)=>e.totalPoints<o?e.totalPoints:o,u[0].totalPoints),x=u.reduce((o,e)=>e.totalPoints>o?e.totalPoints:o,u[0].totalPoints);return console.log("TotalPoints le plus petit :",S),console.log("TotalPoints le plus grand :",x),t.useEffect(()=>{k(x+S)}),console.log("last",u),u};return console.log("goli aaaaaaaaaaaa",N()),a(z,{children:a("div",{children:a("div",{className:"panel",children:a("div",{className:"table-responsive mb-5",children:g("table",{children:[a("thead",{children:g("tr",{children:[a("th",{children:"#"}),a("th",{children:"Champ"}),a("th",{children:"Valeur"}),a("th",{children:"Point"}),a("th",{children:"Poids"})]})}),g("tbody",{children:[N().map((i,d)=>g("tr",{className:" border-dark-dark-light",children:[a("td",{children:d+1}),a("td",{children:i.field_name}),a("td",{children:i.val}),a("td",{children:i.point}),g("td",{children:[i.coef,"%"]})]},d)),g("tr",{className:"",children:[a("td",{}),a("td",{}),a("td",{}),g("td",{colSpan:2,className:"badge bg-success font-black  text-md self-center uppercase",children:[" ",g("span",{children:["Point Total : ",R]})," "]})]})]})]})})})})})}export{ce as default};
