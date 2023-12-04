import React from 'react'

export const useOutsideClick = (callback) => {
    const ref = React.useRef();

    React.useEffect(() => {
        const handleClick = (event) => {
            if (ref.current
                && !ref.current.contains(event.target)
                && event.target.className !== 'loginBlock openedSettings'
                && event.target.className !== 'ava'
                && event.target.className !== 'arrow'
            ) {
                callback();
            }
        };
        document.addEventListener('click', handleClick, true);

        return () => {
            document.removeEventListener('click', handleClick, true);
        };
    }, [ref]);

    return ref;
};