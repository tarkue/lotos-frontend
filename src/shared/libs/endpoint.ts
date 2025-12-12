import { Endpoint } from "../models/endpoint-enum";

export function formatEndpoint(
  endpoint: Endpoint | `${Endpoint}`,
  elements: unknown[]
): string {
  const formatStrings = elements
    .filter((el) => el !== undefined)
    .map((el) => (el as object).toString());
  let formattedEndpoint = endpoint.toString();
  let index = 0;

  formattedEndpoint = formattedEndpoint.replace(/\{\}/g, (match) => {
    if (index < formatStrings.length) {
      return formatStrings[index++];
    }
    return match; // Если элементов меньше чем плейсхолдеров - оставляем исходный плейсхолдер
  });

  return formattedEndpoint;
}
