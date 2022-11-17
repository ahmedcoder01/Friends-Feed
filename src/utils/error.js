export function extractError(err) {
  const data = err.response?.data;

  if (!(data?.message instanceof Object)) {
    return data?.message;
  }

  const errors = data?.message[0].constraints || {};
  const firstError = Object.values(errors)[0];
  return firstError;
}
