import React from 'react';
import CreatableSelect from 'react-select/creatable';

const QualificationRepeater = ({ fields, setFields }) => {
  const handleChange = (index, fieldName, value) => {
    const newFields = [...fields];
    newFields[index][fieldName] = value;
    setFields(newFields);
  };

  const handleSelectChange = (index, fieldName, option) => {
    const newFields = [...fields];
    newFields[index][fieldName] = option ? option.value : '';
    setFields(newFields);
  };

  const handleAdd = () => {
    setFields([...fields, { degree_type: '', duration_years: '', specialization: '', passing_year: '', cgpa_percentage: '', institute_name: '', country: '' }]);
  };

  const handleRemove = (index) => {
    const newFields = fields.filter((_, idx) => idx !== index);
    setFields(newFields);
  };

  const degreeOptions = [
    { value: 'SSC', label: 'SSC' },
    { value: 'HSSC', label: 'HSSC' },
    { value: 'Bachelor', label: 'Bachelor' },
    { value: 'Masters', label: 'Masters' },
    { value: 'MS/M.Phil', label: 'MS/M.Phil' },
    { value: 'Ph.D', label: 'Ph.D' },
    { value: 'Post-Doc', label: 'Post-Doc' }
  ];

  return (
    <>
      <div className='row'>
        <div className="col-sm-2"><label className="form-label">Degree/Certificate</label></div>
        <div className="col-sm-1"><label className="form-label">Duration in Years</label></div>
        <div className="col-sm-2"><label className="form-label">Specialization</label></div>
        <div className="col-sm-1"><label className="form-label">Passing Year</label></div>
        <div className="col-sm-2"><label className="form-label">CGPA/Percentage/Grade</label></div>
        <div className="col-sm-2"><label className="form-label">Institute/Board/University</label></div>
        <div className="col-sm-1"><label className="form-label">Country</label></div>
        <div className="col-sm-1"></div> {/* Empty column for alignment with button columns */}
      </div>
      {fields.map((field, index) => (
        <div key={index} className="row mb-3">
          <div className="col-sm-2 mb-2">
            <CreatableSelect
              isClearable
              onChange={(option) => handleSelectChange(index, 'degree_type', option)}
              options={degreeOptions}
              value={degreeOptions.find(option => option.value === field.degree_type)}
              placeholder="Select degree"
              styles={{
                control: (base) => ({
                  ...base,
                  height: '50px',
                  minHeight: '50px'
              })
              }}
            />
          </div>
          <div className="col-sm-1 mb-2">
            <input
              className="form-control"
              type="text"
              value={field.duration_years}
              onChange={(e) => handleChange(index, 'duration_years', e.target.value)}
              placeholder="Duration in Years"
            />
          </div>
          <div className="col-sm-2 mb-2">
            <input
              className="form-control"
              type="text"
              value={field.specialization}
              onChange={(e) => handleChange(index, 'specialization', e.target.value)}
              placeholder="Specialization"
            />
          </div>
          <div className="col-sm-1 mb-2">
            <input
              className="form-control"
              type="text"
              value={field.passing_year}
              onChange={(e) => handleChange(index, 'passing_year', e.target.value)}
              placeholder="Year"
            />
          </div>
          <div className="col-sm-2 mb-2">
            <input
              className="form-control"
              type="text"
              value={field.cgpa_percentage}
              onChange={(e) => handleChange(index, 'cgpa_percentage', e.target.value)}
              placeholder="CGPA or % or Grade"
            />
          </div>
          <div className="col-sm-2 mb-2">
            <input
              className="form-control"
              type="text"
              value={field.institute_name}
              onChange={(e) => handleChange(index, 'institute_name', e.target.value)}
              placeholder="Institute Name"
            />
          </div>
          <div className="col-sm-1 mb-2">
            <input
              className="form-control"
              type="text"
              value={field.country}
              onChange={(e) => handleChange(index, 'country', e.target.value)}
              placeholder="Country"
            />
          </div>
          <div className="col-sm-1 p-2">
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

export default QualificationRepeater;
