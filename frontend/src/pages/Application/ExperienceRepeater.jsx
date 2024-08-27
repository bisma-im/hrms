import React from 'react';

const ExperienceRepeater = ({ fields, setFields }) => {
    const handleChange = (index, fieldName, value) => {
        const newFields = [...fields];
        newFields[index][fieldName] = value;
        setFields(newFields);
    };

    const handleAdd = () => {
        setFields([...fields, { institution_name: '', position_title: '', from_date: '', to_date: '', total_period: '' }]);
    };

    const handleRemove = (index) => {
        const newFields = fields.filter((_, idx) => idx !== index);
        setFields(newFields);
    };

    return (
        <>
            <div className='row'>
                <div className="col-sm-3"><label className="form-label">Institution/Organization</label></div>
                <div className="col-sm-2"><label className="form-label">Position/Job Title</label></div>
                <div className="col-sm-2"><label className="form-label">From (D/M/Y)</label></div>
                <div className="col-sm-2"><label className="form-label">To (D/M/Y)</label></div>
                <div className="col-sm-2"><label className="form-label">Total Period (in Years/Months)</label></div>
                <div className="col-sm-1"></div> 
            </div>
            {fields.map((field, index) => (
                <div key={index} className="row mb-3">
                    <div className="col-sm-3">
                        <input
                            className="form-control"
                            type="text"
                            value={field.institution_name}
                            onChange={(e) => handleChange(index, 'institution_name', e.target.value)}
                            placeholder="Institution Name"
                        />
                    </div>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="text"
                            value={field.position_title}
                            onChange={(e) => handleChange(index, 'position_title', e.target.value)}
                            placeholder="Position"
                        />
                    </div>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="date"
                            value={field.from_date}
                            onChange={(e) => handleChange(index, 'from_date', e.target.value)}
                            placeholder="Start Date"
                        />
                    </div>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="date"
                            value={field.to_date}
                            onChange={(e) => handleChange(index, 'to_date', e.target.value)}
                            placeholder="End Date"
                        />
                    </div>
                    <div className="col-sm-2">
                        <input
                            className="form-control"
                            type="text"
                            value={field.total_period}
                            onChange={(e) => handleChange(index, 'total_period', e.target.value)}
                            placeholder="Total Period"
                        />
                    </div>
                    <div className="col-sm-1 pt-2">
                        {index > 0 && (
                            <button className="btn btn-danger" onClick={() => handleRemove(index)}>-</button>
                        )}
                        {index === fields.length - 1 && (
                            <button className="btn btn-primary ms-2" onClick={handleAdd}>+</button>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
};

export default ExperienceRepeater;
