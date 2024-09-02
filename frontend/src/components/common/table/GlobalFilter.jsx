import { useEffect, useState } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useAsyncDebounce } from "react-table";

export const GlobalFilter = ({ filter, setFilter }) => {
    // Initialize with globalFilter or an empty string to avoid controlled/uncontrolled issues.
    // const [value, setValue] = useState(globalFilter || '');

    const onChange = useAsyncDebounce(value => {
        // Here, also make sure the value is never set to undefined
        setFilter(value || '');
    }, 200);

    // useEffect(() => {
    //     // This will ensure that the value in the state is never undefined
    //     setValue(globalFilter || '');
    // }, [globalFilter]);

    return (
        <InputGroup>
            <FormControl
                className="custom-input"
                value={filter || ''}
                onChange={e => onChange(e.target.value)}
                placeholder="Search directory..."
                style={{ padding: '10px', marginBottom: '10px' }}

            />
            <InputGroup.Text style={{ padding: '10px', marginBottom: '10px' }}>
                <FaSearch /> 
            </InputGroup.Text>
        </InputGroup>
    );
};
