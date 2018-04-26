package OpExp;

import BaseClass.Bool;
import BaseClass.Command;

public class IfElseCommand extends Command {
    private Bool statement;
    private Command ifTrue;
    private Command ifFalse;

    public IfElseCommand(Bool statement, Command ifTrue, Command ifFalse) {
        this.statement = statement;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
    }
    @Override
    public void eval() {
        if (statement.eval()) {
            this.ifTrue.eval();
        } else {
            this.ifFalse.eval();
        }
    }
}
