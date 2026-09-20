import { ReactNode } from "react";
import { Box, Typography } from '@mui/material';

import { Diagnosis, Entry } from "../../types";

interface EntryLayoutProps {
  entry: Entry;
  diagnoses: Diagnosis[];
  header: ReactNode;
  children?: ReactNode;
}

const EntryLayout = ({ entry, diagnoses, header, children }: EntryLayoutProps) => {
  return (
    <Box sx={{ border: 1, borderRadius: 1, padding: 1, marginBottom: 1 }}>
      <Typography variant="body1">{header}</Typography>
      <Typography variant="body1"><i>{entry.description}</i></Typography>
      {children}
      <ul style={{ marginTop: 0 }}>
        {entry.diagnosisCodes?.map(code => (
          <li key={code}>
            {code} {diagnoses.find(diagnosis => diagnosis.code === code)?.name}
          </li>
        ))}
      </ul>
      <Typography variant="body2">diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default EntryLayout;
