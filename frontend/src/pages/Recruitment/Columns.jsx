import { ColumnFilter } from "components/common/table/ColumnFilter";
import { SelectColumnFilter } from "components/common/table/SelectColumnFilter";
import RatingDropdown from "components/common/ui/RatingDropdown";
import { updateApplicant } from "features/applicants/applicantService";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useDispatch } from "react-redux";
export const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'name',
        Filter: ColumnFilter,
    },
    {
        Header: 'Job',
        accessor: 'job_title',
        Filter: SelectColumnFilter, // Dropdown filter for job positions
    },
    {
        Header: 'Department',
        accessor: 'department_name',
        Filter: ColumnFilter,
    },
    {
        Header: 'Applied Date',
        accessor: 'created_at',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US") : 'No Date', // Format date or handle missing values
        Filter: ColumnFilter,
    },
    {
        Header: 'Status',
        accessor: 'status',
        Filter: ColumnFilter,
    },
    {
        Header: 'Interview Date',
        accessor: 'interview_date',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US") : 'Not Scheduled', // Formatting the date or providing a default text
        Filter: ColumnFilter,
    },
    {
        Header: 'Rating',
        id: 'rating',
        // disableSortBy: true,
        Filter: () => <div style={{ height: '100px' }}></div>,
        Cell: ({ row }) => {
            const RatingCell = () => {
                const dispatch = useDispatch(); // Use useDispatch here
                const handleRatingChange = (newRating) => {
                    console.log(`Rating for ${row.original.name} set to ${newRating}`);
                    dispatch(updateApplicant({
                        id: row.original.application_id,
                        data: { rating: newRating }
                    }));
                };

                return (
                    <RatingDropdown
                        initialRating={row.original.rating || 0}
                        onRatingChange={handleRatingChange}
                    />
                );
            };

            return <RatingCell />;
        },
    },
    {
        Header: 'Resume',
        id: 'resume', // Using camelCase or snake_case depends on your data structure
        disableSortBy: true,
    },
    {
        Header: 'Actions',
        id: 'actions',
        disableSortBy: true,
    },
];
