import type { DataType } from "@/types/utilities";

// Extract only the fields that have changed between payload and original
const extractChangedFields = <T extends Partial<{ [x: string]: DataType }>>(
  payload: T,
  original: Record<keyof T, DataType>,
  fields?: (keyof T)[]
) => {
  // Use provided fields or fallback to keys from payload
  const defaultFields = fields ?? Object.keys(payload);
  const changedFields: Partial<T> = {};

  // Compare each field in payload with original and track changes
  for (const field of defaultFields) {
    const value = payload[field];
    const isValueSame = value === original[field];
    if (value && !isValueSame) changedFields[field] = value;
  }
  // Check if no changes were found
  const isUnchanged = Object.keys(changedFields).length === 0;

  // Return modified fields (or null if unchanged)
  return isUnchanged ? null : changedFields;
};

export default extractChangedFields;
