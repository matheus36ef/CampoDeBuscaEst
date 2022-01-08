console.log("I LOVE JESUS");

let dadosTratados = [];

//Pegando dados Json do servidor:
function linkData() {
    return fetch('https://gdp-prd-clube.s3.amazonaws.com/api/repository/partners/all.json');
}
//serviço
class GetBuscLink {
    async execute() {
        const dados = await linkData()
            .then((res) => {
                res = res.json()
                return res
            })
        
        return dados
    }
}
//Controle
async function handle() {
    const service = new GetBuscLink();
    const dadosBase = await service.execute();


    console.log(dadosBase)
    tratamento(dadosBase);
    return dadosBase
}
// -------------------------------------------------------------------------------------------
//tratando os dados recebidos para busca
function tratamento(dados) {
    dadosTratados = dados.map((item) => {
        console.log("chegou no matheus()");
        return {
            id: item.id,
            nome: item.fantasyName,
            cover: item.cover,
 
        }
    })
    
}
//--------------------------------------------------------------------------------------------
//Filtrando dados de busca
//serviço
/* class filterService {
    async execute(dadosBase) {
        const verific = await test(){
            if(/\b\/)
        }
    }
} */
//--------------------------------------------------------------------------------------------
//Filtrando o array de acordo com a pesquisa
function filtro(value) {
    //const value = "ma";
    const filter = dadosTratados.filter((dadoTratado) => 
        dadoTratado.nome.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );
    return filter;
}
//--------------------------------------------------------------------------------------------
// Cria as sugestões no HTML - Concluido
const DOM = {
    local: document.querySelector("#caixaCampoBusca #campoBusca ul"),

    addSugestao(tipes) {
        const ul = document.createElement("ul");
        ul.innerHTML = DOM.innerHTML(tipes);

        console.log(ul);
        DOM.local.appendChild(ul);
    },

    //Mascara
    innerHTML(tipes) {
        const urlImage = `https://clube-static.clubegazetadopovo.com.br/${tipes.cover}`
        console.log(urlImage);
        const html = `
            <li class="sugestoes">
            <a href="#" 
            onclick="complete()">
                <p>${tipes.nome}</p>
                <img src="${urlImage}" alt="Icone" width="50px">
            </a>
            </li>
        `
        return html;
    },

    //Limpar a tela
    clearCase(){
        const htmlLimpo = ``

        DOM.local.innerHTML = htmlLimpo;
        return 0
    }
}



function reload() {//Não utilizando ainda
    alert("tire-o desse lugar");
}


const App = {
    init() {
        console.log("Ligado");

        //Pegando os caracteres que o usuário digitar.
        const pesquisa = document.querySelector("#caixaCampoBusca #campoBusca #input");
        const pesquisaValue = pesquisa.value;

        //filtrando o array
        let filtrado = filtro(pesquisaValue)
        console.log(filtrado);
        

        //Add no HTML as sugestões.
        let n = 0;
        for (obj of filtrado) {
            if(n <= 10){
                DOM.addSugestao(dadosTratados[n]);
                n++;
            }
        }

        //Limpa o array para a proxima busca
        filtrado = [];
    },

    reload() {
        DOM.clearCase();
        App.init();
    }
}


function busca() {
    App.init();
    App.reload();
}

//Função que busca os dados dos estabelecimentos
handle();