export const transformArrayToOptions = (array) => {
  return array.map((item) => ({
    value: item,
    label: item,
  }));
};
