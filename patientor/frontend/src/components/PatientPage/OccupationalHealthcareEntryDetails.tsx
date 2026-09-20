import { Typography } from '@mui/material';
import { Work } from '@mui/icons-material';

import { Diagnosis, OccupationalHealthcareEntry } from "../../types";
import EntryLayout from "./EntryLayout";

interface OccupationalHealthcareEntryDetailsProps {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}

const OccupationalHealthcareEntryDetails = ({
  entry,
  diagnoses
}: OccupationalHealthcareEntryDetailsProps) => {
  return (
    <EntryLayout
      entry={entry}
      diagnoses={diagnoses}
      header={<>{entry.date} <Work fontSize="small" /> <i>{entry.employerName}</i></>}
    >
      {entry.sickLeave && (
        <Typography variant="body2">
          sick leave {entry.sickLeave.startDate} – {entry.sickLeave.endDate}
        </Typography>
      )}
    </EntryLayout>
  );
};

export default OccupationalHealthcareEntryDetails;
