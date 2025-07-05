const buildNode = (node, data) => {
  if (node.children.length == 0) {
  }
  if (node.children.length == 0) {
    if ('fbVal' in node.dataset) {
      if (node.dataset.fbVal) {
        node.textContent = data[node.dataset.fbVal];
      } else {
        node.textContent = data;
      }
    }
  }
};
