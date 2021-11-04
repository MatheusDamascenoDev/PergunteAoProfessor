import {ButtonHTMLAttributes} from 'react';
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean,
    buttonAudio?: boolean
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
    return (
        <button className={`button ${isOutlined ? 'outlined' : ''}`} {...props} />
    )
}

export function ButtonAudio({ buttonAudio = false, ...props }: ButtonProps) {
    return (
        <button className={`button ${buttonAudio ? 'off' : ''}`} {...props} />
    )
}