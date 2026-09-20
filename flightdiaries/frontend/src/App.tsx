import { useEffect, useState } from 'react';
import AddDiaryForm from './components/AddDiaryForm';
import DiaryList from './components/DiaryList';
import Notification from './components/Notification';
import diaryService from './services/diaryService';
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from './types';
import { getErrorMessage } from './utils';

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void diaryService.getAll().then(data => setDiaries(data));
  }, []);

  const notify = (message: string) => {
    setError(message);
    setTimeout(() => setError(null), 5000);
  };

  const addDiary = async (entry: NewDiaryEntry): Promise<boolean> => {
    try {
      const newDiary = await diaryService.create(entry);
      setDiaries(diaries.concat(newDiary));
      setError(null);
      return true;
    } catch (e: unknown) {
      notify(getErrorMessage(e));
      return false;
    }
  };

  return (
    <div>
      <h1>Ilari's flight diaries</h1>
      <h2>Add new entry</h2>
      <Notification message={error} />
      <AddDiaryForm onSubmit={addDiary} />
      <DiaryList diaries={diaries} />
    </div>
  );
};

export default App;
