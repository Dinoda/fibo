import { createDocumentsFromDirectory as getDocFrom } from 'fibo-html-component/serverdoc';

export default async (builder, srcDir, resourceDir) => {
  const res = await getDocFrom(resourceDir, true);

  for (const name in res) {
    console.log('Loading resource from:', name);
    builder.addResourcesFromDocument(res[name]);
  }

  const docs = await getDocFrom(srcDir, true);

  for (const name in docs) {
    builder.preparePage(name, docs[name]);
  }

  return builder;
};
