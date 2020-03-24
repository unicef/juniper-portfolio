import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles((theme: Theme) => ({

    txtable: {
    marginLeft: '16px',
    },
 
    tableheader: {
        fontFamily: 'Cabin',
        fontSize: '10px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.83px',
        color: '#000',
        textTransform: 'uppercase',
        paddingTop: '5px',
        borderBottom: 'none',
    },

    txtablecell:
    {
        borderBottom: 'none',
    },

}));


export const TXTable = (props: {rows: any[]}) =>
{
    const classes = useStyles();
    const rows = props.rows;
    return (
        <TableContainer className={classes.txtable}>
          <Table className={classes.txtable} size="small" aria-label="a dense table">
                <TableHead>
              <TableRow>
                <TableCell className={classes.tableheader} align= "left">From</TableCell>
                <TableCell className={classes.tableheader} align="left">Recipient</TableCell>
                <TableCell className={classes.tableheader} align="left">Amount</TableCell>
                <TableCell className={classes.tableheader} align="left">Time</TableCell>
                <TableCell  className={classes.tableheader}align="left">Transaction Hash</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => (
                <TableRow key={row.from}>
                  <TableCell className={classes.txtablecell} component="th" scope="row">
                    {row.from}
                  </TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.recipient}</TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.amount}</TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.time}</TableCell>
                  <TableCell className={classes.txtablecell} align="left">{row.txhash}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    
}
