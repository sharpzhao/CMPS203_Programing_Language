package Bool;

import BaseClass.Bool;

public class Or extends Bool{
    private Bool left;
    private Bool right;

    public Or(Bool left, Bool right) {
        this.left = left;
        this.right = right;
    }
    @Override
    public boolean eval() {
        return this.left.eval() || this.right.eval();
    }
}
