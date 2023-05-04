import React, {useState} from 'react';

function PostForm() {
    const [content, setContent] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = 'http://';
        const data = {content};
        fetch(url, {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Post submitted: ', data);
            })
            .catch((error) => console.error('Error submitting', error));
    };
    return (
        <form onSubmit={handleSubmit}>
            <div
                contentEditable
                role="textbox"
                inputMode="text"
                style={{
                border: '1px solid #ccc',
                borderRadius: '4px',
                minHeight: '100px',
                padding: '8px',
                }}
                onInput={(e) => setContent(e.target.textContent)}
                dangerouslySetInnerHTML={{ __html: content }}
            />
            <button type="submit">Vent</button>
        </form>
    );
}
export default PostForm;