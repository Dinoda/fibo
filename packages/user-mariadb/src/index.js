import MariaDBUserSource from './source.js';

export default (database, options = {}) => {
	return new MariaDBUserSource(database, options);
};

export { MariaDBUserSource };
