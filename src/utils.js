const utils = {
    widthGrid(n) {
        return n * 16
    },
    asGridCoord(x,y) {
        return `${x*16},${y*16}`
    },
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 16
        switch (direction) {
            case "left":
                x -= size;
                break;
            case "right":
                x += size;
                break;
            case "up":
                y -= size;
                break;
            case "down":
                y += size;
                break;
        }
        return {x,y};
    },

    oppositeDirection(direction) {
        const directionMap = {
            "left": "right",
            "right": "left",
            "up": "down",
            "down": "up"
        };
    
        return directionMap[direction] || "up";
    },
    
    wait(ms) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve()
          }, ms)
        })
    },

    randomFromArray(array) {
        return array[ Math.floor(Math.random()*array.length) ]
    },

    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    },

    findElementPositions(width, height, flatArray) {
        const result = {};
      
        for (let i = 0; i < flatArray.length; i++) {
          const col = i % width;
          const row = Math.floor(i / width);
      
          if (flatArray[i] === 1908) {
            const position = utils.asGridCoord(col + 1, row);
            result[[position]] = true;
          }
        }
      
        return result;
    }

}