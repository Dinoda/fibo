const toScalar = (data) => {
  if (typeof data === 'object') {
    return JSON.stringify(data);
  }

  return data;
};

export const getMultipleData = (data) => {
  if (! Array.isArray(data)) {
    throw new Error(`Component with "multiple" set expects data to be an array, got: ${JSON.stringify(data)}`);
  }

  return data;
};

export const getSimpleData = (comp, data) => {
  if (! comp.data) {
    return data;
  }

  switch (comp.data) {
    case '__plain':
      return toScalar(data);
      break;
    default:
      return data[comp.data];
  }
};
