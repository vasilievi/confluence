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

let editMode = true

function EditButtons(props) {
  if (props.editMode) {
    return <button className='btn btn-success'>Edit</button>
  } else {
    return <button className='btn btn-danger'>Save</button>
  }
}

function MarkDownEditor() {
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
      <div className='mt-3 btn-group'></div>
      <EditButtons editMode = {editMode} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MarkDownEditor />);
