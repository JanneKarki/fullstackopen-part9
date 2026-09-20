import type { NonSensitiveDiaryEntry } from '../types';
import Diary from './Diary';

interface DiaryListProps {
  diaries: NonSensitiveDiaryEntry[];
}

const DiaryList = ({ diaries }: DiaryListProps) => {
  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map(diary => (
        <Diary key={diary.id} diary={diary} />
      ))}
    </div>
  );
};

export default DiaryList;
