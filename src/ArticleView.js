import {
    useParams
} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

export default function ArticleView() {
    let { path } = useParams();

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
    return (
        <div>
            <h3>View Article : {path}</h3>
            <MDEditor.Markdown
                style={{ padding: 15 }}
                source={mkdStr}
                linkTarget="_blank"
            />
        </div>
    );

}