import React, { useState } from 'react'

export const CategoryForm = ({handleSubmit,value,setValue}) => {
    
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-12">
            <label htmlFor="inputEmail4" className="form-label">Enter the Category</label>
            <input name='value' required onChange={(e)=>{setValue(e.target.value)}} type="text" className="form-control" id="inputEmail4" value={value}/>
        </div>
        <div className="col-12 acenter">
            <button type="submit" className="btn btn-primary">Submit</button>
        </div>
    </form>
  )
}
