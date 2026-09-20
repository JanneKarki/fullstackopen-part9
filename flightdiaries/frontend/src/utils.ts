import axios from 'axios';

interface ValidationIssue {
  path: unknown[];
  message: string;
}

const isValidationIssue = (value: unknown): value is ValidationIssue => {
  return (
    !!value &&
    typeof value === 'object' &&
    'message' in value &&
    typeof value.message === 'string' &&
    'path' in value &&
    Array.isArray(value.path)
  );
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;

    if (data && typeof data === 'object' && 'error' in data && Array.isArray(data.error)) {
      const issues = data.error.filter(isValidationIssue);

      if (issues.length > 0) {
        return issues
          .map(issue => `${issue.path.join('.')}: ${issue.message}`)
          .join(', ');
      }
    }

    return error.message;
  }

  return 'Unknown error';
};
