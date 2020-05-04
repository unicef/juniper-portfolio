import React from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Landingdesktop } from './Landingdesktop';
import { Landingmobile } from './Landingmobile';

export const Landing = () => { 
    const mobiledevice = useMediaQuery('(max-width: 1130px)');
    if (mobiledevice) {
        return (
            <div>
               <Landingmobile />
            </div>
        )
    } else {
        return (
            <div>
                <Landingdesktop />
            </div>
        )
    }
}