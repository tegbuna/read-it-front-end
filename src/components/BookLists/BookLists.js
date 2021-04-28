import { useState, useEffect } from 'react';

function BookLists(props) {
    const List1 = function() {
        return (
          <ul className="lists-container">
            <li>List1</li>
          </ul>
        );
      };
      
      const List2 = function() {
        return (
          <ul className="lists-cotainer">
            <li>List2</li>
        
          </ul>
        );
      };

export default BookLists;
