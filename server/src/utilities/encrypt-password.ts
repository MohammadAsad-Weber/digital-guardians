import crypto from "crypto";

// Validates and processes the encryption secret from environment variables
const handleSecret = (secret: string | undefined) => {
  if (!secret)
    throw new Error("The ENCRYPTION_SECRET variable is not defined in the .env file");
  return Buffer.from(secret, "hex");
};
// Constant configuration
const ALGORITHM: crypto.CipherGCMTypes = "aes-256-gcm";
const SECRET = handleSecret(process.env.ENCRYPTION_SECRET);

// Encrypts a plain text password using AES-256-GCM
export const encrypt = (password: string) => {
  const vector = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET, vector);

  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTagHex = cipher.getAuthTag().toString("hex");
  const vectorHex = vector.toString("hex");

  return vectorHex + ":" + authTagHex + ":" + encrypted;
};
// Decrypts a previously encrypted password using AES-256-GCM
export const decrypt = (encryptedPassword: string) => {
  const [vectorHex, authTagHex, encrypted] = encryptedPassword.split(":");
  const vector = Buffer.from(vectorHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET, vector);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
