class Character extends GameObject {
    constructor(config) {
        super(config);
        this.IsPlayerControlled = config.IsPlayerControlled || false;
        this.movingProgressRemaining = 0;

        this.directionUpdate = {
            "up" : ["y", -1],
            "down" : ["y", 1],
            "left" : ["x", -1],
            "right" : ["x", 1],
        }
    }

    update(state) {
        if (this.movingProgressRemaining > 0) {
            this.updatePosition();
        } else {
            // Case 1: Player *can* provide input and is currently pressing a key
            if (this.IsPlayerControlled && state.arrow) {
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
            // Other cases of movement will be considered here
            this.updateSprite(state);
        }  
    }

    startBehavior(state, behavior) {
        // The character will move in wichever direction the behavior tells him to
        this.direction = behavior.direction;
        if (behavior.type === "walk") {
            // Stop the character from moving if the space is not free
            if (state.map.isSpaceTaken(this.x, this.y, this.direction)) {
                return;
            };
            // If the space is not taken then move the character
            state.map.moveWall(this.x,this.y,this.direction);
            this.movingProgressRemaining = 16;
        }
    }


    updatePosition() { 
        const [property, change] = this.directionUpdate[this.direction]
        this[property] += change;
        this.movingProgressRemaining -= 1;

        if (this.movingProgressRemaining === 0) {
            // Character has completed movement
            utils.emitEvent("CharacterWalkingComplete", {
                whoId: this.id
            })
        }
    }

    updateSprite() {
        if (this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-" + this.direction);
            return;
        }
        this.sprite.setAnimation("idle-" + this.direction);
    }
}