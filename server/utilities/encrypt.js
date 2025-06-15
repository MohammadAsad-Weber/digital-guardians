import crypto from "crypto";

// constant variables
const algorithm = "aes-256-gcm";
const secret = Buffer.from(process.env.ENCRYPTION_SECRET, "hex");

// Function to encrypt the password
const encrypt = (password) => {
  if (!secret) throw "Encryption Secret is missing from the .env file";

  const vector = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(algorithm, secret, vector);

  let encrypted = cipher.update(password, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTagHex = cipher.getAuthTag().toString("hex");
  const vectorHex = vector.toString("hex");

  return vectorHex + ":" + authTagHex + ":" + encrypted;
};

// Function to decrypt the password
const decrypt = (encryptedPassword) => {
  if (!secret) throw "Encryption Secret is missing from the .env file";

  const [vectorHex, authTagHex, encrypted] = encryptedPassword.split(":");
  const vector = Buffer.from(vectorHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(algorithm, secret, vector);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};

export { encrypt, decrypt };
