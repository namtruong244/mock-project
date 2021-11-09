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
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
// import { Link as ReachLink } from '@reach/router'

export function ProductList() {
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
          <Link
            //   as={ReachLink}
            to="/list-order"
          >
            View Orders
          </Link>
        </GridItem>
      </Grid>
      <Table variant="simple">
        <TableCaption>Imperial to metric conversion factors</TableCaption>
        <Thead>
          <Tr>
            <Th w={200} textAlign={'center'}>
              Picture
            </Th>
            <Th w={500} textAlign={'center'}>
              Name
            </Th>
            <Th w={300} textAlign={'right'}>
              Price
            </Th>
            <Th w={400} textAlign={'center'}>
              Action
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td
              w={200}
              align={'center'}
              marginLeft={'12px'}
              //   w={{ base: '80%', sm: '60%', md: '50%' }}
              //   mb={{ base: 12, md: 0 }}
            >
              <Image
                src="gibbresh.png"
                fallbackSrc="https://via.placeholder.com/150"
                size="20%"
                rounded="1rem"
                shadow="0.2%"
              />
            </Td>
            <Td w={500} textAlign={'center'}>
              Pic 1
            </Td>
            <Td w={300} textAlign={'right'} isNumeric>
              500
            </Td>
            <Td w={400} textAlign={'center'}>
              <EditIcon w={6} h={6} /> <DeleteIcon w={6} h={6} />
            </Td>
          </Tr>
          <Tr>
            <Td w={200} textAlign={'center'}>
              <Image
                src="gibbresh.png"
                fallbackSrc="https://via.placeholder.com/150"
                size="20%"
                rounded="1rem"
                shadow="0.2%"
              />
            </Td>
            <Td w={500} textAlign={'center'}>
              {' '}
              Pic 2
            </Td>
            <Td w={300} textAlign={'right'} isNumeric>
              500
            </Td>
            <Td w={400} textAlign={'center'}>
              <EditIcon w={6} h={6} /> <DeleteIcon w={6} h={6} />
            </Td>
          </Tr>
          <Tr>
            <Td w={200} textAlign={'center'}>
              <Image
                src="gibbresh.png"
                fallbackSrc="https://via.placeholder.com/150"
                size="20%"
                rounded="1rem"
                shadow="0.2%"
              />
            </Td>
            <Td w={500} textAlign={'center'}>
              Pic 3
            </Td>
            <Td w={300} textAlign={'right'} isNumeric>
              500
            </Td>
            <Td w={400} textAlign={'center'}>
              <EditIcon w={6} h={6} /> <DeleteIcon w={6} h={6} />
            </Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Td w={200} textAlign={'center'}>
              <Image
                src="gibbresh.png"
                fallbackSrc="https://via.placeholder.com/150"
                size="20%"
                rounded="1rem"
                shadow="0.2%"
              />
            </Td>
            <Td w={500} textAlign={'center'}>
              Pic 4
            </Td>
            <Td w={300} textAlign={'right'} isNumeric>
              500
            </Td>
            <Td w={400} textAlign={'center'}>
              <EditIcon w={6} h={6} /> <DeleteIcon w={6} h={6} />
            </Td>
          </Tr>
        </Tfoot>
      </Table>
    </React.Fragment>
  )
}
