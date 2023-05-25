const ADD_MESSAGE_POST = "ADD-MESSAGE-POST";

type DialogsType = {
    id: number
    name: string
};

type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogsData: [
        { id: 1, name: "Kirill" },
        { id: 2, name: "Dima" },
        { id: 3, name: "Ivan" },
        { id: 4, name: "Oleg" },
        { id: 5, name: "Artem" },
        { id: 6, name: "Misha" },
    ] as Array<DialogsType>,
    messagesData: [
        { id: 1, message: "How are you?" },
        { id: 2, message: "Fine" },
        { id: 3, message: "Yo" },
        { id: 4, message: "Yo" },
        { id: 5, message: "Yo, Hello" },

    ] as Array<MessageType>
};

type initialStateType = typeof initialState;

const messageReducer = (state = initialState, action: any): initialStateType => {
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

type AddMessagePostActionType = {
    type: typeof ADD_MESSAGE_POST
    formData: string
}
export const ADD_MESSAGE_POST_ACTION_CREATER = (formData: string): AddMessagePostActionType => ({ type: "ADD-MESSAGE-POST", formData });

export default messageReducer;