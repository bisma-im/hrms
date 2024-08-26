import React from 'react';

const FormRepeater = ({ fields, setFields }) => {

  const handleChange = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index][fieldName] = value;
    setFields(newFields);
  };

  const handleAdd = () => {
    setFields([...fields, { date: '', time: '', subject: '', class: '', swapped_with: '', sign: '' }]);
  };

  const handleRemove = (index) => {
    const newFields = fields.filter((_, idx) => idx !== index);
    setFields(newFields);
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-2"><label className="form-label">Date</label></div>
        <div className="col-sm-2"><label className="form-label">Time</label></div>
        <div className="col-sm-2"><label className="form-label">Subject</label></div>
        <div className="col-sm-2"><label className="form-label">Class</label></div>
        <div className="col-sm-2"><label className="form-label">Swapped With Faculty</label></div>
        <div className="col-sm-1"><label className="form-label">Sign</label></div>
        <div className="col-sm-1"></div> {/* Empty column for alignment with button columns */}
      </div>
      {fields.map((field, index) => (
        <div key={index} className='row'>
          <div className='col-sm-2'>
            <input
              className="form-control"
              type="date"
              value={field.date}
              onChange={(e) => handleChange(index, 'date', e.target.value)}
              placeholder="Date"
            />
          </div>
          <div className='col-sm-2'>
            <input
              className="form-control"
              type="time"
              value={field.time}
              onChange={(e) => handleChange(index, 'time', e.target.value)}
              placeholder="Time"
            />
          </div>
          <div className='col-sm-2'>
            <input
              className="form-control"
              value={field.subject}
              onChange={(e) => handleChange(index, 'subject', e.target.value)}
              placeholder="Subject"
            />
          </div>
          <div className='col-sm-2'>
            <input
              className="form-control"
              value={field.class}
              onChange={(e) => handleChange(index, 'class', e.target.value)}
              placeholder="Class"
            />
          </div>
          <div className='col-sm-2'>
            <input
              className="form-control"
              value={field.swapped_with}
              onChange={(e) => handleChange(index, 'swapped_with', e.target.value)}
              placeholder="Faculty Name"
            />
          </div>
          <div className='col-sm-1'>
            <input
              className="form-control"
              value={field.sign}
              onChange={(e) => handleChange(index, 'sign', e.target.value)}
              placeholder="Signature"
            />
          </div>
          <div className='col-sm-1 m-b30'>
            <button className="btn btn-danger" type="button" onClick={() => handleRemove(index)} style={{ minHeight: '50px', marginRight: '5px' }}>
              x
            </button>
            <button type="button" className="btn btn-primary" onClick={() => handleAdd()} style={{ minHeight: '50px' }}>
              +
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default FormRepeater;
