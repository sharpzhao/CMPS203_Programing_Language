package Bool;

import BaseClass.Exp;

public class Great extends BiBool {
    public Great(Exp left, Exp right) {
        super(left, right);
    }

    @Override
    public boolean eval() {
        return this.left.eval() > this.right.eval();
    }
}
