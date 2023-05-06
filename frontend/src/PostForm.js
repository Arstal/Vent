import React, {useState} from 'react';
function PostForm() {
    const [content, setContent] = useState('');
    const handleSubmit = (event) => {
        event.preventDefault();
        const url = '/Post';
        const data = {content};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Post submitted: ', data);
            })
            .catch((error) => console.error('Error submitting', error));
    };
    return (
        <div className="form-container">
        <form onSubmit={handleSubmit}>
            <input
                className="form-input"
                type="text"
                id="content"
                name="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
            />
            <button type="submit">Post</button>
        </form>
        </div>
    );
}
export default PostForm;