import React from 'react';
import "./Input.css"

const Input = (props) => {
    const {value,clickProp,classProp,placeholder,type,checked}= props;
  return (
    <div className='searchbox'>
        <input
        className={classProp}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={clickProp}
        checked={checked}
      />
    </div>
  )
}

export default Input