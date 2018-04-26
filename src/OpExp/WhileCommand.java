package OpExp;

import BaseClass.Bool;
import BaseClass.Command;

public class WhileCommand extends Command {
    private Bool statement;
    private Command whileTrue;
    public WhileCommand(Bool statement, Command whileTrue) {
        this.statement = statement;
        this.whileTrue = whileTrue;
    }
    @Override
    public void eval() {
        if (this.statement.eval()) {
            this.whileTrue.eval();
            new WhileCommand(this.statement, this.whileTrue).eval();
        }
    }
}
