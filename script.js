// Boa Vista-Roraima
// by Dalmo Mendes (dalmosilvamendes@gmail.com)
// Meus Contatos
// https://ceproirr.com.br
// https://www.ceproirr.com.br/webagency
// https://www.ceproirr.com.br/suporte-tec
// https://facebook.com/ceproirr
// https://instagram.com/ceproirr
// https://twitter.com/ceproirr
// https://www.youtube.com/channel/UC9egIn_Xkg2KFD_55mi_r8w
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let nome = prompt("Para iniciar o Jogo! Informe seu nikename?");
let data = new Date();
const velocidade = 110;
let box = 32; // 32 pixel cada quadradinho
let snake = [];
let temp = 0;
snake[0] = {
	x: 8 * box,
	y: 8 * box
}
// NOVAS FUNCIONALIDADES
// Funções de Audios
let scoreGme = () => { // Quando fazer um ponto no jogo
    const scoreSom = new Audio('scoreGme.wav');
    scoreSom.play();
}
let overGme = () => { // Quando perder o jogo
    const overSom = new Audio('overGme.wav');
    overSom.play();
}
let stopGme = () => { // Quando parar o jogo
    const stopSom = new Audio('stopGme.wav');
    stopSom.play();
}

let direction = "right";
// criar comida de forma aleatório: randomica
let food = {
	x: Math.floor(Math.random() * 15 + 1) * box,
	y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
	// Desenhar Box na Tela
	context.fillStyle = "#a2e8f2"; // cor do fundo
	context.fillRect(0, 0, 16*box, 16*box); // desenha retângulo do jogo 
}

// Função para Criar a Cobra
function criarSnake(){
	for(i=0; i < snake.length; i++){
		//context.beginPath(); // NOVAS FUNCIONALIDADES
		context.fillText('Você iniciou o game Snake!', 70, 50);
		context.font = '16px Arial';
		context.fillStyle = "Black";
		context.arc(32,32,26,0, Math.PI * 2, true);
		context.arc(32,32,13,0, Math.PI * 2, true);
		context.fillRect(snake[i].x, snake[i].y, box, box);
		context.fill('evenodd');
		
	}
		// NOVAS FUNCIONALIDADES
		// Tempo de Jogo - 1m = 60000 milissegundos.
		// Exibição de Tempo na Tela + Score do Jogo
		temp = temp + i;
		context.fillText('Tempo: '+temp, 70, 16);
		context.fillText('Score: '+i, 70, 32);

		// Verificador de tempo e pontuação: 1m = 60000 milissegundos.
		if(temp >= 1000){
			clearInterval(game);
			stopGme(); // Chama a função de som
			switch (i) {
				case 1:
					alert('Precisa melhorar! ' + nome + '. Você fez ' + i+' ponto(s) em ' + temp + ' milesegundos.');
					break;
				case 2:
					alert('Bom! ' + nome + '. Você fez ' + i+' ponto(s) em ' + temp + ' milesegundos.');
					break;
				case 3:
					alert('Muito Bom! ' + nome + '. Você fez ' + i+' ponto(s) em ' + temp + ' milesegundos.');
					break;
				case 4:
					alert('Ótimo! ' + nome + '. Você fez ' + i+' ponto(s) em ' + temp + ' milesegundos.');
					break;
				case 5:
					alert('Excelente! ' + nome + '. Você fez ' + i+' ponto(s) em ' + temp + ' milesegundos.');
					break;
				case 6:
					alert('Top D+! ' + nome + '. Você fez ' + i+' ponto(s) em ' + temp + ' milesegundos.');
					break;
				default:
					alert(nome + '! Você se trasformou no Super Saiyajin - Brutal! ' + i+' ponto(s) em ' + temp + ' milesegundos.');
					break;
			 }
			
		}
}

function drawFood(){
	context.fillStyle = "orange";
	context.fillRect(food.x, food.y, box, box); 
}

// Evento de toque
document.addEventListener('keydown', update);
// Função para Atualizar Eventos
function update(event){
	if(event.keyCode == 37 && direction != "right") direction = "left";
	if(event.keyCode == 38 && direction != "down") direction = "up";
	if(event.keyCode == 39 && direction != "left") direction = "right";
	if(event.keyCode == 40 && direction != "up") direction = "down";
}
//Função para Iniciar Jogo
function startGame(){
	// NOVAS FUNCIONALIDADES
	// Exibi mensagem na tela com o nome do jogador
	// Além disso, mostra a data na tela (hora e minutos)
	document.getElementById("load").innerHTML = "Olá, " + nome + "! tenha um bom jogo. Hs:" + data.getHours()+":"+data.getMinutes();
	// regra para atravessar e voltar do outro lado
	if(snake[0].x > 15*box && direction == "rigth") snake[0].x = 0;
	if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
	if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
	if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

	for(i = 1; i < snake.length; i++){
		if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
			clearInterval(game);
			// // Executa um som quando perder o jogo
			alert('Game Over! ' + nome + '. Até a próxima!');
			overGme();
		}
	}

	criarBG();
	criarSnake();
	drawFood();
	// posição
	let snakeX = snake[0].x;
	let snakeY = snake[0].y;

	// Coordenadas para aumentar ou diminuir
	if(direction == "right") snakeX += box;
	if(direction == "left") snakeX -= box;
	if(direction == "up") snakeY -= box;
	if(direction == "down") snakeY += box;

	if(snakeX != food.x || snakeY != food.y){
		snake.pop(); // Tira último elemento da lista

	}else {
		scoreGme();
		food.x = Math.floor(Math.random() * 15 +1) * box;
		food.y = Math.floor(Math.random() * 15 +1) * box;
	}	
	// função "pop" para retirar o último elemento do Array
	//snake.pop();
	let newHead = {
		x: snakeX,
		y: snakeY
	}
	// Adiciona como primeiro quadrado da Snake.
	snake.unshift(newHead);
}

// NOVA FUNCIONALIDADE
// Chama a Função Parar Jogo
function stopGame(){
	clearInterval(game);
	stopGme(); // Chama a função de som
	alert('Você parou o jogo ' + nome + '.' + 'Tchau!');
}
// NOVA FUNCIONALIDADE
// Chama a Função Iniciar Jogo
function iniciarGame(){
	stopGme(); // Chama a função de som
	document.location.reload(true); // // Recarrega a página atual sem usar o cache
}

let game = setInterval(startGame, velocidade);
/* A cobrinha é um Array de elementos, vamos adicionar elementos no último ou removendo.*/