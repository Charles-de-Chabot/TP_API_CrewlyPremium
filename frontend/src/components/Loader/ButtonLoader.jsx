import React from 'react'
import { BounceLoader } from 'react-spinners';

const ButtonLoader = ({size = 25}) => {
    return <BounceLoader size={size} color="rgba(8, 16, 57, 1)"/>;
}

export default ButtonLoader;