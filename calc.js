function calculateDerivative() {
  const expr = document.getElementById("derivativeInput").value;
  try {
    const node = math.parse(expr);
    const derivative = math.derivative(node, 'x').toString();
    document.getElementById("derivativeResult").innerText = `f'(x) = ${derivative}`;
  } catch (e) {
    document.getElementById("derivativeResult").innerText = "Error: Invalid input.";
  }
}

function calculateIntegral() {
  const expr = document.getElementById("integralFunction").value;
  const a = parseFloat(document.getElementById("a").value);
  const b = parseFloat(document.getElementById("b").value);
  try {
    const fn = math.compile(expr);
    const steps = 10000;
    const dx = (b - a) / steps;
    let area = 0;
    for (let i = 0; i < steps; i++) {
      const x = a + i * dx;
      area += fn.evaluate({ x }) * dx;
    }
    document.getElementById("integralResult").innerText = `∫ from ${a} to ${b} = ${area.toFixed(4)}`;
  } catch (e) {
    document.getElementById("integralResult").innerText = "Error: Invalid input or limits.";
  }
}

function calculateLimit() {
  const expr = document.getElementById("limitFunction").value;
  const xVal = parseFloat(document.getElementById("limitPoint").value);
  try {
    const fn = math.compile(expr);
    const val = fn.evaluate({ x: xVal });
    document.getElementById("limitResult").innerText = `lim x→${xVal} = ${val}`;
  } catch (e) {
    document.getElementById("limitResult").innerText = "Error: Invalid input or point.";
  }
}

function insertSqrt(inputId) {
  const input = document.getElementById(inputId);
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const value = input.value;
  input.value = value.slice(0, start) + "sqrt()" + value.slice(end);
  input.focus();
  input.selectionStart = input.selectionEnd = start + 5;
}

function insertPower(inputId) {
  const input = document.getElementById(inputId);
  const start = input.selectionStart;
  const end = input.selectionEnd;
  const value = input.value;
  input.value = value.slice(0, start) + "^" + value.slice(end);
  input.focus();
  input.selectionStart = input.selectionEnd = start + 1;
}

document.getElementById("derivativeInput").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    e.preventDefault();
    calculateDerivative();
  }
});

["integralFunction", "a", "b"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateIntegral();
    }
  });
});

["limitFunction", "limitPoint"].forEach(id => {
  document.getElementById(id).addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      calculateLimit();
    }
  });
});