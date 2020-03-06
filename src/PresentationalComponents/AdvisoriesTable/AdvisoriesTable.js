import { Button } from '@patternfly/react-core/dist/js/components/Button/Button';
import { Table, TableBody, TableHeader } from '@patternfly/react-table/dist/js/components/Table';
import { PrimaryToolbar } from '@redhat-cloud-services/frontend-components/components/PrimaryToolbar';
import { SkeletonTable } from '@redhat-cloud-services/frontend-components/components/SkeletonTable';
import PropTypes from 'prop-types';
import React from 'react';
import RemediationModal from '../../SmartComponents/Remediation/RemediationModal';
import { STATUS_LOADING } from '../../Utilities/constants';
import { arrayFromObj, buildFilterChips, convertLimitOffset } from '../../Utilities/Helpers';
import { useRemoveFilter } from '../../Utilities/Hooks';
import publishDateFilter from '../Filters/PublishDateFilter';
import searchFilter from '../Filters/SearchFilter';
import typeFilter from '../Filters/TypeFilter';
import TableFooter from './TableFooter';

const AdvisoriesTable = ({
    columns,
    store: {
        rows,
        metadata,
        status,
        queryParams: { filter, search }
    },
    onCollapse,
    onSelect,
    onSetPage,
    onPerPageSelect,
    onSort,
    sortBy,
    remediationProvider,
    selectedRows,
    apply
}) => {
    const [
        RemediationModalCmp,
        setRemediationModalCmp
    ] = React.useState(() => () => null);
    const [page, perPage] = React.useMemo(
        () => convertLimitOffset(metadata.limit, metadata.offset),
        [metadata.limit, metadata.offset]
    );

    const showRemediationModal = data => {
        setRemediationModalCmp(() => () => <RemediationModal data={data} />);
    };

    const removeFilter = useRemoveFilter(filter, apply);
    const selectedCount = selectedRows && arrayFromObj(selectedRows).length;

    return (
        <React.Fragment>
            <PrimaryToolbar
                pagination={{
                    itemCount: metadata.total_items,
                    page,
                    perPage,
                    isCompact: true,
                    onSetPage,
                    onPerPageSelect
                }}
                filterConfig={{
                    items: [
                        searchFilter(apply, search),
                        typeFilter(apply, filter),
                        publishDateFilter(apply, filter)
                    ]
                }}
                activeFiltersConfig={{
                    filters: buildFilterChips(filter, search),
                    onDelete: removeFilter
                }}
                bulkSelect={onSelect && {
                    count: selectedCount,
                    items: [{
                        title: `Select none (0)`,
                        onClick: () => {
                            onSelect('none');
                        }
                    }, {
                        title: `Select page (${perPage})`,
                        onClick: () => {
                            onSelect('page');
                        }
                    }],
                    onSelect: (value) => {
                        value ? onSelect('page') : onSelect('none');
                    },
                    checked: Boolean(selectedCount)
                }}
            >
                {remediationProvider && (
                    <React.Fragment>
                        <Button
                            isDisabled={selectedCount === 0}
                            onClick={() =>
                                showRemediationModal(remediationProvider())
                            }
                        >
                            Apply
                        </Button>
                        <RemediationModalCmp />
                    </React.Fragment>
                )}

            </PrimaryToolbar>
            {status === STATUS_LOADING ? (
                <SkeletonTable colSize={5} rowSize={20} />
            ) : (
                <React.Fragment>
                    <Table
                        aria-label="Advisories table"
                        cells={columns}
                        onSelect={onSelect}
                        rows={rows}
                        onCollapse={onCollapse}
                        canSelectAll={false}
                        onSort={onSort}
                        sortBy={sortBy}
                    >
                        <TableHeader />
                        <TableBody />
                    </Table>
                    <TableFooter
                        totalItems={metadata.total_items}
                        perPage={perPage}
                        page={page}
                        onSetPage={onSetPage}
                    />
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

AdvisoriesTable.propTypes = {
    columns: PropTypes.array,
    onCollapse: PropTypes.func,
    onSelect: PropTypes.func,
    onSetPage: PropTypes.func,
    onPerPageSelect: PropTypes.func,
    onSort: PropTypes.func,
    remediationProvider: PropTypes.func,
    selectedRows: PropTypes.object,
    apply: PropTypes.func,
    sortBy: PropTypes.object,
    store: PropTypes.object
};

export default AdvisoriesTable;
