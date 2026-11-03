/* HVAC Academy — navigatie, visualisaties, voortgang, lessen, toetsen en simulaties. */
(function(){
"use strict";
var chapters=window.HVAC_DATA||[];
var groups=window.HVAC_GROUPS||[];
var glossary=window.HVAC_GLOSSARY||[];
var KEY="hvac-academy-v1";
var saved={completed:[],favorites:[],lastLesson:1,bestExam:0,theme:"light"};
try{var stored=JSON.parse(localStorage.getItem(KEY)||"null");if(stored&&typeof stored==="object")saved=Object.assign(saved,stored);}catch(e){}
if(!Array.isArray(saved.completed))saved.completed=[];
if(!Array.isArray(saved.favorites))saved.favorites=[];
var state={page:"dashboard",lesson:Math.min(Math.max(1,Number(saved.lastLesson)||1),chapters.length||1),tab:"begrijpen",group:"all",search:"",glossarySearch:"",lab:"ohm",labValues:{voltage:24,resistance:48,power:2,hours:4,velocity:2,area:0.05,heat:8,electric:2},lessonQuiz:null,exam:null};
var app=document.getElementById("app");
var sidebar=document.getElementById("sidebar");
var toastTimer=0;
function html(s){return String(s==null?"":s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];});}
function store(){try{localStorage.setItem(KEY,JSON.stringify(saved));}catch(e){}}
function format(x,n){return Number(x).toLocaleString("nl-BE",{maximumFractionDigits:n==null?1:n});}
function pageName(){return {dashboard:"Dashboard",leerpad:"Alle hoofdstukken",les:"Les volgen",simulator:"Interactief lab",examen:"Oefentoetsen",woordenboek:"Woordenboek",favorieten:"Mijn favorieten"}[state.page]||"Dashboard";}
function groupInfo(g){return groups.find(function(x){return x.id===g;})||groups[0];}
function chapter(id){return chapters.find(function(x){return x.id===Number(id);})||chapters[0];}
function pct(){return chapters.length?Math.round(100*saved.completed.length/chapters.length):0;}
function firstUnfinished(){return chapters.find(function(x){return saved.completed.indexOf(x.id)<0;})||chapter(saved.lastLesson);}
function toast(message){var el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(function(){el.classList.remove("show");},3200);}
function closeSidebar(){sidebar.classList.remove("open");document.getElementById("mobileOverlay").classList.remove("open");document.getElementById("menuToggle").setAttribute("aria-expanded","false");}
function applyTheme(){document.body.classList.toggle("dark",saved.theme==="dark");document.getElementById("themeToggle").textContent=saved.theme==="dark"?"☀":"☾";}
function makeHash(page,id){return page==="les"?"#les/"+id:"#"+page;}
function navigate(page,id,opts){
 state.page=page; if(page==="les"){state.lesson=Number(id)||state.lesson;saved.lastLesson=state.lesson;store();state.tab="begrijpen";state.lessonQuiz=null;}
 closeSidebar();
 var hash=makeHash(page,state.lesson);if(location.hash!==hash){location.hash=hash;}else{render();}
 if(!(opts&&opts.noScroll))window.scrollTo({top:0,behavior:"auto"});
}
function decodeHash(){
 var route=(location.hash||"#dashboard").replace(/^#/,"").split("/");
 var p=route[0];if(["dashboard","leerpad","les","simulator","examen","woordenboek","favorieten"].indexOf(p)<0)p="dashboard";
 state.page=p;if(p==="les"){var id=Number(route[1]);if(id>=1&&id<=chapters.length)state.lesson=id;}
 render();
}
function iconGraphic(kind){
 var icons={basis:"⚡",hvac:"❄",regeling:"◈",praktijk:"🛠",expert:"🎓"};
 return icons[kind]||"●";
}
function renderNav(){
 document.querySelectorAll(".main-nav [data-page]").forEach(function(button){button.classList.toggle("active",button.getAttribute("data-page")===(state.page==="les"?"leerpad":state.page));});
 var nav=document.getElementById("domainNav");
 nav.innerHTML=groups.map(function(g){return '<button class="domain-item '+(state.page==="leerpad"&&state.group===g.id?"active":"")+'" data-action="filter" data-group="'+g.id+'"><span class="domain-dot" style="--dot:'+g.color+'"></span>'+html(g.name)+'<span class="domain-count">'+chapters.filter(function(c){return c.group===g.id;}).length+'</span></button>';}).join("");
 document.getElementById("breadcrumbLabel").textContent=pageName();
 document.getElementById("sidebarContinue").textContent="Verder leren ↗";
}
function statCard(sym,value,label,color,soft){return '<div class="stat-card"><div class="stat-icon" style="--soft:'+soft+';--color:'+color+'">'+sym+'</div><div><strong class="stat-value">'+value+'</strong><span class="stat-caption">'+html(label)+'</span></div></div>';}
function moduleCard(c){
 var g=groupInfo(c.group),done=saved.completed.indexOf(c.id)>=0;
 return '<article class="module-card"><div class="module-top"><div class="module-icon" style="--soft:'+g.color+'1c;--color:'+g.color+'">'+html(c.icon)+'</div><span class="module-number">MODULE '+String(c.id).padStart(2,"0")+'</span></div>'+(done?'<span class="module-badge">✓ Afgerond</span>':'')+'<h3>'+html(c.title)+'</h3><p>'+html(c.summary)+'</p><div class="module-foot"><span>◷ '+c.minutes+' MIN · '+c.topics.length+' TOPICS</span><button class="module-open" data-action="open-lesson" data-id="'+c.id+'">'+(done?"Herbekijk":"Start leren")+' →</button></div></article>';
}
function routeCard(){
 var c=firstUnfinished();
 return '<div class="route-card"><div><span class="eyebrow">JOUW PERSOONLIJK LEERPAD</span><h3>'+(pct()===100?"Alle hoofdstukken afgewerkt!":"Verder waar je gebleven was")+'</h3><p>'+html(c.title)+' · '+html(c.summary)+'</p></div><button class="btn btn-primary" data-action="open-lesson" data-id="'+c.id+'">Verder leren <span aria-hidden="true">→</span></button><div class="route-progress"><div class="progress-track"><div class="progress-fill" style="width:'+pct()+'%"></div></div><span class="progress-label">'+pct()+'% afgerond</span></div></div>';
}
function heroGraphic(){
 return '<svg viewBox="0 0 515 332" role="img" aria-label="Technische tekening met koelkring, elektromotor, ventilator en energiestromen"><defs><linearGradient id="g1" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#1f5074"/><stop offset="1" stop-color="#0a243e"/></linearGradient><linearGradient id="g2" x1="0" x2="1"><stop stop-color="#38c7dc"/><stop offset="1" stop-color="#5387ff"/></linearGradient></defs><g transform="translate(25,25)"><rect x="29" y="22" width="408" height="268" rx="19" fill="url(#g1)" stroke="#5480ab" stroke-width="1.5"/><rect x="29" y="22" width="408" height="40" rx="17" fill="#26486d"/><circle cx="53" cy="43" r="4" fill="#5af0d5"/><circle cx="69" cy="43" r="4" fill="#6d9bc6"/><circle cx="85" cy="43" r="4" fill="#6d9bc6"/><text x="215" y="46" fill="#b6d5ea" text-anchor="middle" font-size="10" font-weight="700" letter-spacing="2">HVAC SYSTEM SCHEMATIC</text><rect x="49" y="81" width="160" height="187" rx="11" fill="#132c4b" stroke="#355b81"/><rect x="223" y="81" width="195" height="187" rx="11" fill="#122944" stroke="#355b81"/><text x="66" y="102" font-size="10" fill="#99c8e5">ELEKTRISCH CIRCUIT</text><path d="M79 140h33m31 0h32v78H79v-78" fill="none" stroke="#50b9ef" stroke-width="3" stroke-linejoin="round"/><path d="M111 130v20m7-26v32m7-20v8" stroke="#9fedff" stroke-width="3"/><rect x="166" y="159" width="18" height="40" rx="5" fill="#214c6b" stroke="#6ae6d5"/><path d="M174 165v29" stroke="#6ae6d5" stroke-width="2" stroke-dasharray="3 3"/><circle cx="127" cy="218" r="19" fill="#1b4364" stroke="#51d9db" stroke-width="2"/><path d="M115 222l7-9 7 9 7-9" stroke="#a0f6f0" fill="none" stroke-width="2"/><text x="127" y="249" fill="#82bed9" font-size="10" text-anchor="middle">230 V · AC</text><path d="M250 153h143M321 114v126" stroke="#4b7395" stroke-width="2" stroke-dasharray="4 6"/><rect x="250" y="119" width="62" height="60" rx="11" fill="#1b4665" stroke="#48c9e5"/><circle cx="281" cy="149" r="16" fill="none" stroke="#76dce7" stroke-width="2"/><path d="M281 137v24m-12-12h24" stroke="#76dce7" stroke-width="2"/><rect x="333" y="119" width="62" height="60" rx="11" fill="#4e2d38" stroke="#ff9877"/><path d="M346 146h36m-30-14v30m11-30v30m11-30v30" stroke="#ffc2a9" stroke-width="2"/><rect x="256" y="210" width="138" height="33" rx="8" fill="#274561" stroke="#567c9b"/><path d="M268 228h27l6-12 10 22 10-10h54" stroke="#64e9d9" stroke-width="2.5" fill="none"/><circle cx="275" cy="271" r="18" fill="#16607a" stroke="#6de2e6"/><path d="M275 258v26m-13-13h26" stroke="#b8ffff" stroke-width="2"/><text x="310" y="274" font-size="12" font-weight="700" fill="#c6e8f5">COP 4.2</text></g><circle class="pulse-light" cx="481" cy="74" r="9" fill="#52e8dc"/><circle cx="481" cy="74" r="17" fill="none" stroke="#52e8dc" opacity=".4"/></svg>';
}
function dashboard(){
 return '<section class="hero"><div class="hero-content"><span class="hero-label">HVAC LEERPLATFORM · 2026</span><h1>Van eerste volt<br>tot <em>HVAC-expert.</em></h1><p>Een professionele, interactieve opleiding met technische tekeningen, begrijpelijke uitleg, oefentoetsen en simulators. Leer van nul tot volwaardig technisch inzicht.</p><div class="hero-actions"><button class="btn btn-primary" data-action="open-lesson" data-id="'+firstUnfinished().id+'">Start je opleiding →</button><button class="btn btn-light" data-action="goto" data-page="simulator">Ontdek de simulators ↗</button></div></div><div class="hero-visual">'+heroGraphic()+'</div></section>'+
 '<div class="stats-grid">'+statCard("◫",chapters.length,"Uitgebreide hoofdstukken","#3b75f5","#eaf2ff")+statCard("✓",saved.completed.length,"Hoofdstukken voltooid","#13a889","#e7fbf3")+statCard("✎",chapters.reduce(function(n,c){return n+c.questions.length;},0),"Kennistoetsvragen","#9765df","#f3edff")+statCard("◈","4","Interactieve simulators","#db8d31","#fff3df")+'</div>'+
 '<section class="section-block">'+routeCard()+'</section>'+
 '<section class="section-block"><div class="section-heading"><div><span class="eyebrow">BEGIN HIER</span><h2>Ontdek je leertraject</h2><p>De eerste fundamenten voor iedere HVAC-technieker.</p></div><button class="section-link" data-action="goto" data-page="leerpad">Alle 22 modules bekijken →</button></div><div class="module-grid">'+chapters.slice(0,6).map(moduleCard).join("")+'</div></section>'+
 '<section class="section-block"><div class="section-heading"><div><span class="eyebrow">LEREN DOOR TE DOEN</span><h2>Techniek wordt helder in beeld</h2><p>Volg het circuit, verander een waarde en zie het resultaat.</p></div><button class="section-link" data-action="goto" data-page="simulator">Open het lab →</button></div><div class="white-card feature-card" style="display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);gap:0"><div style="padding:24px 28px;align-self:center"><span class="pill">INTERACTIEF</span><h3 style="margin:17px 0 10px;font-size:23px">Zie hoe elektriciteit werkt.</h3><p style="font-size:13px">Leer spanning, weerstand en stroom begrijpen met een veilige virtuele schakeling. Daarna oefen je met vermogen, luchtdebiet en warmtepompen.</p><button class="btn btn-primary" data-action="goto" data-page="simulator">Experimenteer nu →</button></div><div style="background:#0d2035;min-height:240px;display:grid;place-items:center;overflow:hidden">'+diagram("circuit")+'</div></div></section>';
}
function listPage(){
 var filtered=chapters.filter(function(c){
 var terms=(c.title+" "+c.summary+" "+c.topics.join(" ")).toLowerCase();
 return (state.group==="all"||c.group===state.group)&&(!state.search||terms.indexOf(state.search.toLowerCase())>=0);
 });
 return '<span class="eyebrow">DE VOLLEDIGE OPLEIDING</span><h1 class="page-title">22 modules. Eén complete basis.</h1><p class="page-subtitle">Van elementaire elektriciteit tot industriële koelsystemen en automatisering. Volg ze op volgorde of kies zelf een onderwerp.</p>'+
 '<div class="search-bar-large"><span aria-hidden="true">⌕</span><input id="catalogSearch" type="search" placeholder="Zoek bv. motorbeveiliging, COP, Modbus..." value="'+html(state.search)+'" aria-label="Zoeken in het curriculum"></div>'+
 '<div class="category-chips"><button class="chip '+(state.group==="all"?"active":"")+'" data-action="filter" data-group="all">Alle vakgebieden</button>'+groups.map(function(g){return '<button class="chip '+(state.group===g.id?"active":"")+'" data-action="filter" data-group="'+g.id+'">'+html(g.name)+'</button>';}).join("")+'</div>'+
 '<div class="search-result-note">'+filtered.length+' van '+chapters.length+' modules beschikbaar</div>'+
 (filtered.length?'<div class="module-grid">'+filtered.map(moduleCard).join("")+'</div>':'<div class="empty-state"><div class="empty-icon">⌕</div><h3>Geen modules gevonden</h3><p>Probeer een ander onderwerp of verwijder het filter.</p><button class="btn btn-ghost" data-action="clear-search">Wis de filters</button></div>');
}
function svgBase(inside,title){
 return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 300" role="img" aria-label="'+html(title)+'"><defs><pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#24455e" stroke-width=".6" opacity=".55"/></pattern><marker id="arrb" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10Z" fill="#5dd1e7"/></marker><marker id="arrr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5 0 10Z" fill="#ff977d"/></marker></defs><rect width="720" height="300" fill="#0b2036"/><rect width="720" height="300" fill="url(#grid)"/>'+inside+'</svg>';
}
function txt(x,y,t,size,color,anchor){return '<text x="'+x+'" y="'+y+'" text-anchor="'+(anchor||"middle")+'" fill="'+(color||"#c4d9ea")+'" font-family="DM Sans,system-ui" font-weight="700" font-size="'+(size||13)+'">'+html(t)+'</text>';}
function box(x,y,w,h,label,sub,stroke,fill){
 return '<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="14" fill="'+(fill||"#193853")+'" stroke="'+(stroke||"#477495")+'" stroke-width="2"/>'+txt(x+w/2,y+h/2-3,label,15,"#f1f7ff")+txt(x+w/2,y+h/2+20,sub,10,"#88aeca");
}
function line(path,color,animated){return '<path d="'+path+'" fill="none" stroke="'+color+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" '+(animated?'class="flow-dash"':'')+'/>';}
function diagram(type,v){
 v=v||{};
 var inside="";
 if(type==="circuit"){
 var volt=v.voltage!=null?format(v.voltage,0)+" V":"230 V";
 inside='<g>'+line("M190 92H500V218H190V92","#6dbfe7",false)+line("M220 92H480","#68ead9",true)+
 '<rect x="326" y="80" width="69" height="25" rx="6" fill="#2c5772" stroke="#8be2ee"/><path d="M335 91l9-6 10 12 10-12 10 12 10-6" stroke="#e6faff" fill="none" stroke-width="2.4"/>'+
 '<path d="M190 125h-30m0 0v61m0 0h30" stroke="#c0e9f6" stroke-width="3"/><path d="M145 143h30m-24 11h18" stroke="#73dcff" stroke-width="4"/>'+
 '<circle cx="500" cy="155" r="25" fill="#21435b" stroke="#65dfd9" stroke-width="2"/>'+txt(500,161,"M",20,"#b8fff5")+
 '<circle cx="250" cy="218" r="26" fill="#183a53" stroke="#81c4f5" stroke-width="2"/>'+txt(250,224,"A",18,"#d6f4ff")+
 txt(360,65,"OHMSE BELASTING",11,"#8aafc5")+txt(360,136,"R = "+(v.resistance||"46")+" Ω",14,"#9cf2ee")+txt(140,209,volt,14,"#beeaff")+txt(500,197,"Motor",12,"#9bbdd3")+txt(360,255,"Gesloten stroomkring",13,"#a5bcd0")+'</g>';
 }else if(type==="refrigeration"||type==="heatpump"){
 inside=line("M174 104H544V218H174V104","#f69b80",false)+line("M174 218H544","#64c7f0",true)+
 box(105,91,136,73,"COMPRESSOR","druk ↑","#faac91","#563340")+
 box(482,91,146,73,"CONDENSOR","warmte afgeven","#fa9b83","#56343b")+
 box(482,198,146,73,"EXPANSIE","druk ↓","#72c5e7","#1b415a")+
 box(105,198,136,73,"VERDAMPER","warmte opnemen","#72c5e7","#1a425c")+
 '<path d="M240 127H482M555 165V197M482 235H240M173 198V165" fill="none" stroke="#8caec6" stroke-width="3" stroke-dasharray="6 8"/>'+
 txt(354,86,"HOGE DRUK · WARM",12,"#ffae99")+txt(354,254,"LAGE DRUK · KOUD",12,"#8fdfff")+
 '<circle cx="355" cy="165" r="48" fill="#1d4059" stroke="#4f809b"/>'+txt(355,159,type==="heatpump"?"WARMTE":"KOELKRING",14,"#d6eefc")+txt(355,178,"← energie →",12,"#88bccf");
 }else if(type==="airflow"){
 inside='<rect x="95" y="98" width="530" height="115" rx="19" fill="#123652" stroke="#497796" stroke-width="2"/>'+
 '<circle cx="216" cy="156" r="53" fill="#1c415e" stroke="#61cced" stroke-width="3"/>'+
 '<circle cx="216" cy="156" r="13" fill="#8ce6ed"/>'+
 '<g fill="#52b8db" opacity=".85"><path d="M216 144Q155 100 192 101Q237 100 229 151Z"/><path d="M227 156Q284 112 279 151Q284 192 228 168Z"/><path d="M215 169Q249 227 206 210Q169 200 204 161Z"/></g>'+
 line("M316 135H573M316 178H573","#53daf0",true)+
 txt(216,238,"VENTILATOR",12,"#95c6dc")+txt(468,87,"LUCHTKANAAL",12,"#a4c6dc")+txt(462,245,"Debiet Qv",14,"#82e5e1")+
 '<path d="M105 81h112M217 81l-8-7m8 7-8 7" fill="none" stroke="#72cde4" stroke-width="2"/>';
 }else if(type==="hydraulic"){
 inside=line("M157 108H555V230H157V108","#65cbe7",false)+line("M185 108H526","#77e3e0",true)+
 '<circle cx="178" cy="170" r="38" fill="#1f4460" stroke="#8fe0f1" stroke-width="3"/><path d="M162 188v-36l34 18Z" fill="#73e1e5"/>'+
 '<rect x="458" y="78" width="111" height="66" rx="8" fill="#653d45" stroke="#ffa78a" stroke-width="2"/>'+
 Array.from({length:5},function(_,i){return '<path d="M'+(473+i*21)+' 88v46" stroke="#ffb99b" stroke-width="5"/>';}).join("")+
 '<rect x="305" y="205" width="90" height="46" rx="10" fill="#21445e" stroke="#5a95bd"/>'+txt(350,232,"KLEP",14,"#d5edfb")+
 txt(178,228,"POMP",12,"#9dcee1")+txt(515,165,"RADIATOR",13,"#f8bba7")+txt(355,81,"AANVOER",12,"#a9e9e7")+txt(355,280,"RETOUR",12,"#81c8e0");
 }else if(type==="control"){
 inside=box(75,107,145,83,"SENSOR","meetwaarde","#6abfdf","#1b415c")+box(290,107,144,83,"REGELAAR","setpoint","#af96ec","#3c355c")+box(503,107,145,83,"ACTUATOR","stuursignaal","#66d5b9","#1b4b49")+
 line("M222 148H288","#63cbef",true)+line("M435 148H501","#63cbef",true)+
 line("M575 207V247H147V207","#77b7db",false)+
 txt(360,238,"TERUGKOPPELING (FEEDBACK)",10,"#a6c7df")+txt(148,86,"METEN",12,"#8dd4ec")+txt(362,86,"VERGELIJKEN",12,"#cab3ff")+txt(577,86,"STUREN",12,"#8deed2");
 }else if(type==="motor"){
 inside=box(69,99,145,85,"VOEDING","230 / 400 V","#7dc9e3","#24435c")+box(284,99,143,85,"CONTACTOR","stuurspoel","#b095ed","#3b365d")+box(503,99,143,85,"MOTOR","compressor","#76d9c8","#1c4c48")+
 line("M215 140H282","#74d7f1",true)+line("M428 140H501","#74d7f1",true)+
 '<circle cx="575" cy="240" r="24" fill="#163e53" stroke="#81e2d5"/><path d="M575 216v48m-24-24h48" stroke="#7af5df" stroke-width="2"/>'+
 txt(356,230,"STUURKRING + VERMOGENSKRING",11,"#aec8da");
 }else if(type==="math"){
 inside='<path d="M125 236H617M125 236V65" stroke="#7193ad" stroke-width="2"/>'+
 '<rect x="202" y="151" width="68" height="85" rx="7" fill="#3778bc"/><rect x="320" y="110" width="68" height="126" rx="7" fill="#48a6d7"/><rect x="438" y="77" width="68" height="159" rx="7" fill="#4fc8be"/>'+
 txt(236,259,"1 h",12)+txt(354,259,"2 h",12)+txt(472,259,"3 h",12)+txt(350,61,"E = P × t",26,"#9cefe4")+txt(354,288,"VERMOGEN × TIJD = ENERGIE",11,"#8dbad1");
 }else if(type==="heat"){
 inside=box(78,109,157,89,"WARM","hogere T","#ffaf8e","#65373d")+box(475,109,157,89,"KOUD","lagere T","#7bd3f4","#1b4865")+
 line("M245 154H468","#ffaa7c",true)+
 '<circle cx="358" cy="152" r="41" fill="#26465b" stroke="#daaf80"/>'+txt(358,157,"Q",26,"#fff3d1")+txt(359,246,"WARMTESTROOM",13,"#e1b897");
 }else if(type==="diagnostics"){
 inside=box(45,107,143,77,"SYMPTOOM","observeren","#64b5dd","#22445f")+box(218,107,142,77,"METING","verifiëren","#7ccee5","#204a5d")+box(390,107,141,77,"OORZAAK","analyseren","#b8a5ec","#42395a")+box(562,107,118,77,"TEST","bevestigen","#70dabb","#204e48")+
 line("M190 146H215M362 146H388M533 146H559","#82cbe8",true)+txt(360,238,"GEEN GOKWERK · WEL CONTROLEERBARE METINGEN",11,"#a5c9df");
 }else if(type==="safety"){
 inside='<path d="M359 66l95 37v75q-4 65-95 95-91-30-95-95v-75Z" fill="#173d4b" stroke="#75dace" stroke-width="4"/>'+
 '<path d="M359 103v85" stroke="#ffe0a4" stroke-width="14" stroke-linecap="round"/><circle cx="359" cy="212" r="8" fill="#ffe0a4"/>'+
 txt(180,150,"RISICO",17,"#f6c79e")+txt(537,150,"BEVEILIGEN",17,"#a7ebdc")+txt(360,48,"VEILIG WERKEN",15,"#d9f0f9");
 }else{
 inside=box(80,112,158,76,"METEN","controle","#7dc9e3","#24435c")+box(291,112,144,76,"BEGRIJPEN","analyseren","#b095ed","#3b365d")+box(497,112,146,76,"HANDELEN","veilig","#76d9c8","#1c4c48")+
 line("M240 150H289M437 150H495","#73d4e5",true)+txt(360,245,"STAP VOOR STAP LEREN",13,"#a4c7da");
 }
 return svgBase(inside,"Technische schematische illustratie: "+type);
}
function renderLesson(){
 var c=chapter(state.lesson);if(!c)return '<div class="empty-state">Geen les gevonden.</div>';
 var g=groupInfo(c.group),fav=saved.favorites.indexOf(c.id)>=0,done=saved.completed.indexOf(c.id)>=0;
 var tab=state.tab,content="";
 if(tab==="begrijpen"){
 content='<span class="eyebrow">STAP 01 · DE THEORIE</span><h2>'+html(c.heading)+'</h2><p>'+html(c.body)+'</p><h3>Dit moet je onthouden</h3><ul class="lesson-list">'+c.points.map(function(p){return '<li>'+html(p)+'</li>';}).join("")+'</ul><div class="info-note">💡 <strong>Tip:</strong> Gebruik het schema hierboven als geheugensteun. Begrijp eerst de stroom- of energierichting, daarna de details.</div><button class="btn btn-primary" data-action="lesson-tab" data-tab="formule">Volgende: formule & begrip →</button>';
 }else if(tab==="formule"){
 content='<span class="eyebrow">STAP 02 · REKENEN EN BEGRIJPEN</span><h2>De belangrijkste relatie</h2><p>Een goede technieker leert niet alleen termen uit het hoofd. Begrijp hoe onderdelen en meetwaarden met elkaar samenhangen.</p><div class="formula-box">'+html(c.formula)+'<small>Vakterminologie en toepassingsgebied vind je ook in de theorie en het woordenboek.</small></div><h3>Voorbeeld uit de praktijk</h3><p>'+html(c.example)+'</p><div class="info-note warn">Let op: formules zijn modellen. Controleer de aannames, eenheden en fabrikantgegevens voordat je ze in de praktijk toepast.</div><button class="btn btn-primary" data-action="lesson-tab" data-tab="praktijk">Volgende: de praktijk →</button>';
 }else if(tab==="praktijk"){
 content='<span class="eyebrow">STAP 03 · KOPPELING MET DE PRAKTIJK</span><h2>Zo herken je dit op de werkvloer</h2><p>'+html(c.example)+'</p><div class="info-note warn">⚠ <strong>Veelgemaakte fout:</strong> '+html(c.mistake)+'</div><h3>Alle onderwerpen van dit hoofdstuk</h3><div class="topics-list">'+c.topics.map(function(t,i){return '<div class="topic-pill"><b>'+String(i+1).padStart(2,"0")+'</b> '+html(t)+'</div>';}).join("")+'</div><p>Oefen met de technische tekening en herhaal de begrippen tot je ze zonder spiekbrief kunt uitleggen.</p><button class="btn btn-primary" data-action="lesson-tab" data-tab="toets">Doe de kennistoets →</button>';
 }else{content=lessonQuizView(c,done);}
 var prev=c.id>1?'<button class="btn btn-ghost" data-action="open-lesson" data-id="'+(c.id-1)+'">← Vorige module</button>':'<span></span>';
 var next=c.id<chapters.length?'<button class="btn btn-ghost" data-action="open-lesson" data-id="'+(c.id+1)+'">Volgende module →</button>':'<span></span>';
 return '<section class="lesson-header"><div><span class="eyebrow">'+html(g.name.toUpperCase())+' / MODULE '+String(c.id).padStart(2,"0")+'</span><h1>'+html(c.title)+'</h1><p>'+html(c.summary)+'</p></div><div class="lesson-actions"><button class="round-action '+(fav?"active":"")+'" data-action="favorite" data-id="'+c.id+'">'+(fav?"★ Bewaard":"☆ Bewaar les")+'</button><button class="round-action" data-action="goto" data-page="leerpad">← Overzicht</button></div></section>'+
 '<div class="lesson-layout"><div class="lesson-main"><div class="lesson-visual-wrap"><div class="lesson-visual-head"><small>VISUELE TECHNIEKTRAINING</small><strong>'+html(c.heading)+'</strong></div>'+diagram(c.diagram)+'<div class="diagram-subtitle">Vereenvoudigde didactische tekening • niet geschikt als installatieschema</div></div>'+
 '<div class="lesson-tabs" role="tablist" aria-label="Onderdelen van deze les">'+[["begrijpen","01. Begrijpen"],["formule","02. Toepassen"],["praktijk","03. Praktijk"],["toets","04. Kennistoets"]].map(function(a){return '<button class="lesson-tab '+(tab===a[0]?"active":"")+'" role="tab" aria-selected="'+(tab===a[0])+'" data-action="lesson-tab" data-tab="'+a[0]+'">'+a[1]+'</button>';}).join("")+'</div>'+
 '<article class="white-card lesson-text">'+content+'</article>'+
 '<div class="lesson-footer-nav">'+prev+'<span class="chapter-counter">MODULE '+c.id+' VAN '+chapters.length+'</span>'+next+'</div></div>'+
 '<aside class="lesson-coach"><div class="coach-widget accent"><div class="coach-avatar">👨‍🔧</div><span class="eyebrow">JOUW INSTRUCTEUR</span><h3>Waarom leer je dit?</h3><p>'+html(c.summary)+' De kennis helpt je installaties te begrijpen én fouten systematisch te onderzoeken.</p></div><div class="coach-widget"><span class="eyebrow">STUDIESTATUS</span><h3>'+(done?"✓ Hoofdstuk afgerond":"Nog te leren")+'</h3><p>Lees de theorie, bekijk het praktijkvoorbeeld en beantwoord beide vragen juist om het hoofdstuk af te ronden.</p><div class="mini-separator"></div><span class="pill">'+c.minutes+' min · '+c.topics.length+' begrippen</span></div><div class="coach-widget"><span class="eyebrow">LET HIEROP</span><h3>Veilig & zorgvuldig</h3><p>'+html(c.mistake)+'</p></div></aside></div>';
}
function shuffledOrder(n){
 var a=Array.from({length:n},function(_,i){return i;});
 for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var temp=a[i];a[i]=a[j];a[j]=temp;}
 return a;
}
function initLessonQuiz(c){
 if(!state.lessonQuiz||state.lessonQuiz.id!==c.id){state.lessonQuiz={id:c.id,index:0,score:0,answered:false,selected:null,order:shuffledOrder(4),finished:false};}
}
function answerMarkup(q,quiz,mode){
 return '<div class="answer-grid">'+quiz.order.map(function(idx,i){
 var correct=quiz.answered&&idx===q.correct,wrong=quiz.answered&&idx===quiz.selected&&idx!==q.correct;
 return '<button class="answer '+(correct?"correct":wrong?"wrong":"")+'" '+(quiz.answered?"disabled":"")+' data-action="'+(mode==="exam"?"exam-answer":"lesson-answer")+'" data-answer="'+idx+'"><span class="letter">'+String.fromCharCode(65+i)+'</span><span>'+html(q.options[idx])+'</span></button>';
 }).join("")+'</div>';
}
function lessonQuizView(c,done){
 initLessonQuiz(c);var z=state.lessonQuiz;
 if(z.finished){
 return '<div class="quiz-summary"><span class="eyebrow">LESRESULTAAT</span><strong>'+z.score+' / '+c.questions.length+'</strong><h2>'+(z.score===c.questions.length?"Uitstekend! Module voltooid.":"Herhaal deze module nog eens.")+'</h2><p>'+(z.score===c.questions.length?"Je beheerst de kernvragen van dit hoofdstuk. Je voortgang is op dit toestel opgeslagen.":"Om de module af te ronden moet je beide oefenvragen juist beantwoorden.")+'</p><button class="btn btn-primary" data-action="retry-lesson">Opnieuw oefenen ↻</button> '+(c.id<chapters.length?'<button class="btn btn-ghost" data-action="open-lesson" data-id="'+(c.id+1)+'">Volgende module →</button>':'')+'</div>';
 }
 var q=c.questions[z.index];if(!q)return "";
 return '<div class="quiz-card"><span class="quiz-eyebrow">KENNISCONTROLE · VRAAG '+(z.index+1)+' VAN '+c.questions.length+'</span><div class="quiz-progress"><span style="width:'+((z.index)/c.questions.length*100)+'%"></span></div><h3>'+html(q.q)+'</h3>'+answerMarkup(q,z,"lesson")+
 (z.answered?'<div role="status" class="quiz-feedback '+(z.selected===q.correct?"good":"bad")+'"><strong>'+(z.selected===q.correct?"✓ Goed antwoord!":"✕ Nog niet juist.")+'</strong><div>'+html(q.why)+'</div></div><button class="btn btn-primary" data-action="lesson-next">'+(z.index===c.questions.length-1?"Bekijk resultaat →":"Volgende vraag →")+'</button>':'<p style="font-size:12px;margin-top:14px">Kies één antwoord. Je krijgt meteen uitleg.</p>')+'</div>';
}
function finishLesson(){
 var z=state.lessonQuiz,c=chapter(z.id);z.finished=true;
 if(z.score===c.questions.length&&saved.completed.indexOf(c.id)<0){saved.completed.push(c.id);saved.completed.sort(function(a,b){return a-b;});store();toast("Goed gedaan! Module "+c.id+" is voltooid.");}
}
function examIntro(){
 var total=chapters.reduce(function(n,c){return n+c.questions.length;},0);
 return '<span class="eyebrow">EXAMEN & OEFENINGEN</span><h1 class="page-title">Test wat je écht weet.</h1><p class="page-subtitle">Een gemengde oefentoets uit alle HVAC-domeinen. Krijg na elke vraag uitleg, en zie wat je nog moet herhalen.</p><div class="exam-layout" style="margin-top:25px"><div class="white-card exam-intro"><span class="pill">EXAMENMODUS</span><h2 style="margin:14px 0">HVAC Kennischeck</h2><p>10 willekeurige vragen uit '+total+' beschikbare vragen. Leer van elke fout en oefen zo vaak je wilt.</p><div class="exam-points"><div class="exam-point"><span>◈</span> Elektriciteit en motoren</div><div class="exam-point"><span>❄</span> Koeltechniek, verwarming en airco</div><div class="exam-point"><span>⌘</span> Regeltechniek, automatisering en diagnose</div><div class="exam-point"><span>🛡</span> Veiligheid en vakkennis</div></div><button class="btn btn-primary" data-action="start-exam">Start willekeurige toets →</button></div><aside class="white-card exam-side"><span class="eyebrow">JOUW PRESTATIES</span><strong>'+saved.bestExam+'%</strong><p>Beste toetsresultaat op dit toestel</p><div class="mini-separator"></div><h3>Studietip</h3><p>Probeer na de toets de fout beantwoorde onderwerpen in hun eigen hoofdstuk te herhalen.</p><button class="btn btn-ghost" data-action="goto" data-page="leerpad">Bekijk modules →</button></aside></div>';
}
function startExam(){
 var all=[];chapters.forEach(function(c){c.questions.forEach(function(q){all.push({chapter:c,question:q});});});
 for(var i=all.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var temp=all[i];all[i]=all[j];all[j]=temp;}
 state.exam={items:all.slice(0,10),index:0,score:0,selected:null,answered:false,order:shuffledOrder(4),review:[]};
 render();
}
function examView(){
 if(!state.exam)return examIntro();var z=state.exam;
 if(z.index>=z.items.length){
 var percent=Math.round(100*z.score/z.items.length);
 if(percent>saved.bestExam){saved.bestExam=percent;store();}
 return '<span class="eyebrow">EINDRESULTAAT</span><div class="white-card exam-results"><div style="font-size:45px">🏆</div><h2>Toets afgerond!</h2><div class="score-big">'+percent+'%</div><p>'+z.score+' van de '+z.items.length+' vragen juist. '+(percent>=80?"Sterke prestatie!":"Herhaal de onderstaande leerpunten en probeer opnieuw.")+'</p><button class="btn btn-primary" data-action="start-exam">Nieuwe toets ↻</button> <button class="btn btn-ghost" data-action="reset-exam">Terug naar overzicht</button></div>'+
 (z.review.length?'<section class="section-block"><div class="section-heading"><div><span class="eyebrow">HERHAAL JE FOUTEN</span><h2>Dit kun je nog oefenen</h2></div></div>'+z.review.map(function(a){return '<div class="exam-result-line"><strong>'+html(a.chapter.title)+'</strong><p style="margin:4px 0">'+html(a.question.q)+'</p><span style="color:var(--green);font-weight:800">'+html(a.question.options[a.question.correct])+'</span><div style="margin-top:7px"><button class="section-link" data-action="open-lesson" data-id="'+a.chapter.id+'">Open deze les →</button></div></div>';}).join("")+'</section>':'');
 }
 var item=z.items[z.index],q=item.question;
 return '<span class="eyebrow">GEMENGDE KENNISTOETS</span><h1 class="page-title">Vraag '+(z.index+1)+' van '+z.items.length+'</h1><p class="page-subtitle">Onderwerp: '+html(item.chapter.title)+'</p><div class="white-card" style="max-width:840px;padding:27px;margin-top:22px"><div class="quiz-progress"><span style="width:'+(100*z.index/z.items.length)+'%"></span></div><h2 style="font-size:21px;margin:17px 0 20px">'+html(q.q)+'</h2>'+answerMarkup(q,z,"exam")+
 (z.answered?'<div role="status" class="quiz-feedback '+(z.selected===q.correct?"good":"bad")+'"><strong>'+(z.selected===q.correct?"✓ Correct!":"✕ Niet juist.")+'</strong><div>'+html(q.why)+'</div></div><button class="btn btn-primary" data-action="exam-next">'+(z.index===z.items.length-1?"Bekijk je resultaat →":"Volgende vraag →")+'</button>':'<p style="font-size:12px;margin-top:14px">Je krijgt na je keuze de uitleg.</p>')+'</div>';
}
var labDefs=[
{id:"ohm",label:"⚡ Wet van Ohm",description:"Onderzoek hoe spanning en weerstand de stroom bepalen."},
{id:"energie",label:"◉ Vermogen & energie",description:"Zie hoeveel elektrische energie je over een tijd verbruikt."},
{id:"lucht",label:"🌀 Luchtdebiet",description:"Bereken luchtdebiet op basis van kanaaloppervlakte en luchtsnelheid."},
{id:"warmtepomp",label:"❄ Warmtepomp & COP",description:"Bekijk het verband tussen warmteafgifte en elektrische input."}
];
function labInputs(){
 var v=state.labValues,mode=state.lab;
 var fields={
 ohm:[["voltage","Spanning","V",12,240,1],["resistance","Weerstand","Ω",10,220,1]],
 energie:[["power","Elektrisch vermogen","kW",0.5,6,0.5],["hours","Bedrijfstijd","uur",1,12,1]],
 lucht:[["velocity","Luchtsnelheid","m/s",0.5,8,0.5],["area","Kanaaldoorsnede","m²",0.01,0.5,0.01]],
 warmtepomp:[["heat","Geleverde warmte","kW",2,15,0.5],["electric","Elektrisch vermogen","kW",0.5,6,0.5]]
 }[mode];
 return fields.map(function(f){return '<div class="control-group"><div class="control-head"><label for="range-'+f[0]+'">'+f[1]+'</label><output id="val-'+f[0]+'">'+format(v[f[0]],2)+' '+f[2]+'</output></div><input id="range-'+f[0]+'" type="range" data-lab="'+f[0]+'" min="'+f[3]+'" max="'+f[4]+'" step="'+f[5]+'" value="'+v[f[0]]+'"></div>';}).join("");
}
function labResult(){
 var v=state.labValues,mode=state.lab;
 if(mode==="ohm"){var current=v.voltage/v.resistance;return {diagram:"circuit",values:{voltage:v.voltage,resistance:v.resistance},a:format(current,2)+" A",al:"Stroomsterkte",b:format(v.voltage*current,1)+" W",bl:"Ohms vermogen",note:"Didactisch ohms model. Bij echte motoren geldt daarnaast een complexer wisselstroommodel; werk nooit onder spanning op basis van deze simulatie."};}
 if(mode==="energie"){return {diagram:"math",values:{},a:format(v.power*v.hours,2)+" kWh",al:"Verbruikte energie",b:format(v.power*1000,0)+" W",bl:"Momentaan vermogen",note:"Deze berekening gaat uit van constant elektrisch vermogen. Werkelijk verbruik varieert vaak tijdens gebruik."};}
 if(mode==="lucht"){return {diagram:"airflow",values:{},a:format(v.velocity*v.area*3600,1)+" m³/h",al:"Volumetrisch debiet",b:format(v.velocity*v.area*1000,1)+" L/s",bl:"Volumetrisch debiet",note:"Eenvoudig model met gemiddelde luchtsnelheid in de doorsnede. Meetposities en snelheidsprofielen beïnvloeden echte debietmetingen."};}
 return {diagram:"heatpump",values:{},a:format(v.heat/v.electric,2),al:"Momentane COP",b:format(v.heat-v.electric,1)+" kW",bl:"Benaderde bronwarmte",note:"Rekenkundige energiebalans in verwarmingsmodus. Dit garandeert geen fysisch haalbare installatie of praktijk-COP bij gekozen bedrijfscondities."};
}
function labView(){
 var def=labDefs.find(function(a){return a.id===state.lab;})||labDefs[0],r=labResult();
 return '<span class="eyebrow">INTERACTIEF TECHNIEKLAB</span><h1 class="page-title">Begrijp wat je ziet.</h1><p class="page-subtitle">Verander de waarden en zie onmiddellijk het effect. Gebruik deze veilige digitale oefeningen om technische verbanden te begrijpen.</p>'+
 '<div class="lab-tabs">'+labDefs.map(function(d){return '<button class="lab-tab '+(state.lab===d.id?"active":"")+'" data-action="lab-mode" data-mode="'+d.id+'">'+d.label+'</button>';}).join("")+'</div>'+
 '<div class="lab-layout"><div class="lab-drawing" id="labDrawing">'+diagram(r.diagram,r.values)+'</div><div class="lab-controls"><span class="eyebrow">LIVE SIMULATOR</span><h2>'+html(def.label)+'</h2><p>'+html(def.description)+'</p>'+labInputs()+'<div class="readout-grid"><div class="readout"><strong id="labA">'+r.a+'</strong><span id="labAL">'+r.al+'</span></div><div class="readout"><strong id="labB">'+r.b+'</strong><span id="labBL">'+r.bl+'</span></div></div><div class="lab-warning" id="labNote">⚠ '+html(r.note)+'</div><button class="btn btn-ghost" data-action="lab-reset">↻ Beginwaarden herstellen</button></div></div><p class="lab-note">De schema’s zijn vereenvoudigde educatieve illustraties. Geen echt werkplan, installatieschema, vergunning of veiligheidsgarantie.</p>';
}
function updateLab(){
 var r=labResult();
 document.getElementById("labDrawing").innerHTML=diagram(r.diagram,r.values);
 document.getElementById("labA").textContent=r.a;document.getElementById("labB").textContent=r.b;
 document.getElementById("labAL").textContent=r.al;document.getElementById("labBL").textContent=r.bl;document.getElementById("labNote").textContent="⚠ "+r.note;
}
function glossaryItems(){
 var q=state.glossarySearch.trim().toLowerCase(),items=glossary.filter(function(x){return x.term.toLowerCase().includes(q)||x.definition.toLowerCase().includes(q);});
 return items.length?'<div class="glossary-grid">'+items.map(function(t){return '<article class="term-card"><strong>'+html(t.term)+'</strong><p>'+html(t.definition)+'</p></article>';}).join("")+'</div>':'<div class="empty-state"><h3>Geen termen gevonden</h3><p>Probeer een korter of ander zoekwoord.</p></div>';
}
function glossaryView(){return '<span class="eyebrow">TECHNISCH WOORDENBOEK</span><h1 class="page-title">Vaktaal, duidelijk uitgelegd.</h1><p class="page-subtitle">Zoek een term en ontdek wat ze betekent in elektriciteit, koeltechniek of verwarming.</p><div class="search-bar-large"><span>⌕</span><input id="glossaryInput" type="search" placeholder="Zoek: COP, relais, dauwpunt..." value="'+html(state.glossarySearch)+'" aria-label="Zoeken in het woordenboek"></div><p class="search-result-note">'+glossary.length+' veelgebruikte technische begrippen</p><div id="glossaryItems">'+glossaryItems()+'</div>';}
function favoritesView(){
 var items=chapters.filter(function(c){return saved.favorites.indexOf(c.id)>=0;});
 return '<span class="eyebrow">PERSOONLIJKE BIBLIOTHEEK</span><h1 class="page-title">Mijn bewaarde lessen.</h1><p class="page-subtitle">Bewaar hoofdstukken met het sterretje op de lespagina om ze snel terug te vinden.</p><div class="section-block">'+(items.length?'<div class="module-grid">'+items.map(moduleCard).join("")+'</div>':'<div class="empty-state"><div class="empty-icon">☆</div><h3>Nog geen lessen bewaard</h3><p>Open een hoofdstuk en klik op “Bewaar les”.</p><button class="btn btn-primary" data-action="goto" data-page="leerpad">Ontdek de hoofdstukken →</button></div>')+'</div>';
}
function render(){
 if(!chapters.length){app.innerHTML='<div class="empty-state"><h2>Het lesmateriaal kon niet geladen worden.</h2><p>Controleer curriculum.js.</p></div>';return;}
 applyTheme();renderNav();
 app.innerHTML=state.page==="dashboard"?dashboard():state.page==="leerpad"?listPage():state.page==="les"?renderLesson():state.page==="simulator"?labView():state.page==="examen"?examView():state.page==="woordenboek"?glossaryView():favoritesView();
 document.title=(state.page==="les"?chapter(state.lesson).title+" — ":"")+pageName()+" | HVAC Academy";
}
function handleAction(e){
 var btn=e.target.closest("button[data-action]");if(!btn)return;
 var action=btn.dataset.action;
 if(action==="goto"){navigate(btn.dataset.page);return;}
 if(action==="open-lesson"){navigate("les",btn.dataset.id);return;}
 if(action==="filter"){state.group=btn.dataset.group;navigate("leerpad");return;}
 if(action==="clear-search"){state.search="";state.group="all";document.getElementById("globalSearch").value="";render();return;}
 if(action==="favorite"){var id=Number(btn.dataset.id),idx=saved.favorites.indexOf(id);if(idx>=0)saved.favorites.splice(idx,1);else saved.favorites.push(id);store();render();toast(idx>=0?"Uit favorieten verwijderd.":"Les bewaard bij favorieten.");return;}
 if(action==="lesson-tab"){state.tab=btn.dataset.tab;render();return;}
 if(action==="lesson-answer"){
  var qz=state.lessonQuiz;if(!qz||qz.answered)return;var c=chapter(qz.id),q=c.questions[qz.index];qz.selected=Number(btn.dataset.answer);qz.answered=true;if(qz.selected===q.correct)qz.score++;render();return;
 }
 if(action==="lesson-next"){
  var z=state.lessonQuiz;z.index++;z.answered=false;z.selected=null;z.order=shuffledOrder(4);if(z.index>=chapter(z.id).questions.length)finishLesson();render();return;
 }
 if(action==="retry-lesson"){state.lessonQuiz=null;state.tab="toets";render();return;}
 if(action==="lab-mode"){state.lab=btn.dataset.mode;render();return;}
 if(action==="lab-reset"){state.labValues={voltage:24,resistance:48,power:2,hours:4,velocity:2,area:0.05,heat:8,electric:2};render();toast("Beginwaarden hersteld.");return;}
 if(action==="start-exam"){startExam();return;}
 if(action==="reset-exam"){state.exam=null;render();return;}
 if(action==="exam-answer"){
  var ex=state.exam;if(!ex||ex.answered)return;ex.selected=Number(btn.dataset.answer);ex.answered=true;var item=ex.items[ex.index];if(ex.selected===item.question.correct)ex.score++;else ex.review.push(item);render();return;
 }
 if(action==="exam-next"){var exam=state.exam;exam.index++;exam.selected=null;exam.answered=false;exam.order=shuffledOrder(4);render();return;}
}
document.addEventListener("click",handleAction);
document.getElementById("mainNav").addEventListener("click",function(e){var b=e.target.closest("[data-page]");if(b){state.group="all";navigate(b.dataset.page);}});
document.getElementById("brandHome").addEventListener("click",function(e){e.preventDefault();navigate("dashboard");});
document.getElementById("sidebarContinue").addEventListener("click",function(){navigate("les",firstUnfinished().id);});
document.getElementById("themeToggle").addEventListener("click",function(){saved.theme=saved.theme==="dark"?"light":"dark";store();applyTheme();});
document.getElementById("menuToggle").addEventListener("click",function(){var opened=sidebar.classList.toggle("open");document.getElementById("mobileOverlay").classList.toggle("open",opened);this.setAttribute("aria-expanded",String(opened));});
document.getElementById("mobileOverlay").addEventListener("click",closeSidebar);
document.getElementById("resetBtn").addEventListener("click",function(){document.getElementById("confirmDialog").showModal();});
document.getElementById("confirmDialog").addEventListener("close",function(){
 if(this.returnValue!=="confirm")return;
 var theme=saved.theme;saved={completed:[],favorites:[],lastLesson:1,bestExam:0,theme:theme};store();state.exam=null;state.lessonQuiz=null;navigate("dashboard");toast("Je lokale studievoortgang is gewist.");
});
document.getElementById("globalSearch").addEventListener("input",function(){
 state.search=this.value.trim();state.group="all";if(state.page!=="leerpad")navigate("leerpad",null,{noScroll:true});else render();
});
document.addEventListener("input",function(e){
 if(e.target.id==="catalogSearch"){state.search=e.target.value.trim();document.getElementById("globalSearch").value=e.target.value;var focusStart=e.target.selectionStart;render();var el=document.getElementById("catalogSearch");if(el){el.focus();try{el.setSelectionRange(focusStart,focusStart);}catch(err){}}}
 if(e.target.id==="glossaryInput"){state.glossarySearch=e.target.value;document.getElementById("glossaryItems").innerHTML=glossaryItems();}
 if(e.target.dataset.lab){state.labValues[e.target.dataset.lab]=Number(e.target.value);var unit={voltage:"V",resistance:"Ω",power:"kW",hours:"uur",velocity:"m/s",area:"m²",heat:"kW",electric:"kW"}[e.target.dataset.lab];document.getElementById("val-"+e.target.dataset.lab).textContent=format(e.target.value,2)+" "+unit;updateLab();}
});
document.addEventListener("keydown",function(e){
 if(e.key==="Escape")closeSidebar();
 if(e.key==="/"&&!/input|textarea/i.test(document.activeElement.tagName)){e.preventDefault();document.getElementById("globalSearch").focus();}
});
window.addEventListener("hashchange",decodeHash);
decodeHash();
})();