

const calculator={
  displayValue:'0',
  firstOperand:null,
  waitingForNextOperand:false,
  currentOperand:null,
  operator:null,
  result:null
}


function inputDigit(digit) {
  const { displayValue, waitingForNextOperand } = calculator;

  if (waitingForNextOperand === true) {
  	calculator.currentOperand=digit;
  	calculator.displayValue += digit;
    calculator.waitingForNextOperand = false;

  } else {
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    calculator.firstOperand=calculator.displayValue;
  }
}


function handleOperator(nextOperator) {
  const { firstOperand, displayValue,operator,waitingForNextOperand,currentOperand,result } = calculator;

  if (operator && calculator.waitingForNextOperand)  {
    calculator.operator = nextOperator;
    calculator.displayValue=calculator.displayValue.substr(0,calculator.displayValue.length-1)
    calculator.displayValue+=nextOperator;
    return;
  }

  if(firstOperand === null) {
  	const inputValue = parseFloat(displayValue);
    calculator.firstOperand = inputValue;
    calculator.displayValue += nextOperator;
    } else if (nextOperator==="=") {
    const currentValue = parseFloat(firstOperand) ;
    const inputValue = parseFloat(calculator.currentOperand);
    calculator.result = operate[operator](currentValue, inputValue);
      if (Number.isInteger(calculator.result)){
        calculator.displayValue = String(calculator.result);
      } else {
        calculator.displayValue = String(calculator.result.toFixed(2));
      }
    calculator.firstOperand = calculator.result;
    calculator.watingForNextOperand = false;
  }else if(nextOperator==="X"){
    calculator.displayValue=calculator.displayValue.substr(0,calculator.displayValue.length-1)
  }else if (!(nextOperator==="=")) {
    calculator.displayValue+=nextOperator;
    calculator.waitingForNextOperand = true;
  }
   calculator.operator = nextOperator;
}


const operate= {
	'+': (firstOperand,secondOperand) =>firstOperand+secondOperand,
	'-': (firstOperand,secondOperand) =>firstOperand-secondOperand,
	'*': (firstOperand,secondOperand) =>firstOperand*secondOperand,
	'/': (firstOperand,secondOperand) =>firstOperand/secondOperand,
	'=': (firstOperand,secondOperand) =>secondOperand
};


function clearAll() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForNextOperand = false;
  calculator.operator = null;
  console.log(calculator);
}



function updateDisplay(){
	const display=document.querySelector('.display');
	display.value=calculator.displayValue;
}
 
const keys=document.querySelector(".calculator-keys")
keys.addEventListener('click',(event)=>{
const target=event.target        //event.target represents the element being clicked
  if (!target.matches('button')){
   	return;
  }

  if(target.classList.contains('operator')) {
  	handleOperator(target.value);
   	updateDisplay();
  }
  

  if(target.classList.contains('clear')) {
   	clearAll();
   	updateDisplay();
  }
    
  if(target.classList.contains('digit')){
    inputDigit(target.value);
    updateDisplay();
   }
  if(target.classList.contains('equals')){
    handleOperator(target.value)
    updateDisplay();
  }

  if(target.classList.contains('backspace')){
    handleOperator(target.value)
    updateDisplay();
  }

 });











