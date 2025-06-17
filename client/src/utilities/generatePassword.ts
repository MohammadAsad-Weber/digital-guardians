const generatePassword = (length: number) => {
  let password = "";

  for (let i = 0; i < length; i++) {
    const max = 126;
    const min = 33;

    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const char = String.fromCharCode(random);
    password += char;
  }

  return password;
};

export default generatePassword;
