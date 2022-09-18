import { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

export default function ArticleView() {
    const [text, setText] = useState('# init text');
    let { path } = useParams();

    useEffect(() => {
        fetch(`https://confluence.cs-develop.ru/getArticle/${path}`)
            .then(response => response.json())
            .then((resJson) => setText(resJson.text));
    }, [path]);

    function onEditModeClick() {
        console.log('onEditModeClick');
        window.location.href = '/edit/' + path;
    }

    return (
        <div>
            <div>View mode : {path}</div>
            <div className='btn-group m-3'>
                <button className='btn btn-danger' onClick={onEditModeClick}>Edit mode</button>
            </div>            
            <MDEditor.Markdown
                style={{ padding: 15 }}
                source={text}
                linkTarget="_blank"
            />
        </div>
    );

}
