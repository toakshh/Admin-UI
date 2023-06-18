import React from 'react';
import Button from '../minor/Button';
import "./Pagination.css";

 // Pagination component
const Pagination = (props) => {

    // Destructuring props
    const {
        pageNumbers,
        currentPage,
        handlePageChange,
        selectedRows,
        handleMarkDeleteAll,
        totalPages
    } = props;

     // Function to handle last button
    const handleLastButton = () => {
        handlePageChange(totalPages);
    };
     // Function to handle next button
    const handleNextButton = () => {
        handlePageChange(currentPage + 1);
    };
     // Function to handle first button
    const handleFirstButton = () => {
        handlePageChange(1);
    };
     // Function to handle previous button
    const handlePreviousButton = () => {
        handlePageChange(currentPage - 1);
    };
    
     // Return the pagination component
    return (
        <div className='pagination-div'>
          <Button 
            classProp="multiDelete" 
            disabled={selectedRows.length === 0} 
            btnText="Delete Selected" 
            clickProp={handleMarkDeleteAll}
          />
          <div className='pagination'>

            <Button 
                disabled={currentPage === 1} 
                btnText="First" 
                clickProp={handleFirstButton} 
                para1={currentPage}
                    classProp={currentPage === 1 ? "disabled" : "pagination-btn"}
            />
            <Button 
                    classProp={currentPage === 1 ? "disabled" : "pagination-btn"} 
                disabled={currentPage === 1} 
                btnText="❮" 
                clickProp={handlePreviousButton} 
                para1={currentPage} 
            />
                 {/* Map through the page numbers to display each button */}
            {pageNumbers.map((pageNumber) => (
            <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={currentPage === pageNumber ? "active" : "pagination-btn"}
            >
                {pageNumber}
            </button>
            ))}
            <Button 
                classProp={currentPage === totalPages ? "disabled" : "pagination-btn"} 
                disabled={currentPage === totalPages} 
                btnText="❯" 
                clickProp={handleNextButton} 
                para1={currentPage}
            />
            <Button 
                classProp={currentPage === totalPages ? "disabled" : "pagination-btn"} 
                disabled={currentPage === totalPages} 
                btnText="Last" 
                clickProp={handleLastButton} 
                para1={totalPages}
            />
          </div>
        </div>
  )
}

export default Pagination