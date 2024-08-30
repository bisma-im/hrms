// Filter component for the job position dropdown
import React from 'react';
export const SelectColumnFilter = ({
    column: { filterValue, setFilter, preFilteredRows, id },
}) => {
    // Calculate the options for the dropdown based on the data
    const options = React.useMemo(() => {
        const options = new Set();
        preFilteredRows.forEach(row => {
            options.add(row.values[id]);
        });
        return [...options.values()];
    }, [id, preFilteredRows]);

    // Render a dropdown UI
    return (
        <select
            onChange={e => setFilter(e.target.value || undefined)}
            value={filterValue}
            style={{ width: '100%' }}
            className="form-control input-search form-select"
        >
            <option value="">All</option>
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
