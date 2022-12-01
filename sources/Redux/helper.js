export const defaultInitState = { loading: true, error: null, data: null };

export const defaultErrorState = {
  loading: false,
  error: "Terjadi kesalahan saat memproses data",
  data: null,
};

export const defaultDoneState = (data, temp) => {
  let obj = {
    loading: false,
    error: null,
    data: data,
  };
  if (temp) {
    obj.data = data.data;
    obj.expired = data.includes ? data.includes : null;
  }

  return obj;
};

export const defaultFailedState = (message) => ({
  loading: false,
  error: message,
  data: null,
});
