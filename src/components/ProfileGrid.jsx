 import React from 'react';
 
 function ProfileGrid({ columns = 3, children }) {
   const columnClass = `row row-cols-1 row-cols-sm-2 row-cols-md-${columns} g-4`;
   return (
     <div className="container my-4">
       <div className={columnClass}>
         {React.Children.map(children, (child, idx) => (
           <div className="col" key={idx}>{child}</div>
         ))}
       </div>
     </div>
   );
 }
 
 export default ProfileGrid;
 

