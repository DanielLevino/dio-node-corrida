const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0
 }
 const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0
 }

 async function rollDice() {
	return Math.floor(Math.random()*6)+1
 }

 async function getRandomBlock() {
    let random = Math.random();
    let result

    switch (true) {
        case random < 0.33:
            result = "RETA";
            break;
        
        case random < 0.66:
            result = "CURVA";
            break;
    
        default:
            result = "CONFRONTO"
            break;
    }

	return result
 }

 async function logRollResult(charName, block, dice, attrib){
    console.log(`${charName} rolou um 🎲 de ${block} ${dice} + ${attrib} = ${dice+attrib}`)
 }

 async function playRaceEngine(character1, character2) {
	for(let round = 1; round<=10; round++){
        //star round
		console.log(`🏁 Rodada ${round}`);
		
        // get block
		let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // get players dice
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        // test player habilits
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(character1.NOME, "Velocidade", diceResult1, character1.VELOCIDADE)
            await logRollResult(character2.NOME, "Velocidade", diceResult2, character2.VELOCIDADE)
        } else if(block === "CURVA"){
            
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "Manobrabilidade", diceResult1, character1.MANOBRABILIDADE)
            await logRollResult(character2.NOME, "Manobrabilidade", diceResult2, character2.MANOBRABILIDADE)
        } else {
            
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} confrontou com ${character2.NOME}`);

            await logRollResult(character1.NOME, "Poder", diceResult1, character1.PODER)
            await logRollResult(character2.NOME, "Poder", diceResult2, character2.PODER)

            if(powerResult1>powerResult2){
                if(character2.PONTOS > 0){
                    console.log(`${character2.NOME} perdeu ponto`);
                    character2.PONTOS--;
                }else{
                    console.log(`${character2.NOME} já está com ${character2.PONTOS} e não pode perder mais pontos`)
                }
            }else if(powerResult2>powerResult1){
                if(character1.PONTOS>0){
                    character1.PONTOS--;
                    console.log(`${character1.NOME} perdeu ponto`);
                }else {
                    console.log(`${character1.NOME} já está com ${character1.PONTOS} e não pode perder mais pontos`)

                }
            }

            if(powerResult1===powerResult2){
                console.log("Confronto empatado! Nenhum ponto foi perdido.");
            }
            
        }
        
        if(totalTestSkill1>totalTestSkill2){
            console.log(`${character1.NOME} marcou um ponto!`);
            character1.PONTOS++;
        }else if(totalTestSkill2>totalTestSkill1){
            console.log(`${character2.NOME} marcou um ponto!`)
            character2.PONTOS++;
        } else {
            // console.log('');
        }
        console.log("----------------------------");
        
	}
 }

 async function declareWinner(char1, char2){
    console.log("Resultado Final");
    console.log(`${char1.NOME}: ${char1.PONTOS} ponto(s)`);
    console.log(`${char2.NOME}: ${char2.PONTOS} ponto(s)`);
    
    if(char1.PONTOS > char2.PONTOS){
        console.log(`${char1.NOME} venceu a corrida! Parabéns!🏅`)
    }else if(char2.PONTOS > char1.PONTOS){
        console.log(`${char2.NOME} venceu a corrida! Parabéns!🏅`)
    }else {
        console.log("A corrida terminou em empate!");
    }
 }

 (async function main() {
  console.log(` -----------------
🏁 Corrida iniciada 🏁
Adversarios: ${player1.NOME} e ${player2.NOME}
Corrida Começando`);

await playRaceEngine(player1, player2);

await declareWinner(player1,player2);

 })()