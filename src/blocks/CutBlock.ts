import {CutBlockData} from './CutBlockData';
import {AbstractContentBlock} from "../components/models/AbstractContentBlock";
import {Icon} from "../components/icon/Icon";

export class CutBlock extends AbstractContentBlock<CutBlockData> {
    public title = 'Кат';
    public icon = new Icon('fa-cut');
    public type = 'cutblock';
    data: CutBlockData = new CutBlockData();

    public isEmpty(): boolean {
        return false;
    }
}


