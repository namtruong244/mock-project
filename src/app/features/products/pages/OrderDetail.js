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
import {
  Image,
  Grid,
  GridItem,
  Link,
  Select,
  Button,
  Stack,
} from '@chakra-ui/react'

export function OrderDetail() {
  return (
    <React.Fragment>
      <Grid templateColumns="repeat(5, 1fr)" gap={4}>
        <GridItem
          colSpan={2}
          h="10"
          textAlign="left"
          fontSize="15px"
          ml={10}
          mt={5}
          color={'pink.400'}
        >
          <Table w={250}>
            <tr>
              <td>Order Number </td>
              <td>12345</td>
            </tr>
            <tr>
              <td>Customer Name </td>
              <td>UyenHTN</td>
            </tr>
            <tr>
              <td>Customer phone</td>
              <td>01234567xx</td>
            </tr>
          </Table>
        </GridItem>
        <GridItem colStart={4} colEnd={6} h="10">
          <Stack spacing={10} direction="row" align="center" mt={3}>
            <Select placeholder="Order status" w={400}>
              <option value="1">Order 1</option>
              <option value="2">Order 2</option>
              <option value="3">Order 3</option>
            </Select>
            <Button colorScheme={'pink'} size="md">
              Cancel
            </Button>
          </Stack>
          <Stack spacing={10} direction="row" mt={5} ml={3}>
            <span fontWeight="bold">Order Time: </span>{' '}
            <span> Thu Jan 01 20:15:40 UTC 1970 </span>
          </Stack>
        </GridItem>
      </Grid>

      <Table variant="simple" mt={90}>
        <TableCaption>Detail order</TableCaption>
        <Thead>
          <Tr>
            <Th w={200} textAlign={'center'}>
              Item
            </Th>
            <Th w={500} textAlign={'center'}>
              Price
            </Th>
            <Th w={300} textAlign={'right'}>
              Quantity
            </Th>
            <Th w={400} textAlign={'center'}>
              Sub Total
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td w={200} textAlign={'center'}>
              Item 1
            </Td>
            <Td w={500} textAlign={'center'}>
              $12.50
            </Td>
            <Td w={300} textAlign={'right'} isNumeric>
              1
            </Td>
            <Td w={400} textAlign={'center'}>
              $11.5
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </React.Fragment>
  )
}
