const customs = {};

export default function addValidator(name, validator) {
  customs[name] = validator;
}

export { customs };
