const initialState = {
  preValue: "",
  currentValue: "",
  currentOp: "",
};

let calculatorState = { ...initialState };

document.addEventListener("DOMContentLoaded", (event) => {
  const num_btn = document.querySelectorAll(".numBtn");
  const zeros_btn = document.querySelector("[data-button-val='000']");
  const clear_btn = document.querySelector("[data-button-val='clear']");
  const delete_btn = document.querySelector("[data-button-val='delete']");
  const equal_btn = document.querySelector("[data-button-val='=']");
  const percent_btn = document.querySelector("[data-button-val='%']");
  const division_btn = document.querySelector("[data-button-val='÷']");
  const multip_btn = document.querySelector("[data-button-val='x']");
  const minus_btn = document.querySelector("[data-button-val='-']");
  const plus_btn = document.querySelector("[data-button-val='+']");
  const dot_btn = document.querySelector("[data-button-val='.']");
  const currentOp_p = document.getElementById("currentOp");
  const currentValue_p = document.getElementById("currentValue");

  function doOperation(calculatorState) {
    if (
      !calculatorState.preValue ||
      !calculatorState.currentValue ||
      !calculatorState.currentOp
    ) {
      console.error("Invalid State", calculatorState);
    }
    const prev = Number(calculatorState["preValue"]);
    const curr = Number(calculatorState["currentValue"]);

    switch (calculatorState["currentOp"]) {
      case "+":
        return prev + curr + "";
        break;

      case "-":
        return prev - curr + "";
        break;

      case "x":
        return prev * curr + "";
        break;

      case "÷":
        return prev / curr + "";
        break;

      case "%":
        return (prev % curr) + "";
        break;

      default:
    }
  }

  plus_btn?.addEventListener("click", function (e) {
    calculatorState = operator(calculatorState, "+");
    updateDisplay(calculatorState);
  });

  minus_btn?.addEventListener("click", function (e) {
    calculatorState = operator(calculatorState, "-");
    updateDisplay(calculatorState);
  });

  multip_btn?.addEventListener("click", function (e) {
    calculatorState = operator(calculatorState, "x");
    updateDisplay(calculatorState);
  });

  division_btn?.addEventListener("click", function (e) {
    calculatorState = operator(calculatorState, "÷");
    updateDisplay(calculatorState);
  });

  percent_btn?.addEventListener("click", function (e) {
    calculatorState = operator(calculatorState, "%");
    updateDisplay(calculatorState);
  });

  function operator(state, operator) {
    if (!state["currentOp"] && !state["currentValue"] && !state["preValue"]) {
      // if no buttons set previously do nothing.
    } else if (!state["currentOp"] && state["currentValue"]) {
      //if no plus buttons set previously but number buttons set
      state["currentOp"] = operator;
      state["preValue"] = state["currentValue"];
      state["currentValue"] = "";
    } else if (
      state["currentOp"] &&
      !state["currentValue"] &&
      state["preValue"]
    ) {
      //if there are both numbers and operation button set
      state["currentOp"] = operator;
    } else if (
      state["currentOp"] &&
      state["currentValue"] &&
      state["preValue"]
    ) {
      //if there are both numbers and operation button set
      state["preValue"] = doOperation(state);
      state["currentOp"] = operator;
      state["currentValue"] = "";
    }
    return state;
  }

  num_btn.forEach((x) =>
    x.addEventListener("click", function (e) {
      let number = e.target?.getAttribute("data-button-val");
      calculatorState["currentValue"] += number;

      updateDisplay(calculatorState);
    })
  );

  clear_btn?.addEventListener("click", function (e) {
    calculatorState["preValue"] = "";
    calculatorState["currentValue"] = "";
    calculatorState["currentOp"] = "";
    updateDisplay(calculatorState);
  });

  delete_btn?.addEventListener("click", function (e) {
    calculatorState["currentValue"] = calculatorState["currentValue"].slice(
      0,
      -1
    );

    updateDisplay(calculatorState);
  });

  equal_btn?.addEventListener("click", function (e) {
    calculatorState["preValue"] = doOperation(calculatorState);
    calculatorState["currentValue"] = "";
    calculatorState["currentOp"] = "";

    updateDisplay(calculatorState);
  });

  dot_btn?.addEventListener("click", function (e) {
    if (!calculatorState["currentOp"] && !calculatorState["currentValue"]) {
      //When theres no number, do nothing
    } else if (calculatorState["currentValue"].includes(".")) {
      //when . already exist, do nothing
    } else if (calculatorState["currentValue"]) {
      calculatorState["currentValue"] += e.target?.getAttribute(
        "data-button-val"
      );
    }
    updateDisplay(calculatorState);
  });

  zeros_btn?.addEventListener("click", function (e) {
    if (
      !isNaN(Number(calculatorState["currentValue"])) &&
      Number(calculatorState["currentValue"]) !== 0
    ) {
      calculatorState["currentValue"] += "000";
    }
    updateDisplay(calculatorState);
  });

  function updateDisplay(cState) {
    currentValue_p.innerHTML = cState.currentValue || cState.preValue;
    currentOp_p.innerHTML = cState.currentOp;

    console.log(cState);
  }
});

// /**
//  * @typedef {"+"|"-"|"x"|"%"|"="|"."|"AC"|"/"|"bsc"} Operator
//  */
// /**
//  * @typedef {{prevNum:    undefined | number,
//               currentNum: undefined | number,
//               operator:   undefined | Operator }} CalculState
//  */

// /**
//  * @type {CalculState}
//  */
// let initialCalculState = {
//   prevNum: undefined,
//   currentNum: undefined,
// };

// /**
//  * @param {Operator} newOperator
//  * @returns {(prevState: CalculState) => CalculState}
//  */
// const setOperator = (newOperator) => (prevState) => {};

// /**
//  * @param {number} number
//  * @returns {(prevState: CalculState) => CalculState}
//  */
// const setNumber = (number) => (prevState) => {
//   prevState.operator === "";
// };
