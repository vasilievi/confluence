import {useEffect, useState} from 'react';
import {
    useParams
} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";

export default function ArticleView() {
    const [articleJson, setarticleJson] = useState({text: "init text"});
    let { path } = useParams();

    useEffect(() => {
        fetch(`https://confluence.cs-develop.ru/getArticle/${path}`)
            .then(response => response.json())
            .then(setarticleJson);
    }, []);

    return (
        <div>
            <h3>View Article : {path}</h3>
            <MDEditor.Markdown
                style={{ padding: 15 }}
                source={articleJson.text}
                linkTarget="_blank"
            />
        </div>
    );

}
