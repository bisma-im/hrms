import React from 'react';

const ChildRepeater = ({ fields, setFields }) => {
    const handleChange = (index, fieldName, value) => {
        const newFields = [...fields];
        newFields[index][fieldName] = value;
        setFields(newFields);
    };

    const handleAdd = () => {
        setFields([...fields, { name: '', age: '' }]);
    };

    const handleRemove = (index) => {
        const newFields = fields.filter((_, idx) => idx !== index);
        setFields(newFields);
    };

    return (
        <>
            <div className='row'>
                <div className="col-sm-5"><label className="form-label">Child's Name</label></div>
                <div className="col-sm-4"><label className="form-label">Child's Age</label></div>
                <div className="col-sm-3"></div> 
            </div>
            {fields.map((field, index) => (
                <div key={index} className="row mb-2 align-items-center">
                    <div className="col-sm-5">
                        <input
                            className="form-control"
                            type="text"
                            value={field.name}
                            onChange={(e) => handleChange(index, 'name', e.target.value)}
                            placeholder="Child's Name"
                        />
                    </div>
                    <div className="col-sm-4">
                        <input
                            className="form-control"
                            type="number"
                            value={field.age}
                            onChange={(e) => handleChange(index, 'age', e.target.value)}
                            placeholder="Child's Age"
                        />
                    </div>
                    <div className="col-sm-3 d-flex justify-content-start">
                        {index > 0 && (
                            <button className="btn btn-danger me-2" onClick={() => handleRemove(index)}>-</button>
                        )}
                        {index === fields.length - 1 && (
                            <button className="btn btn-primary" onClick={handleAdd}>+</button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ChildRepeater;
