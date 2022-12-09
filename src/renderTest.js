import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import App from './index';

const options = [
    {
        "name": "Assignee",
        "values": [
            "Elon Musk",
            "Jeff Bezos"
        ]
    },
    {
        "name": "reporter",
        "values": [
            "Elon Musk",
            "Jeff Bezos"
        ]
    },
    {
        "name": "status",
        "values": [
            "Open",
            "In Progress",
            "In Code Review",
            "Resolved",
            "Verified",
            "Closed"
        ]
    },
    {
        "name": "Updated Date",
        "type": "Date"
    },
    {
        "name": "Created Date",
        "type": "Date"
    }
];

function TestComponent() {
    const [subOptions, setSubOptions] = useState([]);
    return (
        <App allOptions={options} subOptions={subOptions} changeSubOptions={setSubOptions} />
    );
}

ReactDOM.render(<TestComponent />, document.getElementById('root'));
