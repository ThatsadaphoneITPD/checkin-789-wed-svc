import React from 'react';
import Link from 'next/link';

export type BreadcrumbItemProps = {
  href?: string; // Optional link URL
  className?: string; // Additional classes for custom styling
  children: React.ReactNode; // Content inside the breadcrumb item
  style?: React.CSSProperties; // Inline styles
};

const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({
  href = '#',
  className,
  style,
  children,
}) => (
  <Link
    href={href}
    role="button"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px',
      ...style, // Apply inline styles passed as props
    }}
    className={className}
  >
    {children}
  </Link>
);

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLDivElement> {
  separator?: React.ReactNode; // Custom separator (text or icon)
  disableCurrent?: boolean; // Disable last breadcrumb item
  children: React.ReactNode; // Breadcrumb items
  className?: string; // Additional classes for breadcrumb container
  separatorClassName?: string; // Custom classes for the separator
  separatorVariant?: 'default' | 'circle'; // Style variant for the separator
}

const Breadcrumb: React.FC<BreadcrumbProps> & { Item: typeof BreadcrumbItem } = ({
  separator = '/',
  disableCurrent = true,
  children,
  className,
  separatorClassName,
  separatorVariant = 'default',
}) => {
  const numOfItems = React.Children.count(children);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement<BreadcrumbItemProps>(child)) return child;

        const isLastItem = index === numOfItems - 1;

        return (
          <>
            {React.cloneElement(child, {
              style: {
                color: isLastItem ? 'gray' : 'black',
                fontWeight: '500',
                pointerEvents: disableCurrent && isLastItem ? 'none' : 'auto',
                ...(child.props.style || {}),
              },
              className: child.props.className,
            })}
            {!isLastItem &&
              (separatorVariant === 'default' ? (
                <span
                  style={{
                    fontSize: '14px',
                    color: 'gray',
                  }}
                  className={separatorClassName}
                >
                  {separator}
                </span>
              ) : (
                <span
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: 'gray',
                    display: 'inline-block',
                  }}
                />
              ))}
          </>
        );
      })}
    </div>
  );
};

// Attach BreadcrumbItem as a static property
Breadcrumb.Item = BreadcrumbItem;

// Set the display name for debugging purposes
Breadcrumb.displayName = 'Breadcrumb';

export default Breadcrumb;
