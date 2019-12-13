const equation = mass => Math.floor(mass / 3) - 2;

const solution = input =>
  input.reduce((memo, component) => {
    let fuel = equation(component);
    let totalFuel = 0;
    while (fuel > 0) {
      totalFuel += fuel;
      fuel = equation(fuel);
    }
    return totalFuel + memo;
  }, 0);

const answer = 4955106;

export { solution, answer };
