export { Unit, Feet, Meter, Mile, Inch, Kilometer, Centimeter };

interface Unit {
    value: number;
}

class Kilometer {
    value: number;
    constructor(value: number) {
        this.value = value;
    }

    toMeter() {
        return new Meter(this.value*1000);
    }

    toCentimeter() {
        return new Centimeter(this.value*100000);
    }

    toMile() {
        return new Mile(this.value/1.609);
    }

    toFeet() {
        return new Feet(this.value*3280.84);
    }

    toInch() {
        return new Inch(this.value*39370.1);
    }
}

class Meter {
    value: number;
    constructor(value: number) {
        this.value = value;
    }

    toFeet() {
        return new Feet(this.value*3.281);
    }
}

class Centimeter {
    value: number;
    constructor(value: number) {
        this.value = value;
    }

    toMeter() {
        return new Meter(this.value/100);
    }

    toInch() {
        return new Inch(this.value/2.54);
    }
}

class Mile {
    value: number;
    constructor(value: number) {
        this.value = value;
    }

    toKilometer() {
        return new Kilometer(this.value*1.609);
    }

    toFeet() {
        return new Feet(this.value*5280);
    }
}

class Feet {
    value: number;
    constructor(value: number) {
        this.value = value;
    }

    toMile() {
        return new Mile(this.value/5280);
    }

    toInch() {
        return new Inch(this.value*12);
    }

    toMeter() {
        return new Meter(this.value/3.281);
    }
}

class Inch {
    value: number;
    constructor(value: number) {
        this.value = value;
    }

    toFeet() {
        return new Feet(this.value/12);
    }

    toCentimeter() {
        return new Centimeter(this.value*2.54);
    }
}
