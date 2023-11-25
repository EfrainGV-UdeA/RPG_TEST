class BattleEvent {
    constructor(event, battle) {
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve) {

        const text = this.event.text
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.action?.name)

        const message = new TextMessage({
            text,
            onComplete: () => {
                resolve();
            }
        })
        message.init( this.battle.element )
    }

    async stateChange(resolve) {
        const {caster, target, damage, recover, status, action} = this.event;
        let who = this.event.onCaster ? caster : target;

        if (damage) {
            target.update({
                hp: target.hp - damage
            })

            target.entityElementContainer.classList.add("battle-damage-blink");
            //target.entityElement.setAttribute("battle-damage-blink", "true");
        }

        if (recover) {
            let newHp = who.hp + recover;
            if (newHp > who.maxHp) {
                newHp = who.maxHp;
            }
            who.update({
                hp: newHp
            })
        }

        if (status) {
            who.update({
                status: {...status}
            })
        }
        if (status === null) {
            who.update({
                status: null
            })
        }

        await utils.wait(600)

        target.entityElementContainer.classList.remove("battle-damage-blink");
        //target.entityElement.setAttribute("battle-damage-blink", "false");
        resolve();
    }

    submissionMenu(resolve) {
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            items: this.battle.items,
            onComplete: submission => {
                //submission
                resolve(submission)
            }
        })
        menu.init(this.battle.element);
    }

    init(resolve) {
        this[this.event.type](resolve);
    }
}