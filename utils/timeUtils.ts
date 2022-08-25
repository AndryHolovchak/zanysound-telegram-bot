// handle S | M:S | H:M:S
export const durationToSec = (duration: string): number => {
  const items = duration.split(":").map((e) => +e);

  // invalid string
  if (items.length > 3) {
    return 0;
  }

  // add hours and minutes if necessary
  while (items.length < 3) {
    items.unshift(0);
  }

  return items[0] * 60 * 60 + items[1] * 60 + items[2];
};
