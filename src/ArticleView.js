import { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import 'bootstrap/dist/css/bootstrap.css';
import io from 'socket.io-client';


export default function ArticleView() {
    const [text, setText] = useState('## loading ...');
    //const [blockedArticle, setblockedArticle] = useState(false);
    let { path } = useParams();

    const socket = io(process.env.REACT_APP_HOST);
    socket.on("connect", () => {
        console.log("connect");
        socket.emit('viewArticle', path);
    });

    socket.on("blockedArticle", (articlePath) => {
        console.log("blockedArticle " + articlePath);
    });

    socket.on("unBlockedArticle", (articlePath) => {
        console.log("unBlockedArticle " + articlePath);
    });

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

    return (
        <div className='row'>
            <div className='col-lg'></div>
            <div style={{ 'maxWidth': '900px' }}>
                <div className='btn-group m-3'>
                    <button className='btn btn-outline-danger' onClick={onEditModeClick}>Edit mode</button>
                </div>
                <div className='shadow-lg p-3 mb-5 bg-white rounded' >
                    <hr></hr>
                    <MDEditor.Markdown
                        style={{ padding: 15 }}
                        source={text}
                        linkTarget="_blank"
                    />
                </div>
            </div>
            <div className='col-lg'></div>
        </div>

    );

}
