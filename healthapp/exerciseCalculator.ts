import { isNotNumber, parseErrorMessage } from './utils.ts';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  dailyHours: number[];
}

const parseExerciseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments, give a target and at least one day of exercise hours');

  const values = args.slice(2);

  if (values.some(isNotNumber)) {
    throw new Error('Provided values were not numbers!');
  }

  const [target, ...dailyHours] = values.map(Number);

  return { target, dailyHours };
};

export const calculateExercises = (dailyHours: number[], target: number): Result => {
  if (dailyHours.length === 0) throw new Error('No exercise data given!');
  if (target <= 0) throw new Error('Target must be greater than 0!');

  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter(hours => hours > 0).length;
  const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'well done, you reached your target';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you should try harder to reach your target';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { target, dailyHours } = parseExerciseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    console.log('Something went wrong. Error: ' + parseErrorMessage(error));
  }
}
