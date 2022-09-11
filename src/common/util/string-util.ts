const stringValueIsNumber = (value: string): boolean => {
  const re = /\D/g;
  return !re.test(value);
};

export { stringValueIsNumber };
