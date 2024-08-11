import React, {useState} from 'react';
import { useAsyncDebounce } from 'react-table';
export const ColumnFilter = ({ column: { filterValue, setFilter }}) => {

    const [value, setValue] = useState(filterValue || '');
    const onChange = useAsyncDebounce(value => {
        setFilter(value || undefined); // Set undefined to remove the filter entirely if the input is cleared
    }, 3000); // 3s debounce period

	return(
		<div>
			<input className="form-control input-search"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
					onChange(e.target.value);
				}}
				placeholder={`Search...`} 
			/>
		</div>
	)
} 