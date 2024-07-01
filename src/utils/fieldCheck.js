export function fieldLength(field, minLength, maxLength) {
  if (field.value.length === 0) {
    return `${field.placeholder} must be filled and it must have a value with the length between ${minLength} and ${maxLength}.`;
  } else if (field.value.length < minLength) {
    return `${field.placeholder} must have the minimum length of ${minLength}.`;
  } else if (field.value.length > maxLength) {
    return `${field.placeholder} must have the maximum length of ${maxLength}.`;
  } else {
    return "";
  }
}
