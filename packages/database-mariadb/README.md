# database-mariadb

## Basic usage

```js
// database.js
import 'dotenv/config';

import { MariaDBDatabase as Database } from 'fibo-database-mariadb';

export default new Database({
	host: process.env.DATABASE_HOST,
	database: process.env.DATABASE,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	// optional
	connectionLimit: 5
});

// index.js
import database from './database.js';

database.query('SELECT * FROM users');
```

