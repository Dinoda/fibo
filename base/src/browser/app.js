import Content from './component/Content.js';

Window.__content = document.getElementById('content');

const content = new Content();

Window.__content.appendChild(content.getDOM());

