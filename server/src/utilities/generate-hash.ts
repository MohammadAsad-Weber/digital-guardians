import bcrypt from "bcrypt";

// Generates a bcrypt hash using 12 salt rounds
const generateHash = (password: string) => bcrypt.hashSync(password, 12);

export default generateHash;
