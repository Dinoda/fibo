export default () => {
  return {
    get(target, key) {
      if (target.__meta.fields[key]) {
        return target["#" + key];
      }

      return typeof target[key] === "function"
        ? target[key].bind(target)
        : target[key];
    },
    set(target, key, value, receiver) {
      if (!target.__meta.fields[key]) {
        return false;
      }

      target["#" + key] = value;

      return true;
    }
  };
};
