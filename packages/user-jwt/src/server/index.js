import JWT from './JWT.js';

const JWTMiddleware = (options) => {
  const jwt = new JWT(options);

  return (req, res, next) => {
    const auth = req.get("Authorization");

    if (!auth) {
      next();
      return;
    }

    const match = auth.match(/^Bearer (.+)$/);

    if (!match) {
      next();
      return;
    }

    console.log(match);

    jwt.verify(match[1]).then((data) => {
      console.log(data);
    });

    next();
  };
};

export { JWTMiddleware };
