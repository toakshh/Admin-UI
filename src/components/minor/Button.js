import React from 'react';
import "./Button.css";
 
const Button = (props) => {
  // Destructure props
  const {btnText, classProp, clickProp, para1, disabled, para2, para3, para4, logo} = props;

  return (
  
        <button 
            className={classProp} 
            disabled={disabled} 
            onClick={() => clickProp(para1, para2, para3, para4)}
        >
      {/* If logo is passed as prop, display logo and button text */}
      {logo ? 
          <>
            <img className='btn-logo' src={logo} alt="action-logo" />
            <span>{btnText}</span> 
          </>
        // If no logo is passed, display only button text
            :
            <span>{btnText}</span>
          }
        </button>
  )
    
}
 // Export Button component
export default Button