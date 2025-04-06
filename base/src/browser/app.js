import Content from './component/Content.js';

Window.__content = document.getElementById('content');

const content = new Content();

Window.__content.appendChild(content.getDOM());

fetch('/api', {
  headers: {
    'Authorization': 'Bearer abcdefg',
  }
}).then((res) => {
    console.log(res);
});

