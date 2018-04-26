package Exp;

import BaseClass.Exp;
import BaseClass.State;

public class VarExp extends Exp {
    private String name;
    public VarExp(String name) {
        this.name = name;
    }
    @Override
    public int eval(){
        Integer ans = State.getInstance().get(this.name);
        if (null == ans) {
            throw new NullPointerException();
        }
        return ans;
    }
}
