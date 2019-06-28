import {FileBlockData} from './FileBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class FileBlock extends AbstractContentBlock<FileBlockData> {
    public title = 'Файл';
    public icon = new Icon('fa-file-alt');
    public type='fileblock';
    data: FileBlockData = new FileBlockData();


    public isEmpty(): boolean {
        return !this.data.file || this.data.file.fileSize < 1;
    }
}
