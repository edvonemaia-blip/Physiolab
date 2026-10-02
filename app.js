const mods=[
["neuro","🧠","Neurofisiologia","Membrana • potencial de ação • sinapses"],
["muscle","💪","Fisiologia muscular","Contração • junção neuromuscular"],
["cardio","🫀","Cardiovascular","Ciclo cardíaco • pressão • débito"],
["resp","🫁","Respiratória","Ventilação • volumes • trocas gasosas"],
["renal","💧","Renal","Néfron • filtração • ácido-base"],
["endo","🧪","Endócrina","Hormônios • feedback • eixos"]
];
let s={view:"welcome",blockedNa:false,blockedK:false,stim:false};
const app=document.querySelector("#app"), store=JSON.parse(localStorage.getItem("physiolab2")||'{"xp":0,"streak":1}');
const nav=()=>`<div class="bottom"><nav><button onclick="go('home')">Início</button><button onclick="go('lab')">Laboratório</button><button onclick="go('progress')">Progresso</button></nav></div>`;
const shell=(x,n=true)=>`<div class="shell">${x}</div>${n?nav():""}`;
function go(v){s.view=v;render();scrollTo(0,0)}
function welcome(){return shell(`<section class="hero"><div class="tag">Laboratório de Fisiologia Médica</div><h1>Physio<br>Lab</h1><p>Entenda mecanismos, teste hipóteses e aprenda Fisiologia ao longo do semestre.</p><div class="card"><strong>Aprenda mexendo no sistema.</strong><p>Observe o normal, altere uma variável e tente prever o resultado.</p></div><button class="primary" onclick="go('home')">Entrar no laboratório</button></section>`,false)}
function home(){return shell(`<div class="top"><div><div class="tag">Bom estudo 👋</div><h2>O que vamos entender hoje?</h2></div><span class="pill">${store.xp} XP</span></div><div class="card"><strong>🔥 Sequência: ${store.streak} dia</strong><p>Primeiro laboratório disponível: potencial de ação.</p><div class="meter"><span style="width:${Math.min(100,store.xp)}%"></span></div></div>${mods.map(m=>`<div class="card module" onclick="${m[0]=="neuro"?"go('neuro')":"soon()"}"><div class="ico">${m[1]}</div><div><strong>${m[2]}</strong><small>${m[3]}</small></div></div>`).join("")}`)}
function soon(){alert("Este módulo será liberado conforme avançarmos nas aulas.")}
function neuro(){return shell(`<div class="top"><button class="back" onclick="go('home')">‹</button><span class="pill">Neurofisiologia</span></div><div class="tag">Trilha 01</div><h2>Excitabilidade celular</h2><div class="card"><strong>1. Potencial de membrana</strong><p>Gradientes iônicos, permeabilidade e bomba Na⁺/K⁺.</p></div><div class="card"><strong>2. Potencial de ação</strong><p>Despolarização, repolarização e hiperpolarização.</p><button class="primary" onclick="go('lab')">Abrir simulador</button></div><div class="card"><strong>3. Sinapse química</strong><p>Ca²⁺, vesículas, neurotransmissores e receptores.</p></div>`)}
function lab(){
 let normal=!s.blockedNa&&!s.blockedK, v=s.stim?(s.blockedNa?-65:(s.blockedK?25:30)):-70;
 let msg=!s.stim?"Aplique um estímulo para observar a resposta.":s.blockedNa?"Sem entrada adequada de Na⁺, a fase rápida de despolarização fica comprometida.":s.blockedK?"A despolarização ocorre, mas a repolarização fica comprometida sem a saída adequada de K⁺.":"O estímulo atingiu o limiar: ocorre despolarização seguida de repolarização.";
 return shell(`<div class="top"><button class="back" onclick="go('neuro')">‹</button><span class="pill">Simulador</span></div><div class="tag">Laboratório interativo</div><h2>Potencial de ação</h2><p>Altere os canais e tente prever o que acontecerá antes de estimular a membrana.</p><div class="simbox"><div class="note">Potencial aproximado da membrana</div><div class="voltage">${v} mV</div><div class="track"><div class="trace ${s.stim&&!s.blockedNa?"spike":""}"></div></div><div class="controls"><button class="${s.blockedNa?'on':''}" onclick="toggleNa()">Bloquear Na⁺</button><button class="${s.blockedK?'on':''}" onclick="toggleK()">Bloquear K⁺</button></div><button class="primary" onclick="stimulate()">⚡ Aplicar estímulo</button></div><div class="card"><strong>O que aconteceu?</strong><p>${msg}</p></div><button class="secondary" onclick="resetLab()">↻ Restaurar condições normais</button>`)}
function toggleNa(){s.blockedNa=!s.blockedNa;s.stim=false;render()} function toggleK(){s.blockedK=!s.blockedK;s.stim=false;render()}
function stimulate(){s.stim=true;if(!s.blockedNa){store.xp=Math.min(999,store.xp+5);localStorage.setItem("physiolab2",JSON.stringify(store))}render()}
function resetLab(){s.blockedNa=false;s.blockedK=false;s.stim=false;render()}
function progress(){return shell(`<div class="tag">Meu PhysioLab</div><h2>Progresso</h2><div class="card"><div style="font-size:46px;font-weight:900;color:var(--accent)">${store.xp} XP</div><p>Experimentos e atividades concluídos neste aparelho.</p></div><div class="card"><strong>🧠 Neurofisiologia</strong><p>Laboratório de potencial de ação disponível.</p></div>`)}
function render(){app.innerHTML=s.view=="welcome"?welcome():s.view=="home"?home():s.view=="neuro"?neuro():s.view=="lab"?lab():progress()} render();