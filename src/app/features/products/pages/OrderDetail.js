import React from 'react'

import {
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Td,
  Th,
} from '@chakra-ui/table'
import { Image, Grid, GridItem, Link } from '@chakra-ui/react'

export function OrderDetail() {
  return (
    <React.Fragment>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem
          colSpan={2}
          h="10"
          textAlign="left"
          fontSize="20px"
          color={'pink.400'}
        >
          <span fontWeight="bold"> Order Number </span> <span> 12345</span>
          <br></br>
          <span fontWeight="bold"> Customer Name </span> <span> UyenHTN</span>
          <br></br>
          <span fontWeight="bold"> Customer phone </span>{' '}
          <span> 01234567xx</span>
        </GridItem>
        <GridItem colStart={4} colEnd={6} h="10" textAlign="center"></GridItem>
      </Grid>
    </React.Fragment>
  )
}
