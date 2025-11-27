function openMenu() {
  document.getElementById("menu_aba").style.display = "block";
}

function closeMenu() {
  document.getElementById("menu_aba").style.display = "none";
}

function temaLim() {
  document.documentElement.style.setProperty('--cor-click', '#38184C');
  document.documentElement.style.setProperty('--cor-sombra', '#9b0a59');
  document.documentElement.style.setProperty('--cor-text', 'black');
  document.documentElement.style.setProperty('--cor-back1', '#CEF09D');
  document.documentElement.style.setProperty('--cor-back2', '#4f6a93');
  document.documentElement.style.setProperty('--md-sys-color-primary', '#38184C');
}

function temaInatel() {
  document.documentElement.style.setProperty('--cor-click', '#126ae2');
  document.documentElement.style.setProperty('--cor-sombra', '#0a599b');
  document.documentElement.style.setProperty('--cor-text', 'black');
  document.documentElement.style.setProperty('--cor-back1', '#edf2f4');
  document.documentElement.style.setProperty('--cor-back2', '#6a937a');
  document.documentElement.style.setProperty('--md-sys-color-primary', '#126ae2');

}

function temaDark() {
  const cores = {
    '--cor-click': '#CEF09D',
    '--cor-sombra': '#9b0a59',
    '--cor-text': 'black',
    '--cor-back1': '#38184C',
    '--cor-back2': '#4f6a93',
    '--md-sys-color-primary': '#CEF09D'
  };

  for (const [variavel, valor] of Object.entries(cores)) {
    document.documentElement.style.setProperty(variavel, valor);
  }
}




const eventos = [
  {
    id: 1,
    title: 'Semana do Software 2025',
    date: '12/05',
    time: '10:00',
    location: 'Salão de Eventos',
    type: 'tech',
    description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 2,
    title: 'Workshop de IoT',
    date: '12/01',
    time: '08:00',
    location: 'Laboratório CS&I',
    type: 'tech',
    description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 3,
    title: 'Festa dos Alunos 2025',
    date: '18/05',
    time: '19:00',
    location: 'Área Esportiva',
    type: 'cultural',
    description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
  },
  {
    id: 4,
    title: 'Feira de Oportunidades',
    date: '04/05',
    time: '10:00',
    location: 'Salão de Eventos',
    type: 'academic',
    description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
  }
];

const carousel = document.querySelector('.carousel');

