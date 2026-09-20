import express, { type Request, type Response } from 'express';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newEntryParser, newPatientParser } from '../middleware.ts';
import type { Entry, EntryWithoutId, NewPatient, NonSensitivePatient, Patient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  res.send(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res: Response<Patient>) => {
  const patient = patientService.findById(req.params.id);

  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedPatient = patientService.addPatient(req.body);
  res.json(addedPatient);
});

router.post(
  '/:id/entries',
  newEntryParser,
  (req: Request<{ id: string }, unknown, EntryWithoutId>, res: Response<Entry>) => {
    const patient = patientService.findById(req.params.id);

    if (!patient) {
      res.sendStatus(404);
      return;
    }

    const addedEntry = patientService.addEntry(patient, req.body);
    res.json(addedEntry);
  }
);

router.use(errorMiddleware);

export default router;
