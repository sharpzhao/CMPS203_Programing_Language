package Bool;

import BaseClass.Bool;

public class And extends Bool{
    private Bool left;
    private Bool right;

    public And(Bool left, Bool right) {
        this.left = left;
        this.right = right;
    }

    @Override
    public boolean eval() {
        return this.left.eval() && this.right.eval();
    }
}
