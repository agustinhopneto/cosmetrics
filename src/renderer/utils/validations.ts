/* eslint-disable @typescript-eslint/no-explicit-any */
export const validate = (validation: boolean, message: string) => {
  if (!validation) {
    return message;
  }

  return null;
};

export const validateName = (value: any) =>
  validate(
    value.length >= 2 && value.length <= 200,
    'Deve ter no mín. 2 caracteres e no máx. 200'
  );

export const validateEmail = (value: any) =>
  validate(
    /^\S+@\S+$/.test(value) && value.length >= 2 && value.length <= 200,
    'Email inválido'
  );

export const validatePhone = (value: any) =>
  validate(
    value.length >= 8 && value.length <= 15,
    'Deve ter no mín. 8 caracteres e no máx. 15'
  );
