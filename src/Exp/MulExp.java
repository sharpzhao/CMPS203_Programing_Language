package Exp;

import BaseClass.Exp;

public class MulExp extends Exp{

    private Exp left;
    private Exp right;

    public MulExp(Exp left, Exp right) {
        this.left = left;
        this.right = right;
    }
    @Override
    public int eval(){
        return left.eval() * right.eval();
    }
}
