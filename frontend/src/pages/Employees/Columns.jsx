//import {format} from 'date-fns';
import { ColumnFilter } from "components/common/table/ColumnFilter";

export const COLUMNS = [
    {
        Header: 'Id',
        accessor: 'employee_id',
        Filter: ColumnFilter,
    },
    {
        Header: 'Name',
        accessor: 'name',
        Filter: ColumnFilter,
    },
    {
        Header: 'Gender',
        accessor: 'gender',
        Filter: ColumnFilter,
    },
    {
        Header: 'Email',
        accessor: 'email',
        Filter: ColumnFilter,
    },
    {
        Header: 'Mobile',
        accessor: 'cell_no',
        Filter: ColumnFilter,
    },
    {
        Header: 'Joining Date',
        accessor: 'doj',
        Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : 'No Date',
        Filter: ColumnFilter,
    },
    {
        Header: 'Department',
        accessor: 'department_name',
        Filter: ColumnFilter,
    }
];
