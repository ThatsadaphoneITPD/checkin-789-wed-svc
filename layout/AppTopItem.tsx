import Link from "next/link";
import { Badge } from "primereact/badge";

export const itemRenderer = (item: any) => (
    <div className='p-menuitem-content' onClick={item?.command}>
        <Link href={item?.link ? item?.link : ""} passHref className="flex align-items-center p-menuitem-link">
            <span className={item?.icon} style={{ color: item?.color }} />
            <span className="mx-2" style={{ color: item?.color }}>{item.label}</span>
            {item?.badge && <Badge className="ml-auto" value={item?.badge} />}
            {item.backicon &&
                (<span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
                    <i className={item?.backicon} style={{ color: item?.backiconcolor }}></i>
                </span>)
            }
        </Link>
    </div>
);
