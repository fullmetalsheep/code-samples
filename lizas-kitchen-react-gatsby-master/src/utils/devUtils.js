const js = (json, comment) => {
  return console.log(`${comment}:${JSON.stringify(json, null, 2)}`);
};

export const cl = (variable, comment) => {
  return console.log(`${comment}:${variable}`);
};

export default js;
