class TurnCycle {
    constructor({battle, onNewEvent, onWinner}) {
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.onWinner = onWinner;
        this.currentTeam = "player"
    }

    async turn() {
        const casterId = this.battle.activeCombatants[this.currentTeam];
        const caster = this.battle.combatants[casterId];
        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"];
        const enemy = this.battle.combatants[enemyId];

        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })

        if (submission.instanceId) {
            this.battle.items = this.battle.items.filter(i => i.instanceId !== submission.instanceId)
        }

        const resultingEvents = caster.getReplacedEvents(submission.action.success);
        for (let i = 0; i < resultingEvents.length; i++) {
            const event = {
                ...resultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            } 
            await this.onNewEvent(event);           
        }

        //Did the target die?
        const targetDead = submission.target.hp <= 0;
        if (targetDead) {
            await this.onNewEvent({
                type: "textMessage", text: `${submission.target.name} lost the battle!`
            })
            this.onWinner("player");
            return;
        }

        const postEvents = caster.getPostEvents();
        for (let i = 0; i < postEvents.length; i++) {
            const event = {
                ...postEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            }
            await this.onNewEvent(event);
        }

        const expiredEvent = caster.decrementStatus();
        if (expiredEvent) {
            await this.onNewEvent(expiredEvent)
        }

        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
    }

    async init() {
        /* await this.onNewEvent({
            type: "textMessage",
            text: "The battle is about to start!"
        }) */

        this.turn();
    }
}