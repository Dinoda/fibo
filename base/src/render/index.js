import createBuilder, { Builder, DocumentBundle } from 'fibo-html-component-ssr';

const builder = createBuilder();

const bundle = new DocumentBundle(true);

await bundle.createFromDirectory("src/html");

builder.addAllResourcesFromBundle(bundle, { identifier: "fb", lockOn: ['client'] });

/*
builder.createPage('index', 'index');
builder.createPage('profile', 'profile');

builder.prepareAllPages({}, {lockOn: ['client']})
*/
