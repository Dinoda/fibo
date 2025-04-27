import resolveConfig from './config.js';

export default class CLI {
  constructor(config, args) {
    this.config = resolveConfig(config);
    this.args = args;
    this.argsLength = args.length;
    
    this.node = null;
    this.script = null;

    this.options = {};
    this.parameters = [];

    this.idx = 0;

    this.filterScript();
    
    this.resolveArgs();
  }

  // Basic getters //
  // ============= //
  
  getParameters() {
    return this.parameters;
  }

  getOptions() {
    return this.options;
  }
  
  hasNext() {
    return this.idx < this.argsLength;
  }

  getNext() {
    return this.args[this.idx];
  }

  retrieveNext() {
    return this.args[this.idx++];
  }

  // Initial filters //
  // =============== //
  
  filterScript() {
    if (this.getNext().match(/node$/)) {
      this.node = this.retrieveNext();
      this.script = this.retrieveNext();
    }
  }

  // Resolvers //
  // ========= //

  resolveArgs() {
    while (this.hasNext()) {
      const arg = this.retrieveNext();

      if (arg.charAt(0) == '-') {
        // Long arg
        if (arg.charAt(1) == '-') {
          this.resolveLong(arg);
        } 
        // Short arg
        else {
          this.resolveShort(arg);
        }
      } else {
        this.parameters.push(arg);
      }
    }
  }

  resolve(config, value) {
    if (config.callback) {
      config.callback(this.options, config.option, value);
      return;
    }

    if (! value) {
      if (config.mustHaveValue) {
        throw new Error(`Option "${config.option}" expect a value, got none`);
      }

      this.options[config.option] = config.defaultValue;
    } else {
      if (! config.canHaveValue) {
        throw new Error(`Option "${config.option}`);
      }

      if (config.callback) {
        config.callback(this.options, config.option, value);
      } else {
        this.options[config.option] = value;
      }
    }
  }

  getValue() {
    if (! this.hasNext()) {
      return null;
    }

    return this.getNext().charAt(0) != "-" ? this.retrieveNext() : null;
  }

  //// Long Argument Resolvers ////
  //// ======================= ////

  resolveLong(fullArg) {
    const [arg, value] = fullArg.slice(2).split("=");

    const cfg = this.getConfigLong(arg);

    if (cfg.canHaveValue) {
      this.resolve(cfg, value ?? this.getValue());
    } else {
      this.resolve(cfg, value);
    }
  }

  getConfigLong(arg) {
    for (const cfg of this.config) {
      if (cfg.argument == arg) {
        return cfg;
      }
    }
  }

  //// Short Argument Resolvers ////
  //// ======================== ////
  
  resolveShort(arg) {
    for (let i = 1;i < arg.length;i++) {
      const cfg = this.getConfigShort(arg.charAt(i));

      if (arg.length == i + 1) {
        const value = cfg.canHaveValue ? this.getValue() : null;

        this.resolve(cfg, value);
      } else {
        this.resolve(cfg, null);
      }
    }
  }

  getConfigShort(arg) {
    for (const cfg of this.config) {
      if (cfg.short == arg) {
        return cfg;
      }
    }
  }
}
