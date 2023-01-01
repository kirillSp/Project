const ADD_MESSAGE_POST = "ADD-MESSAGE-POST";

let initialState =  {
    dialogsData: [
        { id: 1, name: "Kirill" },
        { id: 2, name: "Dima" },
        { id: 3, name: "Ivan" },
        { id: 4, name: "Oleg" },
        { id: 5, name: "Artem" },
        { id: 6, name: "Misha"   }
    ],
    messagesData: [
        { id: 1, message: "How are you?" },
        { id: 2, message: "Fine" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo, Hello" }

    ]
};

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE_POST: {
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 1, message: action.formData.dialogMessageForm }],
            };
        }
        default: 
            return state;
    }
}

export const ADD_MESSAGE_POST_ACTION_CREATER = (formData) => ({ type: ADD_MESSAGE_POST, formData });

export default messageReducer;