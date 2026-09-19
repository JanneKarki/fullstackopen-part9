import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';
import { isNotNumber } from './utils.ts';

const app = express();

app.use(express.json());

interface ExerciseRequestBody {
  daily_exercises: unknown;
  target: unknown;
}

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNotNumber(height) || isNotNumber(weight)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    res.json({
      weight: Number(weight),
      height: Number(height),
      bmi: calculateBmi(Number(height), Number(weight))
    });
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body as ExerciseRequestBody;

  if (daily_exercises === undefined || target === undefined) {
    res.status(400).json({ error: 'parameters missing' });
    return;
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.length === 0) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  const hours = daily_exercises as unknown[];

  if (isNotNumber(target) || hours.some(isNotNumber)) {
    res.status(400).json({ error: 'malformatted parameters' });
    return;
  }

  try {
    res.json(calculateExercises(hours.map(Number), Number(target)));
  } catch {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
