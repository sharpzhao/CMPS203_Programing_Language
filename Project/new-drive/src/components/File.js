import React from 'react';
import { Icon } from 'antd';
import '../css/File.css';
import { FILE_TYPE } from '../constants/const'

const File = props => {
    return (
        <div className="new-drive-file" onClick = {props.handleClick.bind(this)}>
            {
                props.fileType === FILE_TYPE.NORMAL_FILE && (
                    <Icon type="file" className="file-style" />
                )
            }
            {
                props.fileType === FILE_TYPE.NORMAL_FOLDER && (
                    <Icon type="folder-open" className="file-style" />
                )
            }
            <div className="new-drive-file-name">
                {props.fileName}
            </div>
        </div>
    )
}

export default File;