export function calculateBmi(imc: number): string {
  if (imc < 18.5) {
    return "Abaixo do peso";
  } else if (imc >= 18.5 && imc <= 24.9) {
    return "Peso normal";
  } else if (imc >= 25 && imc <= 29.9) {
    return "Sobrepeso";
  } else if (imc >= 30 && imc <= 34.9) {
    return "Obesidade grau I";
  } else if (imc >= 35 && imc <= 39.9) {
    return "Obesidade grau II";
  } else if (imc >= 40) {
    return "Obesidade grau III";
  } else {
    return "Valor de IMC inválido";
  }
}
