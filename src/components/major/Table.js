import React, { useState } from 'react';
import "./Table.css";
import Input from '../minor/Input';
import Button from "../minor/Button";
import iconedit from "../images/iconedit.png";
import icondelete from "../images/iconelete.png"
import iconsave from "../images/iconsave.png"

const Table = (props) => {
  const [editingRowId, setEditingRowId] = useState(null);
  const [editedRow,setEditedRow] = useState(null); //to track user data

  const { selectAll, 
          handleSelectAll, 
          currentRows, 
          selectedRows, 
          handleRowSelect, 
          allUsers, 
          setAllUsers, 
          handleRowDelete 
        } = props

  const handleRowEdit = (id, name, email, role) => {
    setEditingRowId(id)
    setEditedRow({id,name,email,role});
  };
   // Update allUsers with edited row and reset editing row
  const handleRowSave = (id) => {
    const updatedAllUsers = allUsers.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          name: editedRow.name,
          email: editedRow.email,
          role: editedRow.role
        };
      }
      return user;
    });
    setAllUsers(updatedAllUsers);
    setEditingRowId(null);
  };
  
  return (
    <div className='main'>
      <table className='table'>
        <thead className='thead'>
          <tr>
            <th>
              <Input type="checkbox" clickProp={handleSelectAll} checked={selectAll} />
            </th>
            <th>Name</th>
            {/* Hide email column when editing */}
            <th className={editingRowId ? "" : "email-hidden"}>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((user) => (
            <tr key={user.id} className={selectedRows.includes(user.id) ? "selected" : "contents"}>
              {/* Render checkbox based on editing row */}
              {editingRowId === user.id ?
                <td className='table-input'>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => handleRowSelect(user.id)}
                  />
                </td> :
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(user.id)}
                    onChange={() => handleRowSelect(user.id)}
                  />
                </td>}
              {/* Render name column based on editing row */}
              {editingRowId === user.id ? (
                <td className='table-input'>
                  <input
                    type="text"
                    value={editedRow.name}
                    onChange={(e) => setEditedRow({ ...editedRow, name: e.target.value })}
                  />
                </td>
              ) : (
                <td>
                  {user.name}
                </td>
              )}
               {/* Render email column based on editing row */}
              {editingRowId === user.id ? (
                <td className='table-input'>
                  <input
                    type="text"
                    value={editedRow.email}
                    onChange={(e) => setEditedRow({...editedRow, email: e.target.value})}
                  />
                </td>
              ) : (
                <td className="email-hidden">
                  {user.email}
                </td>
              )}

              {editingRowId === user.id ? (
                <td className='table-input'>
                  <select
                    value={editedRow.role}
                    onChange={(e) => setEditedRow({...editedRow, role: e.target.value})}
                  >
                    <option value="admin">Admin</option>
                    <option value="member">Member</option>
                  </select>
                </td>
              ) : (
                <td className={user.role === "admin" ? "admin" : "member"}>
                  {user.role}
                </td>
              )}

              <td className={editingRowId === user.id ? "table-input" : ""}>
                <div className='btn-contents'>
                  {editingRowId === user.id ? (
                    <Button classProp="btn edit" btnText="Save" clickProp={handleRowSave} para1={user.id} logo={iconsave}/>
                  ) : (
                    <Button
                      btnText="Edit"
                      classProp="btn edit"
                      clickProp={handleRowEdit}
                      para1={user.id}
                      para2={user.name}
                      para3={user.email}
                      para4={user.role}
                      logo={iconedit}
                    />
                  )}
                  <Button 
                    classProp="btn" 
                    btnText="Delete" 
                    clickProp={handleRowDelete} 
                    para1={user.id} 
                    logo={icondelete}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table