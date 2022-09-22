import { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import 'bootstrap/dist/css/bootstrap.css';


export default function ArticleView() {
    const [text, setText] = useState('# init text');
    let { path } = useParams();
    document.title = path

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/getArticle/${path}`)
            .then(response => response.json())
            .then((resJson) => setText(resJson.text));
    }, [path]);

    function onEditModeClick() {
        console.log('onEditModeClick');
        window.location.href = '/edit/' + path;
    }

    const hash = window.location.hash
    useEffect(() => {
        if (hash) {
            console.log(hash);
            const id = decodeURIComponent(hash.replace('#', ''));
            const element = document.getElementById(id);
            if (element) {
                console.log(element);
                element.scrollIntoView();
            }
        }
    });

    const css = `
    .wmde-markdown img {
        border-style: solid;
        border-color: bisque;
        border-radius: 10px;
        margin-top: 5px
    }

    .wmde-markdown h2 {
        color: teal;
    }
    `

    return (
        <div style={{'display': 'flex', 'justifyContent': 'center', }}>
            <div style={{ 'maxWidth': '1000px' }}>
                <div className='btn-group m-3'>
                    <button className='btn btn-outline-danger' onClick={onEditModeClick}>Edit mode</button>
                </div>
                <hr></hr>
                <MDEditor.Markdown
                    style={{ padding: 15 }}
                    source={text}
                    linkTarget="_blank"
                />
                <style>{css}</style>
            </div>
        </div>
    );

}
