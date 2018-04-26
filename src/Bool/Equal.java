package Bool;

import BaseClass.Exp;

public class Equal extends BiBool {
    public Equal(Exp left, Exp right) {
        super(left, right);
    }

    @Override
    public boolean eval() {
        return this.left.eval() == this.right.eval();
    }
}
