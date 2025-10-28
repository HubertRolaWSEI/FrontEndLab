export default function AppReducer(state, action){
    switch(action.type){
        
        case "add":
            const newId = Math.max(...state.map(p => p.id)) + 1;
            const newPerson = {
                ...action.person, // Zawiera eyeColor i birthPlace
                id: newId,
                photo: null, // Stare pole ustawione na null
                url: null    // Stare pole ustawione na null
            };
            return [...state, newPerson];

        case "edit":
            return state.map(person => {
                if (person.id === Number(action.person.id)) {
                    // Łączymy, nadpisując stary obiekt nowymi danymi
                    return { ...person, ...action.person }; 
                } else {
                    return person;
                }
            });

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