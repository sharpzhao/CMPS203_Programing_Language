import { FILE_TYPE } from '../constants/const';

const tree = [
    {
        fileName: "file-1",
        fileType: FILE_TYPE.NORMAL_FILE
    },
    {
        fileName: "file-2",
        fileType: FILE_TYPE.NORMAL_FILE
    },
    {
        fileName: "file-3",
        fileType: FILE_TYPE.NORMAL_FILE
    },
    {
        fileName: "file-4",
        fileType: FILE_TYPE.NORMAL_FILE
    },
    {
        fileName: "file-5",
        fileType: FILE_TYPE.NORMAL_FILE
    },
    {
        fileName: "folder-1",
        fileType: FILE_TYPE.NORMAL_FOLDER,
        child: [
            {
                fileName: "file-11",
                fileType: FILE_TYPE.NORMAL_FILE
            },
            {
                fileName: "file-12",
                fileType: FILE_TYPE.NORMAL_FILE
            },
            {
                fileName: "folder-11",
                fileType: FILE_TYPE.NORMAL_FOLDER,
                child: [
                    {
                        fileName: "file-111",
                        fileType: FILE_TYPE.NORMAL_FILE
                    },
                    {
                        fileName: "file-112",
                        fileType: FILE_TYPE.NORMAL_FILE
                    },
                ]
            }
        ]
    },
];

const drive = (state = {
    tree: tree,
    parent: null
}, action) => {
    switch (action.type) {
        case "DRIVE_SET_TREE":
            return action.state;
        default:
            return state;
    }
}

export default drive