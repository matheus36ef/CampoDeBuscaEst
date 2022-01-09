console.log("I LOVE JESUS");

//Variaveis globais
let dadosTratados = []; //Ultima etapa da pesquisa do JSON. Linha 39
let filtrado = []; //ultima etapa da separação do JSON.
let n = 0; /* Utiliado para verificar o fluxo de array (sugestões que esta passando no Aliment, tambem está sendo usado para controlar
quando a função addSugestãoFinal() será utilizada de fato.) */

//
//------------------------------------------------------------------------------------------
//Pegando dados Json do servidor:
//Executa assim que entra na pagina
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


    
    tratamento(dadosBase);
    return dadosBase
}
//
// -------------------------------------------------------------------------------------------
//tratando os dados recebidos para busca
//Executa assim que entra na pagina
function tratamento(dados) {
    dadosTratados = dados.map((item) => {
        return {
            id: item.id,
            nome: item.fantasyName,
            cover: item.cover,
            desconto: item.discountAmount,
 
        }
    })
    
}
//
//--------------------------------------------------------------------------------------------
//Filtrando o array de acordo com a pesquisa
function filtro(value) {
    //const value = "ma";
    let filter = dadosTratados.filter((dadoTratado) => 
        dadoTratado.nome.toLocaleLowerCase().includes(value.toLocaleLowerCase())
    );

    //passando para ordem 
    filter = filter.sort((a, b) => {
        return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
    })
    
    return filter;
}
//
//--------------------------------------------------------------------------------------------
// Cria as sugestões no HTML - Concluido
const DOM = {
    local: document.querySelector("#caixaCampoBusca #campoBusca ul"),
    local2: document.querySelector("#caixaCampoBusca #campoBusca #resto"),

    addSugestao(tipes) {
        const ul = document.createElement("ul");
        ul.innerHTML = DOM.innerHTML(tipes);

        DOM.local.appendChild(ul);
    },

    //Mascara
    innerHTML(tipes) {
        const urlImage = `https://clube-static.clubegazetadopovo.com.br/${tipes.cover}`
       
        const html = `
            <li class="sugestoes">
            <a href="#" 
            onclick="complete()">
                <img src="${urlImage}" alt="Icone">
                <div id="nd">
                <p id="nome">${tipes.nome}</p>
                <p id="desconto">${tipes.desconto}% de Desconto</p>
                </div>
            </a>
            </li>
        `
        return html;
    },
    addSugestãoFinal(){
        const html = `<p>E outros ${filtrado.length -6} estabelecimentos.</p>`
        if(n > 5){
            DOM.local2.innerHTML = html;
            return 0;
        }else {
            return 0;
        } 
        
    },

    //Limpar a tela
    clearCase(){
        const htmlLimpo = ``
        filtrado = [];
        DOM.local.innerHTML = htmlLimpo;
        DOM.local2.innerHTML = htmlLimpo;
        return 0
    }
}

//
//------------------------------------------------------------------------------------------
const App = {
    init() {
        //Pegando os caracteres que o usuário digitar.
        const pesquisa = document.querySelector("#caixaCampoBusca #campoBusca #input");
        const pesquisaValue = pesquisa.value;

        //filtrando o array
        filtrado = filtro(pesquisaValue)
        

        

        //Limpa o array para a proxima busca
        
    },
    Aliment(){
        //Add no HTML as sugestões.
        n = 0; 
        const numSugestoes = 5; //Regula a quantidade de sugestões a serem mostrados em tela.
        for (obj of filtrado) {
            if(n <= numSugestoes) { 
                DOM.addSugestao(filtrado[n]);
                n++;
            }
        }
        return n;
    },
    reload() {
        DOM.clearCase();
        App.init();
        App.Aliment();  
    }
}
//
//-----------------------------------------------------------------------------------------
//Controle da aplicação
function esconderSugestoes(){
    DOM.clearCase();
    App.Aliment();
}
function busca() {
    App.init();
    App.reload();
    DOM.addSugestãoFinal();
}
//
//-----------------------------------------------------------------------------------------
//Função que busca os dados dos estabelecimentos
handle();