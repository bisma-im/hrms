//import {format} from 'date-fns';
import { ColumnFilter } from "components/common/table/ColumnFilter";

export const COLUMNS = [
    {
        Header: 'Id',
        Footer: 'Id',
        accessor: 'id',
        Filter: ColumnFilter,
    },
    {
        Header: 'First Name',
        Footer: 'First Name',
        accessor: 'first_name',
        Filter: ColumnFilter,
    },
    {
        Header: 'Last Name',
        Footer: 'Last Name',
        accessor: 'last_name',
        Filter: ColumnFilter,
    },
    {
        Header: 'Email',
        Footer: 'Email',
        accessor: 'email',
        Filter: ColumnFilter,
    },
    {
        Header: 'Mobile',
        Footer: 'Mobile',
        accessor: 'mobile',
        Filter: ColumnFilter,
    },
    {
        Header: 'Joining Date',
        Footer: 'Joining Date',
        accessor: 'joining_date',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : 'No Date',
        Filter: ColumnFilter,
    },
    {
        Header: 'Department',
        Footer: 'Department',
        accessor: 'department',
        Filter: ColumnFilter,
    }
];
