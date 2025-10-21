export default function AppReducer(state, action){
    switch(action.type){
        

        case "check":
            return state.map(person => {
                if (person.id === action.id) {
                    return { ...person, check: !person.check }; 
                } else {
                    return person;
                }
            });

        case "rate":
            return state.map(person => {
                if (person.id === action.id) {
                    const newRating = (action.rating + 1) % 11; 
                    return { ...person, rating: newRating };
                } else {
                    return person;
                }
            });


        case "delete":
            return state.filter(person => person.id !== action.id);
        
        default:
            return state;
    }
}