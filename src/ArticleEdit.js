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
    }, []);

    return (
        <div>
            <h3>Edit Article : {path}</h3>
            <MDEditor
                height={500}
                value={text}
                onChange={setText} />
        </div>
    );

}
