import { ADD_STUDENT, DELETE_STUDENT, SET_SELECTED_STUDENT, UPDATE_STUDENT } from '../types/student'
// action creators
const addStudentAction = (values) => {
   return {
      type: ADD_STUDENT,
      payload: values,
   };
};

const updateStudentAction = (values) => {
   return {
      type: UPDATE_STUDENT,
      payload: values,
   };
};

const deleteStudentAction = (values) => {
   return {
      type: DELETE_STUDENT,
      payload: values,
   };
};

const setSelectedStudentAction = (values) => {
   return {
      type: SET_SELECTED_STUDENT,
      payload: values,
   };
};

export {
   addStudentAction, updateStudentAction, deleteStudentAction, setSelectedStudentAction
}