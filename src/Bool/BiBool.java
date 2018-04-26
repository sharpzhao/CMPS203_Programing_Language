package Bool;

import BaseClass.Bool;
import BaseClass.Exp;

public abstract class BiBool extends Bool{
    protected Exp left;
    protected Exp right;
    public BiBool(Exp left, Exp right) {
        this.left = left;
        this.right = right;
    }
}
