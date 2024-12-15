declare module "*.svg" {
   import React from "react";
   const SVG: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
   export default SVG;
}
declare module "*.png" {
   import React from "react";
   const PNG: React.FunctionComponent<React.HTMLAttributes<HTMLImageElement>>;
   export default PNG;
}
declare module "*.jpg" {
   import React from "react";
   const JPG: React.FunctionComponent<React.HTMLAttributes<HTMLImageElement>>;
   export default JPG;
}
declare module "*.gif" {
   import React from "react";
   const GIF: React.FunctionComponent<React.HTMLAttributes<HTMLImageElement>>;
   export default GIF;
}

declare module "*.scss" {
   const styles: Record<string, string>;
   export default styles;
}

declare const __IS_DEV__: boolean;
declare const __API__: string;

declare module "json-server" {
   const jsonServer: any;
   export default jsonServer;
}
