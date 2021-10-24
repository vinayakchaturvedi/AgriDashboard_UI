class Queue {
    constructor() {
        this.items = [];
    }

    enqueue(element) {
        this.items.push(element);
    }

    dequeue() {
        if (this.items.length === 0) return -1;
        return this.items.shift();
    }

    size() {
        return this.items.length;
    }
}

export default Queue