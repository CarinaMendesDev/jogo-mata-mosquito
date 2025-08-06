// Iniciando as variáveis para armazenar a altura e a largura da tela
let altura = 0
let largura = 0

//Variável para remoção de vidas
let vidas = 1

//Variável para o cronometro do jogo, falando quanto tempo de jogo que é
let tempo = 50

//Variável para mudar o tempo de acordo com a dificuldade
let criaMosquitoTempo = 1500

//Variável para recuperar a dificuldade passada após o "?" na url da página "index"
let nivel = window.location.search
nivel = nivel.replace('?', '')//Tirando o "?" quando for pra variável "nivel"

//Verificando o nivel escolhido
if(nivel === 'normal'){
    //Ajusta o tempo para mais devegar: 1,5 segundos
    criaMosquitoTempo = 1500
}else if(nivel === 'dificil'){
    //Ajusta o tempo para dificil: 1 segundo
    criaMosquitoTempo = 1000
}else if(nivel === 'chucknorris'){
    //Ajusta o tempo para mais rápido: 750 milisegundos
    criaMosquitoTempo = 750
}

// Função para atualizar o tamanho da tela do jogo
function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight // Pega a altura da tela visível
    largura = window.innerWidth // Pega a largura da tela visível

    console.log(largura, altura) // Exibe os valores no console para conferência
}

// Chamando a função para definir os valores iniciais da tela
ajustaTamanhoPalcoJogo()

//Variável "cronometro" recebe uma função, para cada 1segundo, decrementar 1 da variável tempo
let cronometro = setInterval(function(){

    tempo -= 1//decremento da variável tempo

    //Verifando, se tempo for menor que 0(zero), e não tiver perdido todos os corações, vai mostrar que você ganhou
    if(tempo < 0){
        clearInterval(cronometro)//Limpando a função quando acabar o tempo
        clearInterval(criaMosquito)//Limpando a função de criar mosquito quando acabar o tempo
        window.location.href = 'vitoria.html'//Se o usuario ganhar, vai ser redirecionado para a oágina de vitória
    } else { 
        document.getElementById('cronometro').innerHTML = tempo
        //Pegando a tag HTML pelo ID "cronometro", e colocando dentro dela escrito atraves do "innerHTML" o que ta na variável "tempo"
    }

},1000)//Vai decrementar o tempo a cada 1segundo

function posicaoRandomica() {

    //Remover o mosquito anterior (caso exista)
    //Verificando se já existe um mosquito 
    if(document.getElementById('mosquito')){
        document.getElementById('mosquito').remove()
        //Se existir, vai remover o anterior, e no html dentro do script tem o "setInterval()", que vai fazer aparecer outro a cada 1segundo

        //Verificando, se vidas for mais que 3,muda de página
        if(vidas > 3){
            //Se vidas for mais que 3(acabar as vidas), vai redirecionar para outra página de GAME OVER, indicando que perdeu
            window.location.href = 'fim_de_jogo.html'
        } else{
            //Se for menor, continua removendo
            document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png"//Pegando o ID das imagens, e adicionando mais um pra cada ID, ficando "v1", "v2" e "v3", porque são 3 corações

            vidas++ //Adicionando mais um na variável e mais um no ID
        }
        
    }

    // Gera posições aleatórias dentro dos limites da tela e evita que a imagem saia da área visível
    let posicaoX = Math.floor(Math.random() * largura) - 90
    let posicaoY = Math.floor(Math.random() * altura) - 90

    // Operador ternário, se a posição calculada for menor que 0, ajusta para 0 para não sair da tela
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY) // Exibe as posições no console

    // Criando um novo elemento <img> no HTML
    let mosquito = document.createElement('img') // Cria uma tag <img>
    mosquito.src = 'imagens/mosca.png' // Define a imagem do mosquito
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() // Aplica as classes CSS para estilizar o mosquito
    mosquito.id = 'mosquito'//O ID serve para verificar se existe

    //Pegando o elemento "mosquito", e incluindo um evento "onclick", que quando clicar vai disparar uma função
    mosquito.onclick = function(){
        this.remove()
        //O "this" ele faz referencia ao elemento HTML que executa a função, que no caso é o "mosquito", e do lado o ".remove()"
    }

    // Define a posição do mosquito na tela
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute' // Permite que o mosquito seja posicionado livremente

    // Adiciona o mosquito na página dentro do <body>
    document.body.appendChild(mosquito)

}

// Função para definir um tamanho aleatório para o mosquito
function tamanhoAleatorio() {
    
    let classe = Math.floor(Math.random() * 3) // Gera um número aleatório entre 0 e 2

    // Escolhe uma classe CSS diferente dependendo do número gerado
    switch(classe) {
        case 0:
            return 'mosquito1' // Se o número for 0, retorna a classe 'mosquito1'
        case 1:
            return 'mosquito2' // Se for 1, retorna a classe 'mosquito2'
        case 2:
            return 'mosquito3' // Se for 2, retorna a classe 'mosquito3'
    }
}

//Função para fazer o mosquito olhar para direita e esquerda aleatoriamente
function ladoAleatorio(){
    let classe = Math.floor(Math.random() * 2) // Gera um número aleatório entre 0 e 1

    // Escolhe uma classe CSS diferente dependendo do número gerado
    switch(classe) {
        case 0:
            return 'ladoA' // Se o número for 0, retorna a classe 'ladoA'
        case 1:
            return 'ladoB' // Se for 1, retorna a classe 'ladoB'
    }
}

