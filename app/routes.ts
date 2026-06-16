import { type RouteConfig } from '@react-router/dev/routes';
import { flatRoutes } from '@react-router/fs-routes';

// For backwards compatibility with file routing
export default flatRoutes() satisfies RouteConfig;
