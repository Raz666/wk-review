const snakeToCamelCase = (key: string) =>
  key.replace(/(_+[a-z0-9])/g, (snip: string) =>
    snip.toUpperCase().replace("_", "")
  );

export function parse(responseOrText: string | Response): any {
  // console.log(responseOrText);
  if (typeof responseOrText === "string") {
    const text = responseOrText.replace(/"([^"]*)"\s*:/g, snakeToCamelCase);
    return JSON.parse(text);
  }
  return responseOrText.text().then((text: string) => parse(text));
}
