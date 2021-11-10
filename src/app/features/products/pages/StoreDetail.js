import React from 'react'

import { Box, SimpleGrid } from '@chakra-ui/react'
import { CardFood } from './CardFood'

export function StoreDetail() {
  return (
    <React.Fragment>
      <Box maxW={'1170px'} margin="0 auto">
        <SimpleGrid
          columns={[1, null, 2, 3]}
          mb={'10'}
          mt={'10'}
          spacing="20px"
        >
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <Box
              sx={{
                '@media screen and (max-width: 800px)': {
                  margin: '0 auto',
                },
              }}
            >
              <CardFood />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </React.Fragment>
  )
}
