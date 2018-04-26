package OpExp;

import BaseClass.Command;

public class SeqCommand extends Command {
    private Command seq1;
    private Command seq2;

    public SeqCommand(Command seq1, Command seq2) {
        this.seq1 = seq1;
        this.seq2 = seq2;
    }

    @Override
    public void eval(){
        seq1.eval();
        seq2.eval();
    }
}
