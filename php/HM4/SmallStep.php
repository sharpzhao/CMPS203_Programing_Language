<?php
abstract class Exp
{
    abstract function eval($state);
    abstract function getPrint();
}

abstract class BiExp extends Exp
{
    protected $left;
    protected $right;
    public function __construct($left, $right)
    {
        $this->left = $left;
        $this->right = $right;
    }
}

class IntExp extends Exp
{
    private $value;

    public function __construct($value)
    {
        $this->value = $value;
    }

    /**
     * @override
     */

    function getPrint() {
        return "$this->value";
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->value;
    }
}

class VarExp extends Exp
{
    private $name;
    public function __construct($name)
    {
        $this->name = $name;
    }

    /**
     * @override
     */

    function getPrint() {
        return "$this->name";
    }

    /**
     * @override
     */
    function eval($state) {
        if (!isset($state[$this->name])) {
            throw new Exception("Variable not assign exception");
        }
        return $state[$this->name];
    }
}

class SumExp extends BiExp
{
    /**
     * @override
     */

    function getPrint() {
        return $this->left->getPrint() . " + " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) + $this->right->eval($state);
    }
}

class SubExp extends BiExp
{
    function getPrint() {
        return $this->left->getPrint() . " - " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) - $this->right->eval($state);
    }
}

class DivExp extends BiExp
{
    function getPrint() {
        return $this->left->getPrint() . " / " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        if ($this->right->eval($state) == 0) {
            throw new Exception("divided by 0 error");
        }
        return $this->left->eval($state) / $this->right->eval($state);
    }
}

class MulExp extends BiExp
{
    function getPrint() {
        return $this->left->getPrint() . " * " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) * $this->right->eval($state);
    }
}

abstract class BoolExp
{
    protected $left;
    protected $right;
    public function __construct($left, $right)
    {
        $this->left = $left;
        $this->right = $right;
    }

    abstract function getPrint();
    abstract function eval($state);
}

class FalseExp
{
    function getPrint() {
        return "False";
    }
    function eval($state) {
        return false;
    }
}

class TrueExp
{
    function getPrint() {
        return "True";
    }
    function eval($state) {
        return true;
    }
}

class AndOp extends BoolExp
{
    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . " && " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) && $this->right->eval($state);
    }
}

class OrOp extends BoolExp
{
    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . " || " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) || $this->right->eval($state);
    }
}

class Great extends BoolExp
{
    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . " > " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) > $this->right->eval($state);
    }
}

class GreatEqual extends BoolExp
{
    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . " >= " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) >= $this->right->eval($state);
    }
}

class Equal extends BoolExp
{
    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . " == " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) == $this->right->eval($state);
    }
}

class Less extends BoolExp
{
    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . " < " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) < $this->right->eval($state);
    }
}

class LessEqual extends BoolExp
{
    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . " <= " . $this->right->getPrint();
    }

    /**
     * @override
     */
    function eval($state) {
        return $this->left->eval($state) <= $this->right->eval($state);
    }
}

abstract class Com
{
    abstract function getPrint();
    abstract function eval($state);
}

class Skip extends Com
{
    /**
     * @override
     */
    function eval($state) {
        //do nothing
        return (object) [
            "seq" => new Skip(),
            "state" => $state
        ];
    }

    /**
     * @override
     */
    function getPrint() {
        return "Skip";
    }

    public $isSkip = true;

}

class Assign extends Com
{
    private $name;
    private $value;
    public function __construct($name, $value)
    {
        $this->name = $name;
        $this->value = $value;
    }

    /**
     * @override
     */
    function eval($state) {
        $state[$this->name] = $this->value->eval($state);
        return (object) [
            "seq" => new Skip(),
            "state" => $state
        ];
    }

    /**
     * @override
     */
    function getPrint() {
        return "$this->name := " . $this->value->getPrint();
    }
}

class IfElse extends Com
{
    private $statement;
    private $ifTrue;
    private $ifFalse;
    public function __construct($statement, $ifTrue, $ifFalse)
    {
        $this->statement = $statement;
        $this->ifTrue = $ifTrue;
        $this->ifFalse = $ifFalse;
    }
    /**
     * @override
     */
    function eval($state) {
        if ($this->statement->eval($state)) {
            return (object) [
                "seq" => $this->ifTrue,
                "state" => $state
            ];
        } else {
            return (object) [
                "seq" => $this->ifFalse,
                "state" => $state
            ];
        }
    }

    /**
     * @override
     */
    function getPrint() {
        return "if (" . $this->statement->getPrint() . ") { " . $this->ifTrue->getPrint() . " } else { " . $this->ifFalse->getPrint() . " }";
    }
}

