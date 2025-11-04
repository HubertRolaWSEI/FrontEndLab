function sortData(data, key, asc = true) {
  const sortedData = [...data];
  
  sortedData.sort((a, b) => {
    let valA, valB;

    if (key === 'user') {
      valA = a.user.name.toLowerCase();
      valB = b.user.name.toLowerCase();
    } else if (key === 'post') {
      valA = a.post.title.toLowerCase();
      valB = b.post.title.toLowerCase();
    } else if (key === 'comments') {
      valA = a.comments.length;
      valB = b.comments.length;
    } else {
      return 0;
    }

    if (valA < valB) return asc ? -1 : 1;
    if (valA > valB) return asc ? 1 : -1;
    return 0;
  });
  
  return sortedData;
}


export default function TableDataReducer(state, action) {
  switch (action.type) {
    case 'SET_DATA':
      return {
        ...state,
        originalData: action.payload,
        displayData: action.payload
      };
      
    case 'SORT_ASC':
      return {
        ...state,
        displayData: sortData(state.displayData, action.key, true)
      };
      
    case 'SORT_DESC':
      return {
        ...state,
        displayData: sortData(state.displayData, action.key, false)
      };
      
    case 'SORT_RESET':
      return {
        ...state,
        displayData: state.originalData
      };
      
    default:
      return state;
  }
}