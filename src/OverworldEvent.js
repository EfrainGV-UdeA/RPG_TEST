class OverworldEvent {
    constructor({map, event}) {
        this.map = map;
        this.event = event;
    }

    stand(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })

        // resolve the event when the correct character is done walking
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("CharacterStandingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("CharacterStandingComplete", completeHandler)
    }

    walk(resolve) {
        const who = this.map.gameObjects[ this.event.who ];
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        // resolve the event when the correct character is done walking
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("CharacterWalkingComplete", completeHandler);
                resolve();
            }
        }
        document.addEventListener("CharacterWalkingComplete", completeHandler)
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}