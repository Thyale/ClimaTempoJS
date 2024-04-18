function pesquisar(){
  
  //Vamos localizar o input para pegar o nome da cidade digitada
  var inputnomedacidade = window.document.querySelector("input#pesquisarcidade")

  //colocamos um erro, caso o espaço da cidade esteja vazio
  if (inputnomedacidade.value == "") {
    errorInputVazio()
    return
  }

  //Localizei a nossa div de baixo, dos dados. Porque depois vou usar ela pra aparecer quando a pesquisa for feita
  var divdadosdacidade = window.document.querySelector("div.climadacidade")  

  //importar api, criamos uma var com a chave da nossa api e customizamos o nosso link
  var apichave = "37397dbe89a43243be57d163d5d5df92"
  var importapi = `https://api.openweathermap.org/data/2.5/weather?q=${inputnomedacidade.value}&appid=${apichave}&units=metric&lang=pt_br`

  fetch(importapi)  //importar
    .then(res=>res.json()) //transformamos em objeto
    .then(dados =>{

      if (dados.cod === "404") {
        errorCidadeNEncontrada()
        divdadosdacidade.style.display = "none"
        return
      }

      divdadosdacidade.style.display = "block" //coloquei aqui parar ele esperar a api buscar os dados para poder exibir as informações

      //tratamos os dados

      //Nome da nossa cidade
      var nomecidadeAPI = dados.name
      window.document.querySelector("p.nomedacidade").innerHTML = nomecidadeAPI

      //Pais da nossa cidade
      var paisdeAPI = dados.sys.country
      window.document.querySelector(
        "p.paisdacidade"
      ).innerHTML = `, ${paisdeAPI}`

      //temperatura atual, aparece na parte azul do html
      var temperaturaAPI = dados.main.temp
      window.document.querySelector(
        "p.temperatura"
      ).innerHTML = `${temperaturaAPI.toFixed(1)}°C`

      //O nome indicando o clima
      var temperaturaclimaAPI = dados.weather[0].description
      window.document.querySelector("p.temperaturaclimanome").innerHTML =
        temperaturaclimaAPI

      //Imagem do clima
      var codigodeclimaimgAPI = dados.weather[0].icon
      window.document
        .querySelector("img.imagemclima")
        .setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${codigodeclimaimgAPI}@2x.png`
        )

      //Temperatura Máxima
      var temperaturamax = dados.main.temp_max
      window.document.querySelector(
        "p.temperaturamax"
      ).innerHTML = `${temperaturamax.toFixed(1)}°C`

      //Temperatura Minima
      var temperaturamin = dados.main.temp_min
      window.document.querySelector(
        "p.temperaturamin"
      ).innerHTML = `${temperaturamin.toFixed(1)}°C`

      //humidade
      var humidade = dados.main.humidity
      window.document.querySelector("p.humidade").innerHTML = `${humidade}%`

      //Vento
      var vento = dados.wind.speed
      window.document.querySelector("p.vento").innerHTML = `${vento.toFixed(
        1
      )}km/h`
    })
}

function errorInputVazio(){
  Swal.fire({
    icon: "warning",
    title: "Digite algo antes de pesquisar!",
    showConfirmButton: false,
    timer: 1500,
  })
}

function errorCidadeNEncontrada() {
  Swal.fire({
    icon: "error",
    title: "NÃO encontrado!",
    showConfirmButton: false,
    timer: 1500,
  })
}

