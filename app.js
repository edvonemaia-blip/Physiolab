
const modules=[
{id:"neuro",icon:"⚡",title:"Neurofisiologia",sub:"Membrana, potencial de ação e sinapses"},
{id:"muscular",icon:"💪",title:"Fisiologia muscular",sub:"Contração e acoplamento excitação-contração"},
{id:"cardio",icon:"♥",title:"Cardiovascular",sub:"Coração, fluxo e pressão"},
{id:"resp",icon:"◌",title:"Respiratória",sub:"Ventilação e trocas gasosas"},
{id:"renal",icon:"≈",title:"Renal",sub:"Filtração e equilíbrio hidroeletrolítico"},
{id:"endo",icon:"◆",title:"Endócrina",sub:"Hormônios e regulação"},
{id:"gastro",icon:"↝",title:"Gastrointestinal",sub:"Motilidade, secreção e absorção"}
];
const lesson={
title:"Sinapse química",
intro:"A sinapse química transforma um sinal elétrico pré-sináptico em sinal químico e, depois, em resposta pós-sináptica.",
steps:["O potencial de ação chega ao terminal pré-sináptico.","Canais de Ca²⁺ dependentes de voltagem se abrem.","A entrada de Ca²⁺ favorece a fusão das vesículas.","O neurotransmissor é liberado na fenda sináptica.","O neurotransmissor liga-se a receptores pós-sinápticos.","A célula pós-sináptica modifica seu potencial de membrana."],
questions:[
{q:"O que desencadeia a abertura dos canais de Ca²⁺ pré-sinápticos?",a:["Chegada do potencial de ação","Ligação do neurotransmissor","Bomba Na⁺/K⁺"],c:0},
{q:"Qual íon é decisivo para a liberação vesicular?",a:["Ca²⁺","Cl⁻","K⁺"],c:0},
{q:"Onde o neurotransmissor é liberado?",a:["Fenda sináptica","Núcleo","Axônio pós-sináptico"],c:0},
{q:"Se a entrada de Ca²⁺ for bloqueada, o efeito mais direto será:",a:["Menor liberação de neurotransmissor","Maior síntese de ATP","Aumento da mielina"],c:0}
]};
let s={view:"welcome",q:0,score:0,answered:false};
const app=document.querySelector("#app");
const data=JSON.parse(localStorage.getItem("physiolab")||'{"neuro":0}');
const nav=()=>`<div class="bottom"><nav><button onclick="go('home')">Módulos</button><button onclick="go('review')">Revisar</button><button onclick="go('progress')">Progresso</button></nav></div>`;
const shell=(x,n=true)=>`<div class="shell">${x}</div>${n?nav():""}`;
function go(v){s.view=v;s.answered=false;render();scrollTo(0,0)}
function welcome(){return shell(`<section class="hero"><div class="tag">Laboratório de Fisiologia Médica</div><h1>Physio<br>Lab</h1><p>Entenda mecanismos, teste hipóteses e aprenda Fisiologia acompanhando sua evolução durante o semestre.</p><div class="card"><strong>Não decore apenas o resultado.</strong><p>Descubra o mecanismo por trás dele.</p></div><button class="primary" onclick="go('home')">Começar</button></section>`,false)}
function home(){let pct=data.neuro||0;return shell(`<div class="top"><div><div class="tag">PhysioLab</div><h2>Laboratórios</h2></div><span class="pill">${pct}% Neuro</span></div><div class="card"><strong>Seu semestre</strong><p>Comece por Neurofisiologia. Os demais sistemas já estão preparados para receber as próximas aulas.</p><div class="progress"><span style="width:${pct}%"></span></div></div><div class="grid">${modules.map(m=>`<div class="card module" onclick="${m.id==="neuro"?"go('neuro')":"soon()"}"><div class="icon">${m.icon}</div><div><strong>${m.title}</strong><small>${m.sub}</small></div></div>`).join("")}</div>`)}
function soon(){alert("Este laboratório será liberado conforme avançarmos no semestre.")}
function neuro(){return shell(`<div class="top"><button class="back" onclick="go('home')">‹</button><span class="pill">Neurofisiologia</span></div><div class="tag">Laboratório 01</div><h2>Sinapse química</h2><p>${lesson.intro}</p><div class="card"><strong>🧠 Aprender o mecanismo</strong><p>Veja a sequência fisiológica antes de testar seu raciocínio.</p><button class="primary" onclick="go('lesson')">Abrir aula</button></div><div class="card"><strong>⚡ Desafio</strong><p>Preveja o que acontece quando modificamos uma etapa da sinapse.</p><button class="primary" onclick="startQuiz()">Praticar</button></div>`)}
function lessonView(){return shell(`<div class="top"><button class="back" onclick="go('neuro')">‹</button><span class="pill">Mecanismo</span></div><div class="tag">Sinapse química</div><h2>Do impulso à resposta</h2><div class="card"><ol>${lesson.steps.map(x=>`<li style="margin:12px 0;line-height:1.45">${x}</li>`).join("")}</ol></div><div class="card"><strong>🔬 Pense como fisiologista</strong><p>Se uma etapa for bloqueada, tente prever todas as consequências que aparecem depois dela.</p></div><button class="primary" onclick="startQuiz()">Testar meu raciocínio</button>`)}
function startQuiz(){s.q=0;s.score=0;s.answered=false;s.view="quiz";render();scrollTo(0,0)}
function quiz(){const x=lesson.questions[s.q];return shell(`<div class="top"><button class="back" onclick="go('neuro')">‹</button><span class="pill">${s.q+1}/${lesson.questions.length}</span></div><div class="tag">Desafio fisiológico</div><h2>${x.q}</h2><div>${x.a.map((a,i)=>`<button class="secondary option" onclick="answer(${i},this)">${a}</button>`).join("")}</div><div id="feedback"></div>`)}
function answer(i,el){if(s.answered)return;s.answered=true;let x=lesson.questions[s.q];document.querySelectorAll(".option").forEach((b,j)=>{if(j===x.c)b.classList.add("correct")});if(i===x.c){s.score++;}else el.classList.add("wrong");let last=s.q===lesson.questions.length-1;document.querySelector("#feedback").innerHTML=`<div class="card"><strong>${i===x.c?"✓ Correto":"Revise o mecanismo"}</strong><p>${i===x.c?"Boa. Agora pense no que aconteceria se essa etapa fosse bloqueada.":"A alternativa correta está destacada. Volte à sequência fisiológica e identifique onde o mecanismo foi interrompido."}</p></div><button class="primary" onclick="${last?"finish()":"next()"}">${last?"Ver resultado":"Próxima"}</button>`}
function next(){s.q++;s.answered=false;render();scrollTo(0,0)}
function finish(){data.neuro=Math.max(data.neuro||0,Math.round(s.score/lesson.questions.length*100));localStorage.setItem("physiolab",JSON.stringify(data));go("result")}
function result(){let pct=Math.round(s.score/lesson.questions.length*100);return shell(`<div style="text-align:center;padding-top:45px"><div class="tag">Resultado</div><div class="score">${pct}%</div><h2>${s.score}/${lesson.questions.length} acertos</h2><p>Seu melhor resultado fica salvo neste aparelho.</p><button class="primary" onclick="go('home')">Voltar aos laboratórios</button><button class="secondary" onclick="startQuiz()">Refazer desafio</button></div>`)}
function review(){return shell(`<div class="tag">Revisão inteligente</div><h2>Revisar</h2><div class="card"><strong>Próxima evolução</strong><p>Aqui entraremos com questões erradas, flashcards e repetição espaçada.</p></div>`)}
function progress(){return shell(`<div class="tag">Meu desempenho</div><h2>Progresso</h2><div class="card"><div class="score" style="font-size:48px">${data.neuro||0}%</div><p>Melhor desempenho atual em Neurofisiologia.</p></div>`)}
function render(){app.innerHTML=s.view==="welcome"?welcome():s.view==="home"?home():s.view==="neuro"?neuro():s.view==="lesson"?lessonView():s.view==="quiz"?quiz():s.view==="result"?result():s.view==="review"?review():progress()}
render();
