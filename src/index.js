import React from 'react';
import ReactDOM from 'react-dom/client';
import MDEditor from "@uiw/react-md-editor";
import 'bootstrap/dist/css/bootstrap.css';

const mkdStr = `
# Develop docs

---
## Картинка со ссылкой
**New MD-editor**

[![](https://cs-develop.ru/files/20220913/1663044003926_images.png)](https://cs-develop.ru)

## Ссылки
* [pcs.ru](https://pcs.ru)
* [Enterprise](https://enterprise.cs-develop.ru/)

## Код JavaScript
\`\`\`javascript
let message;
message = 'Hello world!';

alert(message);
\`\`\`
`;

let editMode = false

function App() {
  const [value, setValue] = React.useState(mkdStr);
  return (
    <div className="container">
      <MDEditor.Markdown
        style={{ padding: 15 }}
        source={value}
        linkTarget="_blank"
      />
      <MDEditor
        value={value}
        onChange={setValue} />
      <div className='btn-group'></div>
      <button className='btn btn-success'>Edit</button>
      <button className='btn btn-warning'>Save</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
