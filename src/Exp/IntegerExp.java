package Exp;

import BaseClass.Exp;

public class IntegerExp extends Exp {
    private int value;


    public IntegerExp(int value) {
        this.value = value;
    }

    @Override
    public int eval() {
        return this.value;
    }
}
