import React from 'react';
import { useSelector } from 'react-redux';

import IconButton from '@material-ui/core/IconButton';
import GetAppIcon from '@material-ui/icons/GetApp';

import { CsvBuilder } from 'filefy';

export default function DownloadUsers() {
    const users = useSelector(state => state.users);

    const handleDownloadClick = (event) => {
        const builder = new CsvBuilder("users.csv");
        builder
            .setColumns(["ID", "Email", "First Name", "Last Name"])
            .addRows(users.map(({ id, email, first_name, last_name }) => [id, email, first_name, last_name]))
            .exportFile();
    };

    return <IconButton color="primary" aria-label="download data" onClick={handleDownloadClick}>
        <GetAppIcon />
    </IconButton>;
}
