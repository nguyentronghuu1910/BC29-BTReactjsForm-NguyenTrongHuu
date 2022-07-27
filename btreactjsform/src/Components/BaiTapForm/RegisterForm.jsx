import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { addStudentAction, updateStudentAction } from '../../Store/actions/studentAction';

const DEFAULT_VALUES = {
   id: '',
   codeStudent: '',
   username: '',
   phoneNumber: '',
   email: '',
}
class RegisterForm extends Component {
   state = {
      values: DEFAULT_VALUES,
      errors: {
         id: '',
         codeStudent: '',
         username: '',
         phoneNumber: '',
         email: '',
      },
   };

   formRef = createRef();

   static getDerivedStateFromProps(nextProps, currentState) {
      if (nextProps.selectedStudent && currentState.values.id
         !== nextProps.selectedStudent.id
      ) {
         currentState.values = nextProps.selectedStudent;
      }

      return currentState;
   }

   handleChange = (event) => {
      const { name, value } = event.target;

      this.setState({
         values: {
            ...this.state.values,
            [name]: value
         }
      })
   }
   handleSubmit = (event) => {
      event.preventDefault();

      if (!event.target.checkValidity()) {
         return;
      }

      // if (this.props.selectedStudent) {
      //    this.props.dispatch({
      //       type: 'UPDATE_STUDENT',
      //       payload: this.state.values
      //    })
      // } else {
      //    this.props.dispatch({
      //       type: 'ADD_STUDENT',
      //       payload: this.state.values,
      //    })
      // }

      // this.props.dispatch({
      //    type: this.props.selectedStudent ?
      //       'UPDATE_STUDENT' : 'ADD_STUDENT',
      //    payload: this.state.values,
      // });

      if (this.props.selectedStudent) {
         this.props.dispatch(updateStudentAction(this.state.values))
      } else {
         this.props.dispatch(addStudentAction(this.state.values))
      }

      this.setState({
         values: DEFAULT_VALUES,
      }, () => {
         this.forceUpdate();
      })
   };
   handleBlur = (event) => {
      const {
         name,
         title,
         minLength,
         maxLength,
         // validationMessage,
         validity: { valueMissing, patternMismatch, tooLong, tooShort },
      } = event.target;

      let message = '';

      if (patternMismatch) {
         message = `${title}is invalid patten.`;
      }

      if (tooShort || tooLong) {
         message = `${title} from ${minLength} - ${maxLength} characters.`
      }
      if (valueMissing) {
         message = `${title} is required.`
      }

      this.setState({
         errors: {
            ...this.state.errors,
            [name]: message,
         }
      })
   }
   render() {
      const { codeStudent, username,
         phoneNumber, email
      } = this.state.values || {};
      return (
         <div className="card p-0">
            <div className="card-header bg-dark text-white font-weight-bold">
               Student Information
            </div>
            <div className="card-body">
               <form ref={this.formRef} noValidate onSubmit={this.handleSubmit}>
                  <div className="row">
                     <div className="col-6">
                        <div className="form-group">
                           <label>Student ID</label>
                           <input required
                              value={codeStudent}
                              title='Student ID'
                              minLength={4}
                              maxLength={8}
                              onChange={this.handleChange}
                              onBlur={this.handleBlur}
                              name='codeStudent'
                              type="text" className="form-control" />
                           {
                              this.state.errors.codeStudent &&
                              <span className='text-danger'>
                                 {this.state.errors.codeStudent}
                              </span>
                           }
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <label>Student Name</label>
                           <input required
                              value={username}
                              title='Student Name'
                              minLength={4}
                              maxLength={16}
                              onChange={this.handleChange}
                              onBlur={this.handleBlur}
                              name='username'
                              type="text"
                              className="form-control"
                           />
                           {
                              this.state.errors.username &&
                              <span className='text-danger'>
                                 {this.state.errors.username}
                              </span>
                           }
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <label>Phone Number</label>
                           <input required
                              value={phoneNumber}
                              title='Phone Number'
                              onChange={this.handleChange}
                              onBlur={this.handleBlur}
                              name='phoneNumber'
                              type="text" className="form-control" />
                           {
                              this.state.errors.phoneNumber &&
                              <span className='text-danger'>
                                 {this.state.errors.phoneNumber}
                              </span>
                           }
                        </div>
                     </div>
                     <div className="col-6">
                        <div className="form-group">
                           <label>Email</label>
                           <input required
                              value={email}
                              title='Email'
                              pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$'
                              onChange={this.handleChange}
                              onBlur={this.handleBlur}
                              name='email'
                              type="text" className="form-control" />
                           {
                              this.state.errors.email &&
                              <span className='text-danger'>
                                 {this.state.errors.email}
                              </span>
                           }
                        </div>
                     </div>
                  </div>
                  <button disabled={!this.formRef.current?.checkValidity()} className="btn btn-outline-success ">Add Student</button>
               </form>
            </div>
         </div>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      ...state.studentReducer,
   };
};
export default connect(mapStateToProps)(RegisterForm)