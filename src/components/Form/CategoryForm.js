import React from "react";

export const CategoryForm = ({ handleSubmit, value, setValue, role }) => {
  return (
    <form className="row g-3" onSubmit={handleSubmit}>
      <div className="col-md-12">
        <input
          placeholder="Enter the Category"
          name="value"
          required
          onChange={(e) => {
            setValue(e.target.value);
          }}
          type="text"
          className="form-control"
          id="inputEmail4"
          value={value}
        />
      </div>
      <div className="col-12 acenter">
        <button type="submit" className="btn btn-primary">
          {role === "update" ? "Update" : "Create"} Category
        </button>
      </div>
    </form>
  );
};
