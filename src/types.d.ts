import type { Request, Response } from 'express';
import type { ViteDevServer } from 'vite';

declare global {
  export interface IResponse extends Response {
    renderView: (compiledServerFile: string, props?: unknown) => void;
    isProd?: boolean;
    locals: {
      vite: ViteDevServer;
    };
  }

  export interface IRequest extends Request {
    originalUrl: string;
    device?: {
      type: DeviceType;
    };
  }

  type DeviceType = 'mobile' | 'desktop';

  export type IWindow = typeof window & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    __PRELOADED_STATE__: any;
  };

  export interface IComponent {
    children?: React.ReactNode;
    className?: string;
    deviceType?: DeviceType;
  }

  export type TOnClick = React.MouseEvent<HTMLButtonElement>;
  export type TOnChangeInputEvent = React.ChangeEvent<HTMLInputElement>;
  export type TOnChangeSelectEvent = React.ChangeEvent<HTMLSelectElement>;
  export type TOnChangeTextAreaEvent = React.ChangeEvent<HTMLTextAreaElement>;
}
