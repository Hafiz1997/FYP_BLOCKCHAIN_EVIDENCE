import React from 'react';
 
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div>
       	<p>
          <NavLink to="/">Home</NavLink>
          |
          <NavLink to="/employee">Employee</NavLink>
          |
          <NavLink to="/evidence">Evidence</NavLink>
        </p>
       </div>
    );
}
 
export default Navigation;