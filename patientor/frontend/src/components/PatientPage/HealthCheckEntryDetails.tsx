import { Favorite, MedicalServices } from '@mui/icons-material';

import { Diagnosis, HealthCheckEntry, HealthCheckRating } from "../../types";
import EntryLayout from "./EntryLayout";

interface HealthCheckEntryDetailsProps {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}

const ratingColors: Record<HealthCheckRating, string> = {
  [HealthCheckRating.Healthy]: 'green',
  [HealthCheckRating.LowRisk]: 'gold',
  [HealthCheckRating.HighRisk]: 'orange',
  [HealthCheckRating.CriticalRisk]: 'red'
};

const HealthCheckEntryDetails = ({ entry, diagnoses }: HealthCheckEntryDetailsProps) => {
  return (
    <EntryLayout
      entry={entry}
      diagnoses={diagnoses}
      header={<>{entry.date} <MedicalServices fontSize="small" /></>}
    >
      <Favorite sx={{ color: ratingColors[entry.healthCheckRating] }} />
    </EntryLayout>
  );
};

export default HealthCheckEntryDetails;
