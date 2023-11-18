class Overworld {
    constructor(config) {
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            // Clean the canvas before re-drawing
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            // Select who the camera will follow
            const cameraPerson = this.map.gameObjects.player_character;
            // Update all objects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
            })
            // Draw the map
            this.map.drawMap(this.ctx, cameraPerson);
            // Draw the objects contained in the map
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx, cameraPerson);
            })
            requestAnimationFrame(() => {
                step();
            })
        }
        step();
    }

    init() {

        this.map = new OverworldMap(window.OverworldMaps.GameStart);
        this.map.mountObjects();

        this.directionInput = new DirectionInput();
        this.directionInput.init();

        this.startGameLoop();
        
        this.map.startCutscene([
            { who:"player_character", type: "walk", direction: "down" },
            { who:"player_character", type: "walk", direction: "down" },
            { who:"player_character", type: "walk", direction: "right" },
            { who:"player_character", type: "stand", direction: "up", time: 1200 },
            { who:"npcA", type: "walk", direction: "down" }
        ])
    }
}