// const b = {
//     a: 10,
//     b: 20
// };

// type A = {
//     a: number
// }

// const a : A = b;
// console.log(a);

// let a: true = true;
// a = false;

interface Person {
    name: string;
}

type Person1 = {
    name: string;
}

interface Person {
    age: number;
}

let variable: Person = {
    name: "Daniel",
    age: 22
};

// interface Student extends Person {
//     fn: string;
// }

// const student: Student = {
//     name: "Daniel",
//     age: 22,
//     fn: '71882'
// }

type ProgramsFMI = 'IS' | 'KN' | 'I';

const program: ProgramsFMI = 'IS';

interface Something {
    someProp: number;
}

// const intersectionExample: Person & Something = {
//     someProp: 10,
//     name: 'da',
//     age: 12
// }

enum SomeEnum {
    first = 0
}

const object: {
    a: number
} = {
    a: 10
}

class Student {
    private fn: number
    constructor(fn: number) {
        this.fn = fn;
    }

    get getFn() {
        return this.fn;
    }

    set setFn(value: number) {
        this.fn = value;
    }

}

const student: Student = new Student(71882);