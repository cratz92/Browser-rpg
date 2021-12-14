class Pokemon {
    constructor(name, sprite, hp, moves) {
        this.name = name;
        this.sprite = sprite;
        this.hp = hp;
        this.fullHp = hp;
        this.moves = moves;
    }
}

let pkmList = [
    [
        "Charizard",
        [["sprites/sprites/pokemon/6.png"], ["sprites/sprites/pokemon/back/6.png"]],
        360,
        [
            ["Flamethrower", "fire", 95, 0.95],
            ["Dragon Claw", "dragon", 80, 0.95],
            ["Air Slash", "fly", 75, 0.85],
            ["Slash", "normal", 70, 0.8],
        ],
    ],
    [
        "Blastoise",
        [["sprites/sprites/pokemon/9.png"], ["sprites/sprites/pokemon/back/9.png"]],
        362,
        [
            ["Surf", "water", 90, 0.95],
            ["Crunch", "normal", 80, 0.95],
            ["Ice Punch", "ice", 75, 0.95],
            ["Flash Cannon", "steel", 80, 0.95],
        ],
    ],
    [
        "Venusaur",
        [["sprites/sprites/pokemon/3.png"], ["sprites/sprites/pokemon/back/3.png"]],
        364,
        [
            ["Petal Blizzard", "grass", 90, 0.95],
            ["Sludge Bomb", "poison", 90, 0.95],
            ["Earthquake", "ground", 100, 0.95],
            ["Body Slam", "normal", 85, 0.95],
        ],
    ],
];

let typeMatch = {
    Charizard: [["ground"], ["water", "rock"], ["fire", "grass", "steel"]],
    Blastoise: [[""], ["grass"], ["fire", "water"]],
    Venusaur: [["poison"], ["fire", "fly", "ice", "steel"], ["grass", "water"]],
};

function spawn(bool) {
    let p = pkmList[Math.floor(Math.random() * pkmList.length)];
    let pkm = new Pokemon(p[0], p[1], p[2], p[3]);

    if (bool) {
        for (i = 0; i < 4; i++) {
            document.getElementById("m" + i).value = pkm.moves[i][0];
        }
    }
    return pkm;
}

let canvas1 = document.getElementById("canvas-hp1");
let ctx1 = canvas1.getContext("2d");

ctx1.fillStyle = "green";
ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

let canvas2 = document.getElementById("canvas-hp2");
let ctx2 = canvas2.getContext("2d");

ctx2.fillStyle = "green";
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

let pk1 = spawn(true);
s1 = document.createElement("img");
s1.src = pk1.sprite[1];
document.getElementById("pk1").appendChild(s1);
document.getElementById("hp1-text").innerHTML = "<p>HP: " + pk1.hp + "/" + pk1.fullHp + "</p>";

let pk2 = spawn(false);
while (pk2.name === pk1.name) {
    pk2 = spawn(false);
}
s2 = document.createElement("img");
s2.src = pk2.sprite[0];
document.getElementById("pk2").appendChild(s2);
document.getElementById("hp2-text").innerHTML = "<p>HP: " + pk2.hp + "/" + pk2.fullHp + "</p>";

for (i = 0; i < 4; i++) {
    let btn = document.getElementById("m" + i);
    let move = pk1.moves[i];
    function addHandler(btn, move, pk1, pk2) {
        btn.addEventListener("click", function (e) {
            attack(move, pk1, pk2, "hp2", "");
			if ()
			{

			}
            setTimeout(attack, 2000, pk2.moves[Math.floor(Math.random() * 3)], pk2, pk1, "hp1", "Foe ");
        });
    }
    addHandler(btn, move, pk1, pk2);
}

function attack(move, attacker, receiver, hp, owner) {
    document.getElementById("comment").innerHTML = "<p>" + owner + attacker.name + " used " + move[0] + "!</p>";
    if (Math.random() < move[3]) {
        let power = (move[2] += Math.floor(Math.random() * 10));
        let rType = typeMatch[receiver.name];
        let mType = move[1];
        let scale = 1;

        for (i = 0; i < rType.length; i++) {
            if (rType[i].includes(mType)) {
                switch (i) {
                    case 0:
                        scale = 0;
                        setTimeout(function () {
                            document.getElementById("comment").innerHTML = "<p>It had no effect!</p>";
                        }, 1000);
                        break;
                    case 1:
                        scale = 2;
                        setTimeout(function () {
                            document.getElementById("comment").innerHTML = "<p>It was super effective!</p>";
                        }, 1000);
                        break;
                    case 2:
                        scale = 0.5;
                        setTimeout(function () {
                            document.getElementById("comment").innerHTML = "<p>It was not very effective!</p>";
                        }, 1000);
                        break;
                }
                break;
            }
        }
        power *= scale;
        receiver.hp -= Math.floor(power);
        document.getElementById(hp + "-text").innerHTML = "<p>HP: " + receiver.hp + "/" + receiver.fullHp + "</p>";
        let percent = Math.floor((receiver.hp * 150) / receiver.fullHp);
        if (receiver === pk1) {
            ctx1.clearRect(percent, 0, canvas1.width - percent, canvas1.height);
        } else {
            ctx2.clearRect(percent, 0, canvas2.width - percent, canvas2.height);
        }
    } else {
        setTimeout(function () {
            document.getElementById("comment").innerHTML = "<p>Attack missed!</p>";
        });
    }
  //  checkWinner(hp);
}


function checkPokemonHp(attacker, receiver){
	let f = pk1.hp <= 0 ? pk1 : pk2.hp <= 0 ? pk2 : false;

	return (f)
}


function checkWinner(auto) {
    let f = auto;
    if (f != false) {
        alert("GAME OVER: " + f.name + " fainted!");
        document.getElementById(hp + "-text").innerHTML = "<p>HP: 0/" + f.fullHp + "</p>";
        if (f === pk1) {
            ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
        } else {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        }
        setTimeout(function () {
            location.reload();
        }, 1500);
    }
}
