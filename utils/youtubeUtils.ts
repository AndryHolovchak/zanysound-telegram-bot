export const getFirstVideoIdFromSearchResult = (html: string): string | null => {
  const matched = html.match(/watch\?v=(.*)\\"/gm);

  if (matched) {
    const stringWithId = matched[0].split('"')[0];
    const id = stringWithId.slice(stringWithId.indexOf("=") + 1);
    return id;
  } else {
    return null;
  }
};
