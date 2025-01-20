"use client";

import { useState } from "react";
import Button from "../../components/Button";
import Tag from "../../components/Tag";

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
        <div className="flex flex-col">
            <div className="flex items-baseline">
                <label className="mr-1"><b>Coordinator positions</b></label>
                <p className="text-sm text-gray-600">(Optional)</p>
            </div>
            <div>
                <input
                    className="w-11/12 h-9 border rounded border-gray-300 mb-1 mr-2"
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <Button onClick={handleSubmit}>Add</Button>
            </div>
            <div className="flex flex-wrap">
                {coordinators.map((c, index) => <Tag className="mr-1 mt-1" key={index}>{c}</Tag>)}
            </div>

            <input
                type="hidden"
                name="coordinators"
                value={JSON.stringify(coordinators)} />
        </div>
    )
}
