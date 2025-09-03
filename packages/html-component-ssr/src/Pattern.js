import { IPattern } from 'fibo-html-component';

export default class SSRPattern extends IPattern {
  static lockOn = [
    'client',
  ];

  constructor(builder) {
    if (! builder.options.lockOn || builder.options.lockOn.length == 0) {
      builder.options.lockOn = SSRPattern.lockOn;
    }

    super(builder);
  }
}
