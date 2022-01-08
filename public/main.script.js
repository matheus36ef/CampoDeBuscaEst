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


    
    tratamento(dadosBase);
    return dadosBase
}
// -------------------------------------------------------------------------------------------
//tratando os dados recebidos para busca
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
//--------------------------------------------------------------------------------------------

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
//--------------------------------------------------------------------------------------------
// Cria as sugestões no HTML - Concluido
const DOM = {
    local: document.querySelector("#caixaCampoBusca #campoBusca ul"),

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
                <p>${tipes.nome}</p>
                <img src="${urlImage}" alt="Icone" width="50px">
                <p>${tipes.desconto}% de Desconto</p>
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
        //Pegando os caracteres que o usuário digitar.
        const pesquisa = document.querySelector("#caixaCampoBusca #campoBusca #input");
        const pesquisaValue = pesquisa.value;

        //filtrando o array
        let filtrado = filtro(pesquisaValue)
        

        //Add no HTML as sugestões.
        let n = 0;
        for (obj of filtrado) {
            if(n <= 5){
                DOM.addSugestao(filtrado[n]);
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