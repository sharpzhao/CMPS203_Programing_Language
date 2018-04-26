import BaseClass.*;
import Bool.*;
import Exp.*;
import OpExp.*;
public class Main {

    public static void main(String[] args){


        /**
         *  var x = 0;
         *  while (x < 5) do x = x + 1;
         */

        Command first = new SeqCommand(
                new AssignCommand("x", new IntegerExp(0)),
                new WhileCommand(
                        new Less(new VarExp("x"), new IntegerExp(5)),
                        new AssignCommand("x", new SumExp(
                                new VarExp("x"),
                                new IntegerExp(1)
                        )
                        )
                )
        );

        first.eval();
        //assert if variable x == 5;
        System.out.println(new VarExp("x").eval());

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
         *
         * expect answer: x = 4;
         */

        Exp arith = new SumExp(
                new MulExp(
                        new IntegerExp(1),
                        new IntegerExp(2)
                ),
                new DivExp(
                        new IntegerExp(8),
                        new SubExp(
                                new IntegerExp(6),
                                new IntegerExp(2)
                        )
                )
        );

        Command assignX = new AssignCommand("x", new IntegerExp(0));
        Command assignY = new AssignCommand("y", new IntegerExp(0));

        Bool statement1 = new Or (
                new False(),
                new Equal(new VarExp("x"), new VarExp("y"))
        );

        Bool statement2 = new Great(
                new IntegerExp(1),
                new VarExp("x")
        );

        Command ifElse = new IfElseCommand(
                new And(
                        new True(),
                        new And(statement1, statement2)
                ),
                new AssignCommand(
                        "x",
                        new SumExp(
                                new VarExp("x"),
                                new IntegerExp(1)
                        )
                ),
                new SkipCommand()
        );

        Command seq1 = new SeqCommand(
                assignX,
                assignY
        );

        Command seq2 = new SeqCommand(
                seq1,
                ifElse
        );

        Command main = new SeqCommand(
                seq2,
                new WhileCommand(
                        new Less(
                                new VarExp("x"),
                                arith
                        ),
                        new AssignCommand(
                                "x",
                                new SumExp(
                                        new VarExp("x"),
                                        new IntegerExp(1)
                                )
                        )
                )
        );

        main.eval();

        //expect to be 4
        System.out.println(new VarExp("x").eval());
    }
}
