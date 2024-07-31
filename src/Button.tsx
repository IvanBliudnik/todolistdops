// type Props = {
//     title: string,
//     onClick: (id: number) => void
// };

// упрощённая типизация выше
import {ButtonHTMLAttributes} from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = ({title, onClick}: Props) => {
    return (
        <button onClick={onClick}>{title}</button>
    );
};