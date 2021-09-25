export const camelToKebabCase = (string: string): string => {
  return string.replace(/((?<=[\da-z])[A-Z]|(?<=[\dA-Z])[A-Z](?=[a-z]))/g, '-$1').toLowerCase()
}
