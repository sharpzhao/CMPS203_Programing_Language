
// Arith
class Exp {
    eval() {
        throw new Error("Must implement eval() function")
    }
}

class BiExp {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
}

class IntExp extends Exp {
    constructor(value) {
        super();
        this.value = value;
    }
    eval() {
        return this.value;
    }
}

class VarExp extends Exp {
    constructor(name) {
        super();
        this.name = name;
    }

    eval() {
        if (!state.has(this.name)) throw new Error("viriable not assign exception");
        return state.get(this.name);
    }
}

class SumExp extends BiExp {
    eval() {
        return this.left.eval() + this.right.eval();
    }
}

class SubExp extends BiExp {
    eval() {
        return this.left.eval() - this.right.eval();
    }
}

class DivExp extends BiExp {
    eval() {
        if (this.right.eval === 0) {
            throw new Error("divided by 0 error");
        }
        return this.left.eval() / this.right.eval();
    }
}

class MulExp extends BiExp {
    eval() {
        return this.left.eval() * this.right.eval();
    }
}


//Bool

class Bool {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }
    eval() {
        throw new Error("Must implement eval() function")
    }
}

class False {
    constructor() {
    }

    eval() {
        return false;
    }
}

class True {
    constructor() {
    }

    eval() {
        return true;
    }
}

class And extends Bool {
    eval() {
        return this.left.eval() && this.right.eval();
    }
}

class Or extends Bool {
    eval() {
        return this.left.eval() || this.right.eval();
    }
}

class Great extends Bool {
    eval() {
        return this.left.eval() > this.right.eval();
    }
}

class GreatEqual extends Bool {
    eval() {
        return this.left.eval() >= this.right.eval();
    }
}

class Equal extends Bool {
    eval() {
        return this.left.eval() == this.right.eval();
    }
}

class Less extends Bool {
    eval() {
        return this.left.eval() < this.right.eval();
    }
}

class LessEqual extends Bool {
    eval() {
        return this.left.eval() <= this.right.eval();
    }
}


//Command

class Command {
    eval() {
        throw new Error("Must implement eval(state) function")
    }
}

class AssignCommand extends Command {
    constructor(name, value) {
        super();
        this.name = name;
        this.value = value;
    }

    eval() {
        state.set(this.name, this.value.eval());
    }
}

class IfElseCommand extends Command {
    constructor(statement, ifTrue, ifFalse) {
        super();
        this.statement = statement;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
    }

    eval() {
        if (this.statement.eval()) {
            return this.ifTrue.eval();
        } else {
            return this.ifFalse.eval();
        }
    }
}

class SeqCommand extends Command {
    constructor(left, right) {
        super();
        this.left = left;
        this.right = right;
    }

    eval() {
        let s0 = this.left.eval();
        return this.right.eval();
    }
}

class SkipCommand extends Command {
    eval() {
    }
}


class WhileCommand extends Command {
    constructor(statement, whileTrue) {
        super();
        this.statement = statement;
        this.whileTrue = whileTrue;
    }

    eval() {
        if (this.statement.eval()) {
            this.whileTrue.eval();
            new WhileCommand(this.statement, this.whileTrue).eval();
        }
    }
}


/**
 *  var x = 0;
 *  while (x < 5) do x = x + 1;
 */
const first = new SeqCommand(
    new AssignCommand("x", new IntExp(0)),
    new WhileCommand(
        new Less(new VarExp("x"), new IntExp(5)),
        new AssignCommand("x", new SumExp(
            new VarExp("x"),
            new IntExp(1)
        )
        )
    )
);
//define state;
let state = new Map();
//eval the statement;
first.eval();

//check variable x === 5;
console.log(state.get("x"));


/**
 *
 * Exp arith = 1 * 2 + 8 / (6 - 2)
 *
 * var x = 0;
 * var y = 0;
 *
 * Bool statement1 = false || x == y;
 * Bool statement2 = 1 > x;
 *
 * if (true && (statement1 && statement2)) {
 *      x = x + 1;
 * } else {
 *      skip;
 * }
 *
 * while (x < arith) do x = x + 1;
 *
 *
 * expect answer: x = 4;
 */

const arith = new SumExp(
    new MulExp(
        new IntExp(1),
        new IntExp(2)
    ),
    new DivExp(
        new IntExp(8),
        new SubExp(
            new IntExp(6),
            new IntExp(2)
        )
    )
);

const assignX = new AssignCommand("x", new IntExp(0));
const assignY = new AssignCommand("y", new IntExp(0));

const statement1 = new Or(
    new False(),
    new Equal(new VarExp("x"), new VarExp("y"))
);

const statement2 = new Great(
    new IntExp(1),
    new VarExp("x")
);

const ifElse = new IfElseCommand(
    new And(
        new True(),
        new And(statement1, statement2)
    ),
    new AssignCommand(
        "x",
        new SumExp(
            new VarExp("x"),
            new IntExp(1)
        )
    ),
    new SkipCommand()
);

const seq1 = new SeqCommand(
    assignX,
    assignY
);

const seq2 = new SeqCommand(
    seq1,
    ifElse
);

const main = new SeqCommand(
    seq2,
    new WhileCommand(
        new Less(
            new VarExp("x"),
            arith
        ),
        new AssignCommand(
            "x",
            new SumExp(
                new VarExp("x"),
                new IntExp(1)
            )
        )
    )
);

main.eval();
console.log(state);