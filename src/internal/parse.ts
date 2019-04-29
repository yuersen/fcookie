const parse = (data: string) => {
  try {
    return JSON.parse(data);
  } catch (error) {
    // return new Function('return ' + data)();
    return data;
  }
};
export default parse;
