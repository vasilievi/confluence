import React from 'react';
import ReactDOM from 'react-dom/client';
import MDEditor from "@uiw/react-md-editor";
import 'bootstrap/dist/css/bootstrap.css';

function MarkDown(props) {
  let mkdStr = `
# Develop docs

---
## Картинка со ссылкой
**New MD-editor**

[![](https://cs-develop.ru/files/20220913/1663044003926_images.png)](https://cs-develop.ru)

## Ссылки
* [pcs.ru](https://pcs.ru)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)
* [Enterprise](https://enterprise.cs-develop.ru/)

## Код JavaScript
\`\`\`javascript
let message;
message = 'Hello world!';

alert(message);
\`\`\`
`;
  const [value, setValue] = React.useState(mkdStr);

  if (props.editMode) {
    return (
      <MDEditor
        height={500}
        value={value}
        onChange={setValue} />
    )
  }

  return (
    <MDEditor.Markdown
      style={{ padding: 15 }}
      source={value}
      linkTarget="_blank"
    />
  );

}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editMode: props.editMode,
      mdString: props.mdString,
    };
  }

  onEditButton() {
    console.log('onEditButton');
    this.setState({ editMode: true });
  }

  onSaveButton() {
    console.log('onSaveButton');
    this.setState({ editMode: false });
  }

  render() {
    if (this.state.editMode) {
      return <div>
        <MarkDown editMode={this.state.editMode} />
        <button onClick={() => this.onSaveButton()} className='btn btn-danger'>Save</button>
      </div>
    }
    return <div>
      <MarkDown editMode={this.state.editMode} />
      <button onClick={() => this.onEditButton()} className='btn btn-success'>Edit</button>
    </div>
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page />);