class WhileCom extends Com
{
    private $statement;
    private $whileTrue;
    public function __construct($statement, $whileTrue)
    {
        $this->statement = $statement;
        $this->whileTrue = $whileTrue;
    }
    /**
     * @override
     */
    function eval($state) {
        if ($this->statement->eval($state)) {
            return (object) [
                "seq" => new Seq($this->whileTrue, new WhileCom($this->statement, $this->whileTrue)),
                "state" => $state
            ];
        }
        return (object) [
            "seq" => new Skip(),
            "state" => $state
        ];
    }
    /**
     * @override
     */
    function getPrint() {
        return "While( " . $this->statement->getPrint() . " ){ " . $this->whileTrue->getPrint() . " }";
    }
}

class Seq extends Com
{
    private $left;
    private $right;
    public function __construct(Com $left, Com $right)
    {
        $this->left = $left;
        $this->right = $right;
    }
    /**
     * @override
     */
    function eval($state) {
        if (!isset($this->left->isSkip)) {
            $temp = $this->left->eval($state);
            return (object) [
                "seq" => new Seq($temp->seq, $this->right),
                "state" => $temp->state
            ];
        }

        return (object) [
                "seq" => $this->right,
                "state" => $state
            ];

    }

    /**
     * @override
     */
    function getPrint() {
        return $this->left->getPrint() . "; " . $this->right->getPrint();
    }
}

class Util{
    public static function print($record) {
        while (!isset($record->seq->isSkip)) {
            echo "< " . $record->seq->getPrint() . ", " . (count($record->state) == 0 ? "{}" : json_encode($record->state)) . " > ->\n";
            $record = $record->seq->eval($record->state);
        }
        echo "< Skip, " . json_encode($record->state) . " >";
    }
}

/**
 * x :=  3;
 * if (x <  5 ) { 
 *  x := x + 1; 
 *  y := x + x;
 * } else { 
 *  x := x - 1  
 * }
 */
echo ("\n\nFirst Test\n");
$sol1 = new Seq(
    new Assign(
        "x",
        new IntExp(3)
    ),
    new IfElse(
        new Less(
            new VarExp("x"),
            new IntExp(5)
        ),
        new Seq(
            new Assign(
                "x",
                new SumExp(
                    new VarExp("x"),
                    new IntExp(1)
                )
            ),
            new Assign(
                "y",
                new SumExp(
                    new VarExp("x"),
                    new VarExp("x")
                )
            )
        ),
        new Assign(
            "x",
            new SubExp(
                new VarExp("x"),
                new IntExp(1)
            )
        )
    )
);

$record1 = (object) [
    "seq" => $sol1,
    "state" => []
];

Util::print($record1);

echo ("\n\nSecond Test\n");
/**
 *
 * Exp arith = 1 * 2 + 8 / (6 - 2)
 *
 * var x = 0;
 * var y = 0;
 *
 * Bool statement1 = false || x == y;
 * Bool statement2 = 1 > x;
 *
 * if (true && (statement1 && statement2)) {
 *      x = x + 1;
 * } else {
 *      skip;
 * }
 *
 * while (x < arith) do x = x + 1;
 *
 * expect answer: x = 4; y = 0;
 */

$arith = new SumExp(
    new MulExp(
        new IntExp(1),
        new IntExp(2)
    ),
    new DivExp(
        new IntExp(8),
        new SubExp(
            new IntExp(6),
            new IntExp(2)
        )
    )
);

$assignX = new Assign("x", new IntExp(0));
$assignY = new Assign("y", new IntExp(0));

$statement1 = new OrOp(
    new FalseExp(),
    new Equal(new VarExp("x"), new VarExp("y"))
);

$statement2 = new Great(
    new IntExp(1),
    new VarExp("x")
);

$ifElse = new IfElse(
    new AndOp(
        new TrueExp(),
        new AndOp($statement1, $statement2)
    ),
    new Assign(
        "x",
        new SumExp(
            new VarExp("x"),
            new IntExp(1)
        )
    ),
    new Skip()
);

$seq1 = new Seq(
    $assignX,
    $assignY
);

$seq2 = new Seq(
    $seq1,
    $ifElse
);

$main = new Seq(
    $seq2,
    new WhileCom(
        new Less(
            new VarExp("x"),
            $arith
        ),
        new Assign(
            "x",
            new SumExp(
                new VarExp("x"),
                new IntExp(1)
            )
        )
    )
);

$record2 = (object) [
    "seq" => $main,
    "state" => []
];

Util::print($record2);
?>