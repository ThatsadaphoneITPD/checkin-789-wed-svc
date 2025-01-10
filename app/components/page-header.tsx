import Breadcrumb from './ui/breadcrumb';
import cn from '@/utils/class-names';

export type PageHeaderTypes = {
  title: string;
  breadcrumb: { name: string; href?: string }[];
  className?: string;
};

export default function PageHeader({
  title,
  breadcrumb,
  children,
  className,
}: React.PropsWithChildren<PageHeaderTypes>) {
  return (
    <header
      className={cn(
        'mb-6 flex flex-col @lg:flex-row @lg:items-center @lg:justify-between xs:-mt-2 lg:mb-7',
        className
      )}
    >
      <div>
        <h3 >
          {title}
        </h3>

        <Breadcrumb
          separator=""
          separatorVariant="circle"
          className="flex-wrap"
        >
          {breadcrumb.map((item) => (
            <Breadcrumb.Item
              key={item.name}
              {...(item?.href && { href: item?.href })}
            >
              {item.name}
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </div>
      <div className="w-full mt-4">
        {children}
      </div>
    </header>
  );
}
