import { useEffect, useState } from 'react';
import {
    useParams
} from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import 'bootstrap/dist/css/bootstrap.css';
import io from 'socket.io-client';

const socket = io(process.env.REACT_APP_HOST);

export default function ArticleView() {
    const [text, setText] = useState('## loading ...');
    const [articleState, setArticleState] = useState('unblocked');
    const [modified, setModified] = useState(false);
    const [screenHeight, setScreenHeight] = useState(500);
    let { path } = useParams();

    socket.on("connect", () => {
        console.log("connect");
        socket.emit('viewArticle', path);
    });

    socket.on("blockedArticle", (blockedArticlePath) => {
        console.log("blockedArticle " + blockedArticlePath);
        if (path === blockedArticlePath && !modified) {
            setArticleState('blocked')
        }
    });

    socket.on("unBlockedArticle", async (unBlockedArticlePath) => {
        console.log("unBlockedArticle " + unBlockedArticlePath);
        if (path === unBlockedArticlePath) {
            await fetch(`${process.env.REACT_APP_HOST}/getArticle/${path}`)
                .then(response => response.json())
                .then((resJson) => setText(resJson.text));

            setArticleState('unblocked')
        }
    });

    document.title = 'Edit mode: ' + path

    useEffect(() => {
        console.log('useEffect');
        fetch(`${process.env.REACT_APP_HOST}/getArticle/${path}`)
            .then(response => response.json())
            .then((resJson) => setText(resJson.text));
        setScreenHeight(window.screen.height - 250)

        let textareaElements = document.getElementsByTagName('textarea')
        for (const textarea of textareaElements) {
            textarea.spellcheck = true
        }
    }, [path]);

    function onChangeText(newText) {
        if (!modified && articleState === 'unblocked') {
            setModified(true)
            socket.emit('editArticle', path);
        }
        setText(newText)
    }

    const snackbar = (text) => {
        let snackbarElement = document.getElementById("snackbar");
        snackbarElement.innerText = text
        snackbarElement.className = "show";
        setTimeout(function () { snackbarElement.className = snackbarElement.className.replace("show", ""); }, 3000);
    }

    function SaveButton() {
        async function onSaveButtonClick() {
            console.log('onSaveButtonClick');
            let res = await fetch(`${process.env.REACT_APP_HOST}/postArticle/${path}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text: text })
            });
            let resJson = await res.json()
            if (resJson) {
                if (resJson.success) {
                    setModified(false)
                    socket.emit('savedArticle', path);
                }
            }
            console.log(resJson);
        }

        if (modified) return <button className='btn btn-warning' onClick={onSaveButtonClick}>Save</button>
    }

    function UploadButton() {

        function onClickUploadButton() {
            console.log('onClickUploadFile');
            document.getElementById("inputFile").click();
        }

        async function onChangeInputFile() {
            let formData = new FormData();
            formData.append("filedata", window.event.target.files[0]);
            let res = await fetch("https://cs-develop.ru/upload", {
                method: "POST",
                body: formData,
            });

            if (res.status === 200) {
                let resText = await res.text();
                console.log(resText);

                navigator.clipboard.writeText(resText);
                snackbar('Ссылка скопирована в буфер обмена!')
            }
        }

        return (
            <div>
                <input type="file" id="inputFile" style={{ display: "none" }} onChange={onChangeInputFile} />
                <button className='btn btn-primary' onClick={onClickUploadButton}>Upload file</button>
            </div>
        )
    }

    function onViewModeClick() {
        console.log('onViewModeClick');
        window.location.href = '/view/' + path;
    }

    return (
        <div>
            <div className='row m-3'>
                <div className='col-9 btn-group'>
                    <button className='btn btn-outline-success' onClick={onViewModeClick}>View mode</button>
                    <SaveButton />
                    <button className='btn btn-outline-secondary' disabled>{articleState}</button>
                </div>
                <div className='col-3'>
                    <UploadButton className='ms-1' />
                </div>
            </div>

            <MDEditor
                height={screenHeight}
                value={text}
                onChange={onChangeText} />

            <div id="snackbar">Some text some message..</div>
        </div>
    );

}
