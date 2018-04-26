package OpExp;

import BaseClass.Exp;
import BaseClass.State;
import BaseClass.Command;

public class AssignCommand extends Command {
    private String varName;
    private Exp value;

    public AssignCommand(String varName, Exp value) {
        this.varName = varName;
        this.value = value;
    }
    @Override
    public void eval(){
        State.getInstance().put(this.varName, this.value.eval());
    }
}
