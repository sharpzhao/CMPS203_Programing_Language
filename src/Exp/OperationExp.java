package Exp;

import BaseClass.Exp;

public class OperationExp extends Exp{
    private Exp left;
    private String operation;
    private Exp right;


    public OperationExp(Exp left, String operation, Exp right) {
        this.left = left;
        this.operation = operation;
        this.right = right;
    }

    @Override
    public int eval(){
        switch (this.operation) {

            case "+":
                return left.eval() + right.eval();
            case "-":
                return left.eval() - right.eval();
            case "*":
                return left.eval() * right.eval();
            // not sure if divide belongs to ARITH;
            case "/":
                if (right.eval() == 0) {
                    throw new ArithmeticException("divided by zero");
                }
                return left.eval() / right.eval();
            default:
                throw new ArithmeticException();
        }
    }
}
