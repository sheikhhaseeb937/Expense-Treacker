export const validateEmail = (email) => {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  return regex.test(email);
};

export const inputIncome = (inputValue) => {
const regex = /^[0-9]*\.?[0-9]+$/;

  return regex.test(inputValue);
};