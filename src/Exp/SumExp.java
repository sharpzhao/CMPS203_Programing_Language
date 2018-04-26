package Exp;

import BaseClass.Exp;

public class SumExp extends Exp {

    private Exp left;
    private Exp right;

    public SumExp(Exp left, Exp right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public int eval(){
        return this.left.eval() + this.right.eval();
    }
}
