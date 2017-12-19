export const USERS = {
  PASS_DEFAULT: 'abcABC@123',
  // ROLES: [
  //   {
  //     roleId: 1,
  //     title: 'Administrator',
  //   },
  //   {
  //     roleId: 2,
  //     title: 'Employee',
  //   }
  // ],
  // ADMIN_ROLE: 1,
};

export const LOCALSTORAGE = {
  crUser: 'hhdCrUser'
};

const _minlengthValidators = {
  username: 5,
  password: 8,
};

const _maxlengthValidators = {
  username: 50,
  password: 50,
};

export const AUTH =  {
  minlengthValidators: _minlengthValidators,
  maxlengthValidators: _maxlengthValidators,
  patternValidators: {
    username: `^[a-zA-Z0-9_-]{${_minlengthValidators.username},${_maxlengthValidators.username}}$`,
    // At least one upper case English letter, (?=.*?[A-Z])
    // At least one lower case English letter, (?=.*?[a-z])
    // At least one digit, (?=.*?[0-9])
    // At least one special character, (?=.*?[#?!@$%^&*-])
    // Minimum eight in length .{8,} (with the anchors)
    password: `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${_minlengthValidators.password},${_maxlengthValidators.password}}$`,
  },
  patternError: {
    username: `at least ${_minlengthValidators.username} characters with alphanumeric letter, allow only _ and –`,
    password: `at least ${_minlengthValidators.password} characters with one capital letter, one special character, one uppercase and one lowercase.`,
    maximumUsernameCharacters: `Maximum is ${_maxlengthValidators.username} characters`,
    notDefaultPassword: `Don't use DEFAULT PASSWORD`,
    notEquivalentPassword: `Passwords do not match`,
  }
};
