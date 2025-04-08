export default async (err, resp) => {
  if (err) {
    console.error(err);
    console.error(resp);
  } else {
    if (resp.status == 200) {
      console.log((await resp.json()).data);
    } else {
      console.error(await resp.json());
    }
  }
};
