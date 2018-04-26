package Bool;

import BaseClass.Exp;

public class LessEqual extends BiBool {
    public LessEqual(Exp left, Exp right) {
        super(left, right);
    }

    @Override
    public boolean eval() {
        return this.left.eval() <= this.right.eval();
    }
}
