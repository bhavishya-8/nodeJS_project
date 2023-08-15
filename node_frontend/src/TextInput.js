import React, { useState } from 'react';

const TextInput = ({ onSubmit }) => {
    const [text, setText] = useState('');

    const handleChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
        if (text) {
            onSubmit(text);
            setText('');
        }
    };

    return ( <
        div >
        <
        input type = "text"
        value = { text }
        onChange = { handleChange }
        /> <button onClick = { handleSubmit } > Submit </button> </div>
    );
};

export default TextInput;
