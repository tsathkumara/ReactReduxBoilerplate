import React from 'react';

const RenderField = ({ input, label, type, meta: { touched, error, warning } }) => (
    <div className={`form-group ${touched && error ? 'has-danger' : ''}`}>
       <input className="form-control" {...input} placeholder={label} type={type}/>
       <div className="text-danger">
         {touched ? error: ''}
       </div>
   </div>
)

export default RenderField;
