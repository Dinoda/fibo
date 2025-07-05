if (typeof window === 'undefined') {
  throw new Error('This code should not be loaded outside of a browser / client environment, if you are looking for a server side document management, load "fibo-html-component/serverdoc"');
}

export const createDocumentFromHTML = (html) => {
  const d = document.implementation.createHTMLDocument();

  d.write(html);
  d.close();

  return d;
};

export const createDocumentFromURL = async (url) => {
  const ftc = await fetch(url);

  if (!ftc.ok) {
    throw new Error(`Couldn't fetch any resource from "url", failed to create a document`);
  }

  return createDocumentFromHTML(await ftc.text());
};
