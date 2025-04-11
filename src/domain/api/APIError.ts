export default class APIError extends Error {
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }
}

export const errorMessage = (error: any) => {
  const errorText = error instanceof APIError
    ? `${error.code}: ${error.message}`
    : (error instanceof Error ? error.message : 'Unknown error');
  return errorText;
};
