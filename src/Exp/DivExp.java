package Exp;

import BaseClass.Exp;

public class DivExp extends Exp{

    private Exp left;
    private Exp right;

    public DivExp(Exp left, Exp right) {
        this.left = left;
        this.right = right;
    }
    @Override
    public int eval(){

        if (this.right.eval() == 0) {
            throw new ArithmeticException();
        }

        return this.left.eval() / this.right.eval();
    }
}
