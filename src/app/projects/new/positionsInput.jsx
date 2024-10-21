"use client";

import { useState } from "react";

export default function PositionsInput() {
    const [coordinators, setCoordinators] = useState([]);
    const [inputValue, setInputValue] = useState("");

    function addCoordinator(c) {
        const newCoordinators = [...coordinators, c];
        setCoordinators(newCoordinators);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const coorName = inputValue;
        if (!coorName) {
            return;
        }

        addCoordinator(coorName);
        setInputValue("");
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Add coordinator"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button onClick={handleSubmit}>Add</button>
            <p>{coordinators.map((c, index) =>
                `${c}${index === coordinators.length - 1 ? "" : ", "}`)}
            </p>

            <input
                type="hidden"
                name="coordinators"
                value={JSON.stringify(coordinators)} />
        </div>
    )
}
