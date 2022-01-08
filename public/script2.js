console.log("I LOVE JESUS");





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
];
const value = "ma";
const filteredUsers = users.filter((user) =>
  user.nome.toLocaleLowerCase().includes(value.toLocaleLowerCase())
);

console.log(filteredUsers); 