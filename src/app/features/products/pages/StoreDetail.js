import React from 'react'

import { Box, SimpleGrid } from '@chakra-ui/react'
import { CardFood } from './CardFood'

export function StoreDetail(props) {
  return (
    <React.Fragment>
      <Box maxW={'1140px'} margin="0 auto">
        <SimpleGrid
          columns={[1, null, 2, 3]}
          mb={'10'}
          mt={'10'}
          spacing="30px"
        >
          {props.products?.map(item => (
            <Box
              sx={{
                '@media screen and (max-width: 800px)': {
                  margin: '0 auto',
                },
              }}
            >
              <CardFood key={item.itemId} item={item}/>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </React.Fragment>
  )
}
