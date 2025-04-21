const DEFAULT_CONF = {
  defaultValue: true,
  canHaveValue: false,
  mustHaveValue: false,
};

const resolve = (conf) => {
  if (!conf.argument) {
    throw new Error(`Configuration option needs an "argument" value: ${JSON.stringify(conf)}`);
  }

  conf.option = conf.option ?? conf.argument;
  if (! conf.canHaveValue && conf.mustHaveValue) {
    conf.canHaveValue = true;
  }

  return {
    ...DEFAULT_CONF,
    ...conf,
  };
};

export default (config) => {
  for (const idx in config) {
    config[idx] = resolve(config[idx]);
  }

  return config;
};

/*
config is like = {
  // [Required] The user's argument (i.e. "--argument")
  argument: 'argument', 
  // [Optional] The option name for the end program
  // Default to "argument" value
  option: 'option', 
  // [Optional] The one character equivalent (i.e. "-a")
  // Default to no short value
  short: 'a', 
  // [Optional] The value this argument gives to the option by default
  // Default to "true"
  defaultValue: true, 
  // [Optional] This argument can be followed by a value ("--argument=value", "-a value", "--argument value"), which will override the "defaultValue"
  // Default to "false"
  canHaveValue: false, 
  // [Optional] This argument must have a value, throw an error without it
  // Default to "false"
  mustHaveValue: false,
  // [Optional] Callback, format: (options, name, value) => {}
  callback: null
};
*/
