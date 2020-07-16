import { cellWidth, expandable, sortable } from '@patternfly/react-table/dist/js';

export const advisoriesColumns = [
    {
        title: 'Name',
        cellFormatters: [expandable],
        transforms: [sortable, cellWidth(15)],
        key: 'id'
    },
    {
        title: 'Publish date',
        transforms: [sortable, cellWidth(15)],
        key: 'public_date'
    },
    {
        title: 'Type',
        transforms: [sortable, cellWidth(15)],
        key: 'advisory_type'
    },
    {
        title: 'Applicable systems',
        transforms: [sortable, cellWidth(15)],
        key: 'applicable_systems'
    },
    {
        title: 'Synopsis',
        transforms: [sortable],
        key: 'synopsis'
    }
];

export const systemAdvisoriesColumns = [
    {
        title: 'Name',
        cellFormatters: [expandable],
        transforms: [sortable, cellWidth(15)],
        key: 'id'
    },
    {
        title: 'Publish date',
        transforms: [sortable, cellWidth(15)],
        key: 'public_date'
    },
    {
        title: 'Type',
        transforms: [sortable, cellWidth(15)],
        key: 'advisory_type'
    },
    {
        title: 'Synopsis',
        transforms: [sortable],
        key: 'synopsis'
    }
];

export const systemPackagesColumns = [
    {
        title: 'Package',
        transforms: [sortable, cellWidth(15)],
        key: 'id'
    },
    {
        title: 'Installed version',
        transforms: [sortable, cellWidth(15)],
        key: 'version'
    },
    {
        title: 'Latest update available',
        transforms: [sortable, cellWidth(15)],
        key: 'latest_update'
    },
    {
        title: 'Summary',
        transforms: [sortable, cellWidth(15)],
        key: 'summary'
    }
];
