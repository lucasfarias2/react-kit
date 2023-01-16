import express from 'express';

declare global {
  export interface IResponse extends express.Response {
    renderView: (Page: React.FunctionComponent, props?: unknown) => void;
  }

  export interface IRequest extends express.Request {
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
