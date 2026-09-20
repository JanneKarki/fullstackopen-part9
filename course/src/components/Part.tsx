import type { CoursePart } from '../types';
import { assertNever } from '../utils';

interface PartProps {
  part: CoursePart;
}

const Part = ({ part }: PartProps) => {
  switch (part.kind) {
    case "basic":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
        </p>
      );
    case "group":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          project exercises {part.groupProjectCount}
        </p>
      );
    case "background":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
          <br />
          submit to {part.backgroundMaterial}
        </p>
      );
    case "special":
      return (
        <p>
          <b>{part.name} {part.exerciseCount}</b>
          <br />
          <i>{part.description}</i>
          <br />
          required skills: {part.requirements.join(', ')}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
