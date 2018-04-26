package Bool;

import BaseClass.Exp;

public class Less extends BiBool {
    public Less(Exp left, Exp right) {
        super(left, right);
    }

    @Override
    public boolean eval() {
        return this.left.eval() < this.right.eval();
    }
}
