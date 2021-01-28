const isLimitLengthPassword = new RegExp('^.{8,16}$');
const isLeastLowercase = new RegExp('(?=.*[a-z])');
const isLeastUppercase = new RegExp('(?=.*[A-Z])');
const isLeastNumber = new RegExp('(?=.*[0-9])');

export const checkStrongPw = (password) => {
  if (!isLimitLengthPassword.test(password))
    return {
      error:
        'The password must be at least 8 characters long, but no more than 16',
    };
  if (!isLeastLowercase.test(password))
    return {
      error:
        'Require that at least one lowercase letter appear anywhere in the password',
    };
  if (!isLeastUppercase.test(password))
    return {
      error:
        'Require that at least one uppercase letter appear anywhere in the password',
    };
  if (!isLeastNumber.test(password))
    return {
      error: 'Require that at least one digit appear anywhere in the password',
    };

  if (!isLeastNumber.test(password))
    return {
      error: 'Require that at least one digit appear anywhere in the password',
    };
  return {
    error: null,
  };
};
