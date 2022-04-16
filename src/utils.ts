export function getResponseData(text: string): any {
  let result = JSON.parse(text);
  return result.data
}
