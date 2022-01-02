import React, { useState } from 'react';
import ReactDOM  from 'react-dom';
import App from './index';

const options = [
    {
        "name": "Assignee",
        "opts": [
            "Elon Musk",
            "Jeff Bezos"
        ]
    },
    {
        "name": "reporter",
        "opts": [
            "Elon Musk",
            "Jeff Bezos"
        ]
    },
    {
        "name": "status",
        "opts": [
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
        <App options={options} subOptions={subOptions} changeSubOptions={setSubOptions} />
    );
}

ReactDOM.render(<TestComponent />, document.getElementById('root'));
