class Battle {
    constructor() {
        this.combatants = {
            "player1": new Combatant({
                ...Entities.npcHumanRed,
                team: "player",
                hp: 75,
                maxHp: 120,
                xp: 75,
                maxXp: 150,
                level: 3,
                status: null
            }, this),
            "enemy1": new Combatant({
                ...Entities.npcShadowBandit,
                team: "enemy",
                hp: 100,
                maxHp: 100,
                xp: 0,
                maxXp: 100,
                level: 2,
                status: null
            }, this),
            "enemy2": new Combatant({
                ...Entities.npcPriest,
                team: "enemy",
                hp: 50,
                maxHp: 50,
                xp: 0,
                maxXp: 50,
                level: 1,
                status: null
            }, this)
        }
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy2"
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Battle");
        this.element.innerHTML = (`
        <div class="Battle_player">
            <img src="${'assets/sprites/NPC_GodOfLight.png'}" alt="Player" />
        </div>
        <div class="Battle_enemy">
            <img src="${'assets/sprites/NPC_GodOfDarkness.png'}" alt="Enemy" />
        </div>
        `)
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach(key => {
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element)
        })
    }
}