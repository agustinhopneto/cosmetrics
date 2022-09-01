// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getErrMessage = (err: any) => err.message.split('Error: ')[1];
