import React, { Component } from 'react'

import { connect } from 'react-redux'
import { DELETE_STUDENT, SET_SELECTED_STUDENT } from '../../Store/types/student'

class StudentManagement extends Component {
   state = {
      keyword: '',
   }

   renderStudentList = () => {
      let data = this.props.studentList.filter((ele) => {
         return (
            ele.username
               .toLowerCase()
               .trim()
               .indexOf(this.state.keyword.toLocaleLowerCase().trim())
            !== -1
         )
      })
      return data.map((ele, idx) => {
         const { id, codeStudent, username, phoneNumber, email } =
            ele;

         return (
            <tr key={id} className='bg-light'>
               <td>{idx + 1}</td>
               <td>{codeStudent}</td>
               <td>{username}</td>
               <td>{phoneNumber}</td>
               <td>{email}</td>
               <td>
                  <button onClick={() => this.props.dispatch({
                     type: SET_SELECTED_STUDENT,
                     payload: ele,
                  })
                  } className="btn btn-outline-info mr-2">EDIT</button>
                  <button onClick={() => this.props.dispatch({
                     type: DELETE_STUDENT,
                     payload: ele.id,
                  })} className="btn btn-outline-danger">DELETE</button>
               </td>
            </tr>
         )
      })
   }
   handleChange = event => {
      const { name, value } = event.target

      this.setState({
         [name]: value
      })
   }
   render() {
      return (
         <div className="card p-0 mt-3">
            <div className="card-header bg-dark text-white font-weight-bold">STUDENT MANAGEMENT</div>
            <div className="row mt-4 px-3 ">
               <div className="col-4">
                  <div className="form-group mb-0">
                     <input
                        onChange={this.handleChange}
                        name='keyword'
                        type="text"
                        placeholder="Search by full name..."
                        className="form-control"
                     />
                  </div>
               </div>
            </div>
            <div className="card-body">
               <table className="table">
                  <thead>
                     <tr>
                        <th>No.</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                     </tr>
                  </thead>
                  <tbody>
                     {this.renderStudentList()}
                  </tbody>
               </table>
            </div>
         </div >
      )
   }
}

const mapStateToProps = (state) => {
   return {
      ...state.studentReducer
   }
}
export default connect(mapStateToProps)(StudentManagement)