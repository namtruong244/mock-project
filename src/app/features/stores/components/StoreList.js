import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import { CardStore } from './CardStore'

export function StoreList({stores}) {
  return (
    <React.Fragment>
      <Box maxW={'1140px'} margin="0 auto">
        <SimpleGrid
          columns={[1, null, 2, 4]}
          mb={'10'}
          mt={'10'}
          spacing="20px"
        >
          {stores?.map(store =>
            <Box
              key={store.shopId}
              sx={{
                '@media screen and (max-width: 800px)': {
                  margin: '0 auto',
                },
              }}
            >
              <CardStore store={store} />
            </Box>
          )}
        </SimpleGrid>
      </Box>
    </React.Fragment>
  )
}
