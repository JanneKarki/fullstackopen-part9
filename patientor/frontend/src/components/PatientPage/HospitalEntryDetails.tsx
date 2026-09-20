import { Typography } from '@mui/material';
import { LocalHospital } from '@mui/icons-material';

import { Diagnosis, HospitalEntry } from "../../types";
import EntryLayout from "./EntryLayout";

interface HospitalEntryDetailsProps {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}

const HospitalEntryDetails = ({ entry, diagnoses }: HospitalEntryDetailsProps) => {
  return (
    <EntryLayout
      entry={entry}
      diagnoses={diagnoses}
      header={<>{entry.date} <LocalHospital fontSize="small" /></>}
    >
      <Typography variant="body2">
        discharged {entry.discharge.date}: {entry.discharge.criteria}
      </Typography>
    </EntryLayout>
  );
};

export default HospitalEntryDetails;