// Função para criar os cards
function createCards() {
  eventos.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="info">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <p><span class="material-symbols-outlined icon">event</span> ${event.date} às ${event.time} <span class="material-symbols-outlined icon">pin_drop</span> ${event.location}</p>
            </div>
        `;
    carousel.appendChild(card);
  });
}

// Controle do carrossel
let index = 0;
function nextCard() {
  index = (index + 1) % eventos.length;
  updateCarousel();
}

function prevCard() {
  index = (index - 1 + eventos.length) % eventos.length;
  updateCarousel();
}

function updateCarousel() {
  carousel.style.transform = `translateX(-${index * 100}%)`;
}

// Adicionando interatividade
document.getElementById('nextBtn').addEventListener('click', nextCard);
document.getElementById('prevBtn').addEventListener('click', prevCard);

// Auto avanço a cada 5 segundos
setInterval(nextCard, 5000);

// Arrastar no celular
let startX;
carousel.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});
carousel.addEventListener('touchend', (e) => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextCard();
  if (endX - startX > 50) prevCard();
});

// Inicializando
createCards();


// Componente Aulas ----------------------------------------------------------------------------------

class AulasComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Cria o Shadow DOM
    this.aulas = [
      {
        id: 1,
        disciplina: 'S05 - Interface Homem-máquina',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: false,
        prova: '12/05',
        frequencia: '10/25',
        nota: '10'
      },
      {
        id: 2,
        disciplina: 'E01 - Circuitos Elétricos em Corrente Contínua',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: true,
        prova: '12/05',
        frequencia: '10/25',
        nota: '5'
      },
      {
        id: 3,
        disciplina: 'M02 - Álgebra e Geometria Analítica',
        data: 'ter',
        horario: '10:00',
        local: 'P1-S17',
        prova_alert: true,
        prova: '12/05',
        frequencia: '10/25',
        nota: '7'
      }
    ];
    this.hoje = "ter"; // Dia atual
  }

  connectedCallback() {
    this.render(); // Renderiza o componente
  }

  // Método para renderizar o conteúdo do componente
  render() {
    const aulasDia = this.aulas.filter(a => a.data === this.hoje); // Filtra as aulas para o dia de hoje
    this.shadowRoot.innerHTML = `
      <style>
      .comp-aula {
        position: relative;
        background-color: white;
        top: 0px;
        left: 0px;
        rigth: 0px;
        padding: 15px;
        margin: 20px;
        border-radius: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      }

      .titulo_aula {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: bold;
        font-style: normal;
        font-size: 15px;
        color: var(--cor-text);
        padding-left: 5px;
        padding-right: 5px;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      p {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: <weight>;
        font-style: normal;
        font-size: 11px;
        color: var(--cor-text);
        line-height: 1.5;
        orphans: 3;
        padding-left: 5px;
        padding-right: 5px
      }

      .lables {
        display: flex;
        /*justify-content: space-between;*/
      }

      .lable-prova {
        background-color: var(--prova);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-bottom: 10px;
        border-radius: 500px;
        text-align: center
      }

      .lable-frequencia {
        background-color: var(--frequencia);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .lable-nota {
        background-color: var(--prova);
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }
      
      .lable-nota-vermelho {
        background-color: red;
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }
      
      .lable-nota-laranja {
        background-color: yellow;
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .lable-nota-verde {
        background-color: green;
        padding: 7px;
        padding-right: 15px;
        padding-left: 15px;
        margin-right: 10px;
        border-radius: 500px;
      }

      .p_lable {
        font-family: "Arimo", sans-serif;
        font-optical-sizing: auto;
        font-weight: <weight>;
        font-style: normal;
        font-size: 11px;
        color: white;

        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      </style>
      <div>
        ${aulasDia.map(a => {
      let provaDisplay = a.prova_alert ? '' : 'display: none;';

      let lableNota

      if (a.nota <= 5) {
        lableNota = 'lable-nota-vermelho';
      } else if (a.nota >= 7 && a.nota < 9) {
        lableNota = 'lable-nota-laranja';
      } else if (a.nota >= 9 && a.nota <= 10) {
        lableNota = 'lable-nota-verde';
      } else {
        lableNota = 'lable-nota';
      }

      return `
            <div class="comp-aula">
              <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
              <div class="titulo_aula">${a.disciplina}</div>
              <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
              <div class="lables">
                <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                <div class="${lableNota} p_lable">CR: <b>${a.nota}</b></div>
              </div>
            </div>
          `;
    }).join('')}
      </div>
    `;
  }
}

// Registrando o componente
customElements.define('aulas-component', AulasComponent);





// RESERVA ARMÁRIO

// objeto do usuário
const usuario = { nome: "Raphael", matricula: "123456", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },
];

let tipoSelecionado = null;

// Adiciona comportamento aos divs clicáveis
document.querySelectorAll('.tipo').forEach(div => {
  div.addEventListener('click', () => {
    document.querySelectorAll('.tipo').forEach(d => d.classList.remove('selected'));
    div.classList.add('selected');
    tipoSelecionado = div.dataset.value;
  });
});

// função para reserva do armário
function reservarArmario() {
  const resultado = document.getElementById("resultado");
  const armarioNumero = document.getElementById("armarioNumero");

  if (!tipoSelecionado) {
    resultado.innerText = "Por favor, selecione um tipo de armário antes de reservar.";
    armarioNumero.style.display = "none";
    return;
  }

  let armariosDisponiveis = armarios.filter(a =>
    a.formato === tipoSelecionado && a.status === true && usuario.acessibilidade === a.acessivel
  );

  if (armariosDisponiveis.length === 0) {
    resultado.innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    armarioNumero.style.display = "none";
    return;
  }

  let armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  let armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;

  // Data da reserva
  let dataReserva = new Date();
  armarioEmprestado.dataReserva = dataReserva.toLocaleString("pt-BR");

  // Data de entrega (24h após)
  let dataEntrega = new Date(dataReserva.getTime() + 24 * 60 * 60 * 1000);
  armarioEmprestado.dataEntrega = dataEntrega.toLocaleString("pt-BR");

  usuario.pendencia = true;

  // Exibe o número do armário de forma destacada
  armarioNumero.innerText = `Armário Nº ${armarioEmprestado.id}`;
  armarioNumero.style.display = "block";

  resultado.innerText =
    //`Olá, ${usuario.nome}! O armário ${armarioEmprestado.id} foi reservado com sucesso.\n` +
    `Data da reserva: ${armarioEmprestado.dataReserva}\n` +
    `Data de entrega: ${armarioEmprestado.dataEntrega}`;

  console.log(usuario);
  console.log(armarios);
}

// VAGAS DE ESTÃGIO E TRAINEE

const vagas = [
  {
    id: 1,
    titulo: "Estágio em Desenvolvimento Web",
    empresa: "Tech Solutions",
    area: "software",
    tipo: "estagio",
    descricao: "Atuar no desenvolvimento de aplicações web utilizando React e Node.js."
  },
  {
    id: 2,
    titulo: "Trainee em Engenharia de Redes",
    empresa: "Connect Telecom",
    area: "telecom",
    tipo: "trainee",
    descricao: "Programa de trainee focado em infraestrutura de redes e 5G."
  },
  {
    id: 3,
    titulo: "Estágio em Engenharia Clínica",
    empresa: "Hospital Santa Vida",
    area: "biomedica",
    tipo: "estagio",
    descricao: "Acompanhamento de manutenção de equipamentos médicos."
  },
  {
    id: 4,
    titulo: "Estágio em Automação Industrial",
    empresa: "Indústria 4.0",
    area: "automacao",
    tipo: "estagio",
    descricao: "Programação de CLPs e sistemas supervisórios."
  },
  {
    id: 5,
    titulo: "Desenvolvedor Mobile Jr (Trainee)",
    empresa: "AppMasters",
    area: "software",
    tipo: "trainee",
    descricao: "Desenvolvimento de aplicativos Android e iOS."
  },
  {
    id: 6,
    titulo: "Estágio em Testes de Software",
    empresa: "QualitySoft",
    area: "software",
    tipo: "estagio",
    descricao: "Execução de testes manuais e automatizados."
  },
  {
    id: 7,
    titulo: "Analista de Telecomunicações Jr",
    empresa: "TeleBrasil",
    area: "telecom",
    tipo: "trainee",
    descricao: "Acompanhamento de projetos de infraestrutura de telecomunicações."
  },
  {
    id: 8,
    titulo: "Estágio em Fibras Ópticas",
    empresa: "FiberTech",
    area: "telecom",
    tipo: "estagio",
    descricao: "Suporte em projetos de instalação e manutenção de redes ópticas."
  },
  {
    id: 9,
    titulo: "Trainee em Dispositivos Médicos",
    empresa: "MedTech Brasil",
    area: "biomedica",
    tipo: "trainee",
    descricao: "Participação no desenvolvimento de equipamentos biomédicos."
  },
  {
    id: 10,
    titulo: "Estágio em Imagens Médicas",
    empresa: "DiagnoScan",
    area: "biomedica",
    tipo: "estagio",
    descricao: "Apoio em processos de calibração de equipamentos de imagem."
  },
  {
    id: 11,
    titulo: "Trainee em Robótica Industrial",
    empresa: "AutoBot Systems",
    area: "automacao",
    tipo: "trainee",
    descricao: "Desenvolvimento de sistemas robóticos para linhas de produção."
  },
  {
    id: 12,
    titulo: "Estágio em Controle de Processos",
    empresa: "ProcessControl Inc",
    area: "automacao",
    tipo: "estagio",
    descricao: "Programação e monitoramento de sistemas de controle SCADA."
  },
  {
    id: 13,
    titulo: "Desenvolvedor Backend (Trainee)",
    empresa: "CloudNine Tech",
    area: "software",
    tipo: "trainee",
    descricao: "Desenvolvimento de APIs REST e microserviços em Java/Spring."
  },
  {
    id: 14,
    titulo: "Estágio em DevOps",
    empresa: "InfraTech",
    area: "software",
    tipo: "estagio",
    descricao: "Apoio em CI/CD, containerização Docker e orquestração Kubernetes."
  },
  {
    id: 15,
    titulo: "Trainee em Sistemas Embarcados",
    empresa: "EmbeddedPro",
    area: "automacao",
    tipo: "trainee",
    descricao: "Desenvolvimento de firmware para sistemas embarcados IoT."
  }
];

function renderVagas(vagasParaRenderizar) {
  const listaVagas = document.getElementById('lista-vagas');
  listaVagas.innerHTML = ''; // Limpa a lista

  if (vagasParaRenderizar.length === 0) {
    listaVagas.innerHTML = '<p>Nenhuma vaga encontrada com os filtros selecionados.</p>';
    return;
  }

  vagasParaRenderizar.forEach(vaga => {
    const card = document.createElement('div');
    card.classList.add('vaga-card');

    const badgeClass = vaga.tipo === 'estagio' ? 'badge-estagio' : 'badge-trainee';
    const tipoLabel = vaga.tipo === 'estagio' ? 'Estágio' : 'Trainee';

    card.innerHTML = `
            <div class="vaga-header">
                <h3 class="vaga-title">${vaga.titulo}</h3>
                <p class="vaga-company">${vaga.empresa}</p>
            </div>
            <div class="vaga-body">
                <p class="vaga-desc">${vaga.descricao}</p>
            </div>
            <div class="vaga-footer">
                <span class="badge ${badgeClass}">${tipoLabel}</span>
                <button class="btn-detalhes" onclick="alert('Detalhes da vaga: ${vaga.titulo}')">Ver Detalhes</button>
            </div>
        `;
    listaVagas.appendChild(card);
  });
}

function filtrarVagas() {
  const areaSelecionada = document.getElementById('filtro-area').value;
  const tipoSelecionado = document.getElementById('filtro-tipo').value;

  const vagasFiltradas = vagas.filter(vaga => {
    const matchArea = areaSelecionada === 'todas' || vaga.area === areaSelecionada;
    const matchTipo = tipoSelecionado === 'todos' || vaga.tipo === tipoSelecionado;
    return matchArea && matchTipo;
  });

  renderVagas(vagasFiltradas);
}

function limparFiltros() {
  document.getElementById('filtro-area').value = 'todas';
  document.getElementById('filtro-tipo').value = 'todos';
  renderVagas(vagas);
}

// Inicializa as vagas
renderVagas(vagas);
