# user-jwt

## Pre-Requisite & Installation

**cookie-parser** is needed for this to work correctly.

## Usage

```js
import UserManager from 'fibo-user';
import JWTAuthenticator from 'fibo-user-jwt';

const myAuthenticator = new JWTAuthenticator({
    // Security secret for the signing algorith
    secret: "MySecretString",
    // or, for assymetrical algorithms
    secret: {
        private: "MyPrivateKey",
        public: "MyPublicKey",
    },

    // This is the name of the cookie used by the authenticator
    cookie: 'session_token',
    // Valid algorithms for the token. The default is HS256, the first of the list is used for signing
    algorithms: ["HS256"],
    // Validity duration for the token (in milliseconds) (15 minutes default)
    expiresIn: 900000,
    // Filter the user's data and return the data to add in the JWT, by default, the user's secure data is used (see Source) (This data is accessible to the client side, so ensuring it is secure is mandatory)
    filter: (secureUser): Object | String => {},
});

const manager = new UserManager(
    mySource,
    myAuthenticator,
    myAuthorizer
);
```

```js
import myAuthenticator from 'my/authenticator/service.js';

router.post('/login', (req, res) => {

    // Login logic here

    if (login successfull)
        // Make sure to send secured data, or to filter it with the option
        myAuthenticator.createAuthenticationJWT(data, res);

        res.redirect('/profile');
    }
}

```


