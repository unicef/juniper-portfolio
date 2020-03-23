import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Trackdesktop } from './Trackdesktop';
import { Trackmobile } from './Trackmobile';


export const Track = () => { 
    
    const mobiledevice = useMediaQuery('(max-width: 800px)');
    
    if (mobiledevice) {
        return (
            <div>
               <Trackmobile />
            </div>
        )
    }
    
    else
    {
        return (
            <div>
                <Trackdesktop />
            </div>
        )
    }
}