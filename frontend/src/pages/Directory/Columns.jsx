// Import the ColumnFilter if you are using it for all columns as a common filter component
import { ColumnFilter } from "components/common/table/ColumnFilter";

export const COLUMNS = [
    {
        Header: '',
        accessor: 'avatar',
        // Assuming you are rendering an image from a URL stored in avatar_url
        Cell: ({ value }) => value ? <img src={`${process.env.REACT_APP_API_URL}/uploads/${value}`} alt="Avatar" style={{ width: 30, borderRadius: '50%' }} /> : null,
        disableFilters: true,
        disableSortBy: true
    },
    {
        Header: 'Name',
        accessor: 'name',
        Filter: ColumnFilter,
    },
    {
        Header: 'Contact',
        accessor: 'cell_no',
        Filter: ColumnFilter,
    },
    {
        Header: 'Position',
        accessor: 'job_title',
        Filter: ColumnFilter,
    },
    {
        Header: 'Department',
        accessor: 'department_name',
        Filter: ColumnFilter,
    }
];
