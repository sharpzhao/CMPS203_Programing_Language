package Exp;

import BaseClass.Exp;

public class SubExp extends Exp{
    private Exp left;
    private  Exp right;

    public SubExp(Exp left, Exp right) {
        this.left = left;
        this.right = right;
    }
    @Override
    public int eval(){
        return this.left.eval() - this.right.eval();
    }
}
