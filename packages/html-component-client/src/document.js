const componentDocument = {};

componentDocument.createFromHTML = (html) => {
  const d = document.implementation.createHTMLDocument();

  d.write(html);
  d.close();

  return d;
};

componentDocument.createFromURL = async (url) => {
  const ftc = await fetch(url);

  if (!ftc.ok) {
    throw new Error(`Couldn't fetch any resource from url "${url}", failed to create a document`);
  }

  return componentDocument.createFromHTML(await ftc.text());
};

export componentDocument;
