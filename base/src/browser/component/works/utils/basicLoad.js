export default (cb) => {
  return async (err, resp) => {
    if (err) {
      console.error(err);
      return;
    }

    if (resp.status == 200) {
      cb(await resp.json());
    } else {
      console.error('Request error: ', resp.status, resp.statusText);
    }
  };
};
