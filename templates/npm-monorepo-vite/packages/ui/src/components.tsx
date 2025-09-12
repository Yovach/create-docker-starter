import type { JSX } from "react/jsx-runtime";

interface Props {
    children: React.ReactNode;
    onClick?: () => void;
}

export function Button({ children, onClick }: Props): JSX.Element {
    return <button onClick={onClick}>{children}</button>;
}
