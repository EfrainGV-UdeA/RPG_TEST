class Battle {
    constructor({onComplete}) {
        this.onComplete = onComplete
        this.combatants = {
            "player1": new Combatant({
                ...Entities.npcHumanRed,
                team: "player",
                hp: 75,
                maxHp: 120,
                xp: 75,
                maxXp: 150,
                level: 3,
                status: null,
                isPlayerControlled: true
            }, this),
            "enemy1": new Combatant({
                ...Entities.npcShadowBandit,
                team: "enemy",
                hp: 15,
                maxHp: 15,
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
            enemy: "enemy1"
        }
        this.items = [
            { actionId: "item_cleansingPotion", instanceId: "p1", team: "player" },
            { actionId: "item_cleansingPotion", instanceId: "p2", team: "player" },
            { actionId: "item_cleansingPotion", instanceId: "p3", team: "enemy" },
            { actionId: "item_healingPotion", instanceId: "p4", team: "player" },

        ]
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

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const battleEvent = new BattleEvent(event, this)
                    battleEvent.init(resolve);
                })
            },
            onWinner: winner => {
                if (winner === "player") {
                    this.element.remove();
                    this.onComplete();
                }
            }
        })
        this.turnCycle.init();
    }
}