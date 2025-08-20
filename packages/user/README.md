# user

This package is a base for a simple authentication & authorization system, to use in an express system.

```js
const manager = new UserManager(
    mySource,
    myAuthenticator,
    myAuthorizer
);

// Will ensure the user is authenticated with the given elements
expressApp.use(manager.authenticationMiddleware());

// Will ensure the user's authorization is verified before accessing the page
expressApp.use(manager.authorizationMiddleware());
```

Sources, authenticators and authorizers are to get from other packages.

* *fibo-jwt" checks the user's cookies for a JWToken for authentication, contains elements to create the associated token too
* *fibo-express-route-authorizer* checks if the authenticated user as the access rights to access the current route

