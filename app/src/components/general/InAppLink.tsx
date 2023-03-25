import { Link, LinkProps } from 'react-router-dom';

export const InAppLink = (props: LinkProps) => (
  <Link style={{ textDecoration: 'none' }} {...props}>
    {props.children}
  </Link>
);
