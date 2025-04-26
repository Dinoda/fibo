# browser

## Getting Started

[see global README](../../README.md)

## Quick Examples

### Component

```js
component = new Component('article', 'my-article-class', {
    backgroundColor: "red",
});

component.appendNewComponent('my-article-s-div', 'div', 'my-div-class', {
    backgroundColor: 'blue',
});
```

### Call

```js
import { jsonCall, formCall, binaryCall } from 'fibo-browser/call';

const jsonFetch = jsonCall('/my/url', [fetchOptions,] async (err, response) => {
    if (err) {
        throw err;
    }

    if (response.status == 200) {
        const data = await response.json();

        // process response data
    }
});

// jsonRequestData doesn't need to be a JSON string
jsonFetch(jsonRequestData);
```

`formCall` and `binaryCall` are approximately the same in their use.

`binaryCall` can be used to send file data (using header "Content-Type: multipart/form-data"). Called with the FormData as data.

Form use the standard http form format (Content-Type: "application/x-www-form-urlencoded")
