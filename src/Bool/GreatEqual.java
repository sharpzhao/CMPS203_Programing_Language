package Bool;

import BaseClass.Exp;

public class GreatEqual extends BiBool {

    public GreatEqual(Exp left, Exp right) {
        super(left, right);
    }

    @Override
    public boolean eval() {
        return this.left.eval() >= this.right.eval();
    }
}
