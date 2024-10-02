import { type ClickWheelerRotateEvent, type ClickWheelerTapEvent } from "./click-wheeler/events";
interface ReactClickWheelerComponentProps {
    size?: number;
    className?: string;
    onRotate?: (e: ClickWheelerRotateEvent) => void;
    onTap?: (e: ClickWheelerTapEvent) => void;
}
type ReactClickWheelerComponent = React.FC<ReactClickWheelerComponentProps & React.RefAttributes<HTMLElement>>;
export declare const ClickWheelerComponent: ReactClickWheelerComponent;
export {};
