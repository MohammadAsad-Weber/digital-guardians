// Generates a random password of the given length using ASCII characters from 33 (!) to 126 (~)
const generatePassword = (length: number) => {
  let password = "";

  for (let i = 0; i < length; i++) {
    const max = 126; // highest ASCII code for printable characters
    const min = 33;  // lowest ASCII code for printable characters

    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    const char = String.fromCharCode(random);
    password += char;
  }

  return password;
};

export default generatePassword;
