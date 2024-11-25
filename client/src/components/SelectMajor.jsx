import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';


function SelectMajor({options, value, onChange}) {
    return (
        <Form.Group controlId='selectmajor'>
            <Form.Control as="select" value={value} onChange={onChange}>
                <option value="">Select a Major</option>
                {options.map((option, index) => (
                    <option key={index} value={option.name}>
                        {option.name}
                    </option>
                ))}
            </Form.Control>
        </Form.Group>
    );
};

export default SelectMajor;