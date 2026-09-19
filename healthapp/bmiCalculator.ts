import { isNotNumber, parseErrorMessage } from './utils.ts';

interface BmiValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments, give height (cm) and weight (kg)');
  if (args.length > 4) throw new Error('Too many arguments, give only height (cm) and weight (kg)');

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values were not numbers!');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0) throw new Error('Height must be greater than 0!');
  if (weight <= 0) throw new Error('Weight must be greater than 0!');

  const bmi = weight / Math.pow(height / 100, 2);

  if (bmi < 16) {
    return 'Underweight (severe thinness)';
  } else if (bmi < 17) {
    return 'Underweight (moderate thinness)';
  } else if (bmi < 18.5) {
    return 'Underweight (mild thinness)';
  } else if (bmi < 25) {
    return 'Normal range';
  } else if (bmi < 30) {
    return 'Overweight';
  } else if (bmi < 35) {
    return 'Obese (class I)';
  } else if (bmi < 40) {
    return 'Obese (class II)';
  } else {
    return 'Obese (class III)';
  }
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseBmiArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    console.log('Something went wrong. Error: ' + parseErrorMessage(error));
  }
}
