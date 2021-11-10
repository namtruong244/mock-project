import React from 'react'
import { SimpleGrid, Box } from '@chakra-ui/react'
import { CardStore } from './CardStore'

export function StoreList() {
  return (
    <React.Fragment>
      <Box maxW={'1170px'} margin="0 auto">
        <SimpleGrid
          columns={[1, null, 2, 4]}
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
              <CardStore />
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </React.Fragment>
  )
}
