//import { format } from 'date-fns'; // Uncomment if you decide to use date-fns for formatting dates
import { ColumnFilter } from "components/common/table/ColumnFilter";

export const COLUMNS = [
    {
        Header: 'ID',
        accessor: 'id',
        Filter: ColumnFilter,
    },
    {
        Header: 'Employee ID',
        accessor: 'EmployeeId',
        Filter: ColumnFilter,
    },
    {
        Header: 'Leave Type',
        accessor: 'LeaveType',
        Filter: ColumnFilter,
    },
    {
        Header: 'Start Date',
        accessor: 'StartDate',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US") : 'No Date', 
        Filter: ColumnFilter,
    },
    {
        Header: 'End Date',
        accessor: 'EndDate',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US") : 'No Date',
        Filter: ColumnFilter,
    },
    {
        Header: 'Status',
        accessor: 'Status',
        Filter: ColumnFilter,
    },
    {
        Header: 'Reason',
        accessor: 'Reason',
        Filter: ColumnFilter,
    },
    {
        Header: 'Approver ID',
        accessor: 'ApproverID',
        Filter: ColumnFilter,
    },
    {
        Header: 'Date Created',
        accessor: 'DateCreated',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }) : 'No Date',
        Filter: ColumnFilter,
    },
    {
        Header: 'Date Modified',
        accessor: 'DateModified',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString("en-US", {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }) : 'No Date', 
        Filter: ColumnFilter,
    }
];
