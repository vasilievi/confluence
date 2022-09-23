import { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import 'bootstrap/dist/css/bootstrap.css';
import io from 'socket.io-client';

export default function ArticleView() {
    const [text, setText] = useState('## loading ...');
    const [modified, setModified] = useState(false);
    let { path } = useParams();

    const socket = io(process.env.REACT_APP_HOST);
    socket.on("connect", () => {
        socket.emit('editArticle', path);
    });

    document.title = 'Edit mode: ' + path

    useEffect(() => {
        fetch(`${process.env.REACT_APP_HOST}/getArticle/${path}`)
            .then(response => response.json())
            .then((resJson) => setText(resJson.text));
    }, [path]);

    function onChangeText(newText) {
        setText(newText)
        setModified(true)
    }

    function SaveButton() {
        if (modified) {
            return <button className='btn btn-warning' onClick={onSaveButtonClick}>Save</button>
        }
    }

    async function onSaveButtonClick() {
        console.log('onSaveButtonClick');
        let res = await fetch(`${process.env.REACT_APP_HOST}/postArticle/${path}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({text: text})
        });
        let resJson = await res.json()
        if(resJson){
            if(resJson.success) {
                setModified(false)
                socket.emit('savedArticle', path);
            }
        }
        console.log(resJson);
    }

    function onViewModeClick() {
        console.log('onViewModeClick');
        window.location.href = '/view/' + path;
    }

    return (
        <div>
            <div className='btn-group m-3'>
                <button className='btn btn-outline-success' onClick={onViewModeClick}>View mode</button>
                <SaveButton />
            </div>
            <hr></hr>
            <MDEditor
                height={500}
                value={text}
                onChange={onChangeText} />
        </div>
    );

}
