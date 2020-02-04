//Para buscar através do login, as demais informações sobre cada usuário. Daqui será extraído o login de cada membro
axios.get('https://api.github.com/orgs/grupotesseract/public_members')
    .then(bancoDadosTess => {
        const tesseractGrupo = bancoDadosTess.data;
        tesseractGrupo.forEach( function (dado) {
            renderUsuario(dado.login)
        })             
    })
    .catch( error => {
        console.log("Desculpe, occoreu um erro e não foi possível obter o resultado esperado.")
    })
//Para apresentar os membros Foto e Login, numa lista simplificada. A ser exibida no html. 
async function renderUsuario(usuario) {
    const tdInfo = await axios.get(`https://api.github.com/users/${usuario}`)
    console.log(tdInfo)
    let elementoLista = document.getElementById("usuario-lista")
    let elementoItem = document.createElement("li")
    elementoItem.innerHTML = `<img src="${tdInfo.data.avatar_url}" height="50"><span>${tdInfo.data.login}</span>`
    elementoLista.appendChild(elementoItem)
}