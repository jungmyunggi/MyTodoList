import React from 'react';
export function Input({ placeholder, onChange, className, name, type = 'text' }) {
    return <input placeholder={placeholder} onChange={onChange} className={className} name={name} type={type}></input>;
}
export const MemoizedInput = React.memo(Input);
export default MemoizedInput;
