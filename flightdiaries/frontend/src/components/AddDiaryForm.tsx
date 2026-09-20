import { useState } from 'react';
import { Visibility, Weather } from '../types';
import type { NewDiaryEntry } from '../types';

interface AddDiaryFormProps {
  onSubmit: (entry: NewDiaryEntry) => Promise<boolean>;
}

const AddDiaryForm = ({ onSubmit }: AddDiaryFormProps) => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const addDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const created = await onSubmit({ date, visibility, weather, comment });

    if (created) {
      setDate('');
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment('');
    }
  };

  return (
    <div>
      <form onSubmit={(event) => void addDiary(event)}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={event => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility
          {Object.values(Visibility).map(value => (
            <span key={value}>
              {' '}{value}
              <input
                type="radio"
                name="visibility"
                checked={visibility === value}
                onChange={() => setVisibility(value)}
              />
            </span>
          ))}
        </div>
        <div>
          weather
          {Object.values(Weather).map(value => (
            <span key={value}>
              {' '}{value}
              <input
                type="radio"
                name="weather"
                checked={weather === value}
                onChange={() => setWeather(value)}
              />
            </span>
          ))}
        </div>
        <div>
          comment
          <input
            value={comment}
            onChange={event => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default AddDiaryForm;
