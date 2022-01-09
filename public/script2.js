console.log("I LOVE JESUS");
//Arquivo para teste: 
//Para executalo, retirar o comentario da chamada desse arquivo no ./public/index.html





/* 
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
    return dadosBase
}


 */
const valor = 'ma';

/* const users = [
    {
        nome: 'matheus',
        id: 256,
    },
    {
        nome: 'Heloa',
        id: 257,
    },
    {
        nome: 'carol',
        id: 258,
    },
    {
        nome: 'maira',
        id: 259,
    },
] */
/* let arrayTeste = [];
for (obj of array) {
    

    if(/\bma/.test(obj.nome)){
        arrayTeste.push(obj);
    }
    
}
console.log(arrayTeste); */

//Teste de filtragem
const users = [
    {
        nome: 'matheus Estevanato',
        id: 256,
    },
    {
        nome: 'Heloa',
        id: 257,
    },
    {
        nome: 'carol',
        id: 258,
    },
    {
        nome: 'maira',
        id: 259,
    },
    {
        nome: 'Bartolomeu',
        id: 259,
    },
    {
        nome: 'Igor',
        id: 259,
    },
    {
        nome: 'Carlos',
        id: 259,
    },
    {
        nome: 'Amanda',
        id: 259,
    },
];

//Filtrando dados de busca
//serviço
/* class filterService {
    async execute(dadosBase) {
        const verific = await test(){
            if(/\b\/)
        }
    }
} */


const value = "matheus";
 const filteredUsers = users.filter((user) =>
  user.nome.toLocaleLowerCase().includes(value.toLocaleLowerCase())
);

 

// Teste de ordem alfabetica
//sort()
/*
const alfa = users.sort((a, b) => {
    if(a.nome > b.nome) {
        return 1
    }else if (b.nome > a.nome){
        return -1
    }else {
        return 0
    }

})
*/


const alfa = filteredUsers.sort((a, b) => {
    return (a.nome > b.nome) ? 1 : ((b.nome > a.nome) ? -1 : 0);
}) 



console.log("Alfa:");
console.log(alfa);



