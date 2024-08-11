import React, { useMemo, useState } from 'react';
import { useTable, useFilters, usePagination, useSortBy } from 'react-table';
import { FaArrowUp, FaArrowDown, FaSort, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './filtering.css';

const MyTable = ({ columnHeaders, jsonData, onRowClick }) => {
    // const Table = () => {
    const columns = useMemo(() => columnHeaders, [])
    const data = useMemo(() => jsonData, [])
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        page,
        gotoPage,
        pageCount,
        pageOptions,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useFilters, useSortBy, usePagination);


    const { pageIndex } = state;

    const [inputPage, setInputPage] = useState(pageIndex + 1);

    return (
        <div className="table-responsive">
            <table {...getTableProps()} className="table dataTable display">
                <thead>
                    {headerGroups.map((headerGroup, index) => (
                        <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => {
                                const { key, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                                return (
                                    <th key={key} {...restColumnProps}>
                                        {column.render('Header')}
                                        <span className="ml-1">
                                            {column.isSorted ? (
                                                column.isSortedDesc ? <FaArrowDown style={{ opacity: '0.7' }} /> : <FaArrowUp style={{ opacity: '0.7' }} />
                                            ) : (<FaSort style={{ opacity: '0.3' }} />)
                                            }
                                        </span>
                                        {column.canFilter ? column.render('Filter') : null}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    const { key, ...restCellProps } = cell.getCellProps();
                                    return (
                                        <td key={key} {...restCellProps}>
                                            {cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="d-flex justify-content-between">
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{''}
                </span>
                <span className="table-index">
                    Go to page : {' '}
                    <input type="number"
                        className="ml-2"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                            setInputPage(Number(e.target.value));
                        }}
                    />
                </span>
            </div>
            <div className="text-center mb-3">
                <div className="filter-pagination  mt-3">
                    <button className="previous-button" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>

                        <FaAngleLeft />
                    </button>

                    <button className="previous-button" onClick={() => previousPage()} disabled={!canPreviousPage}>
                        Previous
                    </button>
                    <button className="next-button" onClick={() => nextPage()} disabled={!canNextPage}>
                        Next
                    </button>
                    <button className="next-button" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>

                        <FaAngleRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyTable;
