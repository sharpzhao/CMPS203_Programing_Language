package BaseClass;

import java.util.HashMap;
import java.util.Map;

public class State {
    private static Map<String, Integer> instance = new HashMap<>();

    private State(){}

    public static Map<String, Integer> getInstance() {
        return instance;
    }
}
