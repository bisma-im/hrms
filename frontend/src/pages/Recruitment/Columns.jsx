import { ColumnFilter } from "components/common/table/ColumnFilter"; 
import { SelectColumnFilter } from "components/common/table/SelectColumnFilter";
export const COLUMNS = [
    {
        Header: 'Application ID',
        accessor: 'ApplicationID', // Using camelCase or snake_case depends on your data structure
        Filter: ColumnFilter, // Standard text filter
    },
    {
        Header: 'Applicant Name',
        accessor: 'ApplicantName',
        Filter: ColumnFilter,
    },
    {
        Header: 'Position Applied For',
        accessor: 'PositionAppliedFor',
        Filter: SelectColumnFilter, // Dropdown filter for job positions
    },
    {
        Header: 'Application Date',
        accessor: 'ApplicationDate',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US") : 'No Date', // Format date or handle missing values
        Filter: ColumnFilter,
    },
    {
        Header: 'Email',
        accessor: 'Email',
        Filter: ColumnFilter,
    },
    {
        Header: 'Status',
        accessor: 'Status',
        Filter: ColumnFilter,
    },
    {
        Header: 'Interview Date',
        accessor: 'InterviewDate',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US") : 'Not Scheduled', // Formatting the date or providing a default text
        Filter: ColumnFilter,
    },
    {
        Header: 'Department',
        accessor: 'Department',
        Filter: ColumnFilter,
    },
    {
        Header: 'Location',
        accessor: 'Location',
        Filter: ColumnFilter,
    }
];
