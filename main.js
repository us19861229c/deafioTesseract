//Para buscar através do login, as demais informações sobre cada usuário. Daqui será extraído o login de cada membro
let tEquipe = [];
axios.get('https://api.github.com/orgs/grupotesseract/public_members')
    .then(bancoDadosTess => {
        const tesseractGrupo = bancoDadosTess.data;
        tesseractGrupo.forEach( function (dado) {
            tEquipe.push(dado.data)
            renderUsuario(dado.login)
        })             
    })
    .catch( error => {
        console.log("Desculpe, occoreu um erro e não foi possível obter o resultado esperado.")
    })
//Para apresentar os membros Foto e Login, numa lista simplificada. A ser exibida no html. 
async function renderUsuario(usuario) {
    const tdInfo = await axios.get(`https://api.github.com/users/${usuario}`)
    let elementoLista = document.getElementById("usuario-lista")
    let elementoItem = document.createElement("li")
    elementoItem.innerHTML = `<img src="${tdInfo.data.avatar_url}" height="50"><span>${tdInfo.data.login}</span>`
    elementoLista.appendChild(elementoItem)
    let seletorDevs = document.getElementById("selecDev")
    let seletorPadrao = document.createElement("option")
    seletorPadrao.setAttribute("value", usuario)
    seletorPadrao.innerHTML += `${usuario}`
    seletorDevs.appendChild(seletorPadrao)
}

async function selecionarUsuario() {
    let elementoLista = document.getElementById("usuario-lista")
    elementoLista.innerHTML = ""
    let selecionado = document.getElementById("selecDev").value;
    console.log(tEquipe)
    if(selecionado === ""){
        location.reload();
    }
    const tdInfo = await axios.get(`https://api.github.com/users/${selecionado}`)
    let elementoItem = document.createElement("li")
    elementoItem.innerHTML = `<img src="${tdInfo.data.avatar_url}" height="50"><span>${tdInfo.data.login}</span>`
    elementoLista.appendChild(elementoItem)
}