import React from 'react';
import './App.css';
import {Square} from "./Square/Square";

const App: React.FC = () => {
    let square = new Square(5, 5);
    square.show();

    let table = document.getElementsByTagName("table")[0];
    let container = document.getElementById("root");

    React.useEffect(() => {
        table.addEventListener('onmousedown', onMouseDown);
        document.addEventListener('onmousemove', onMouseMove);
        document.addEventListener('onmouseup', onMouseUp);
        container.addEventListener('onmouseup', onMouseUpContainer);
        container.addEventListener('ondragstart', onDragStart);
    });

    let onMouseUpContainer = () => {};
    const onDragStart = () => {return false};

    let coords;
    let shiftX;
    let shiftY;

    const onMouseDown = (e) => {
        coords = getCoords(container);
        shiftX = e.pageX - coords.left;
        shiftY = e.pageY - coords.top;

        container.style.position = "absolute";
        document.body.appendChild(container);

        moveAt(e);

        container.style.zIndex = 1000;
    };

    let onMouseMove = (e) => {
        moveAt(e);
    };

    const onMouseUp = () => {
        onMouseMove = null;
        onMouseUpContainer = null;
    };

    function getCoords(elem) {
        let box = elem.getBoundingClientRect();
        return {
            top: box.top + window.pageYOffset,
            left: box.left + window.pageXOffset
        };
    }

    function moveAt(e) {
        container.style.left = e.pageX - shiftX - 55 + "px";
        container.style.top = e.pageY - shiftY - 55 + "px";
    }

    return null;
};

export default App;
