import React, { useMemo, useState, useEffect } from 'react';
import { useTable, useFilters, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import { FaArrowUp, FaArrowDown, FaSort, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './filtering.css';
import { GlobalFilter } from './GlobalFilter';

const MyTable = ({ columnHeaders, customCellRender, jsonData, onRowClick, initialFilters, includeGlobalFilter = false }) => {
    const columns = useMemo(() => columnHeaders, [])
    const data = useMemo(() => jsonData, [jsonData])
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
        setFilter,
        setGlobalFilter,
        rowProps
    } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    }, useFilters, 
    includeGlobalFilter ? useGlobalFilter : '',
    useSortBy, usePagination);

    // const { globalFilter } = state;

    // Apply initial filters
    useEffect(() => {
        if (initialFilters) {
            // If initialFilters is an array, we assume each filter item is an object with { id, value }
            initialFilters.forEach(filter => {
                setFilter(filter.id, filter.value);
            });
        }
    }, [initialFilters, setFilter]);

    const { pageIndex } = state;

    const [inputPage, setInputPage] = useState(pageIndex + 1);

    return (
        <div className="table-responsive">
            {includeGlobalFilter && <GlobalFilter filter={state.globalFilter} setFilter={setGlobalFilter} />}
            <table {...getTableProps()} className="table dataTable display" id='myTable' style={{ 'background': 'black' }}>
                <thead>
                    {headerGroups.map((headerGroup, index) => {
                        const headerProps = headerGroup.getHeaderGroupProps();
                        return (
                            <tr {...headerProps} key={`header-${index}`}>
                                {headerGroup.headers.map((column) => {
                                    const { key, ...restColumnProps } = column.getHeaderProps(column.getSortByToggleProps());
                                    return (
                                        <th key={key} {...restColumnProps}>
                                            {column.render('Header')}
                                            {!column.disableSortBy && ( // Only show sort icons if sorting is enabled
                                                <span className="ml-1">
                                                    {column.isSorted ? (
                                                        column.isSortedDesc ? <FaArrowDown style={{ opacity: '0.7' }} /> : <FaArrowUp style={{ opacity: '0.7' }} />
                                                    ) : <FaSort style={{ opacity: '0.3' }} />
                                                    }
                                                </span>
                                            )}
                                            {/* {!includeGlobalFilter ? column.render('Filter') : null} */}
                                            {column.canFilter && !includeGlobalFilter ? column.render('Filter') : null}
                                        </th>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </thead>

                <tbody {...getTableBodyProps()}>
                    {page.length ? (page.map((row, rowIndex) => {
                        prepareRow(row);
                        return (
                            <tr {...rowProps} key={row.id || rowIndex} onClick={() => onRowClick(row.original)}>
                                {row.cells.map(cell => {
                                    const cellProps = cell.getCellProps();
                                    return (
                                        <td {...cellProps} key={cellProps.key}>
                                            {cell.column.id === 'status' && customCellRender ? customCellRender(row) : cell.render('Cell')}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })) : (
                        <tr>
                            <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                                No data found
                            </td>
                        </tr>
                    )}
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
