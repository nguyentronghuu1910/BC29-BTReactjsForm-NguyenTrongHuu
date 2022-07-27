import { ADD_STUDENT, DELETE_STUDENT, SET_SELECTED_STUDENT, UPDATE_STUDENT } from "../types/student";

const DEFAULT_STATE = {
   studentList: [
      {
         id: 1,
         codeStudent: 'NguyenHD1007',
         username: 'Huynh Dai Nguyen',
         phoneNumber: '085512123123',
         email: 'john197@gmail.com',
      },
      {
         id: 2,
         codeStudent: 'HuuNT1910',
         username: 'Nguyen Trong Huu',
         phoneNumber: '0335899947',
         email: 'nthuu1910@gmail.com',

      },
      {
         id: 3,
         codeStudent: 'ThanhPH9001',
         username: 'Thanh Hong Pham',
         phoneNumber: '0323123231',
         email: 'choidatoi@gmail.com',

      },
      {
         id: 4,
         codeStudent: 'VietHaiN2212',
         username: 'Nguyen Viet Hai',
         phoneNumber: '0221256785',
         email: 'quathebahai@gmail.com',

      }
   ],
   selectedStudent: null,
}

export const studentReducer = (state = DEFAULT_STATE, { type, payload }) => {
   switch (type) {
      case ADD_STUDENT: {
         const data = [...state.studentList];

         data.push({ ...payload, id: Date.now() });

         state.studentList = data;

         return { ...state };
      }
      case UPDATE_STUDENT: {
         // const data = [...state.studentList];

         // const idx = data.findIndex(ele => ele.id === payload.id)

         // if (idx !== -1) {
         //    data[idx] = payload;
         // }
         // state.studentList = data;
         state.studentList = state.studentList.map
            (ele => ele.id === payload.id ? payload : ele);
         state.selectedStudent = null;

         return { ...state };
      }
      case DELETE_STUDENT: {
         // const data = [...state.studentList];
         // const idx = data.findIndex((ele) => ele.id === payload);

         // if (idx !== -1) {
         //    data.splice(idx, 1)
         // }

         // state.studentList = data;
         state.studentList =
            state.studentList.filter(
               ele => ele.id !== payload
            )
         return { ...state }
      }
      case SET_SELECTED_STUDENT: {
         // state.selectedStudent = payload;
         return { ...state, selectedStudent: payload };
      }
      default:
         return state;
   }
}