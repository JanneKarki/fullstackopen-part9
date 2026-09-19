export const isNotNumber = (argument: unknown): boolean => {
  if (typeof argument === 'number') return isNaN(argument);
  if (typeof argument === 'string' && argument.trim() !== '') return isNaN(Number(argument));
  return true;
};

export const parseErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'Unknown error';
};
