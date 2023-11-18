class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.tiledMap = new Image();
        this.tiledMap.src = config.tiledMapSrc;
        this.isCutscenePlaying = false;
    }

    drawMap(ctx, cameraPerson){
        ctx.drawImage(this.tiledMap, utils.widthGrid(11.5) - cameraPerson.x, utils.widthGrid(7.5) - cameraPerson.y)
    }

    isSpaceTaken(currentX, currentY, direction) {
        const {x,y} = utils.nextPosition(currentX, currentY, direction)
        return this.walls[`${x},${y}`] || false;
    }

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
            let object = this.gameObjects[key];
            object.id = key;
            object.mount(this);
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true;
        // Start the loop of events from the cutscene and wait for each one to complete
        for (let i = 0; i < events.length; i++) {
            const eventHandler = new OverworldEvent({
                event: events[i],
                map: this
            });
            await eventHandler.init();
            
        }
        this.isCutscenePlaying = false;

        // Reset the NPC's behavior
        Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this));
    }

    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
    }

    removeWall(x,y) {
        delete this.walls[`${x},${y}`];
    }
    moveWall(oldX, OldY, direction) {
        this.removeWall(oldX,OldY);
        const {x,y} = utils.nextPosition(oldX,OldY,direction);
        this.addWall(x,y);
    }

}

window.OverworldMaps = {
    GameStart: {
        tiledMapSrc: "assets/sprites/Scene0.png",
        gameObjects: {
            player_character: new Character({
                IsPlayerControlled: true,
                x: utils.widthGrid(7),
                y: utils.widthGrid(7),
            }),
            npcA: new Character({
                x: utils.widthGrid(8),
                y: utils.widthGrid(7),
                src: "assets/sprites/WizardPlayer.png",
                behaviorLoop: [
                    { type: "walk", direction: "right" },
                    { type: "stand", direction: "up", time: 800 },
                    { type: "walk", direction: "up" },
                    { type: "walk", direction: "left" },
                    { type: "walk", direction: "down" }
                ]
            })
        },
        walls: {
            [utils.asGridCoord(5,6)] : true,
            [utils.asGridCoord(5,7)] : true,
            [utils.asGridCoord(5,8)] : true,
            [utils.asGridCoord(5,9)] : true,
        }
    },
    DirtRoadToCity: {
        tiledMapSrc: "assets/sprites/Scene1.png",
        gameObjects: {
            player_character: new Character({
                IsPlayerControlled: true,
                x: utils.widthGrid(7),
                y: utils.widthGrid(7),
            })            
        }
    },
}