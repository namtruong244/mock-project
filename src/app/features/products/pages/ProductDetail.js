import React from 'react'
import { Grid, GridItem, Image, Box, Text } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

const data = {
  isNew: true,
  imageURL:
    'https://images.foody.vn/res/g1/4336/prof/s280x175/foody-upload-api-foody-mobile-ba-d305c10a-210701160800.jpeg',
  name: 'Bánh ngọt',
  price: 4.5,
  rating: 4.2,
  numReviews: 54,
  status: 'available',
  description:
    'abbbbbbbbbbbbbbbbbbbbbbbbbbbbbb bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
  periodtime: '30 minutes',
}

export function ProductDetail() {
  return (
    <React.Fragment>
      <Box maxW={'1000px'} margin="0 auto">
        <Grid
          mt="5"
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem rowSpan={2} colSpan={1}>
            <Image
              radius={'5'}
              src={data.imageURL}
              alt={`Picture of ${data.name}`}
              roundedTop="lg"
            />
          </GridItem>
          <GridItem colSpan={4} ml={10}>
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {data.name}
            </Box>
            <Box as="span" color={'gray.600'} fontSize="lg">
              £
            </Box>
            {data.price.toFixed(2)}
            <Box as="div" color="green.500" fontSize="lg">
              {data.status}
            </Box>
          </GridItem>
          <GridItem colSpan={4} maxW="700" wordBreak ml={10}>
            <span fontWeight="bold" fontSize="10">
              {' '}
              Description :
            </span>{' '}
            {data.description}
            <Box as="div" fontSize="lg">
              Time estimate:{' '}
              <span color red>
                {data.periodtime}
              </span>
            </Box>
            <EditIcon spacing="10"></EditIcon>
            <DeleteIcon></DeleteIcon>
          </GridItem>
        </Grid>
      </Box>
    </React.Fragment>
  )
}
