const INPUT_NUMBER = "INPUT_NUMBER";
const PLUS = "PLUS";
const MINUS = "MINUS";
const MULTIPLY = "MULTIPKY";
const DIVIDE = "DVIDE";
const EQUAL = "EQUAL";
const CLEAR = "CLEAR";

export const onNumClick = (number: number) => ({
types: INPUT_NUMBER as typeof INPUT_NUMBER,
number
});

export const onPlusClick = () => ({
types: PLUS as typeof PLUS
});

export const onMinusClick = () => ({
types: MINUS as typeof MINUS
});

export const onMultiplyClick = () => ({
types: MULTIPLY as typeof MULTIPLY
});

export const onDivideClick = () => ({
types: DIVIDE as typeof DIVIDE
});

export const onEqualClick = () => ({
types: EQUAL as typeof EQUAL
});

export const onClearClick = () => ({
types: CLEAR as typeof CLEAR
});

export type Actions =
| ReturnType<typeof onNumClick>
| ReturnType<typeof onPlusClick>
| ReturnType<typeof onMinusClick>
| ReturnType<typeof onMultiplyClick>
| ReturnType<typeof onDivideClick>
| ReturnType<typeof onEqualClick>
| ReturnType<typeof onClearClick>;

export type AppState = {
inputValue: number;
operator: "" | "+" | "-" | "*" | "/";
resultValue: number;
calculate: boolean;
showingResult: boolean;
};

export const initialAppState: AppState = {
inputValue: 0,
operator: "",
resultValue: 0,
calculate: false,
showingResult: false
};

export const reducer = (state: AppState, action: Actions): AppState => {
switch (action.types) {
    case INPUT_NUMBER:
    return {
        ...state,
        inputValue: state.inputValue * 10 + action.number,
        showingResult: false
    };

    case PLUS:
    if (state.calculate === true) {
        return {
        ...state,
        inputValue: 0,
        operator: "+",
        resultValue: state.resultValue + state.inputValue,
        showingResult: true
        };
    } else {
        return {
        ...state,
        inputValue: 0,
        operator: "+",
        calculate: true,
        resultValue: state.inputValue,
        showingResult: true
        };
    }

    case MINUS:
    if (state.calculate === true) {
        return {
        ...state,
        inputValue: 0,
        operator: "-",
        resultValue: state.resultValue - state.inputValue,
        showingResult: true
        };
    } else {
        return {
        ...state,
        inputValue: 0,
        operator: "-",
        calculate: true,
        resultValue: state.inputValue,
        showingResult: true
        };
    }

    case MULTIPLY:
    if (state.calculate === true) {
        return {
        ...state,
        inputValue: 0,
        operator: "*",
          resultValue: state.resultValue * state.inputValue,
        showingResult: true
        };
    } else {
        return {
        ...state,
        inputValue: 0,
        operator: "*",
        calculate: true,
        resultValue: state.inputValue,
        showingResult: true
        };
    }

    case DIVIDE:
    if (state.calculate === true) {
        return {
        ...state,
        inputValue: 0,
        operator: "/",
        resultValue: state.resultValue / state.inputValue,
        showingResult: true
        };
    } else {
        return {
        ...state,
        inputValue: 0,
        operator: "/",
        calculate: true,
        resultValue: state.inputValue,
        showingResult: true
        };
    }

    case CLEAR:
    return {
        inputValue: 0,
        operator: "",
        calculate: false,
        resultValue: 0,
        showingResult: false
    };
    case EQUAL:
    switch (state.operator) {
        case "+":
        return {
            inputValue: state.resultValue + state.inputValue,
            operator: "",
            calculate: false,
            resultValue: state.resultValue + state.inputValue,
            showingResult: true
        };
        case "-":
        return {
            inputValue: state.resultValue - state.inputValue,
            operator: "",
            calculate: false,
            resultValue: state.resultValue - state.inputValue,
            showingResult: true
        };
        case "*":
        return {
            inputValue: state.resultValue * state.inputValue,
            operator: "",
            calculate: false,
            resultValue: state.resultValue * state.inputValue,
            showingResult: true
        };
        case "/":
        return {
            inputValue: state.resultValue / state.inputValue,
            operator: "",
            calculate: false,
            resultValue: state.resultValue / state.inputValue,
            showingResult: true
        };
        default:
        return state;
    }

    default:
}
return state;
};