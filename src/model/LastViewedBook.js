export const makeLastViewedBook = (hostname, title) => {
  return Object.freeze({
    hostname,
    title
  });
};
