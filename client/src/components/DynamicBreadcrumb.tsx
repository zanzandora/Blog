import React from 'react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link, useLocation } from 'react-router-dom';

// Optional: Map route segments to display names

const DynamicBreadcrumb: React.FC = () => {
  const location = useLocation();

  //*  /category/tech/post/123 → ['category', 'tech', 'post', '123']
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className='my-2 mx-4 '>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            {pathnames.length > 0 ? (
              <BreadcrumbLink asChild>
                <Link to='/'>Home</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>Home</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {pathnames.map((value, index) => {
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return (
              <React.Fragment key={to}>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{decodeURIComponent(value)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={to}>{decodeURIComponent(value)}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default DynamicBreadcrumb;
