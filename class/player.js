const {Food} = require('./food')

class Player {

    constructor(name, startingRoom) {
        this.name = name;
        this.currentRoom = startingRoom;
        this.items = [];
    }

    // Method for removing item in Player's inventory
    removeItem(name) {
        let index = this.items.findIndex(item => item == name);
        return this.items.splice(index, 1)[0];
    }

    move(direction) {

        const nextRoom = this.currentRoom.getRoomInDirection(direction);

        // If the next room is valid, set the player to be in that room
        if (nextRoom) {
            this.currentRoom = nextRoom;

            nextRoom.printRoom(this);
        } else {
            console.log("You cannot move in that direction");
        }
    }

    printInventory() {
        if (this.items.length === 0) {
            console.log(`${this.name} is not carrying anything.`);
        } else {
            console.log(`${this.name} is carrying:`);
            for (let i = 0 ; i < this.items.length ; i++) {
                console.log(`  ${this.items[i].name}`);
            }
        }
    }

    takeItem(itemName) {
        return this.items.push(this.currentRoom.removeItem(itemName))
    }

    dropItem(itemName) {
        return this.currentRoom.addItem(this.removeItem(itemName))
    }

    eatItem(itemName) {
        this.items.forEach((item, index) => {
            if (item.name == itemName && item instanceof Food) {
                return this.items.splice(index, 1)
            }
        })
    }

    getItemByName(name) {
        for (let item of this.items) {
            if (item.name == name) {
                return this.removeItem(name)
            }
        }
    }
}

module.exports = {
  Player,
};
