import { ColumnFilter } from "components/common/table/ColumnFilter";
import { SelectColumnFilter } from "components/common/table/SelectColumnFilter";
import RatingDropdown from "components/common/ui/RatingDropdown";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'ApplicationID', // Using camelCase or snake_case depends on your data structure
        Filter: ColumnFilter, // Standard text filter
    },
    {
        Header: 'Name',
        accessor: 'ApplicantName',
        Filter: ColumnFilter,
    },
    {
        Header: 'Job',
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
        Header: 'Rating',
        id: 'rating',
        // disableSortBy: true,
        Filter: () => <div style={{ height: '100px' }}></div>,
        Cell: ({ row }) => (
            <RatingDropdown
                initialRating={row.original.rating || 0}
                onRatingChange={(newRating) => {
                    console.log(`Rating for ${row.original.ApplicantName} set to ${newRating}`);
                    // Here you could also make an API call to save the rating
                }}
            />
        ),
    },
    {
        Header: 'Actions',
        id: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
            <Dropdown>
                <Dropdown.Toggle as="div" className="btn-link i-false">
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                            stroke="#737B8B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
                            stroke="#737B8B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                        <path
                            d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
                            stroke="#737B8B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right" align="end">
                    <Dropdown.Item onClick={() => handleAction('hire', row)}>Hire Candidate</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAction('interview', row)}>Schedule Interview</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleAction('view', row)}>View</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown >
        ),
    },
];

const handleAction = (actionType, row) => {
    switch (actionType) {
        case 'hire':
            console.log(`Hiring candidate ${row.original.ApplicantName}`);
            break;
        case 'interview':
            console.log(`Scheduling interview for ${row.original.ApplicantName}`);
            break;
        case 'view':
            console.log(`Viewing details for ${row.original.ApplicantName}`);
            break;
        default:
            break;
    }
};