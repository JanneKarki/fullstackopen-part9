import { useState, SyntheticEvent } from "react";

import {
  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent,
  Box, Chip
} from '@mui/material';

import { Diagnosis, Entry, EntryFormValues, HealthCheckRating } from "../../types";
import { assertNever } from "../../utils";

interface Props {
  diagnoses: Diagnosis[];
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface EntryTypeOption {
  value: Entry['type'];
  label: string;
}

const entryTypeOptions: EntryTypeOption[] = [
  { value: "HealthCheck", label: "Health Check" },
  { value: "OccupationalHealthcare", label: "Occupational Healthcare" },
  { value: "Hospital", label: "Hospital" }
];

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: HealthCheckRating.Healthy, label: "0 — Healthy" },
  { value: HealthCheckRating.LowRisk, label: "1 — Low Risk" },
  { value: HealthCheckRating.HighRisk, label: "2 — High Risk" },
  { value: HealthCheckRating.CriticalRisk, label: "3 — Critical Risk" }
];

const AddEntryForm = ({ diagnoses, onCancel, onSubmit }: Props) => {
  const [type, setType] = useState<Entry['type']>("HealthCheck");
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRating.Healthy);
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value;
    const option = entryTypeOptions.find(option => option.value.toString() === value);
    if (option) {
      setType(option.value);
    }
  };

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
    const value = Number(event.target.value);
    const option = healthCheckRatingOptions.find(option => option.value === value);
    if (option) {
      setHealthCheckRating(option.value);
    }
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setDiagnosisCodes(typeof value === 'string' ? value.split(',') : value);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseValues = { date, description, specialist, diagnosisCodes };

    switch (type) {
      case "HealthCheck":
        onSubmit({ ...baseValues, type, healthCheckRating });
        break;
      case "Hospital":
        onSubmit({
          ...baseValues,
          type,
          discharge: { date: dischargeDate, criteria: dischargeCriteria }
        });
        break;
      case "OccupationalHealthcare":
        onSubmit({
          ...baseValues,
          type,
          employerName,
          sickLeave: sickLeaveStartDate || sickLeaveEndDate
            ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate }
            : undefined
        });
        break;
      default:
        assertNever(type);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel>Entry type</InputLabel>
        <Select
          label="Entry type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {entryTypeOptions.map(option =>
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          )}
        </Select>

        <TextField
          label="Date"
          type="date"
          required
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          required
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          required
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />

        <InputLabel sx={{ marginTop: 2.5 }}>Diagnosis codes</InputLabel>
        <Select
          multiple
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          renderValue={selected => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map(code => <Chip key={code} label={code} />)}
            </Box>
          )}
        >
          {diagnoses.map(diagnosis =>
            <MenuItem key={diagnosis.code} value={diagnosis.code}>
              {diagnosis.code} — {diagnosis.name}
            </MenuItem>
          )}
        </Select>

        {type === "HealthCheck" &&
          <>
            <InputLabel sx={{ marginTop: 2.5 }}>Health Check Rating</InputLabel>
            <Select
              label="Health Check Rating"
              fullWidth
              value={healthCheckRating}
              onChange={onHealthCheckRatingChange}
            >
              {healthCheckRatingOptions.map(option =>
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              )}
            </Select>
          </>
        }

        {type === "Hospital" &&
          <>
            <TextField
              label="Discharge date"
              type="date"
              required
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={dischargeDate}
              onChange={({ target }) => setDischargeDate(target.value)}
            />
            <TextField
              label="Discharge criteria"
              required
              fullWidth
              value={dischargeCriteria}
              onChange={({ target }) => setDischargeCriteria(target.value)}
            />
          </>
        }

        {type === "OccupationalHealthcare" &&
          <>
            <TextField
              label="Employer name"
              required
              fullWidth
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveStartDate}
              onChange={({ target }) => setSickLeaveStartDate(target.value)}
            />
            <TextField
              label="Sick leave end date"
              type="date"
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
              value={sickLeaveEndDate}
              onChange={({ target }) => setSickLeaveEndDate(target.value)}
            />
          </>
        }

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
