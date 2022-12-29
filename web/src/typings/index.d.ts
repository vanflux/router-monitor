
declare module '*.svg' {
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
}

declare interface Window { env?: { apiBaseUrl?: string } }

declare interface ImportMetaEnv {
  VITE_VERSION?: string;
}
