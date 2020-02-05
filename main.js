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
    elementoItem.className ="m-3 col d-inline-flex justify-content-around"
    elementoItem.style="width: 18rem"
    elementoItem.innerHTML = ` <div class="cartao">
                                    <div class="face face1">
                                        <div class="content">
                                            <img src="${tdInfo.data.avatar_url}" alt="">
                                            <h3><span id="nomeMembro">${tdInfo.data.login}<span></h3>        
                                        </div>
                                    </div>
                                    <div class="face face2">
                                        <div class="content">
                                            <h5><strong>${tdInfo.data.name}</strong></h5>
                                            <p><strong>Seguidores:</strong> ${tdInfo.data.followers}<br>
                                               <strong>Repositórios públicos:</strong> ${tdInfo.data.public_repos}<br>
                                               <strong>Desde:</strong> ${tdInfo.data.created_at.slice(0,10).split("-").reverse().join("/")}<br>
                                            </p>
                                            <a href="${tdInfo.data.html_url}" target="_blank">Conheça mais!</a>
                                        </div>
                                    </div>`                            
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
    elementoItem.className ="m-3 col d-inline-flex justify-content-around"
    elementoItem.style="width: 18rem"
    elementoItem.innerHTML = ` <div class="cartao">
                                    <div class="face face1">
                                        <div class="content">
                                            <img src="${tdInfo.data.avatar_url}" alt="">
                                            <h3><span id="nomeMembro">${tdInfo.data.login}<span></h3>        
                                        </div>
                                    </div>
                                    <div class="face face2">
                                        <div class="content">
                                            <h5><strong>${tdInfo.data.name}</strong></h5>
                                            <p><strong>Seguidores:</strong> ${tdInfo.data.followers}<br>
                                               <strong>Repositórios públicos:</strong> ${tdInfo.data.public_repos}<br>
                                               <strong>Desde:</strong> ${tdInfo.data.created_at.slice(0,10).split("-").reverse().join("/")}<br>
                                            </p>
                                            <a href="${tdInfo.data.html_url}" target="_blank">Conheça mais!</a>
                                        </div>
                                    </div>`                            
    elementoLista.appendChild(elementoItem)
}