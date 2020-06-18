import React, { useState, useEffect } from "react";

const options = [
    { id: 1, label: 'Chocolates'},
    { id: 2, label: 'Candies'},
    { id: 3, label: 'Choco sticks'}
]

const MultiSelectContainer = () => {
    const [checkedIds, setCheckedIds] = useState([])

    const handleMultiSelectSubmit = (selectedIds) => {
        console.log(selectedIds)
    }

    const handleButtonClick = () => {
        const ids = options.reduce((acc, option) => {
            if (Math.floor(Math.random() * 2)) {
                return [...acc, option.id]
            }
            return acc
        }, [])

        setCheckedIds(ids)
    }

    return (
        <div>
            <button onClick={handleButtonClick}>Randomly select checkboxes</button>
            <MultipleSelect 
                options={options} 
                checkedOptionIds={checkedIds} 
                onSubmit={handleMultiSelectSubmit}
            />
        </div>
    )
}

const MultipleSelect = ({ options, checkedOptionIds = [], onSubmit }) => {
    const [checkedIds, setCheckedIds] = useState([])

    useEffect(() => {
        setCheckedIds(checkedOptionIds)
    }, [checkedOptionIds])

    const isChecked = (id) => {
        return !!checkedIds.find((i) => i === id)
    }

    const handleCheckboxChange = (e) => {
        const { name } = e.target
        const id = Number(name)

        if (isChecked(id)) {
            setCheckedIds(checkedIds.filter((i) => i !== id))
        } else {
            setCheckedIds([
                ...checkedIds,
                id
            ])
        }
    }

    const handleSubmitClick = () => {
        onSubmit(checkedIds)
    }

    const renderOption = (option) => {
        return (
            <div key={option.id}>
                <input 
                    type="checkbox" 
                    name={option.id} 
                    checked={isChecked(option.id)} 
                    onChange={handleCheckboxChange}
                />
                {option.label}
            </div>
        )
    }

    return (
        <div>
            {options.map(renderOption)}
            <button onClick={handleSubmitClick}>Submit</button>
        </div>
    )
}


export default MultiSelectContainer