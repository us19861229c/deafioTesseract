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
//Para apresentar os membros Foto e Login, numa lista simplificada. A ser exibida no HTML. 
async function renderUsuario(usuario) {
    const tdInfo = await axios.get(`https://api.github.com/users/${usuario}`)
    let elementoLista = document.getElementById("usuario-lista")
    let elementoItem = document.createElement("li")
    elementoItem.className ="card m-2 col d-inline-flex border-primary justify-content-around"
    elementoItem.style = "width: 18rem"
    elementoItem.innerHTML = `<img src="${tdInfo.data.avatar_url}" class="img-fluid pt-2" height="50">
                              <h5 class="card-title card-header bg-primary text-white text-center ">${tdInfo.data.name[0]}<span style="font-size:1rem">${tdInfo.data.name.slice(1,)}</span></h5>
                              <span class="card-text  bg-light"><strong>Repositórios:</strong> ${tdInfo.data.public_repos}</span><br>
                              <span class="card-text "><strong>Seguidores:</strong> ${tdInfo.data.followers}</span><br>
                              <span class="card-text  bg-light"><strong>Desde:</strong> ${tdInfo.data.created_at.slice(0,10).split("-").reverse().join("/")}</span><br>
                              <a href="${tdInfo.data.html_url}" class="mb-1" target="_blank">Conheça mais!</a>`
    elementoLista.appendChild(elementoItem)
    let seletorDevs = document.getElementById("selecDevs")
    let seletorPadrao = document.createElement("option")
    seletorPadrao.setAttribute("value", usuario)
    seletorPadrao.innerHTML += `${usuario}`
    seletorDevs.appendChild(seletorPadrao)
}

//seleciona o usuário e o apresenta individualmente com mais algumas informações.
async function selecionarUsuario() {
    let elementoLista = document.getElementById("usuario-lista")
    elementoLista.innerHTML = ""
    let selecionado = document.getElementById("selecDevs").value;
    console.log(tEquipe)
    if(selecionado === ""){
        location.reload();
    }
    const tdInfo = await axios.get(`https://api.github.com/users/${selecionado}`)
    let elementoItem = document.createElement("li")
    elementoItem.className ="card m-2 col d-inline-flex border-primary justify-content-around"
    elementoItem.style = "width: 18rem"
    elementoItem.innerHTML = `<img src="${tdInfo.data.avatar_url}" class="img-fluid pt-2" height="50">
                              <h5 class="card-title card-header bg-primary text-white text-center ">${tdInfo.data.name[0]}<span style="font-size:1rem">${tdInfo.data.name.slice(1,)}</span></h5>
                              <span class="card-text  bg-light"><strong>Repositórios:</strong> ${tdInfo.data.public_repos}</span><br>
                              <span class="card-text "><strong>Seguidores:</strong> ${tdInfo.data.followers}</span><br>
                              <span class="card-text  bg-light"><strong>Desde:</strong> ${tdInfo.data.created_at.slice(0,10).split("-").reverse().join("/")}</span><br>
                              <a href="${tdInfo.data.html_url}" class="mb-1" target="_blank">Conheça mais!</a>`
    elementoLista.appendChild(elementoItem)
}