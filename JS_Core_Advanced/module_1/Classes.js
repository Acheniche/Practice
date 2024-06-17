class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    calcArea() {
        return this.width * this.height;
    }

    calcPerimetr() {
        return 2 * (this.width + this.height);
    }
}

let newRectangle = new Rectangle(3, 5);

console.log(`Area ${newRectangle.calcArea()}`);
console.log(`Perimetr ${newRectangle.calcPerimetr()}`);
