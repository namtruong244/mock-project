import React from 'react'

import { Box, SimpleGrid, Text } from '@chakra-ui/react'
import { CardFood } from '../../products'

export function StoreDetail(props) {
  return (
    <React.Fragment>
      <Box maxW={'1140px'} margin='0 auto'>
        <SimpleGrid
          columns={[1, null, 2, 3]}
          mb={'10'}
          mt={'10'}
          spacing='30px'
        >
          {props.products?.length === 0 && <Text>No product</Text>}
          {props.products?.map(item => (
            <Box
              key={item.itemId}
              sx={{
                '@media screen and (max-width: 800px)': {
                  margin: '0 auto',
                },
              }}
            >
              <CardFood
                item={item}
                deleteProduct={props.deleteProduct}
                isLoadingDelete={props.isLoadingDelete}
              />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </React.Fragment>
  )
}
