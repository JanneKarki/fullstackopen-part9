import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Box, Button, Typography } from '@mui/material';
import { Female, Male, Transgender } from '@mui/icons-material';
import axios from "axios";

import { Diagnosis, EntryFormValues, Gender, Patient } from "../../types";
import patientService from "../../services/patients";
import AddEntryForm from "./AddEntryForm";
import EntryDetails from "./EntryDetails";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Male:
      return <Male />;
    case Gender.Female:
      return <Female />;
    default:
      return <Transgender />;
  }
};

const PatientPage = ({ diagnoses }: PatientPageProps) => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPatient = async () => {
      const patient = await patientService.getById(id);
      setPatient(patient);
    };
    void fetchPatient();
  }, [id]);

  const openForm = (): void => setFormOpen(true);

  const closeForm = (): void => {
    setFormOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    if (!patient) {
      return;
    }

    try {
      const entry = await patientService.createEntry(patient.id, values);
      setPatient({ ...patient, entries: patient.entries.concat(entry) });
      setFormOpen(false);
      setError(undefined);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  if (!patient) {
    return null;
  }

  return (
    <div>
      <Typography variant="h5" sx={{ marginTop: "1em", marginBottom: "0.5em" }}>
        {patient.name} <GenderIcon gender={patient.gender} />
      </Typography>
      <Typography variant="body1">ssn: {patient.ssn}</Typography>
      <Typography variant="body1">occupation: {patient.occupation}</Typography>
      <Typography variant="body1">date of birth: {patient.dateOfBirth}</Typography>

      {formOpen && (
        <Box sx={{ border: "dashed", borderRadius: 1, padding: 2, marginY: 2 }}>
          <Typography variant="h6">New Entry</Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <AddEntryForm diagnoses={diagnoses} onSubmit={submitNewEntry} onCancel={closeForm} />
        </Box>
      )}
      {!formOpen && (
        <Button variant="contained" sx={{ marginY: 2 }} onClick={() => openForm()}>
          Add New Entry
        </Button>
      )}

      <Typography variant="h6" sx={{ marginTop: "1em" }}>entries</Typography>
      {patient.entries.map(entry => (
        <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses} />
      ))}
    </div>
  );
};

export default PatientPage;
