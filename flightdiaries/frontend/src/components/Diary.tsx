import type { NonSensitiveDiaryEntry } from '../types';

interface DiaryProps {
  diary: NonSensitiveDiaryEntry;
}

const Diary = ({ diary }: DiaryProps) => {
  return (
    <div>
      <h3>{diary.date}</h3>
      <div>visibility: {diary.visibility}</div>
      <div>weather: {diary.weather}</div>
    </div>
  );
};

export default Diary;
