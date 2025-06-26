import { players } from "./players.js";

var player1, player2;


/**
 * 
 * @returns a random number between 1 to 6
 */
async function rollDice() {
	return Math.floor(Math.random()*6)+1
}

/**
 * get a random block between 3 types.
 * 
 * @returns a string with a block name
 */
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

/**
 * print a name of character with the value of your dice and
 * your attribuite with result of the sum of them for the block type
 * 
 * @param {string} charName name of character
 * @param {string} block type of block
 * @param {number} dice value of dice
 * @param {number} attrib value of attribute
 */
async function logRollResult(charName, block, dice, attrib){
    console.log(`${charName} rolou um 🎲 de ${block} ${dice} + ${attrib} = ${dice+attrib}`)
}

/**
 * return a rando weapon name with a 1/3 chance of
 * Bomba and 2/3 chance of Casco
 * 
 * @returns a string with type of weapon
 */
async function getRandomWeapon(){
    let rand = Math.random();
    return rand > 0.33 ? "Casco" : "Bomba" ;
}

/**
 * run a game with 2 player
 * 
 * @param {player} character1 player 1
 * @param {player} character2 player 2
 */
async function playRaceEngine(character1, character2) {
	for(let round = 1; round<=5; round++){
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
                    let weapon = await getRandomWeapon();
                    let damage = weapon == "Casco" ? 1 : 2
                    
                    character2.PONTOS = character2.PONTOS >= damage ? character2.PONTOS - damage : 0;
                    
                    console.log(`${character1.NOME} usou ${weapon} e ${character2.NOME} perdeu ${damage} ponto(s)`);
                }else{
                    console.log(`${character2.NOME} já está com ${character2.PONTOS} e não pode perder mais pontos`)
                }
            }else if(powerResult2>powerResult1){
                if(character1.PONTOS>0){
                    let weapon = await getRandomWeapon();
                    let damage = weapon == "Casco" ? 1 : 2
                    
                    character1.PONTOS = character1.PONTOS >= damage ? character1.PONTOS - damage : 0;
                    
                    console.log(`${character2.NOME} usou ${weapon} e ${character1.NOME} perdeu ${damage} ponto(s)`);
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
        console.log(`
Resumo dos pontos!
${character1.NOME}: ${character1.PONTOS} ponto(s).
${character2.NOME}: ${character2.PONTOS} ponto(s).

-----------------------------`)
        
	}
}

/**
 * declare a winner between 2 players
 * @param {player} char1 player 1
 * @param {player} char2 player 2
 */
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

/**
 * Run the game
 */
(async function main() {

    player1 = players[await rollDice() -1];
    player2 = players[await rollDice() -1];
  console.log(` -----------------
🏁 Corrida iniciada 🏁
Adversarios: ${player1.NOME} e ${player2.NOME}
Corrida Começando`);

await playRaceEngine(player1, player2);

await declareWinner(player1, player2);

})()