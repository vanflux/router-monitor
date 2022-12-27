
declare module '*.svg' {
  export const ReactComponent: React.FC<{ fill?: string; width?: number | string, height?: number | string }>;
}

declare interface Window { env?: { apiBaseUrl?: string } }
