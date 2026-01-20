import { ToastType } from "src/utils/constants";

export type ToastType = (typeof ToastType)[keyof typeof ToastType];
