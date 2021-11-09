import React from 'react'
import { Table, TableCaption, Thead, Tbody, Tr, Td, Th } from '@chakra-ui/table'
import { Grid, GridItem, Link } from '@chakra-ui/react'

export function ViewOrder() {
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
          Phone Number: 0123456789{' '}
        </GridItem>
        <GridItem colStart={4} colEnd={6} h="10" textAlign="center">
          {' '}
          <Link to="/">View Menu</Link>
        </GridItem>
      </Grid>

      <Table variant="simple">
        <TableCaption>View order history</TableCaption>
        <Thead>
          <Tr>
            <Th w={100} textAlign={'center'}>
              ID
            </Th>
            <Th w={300} textAlign={'center'}>
              Customer Name
            </Th>
            <Th w={300} textAlign={'center'}>
              Customer Phone
            </Th>
            <Th w={200} textAlign={'center'}>
              Total
            </Th>
            <Th w={100} textAlign={'center'}>
              Status
            </Th>
            <Th textAlign={'center'}>Order Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Td w={100} textAlign={'center'}>
            ABC123456
          </Td>
          <Td w={300} textAlign={'center'}>
            UyenHTN
          </Td>
          <Td w={300} textAlign={'center'}>
            06898989
          </Td>
          <Td w={200} textAlign={'center'}>
            100
          </Td>
          <Td w={100} textAlign={'center'}>
            Confirmed
          </Td>
          <Td textAlign={'center'}>Thu Jan 01 20:15:40 UTC 1970</Td>
          <Td textAlign={'center'}>
            <a>View</a>
          </Td>
        </Tbody>
      </Table>
    </React.Fragment>
  )
}
