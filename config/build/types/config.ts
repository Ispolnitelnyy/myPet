export type BuildMode = "production" | "development";

export interface BuildPath {
   entry: string;
   build: string;
   html: string;
   src: string;
   
}
export interface BuildPathStorybook {
   src: string;
}

export interface BuildOptions {
   mode: BuildMode;
   paths: BuildPath;
   isDev: boolean;
   port: number;
   apiUrl: string;
}
export interface BuildOptionsStorybook {
   paths: BuildPathStorybook;
   isDev: boolean;
}

export interface BuildEnv {
   mode: BuildMode;
   port: number;
   apiUrl: string;
}
