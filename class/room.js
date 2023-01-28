class Room {

    constructor(name, description) {
        this.name = name;
        this.description = description;
        this.exits = {};
        this.items = [];
    }

    printRoom() {
        console.clear();
        console.log("");
        console.log(this.name);
        console.log("");
        console.log(this.description);
        console.log("");
        if (this.items.length > 0) {
            console.log(`Items: ${this.items.map(item => item.name).join(", ")}`);
        }
        console.log(this.getExitsString());
        console.log("");
    }

    getExits() {
        return Object.keys(this.exits);
    }

    getExitsString() {
        return `Exits: ${this.getExits().join(", ")}`
    }

    connectRooms(direction, connectingRoom) {

        // Check if the direction and connecting room are valid
        if (['n', 's', 'e', 'w'].indexOf(direction) < 0 || !connectingRoom) {
            throw new Error("Error: Invalid room connection");
        }

        this.exits[direction] = connectingRoom;
    }

    // Method for removing item in Room items array
    removeItem(name) {
        let index = this.items.findIndex(item => item == name);
        return this.items.splice(index, 1)[0]
    }

    getRoomInDirection(direction) {
        return this.exits[direction];
    }

    addItem(item) {
        this.items.push(item)
    }

    getItemByName(name) {
        for (let item of this.items){
            if(item.name == name){
                return this.removeItem(name)
            }
        }
    }

}

module.exports = {
  Room,
};
