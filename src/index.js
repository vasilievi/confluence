import React from 'react';
import ReactDOM from 'react-dom/client';
import MDEditor from "@uiw/react-md-editor";
import 'bootstrap/dist/css/bootstrap.css';

const mkdStr = `
# Компьютер Сервис 2

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

function App() {
  const [value, setValue] = React.useState(mkdStr);
  return (
    <div className="container">
      <button className='btn btn-success'>Test bootstrap</button>
      <MDEditor
        value={value}
        onChange={setValue} />

      <MDEditor.Markdown
        style={{ padding: 15 }}
        source={value}
        linkTarget="_blank"
      />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
