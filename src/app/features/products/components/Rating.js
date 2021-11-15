import { Box } from '@chakra-ui/react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import React from 'react'

export function Rating() {
  return (
    <Box d='flex' alignItems='center'>
      {Array(5)
        .fill('')
        .map((_, i) => {
          if (3 - i >= 1) {
            return (
              <BsStarFill
                key={i}
                style={{ marginLeft: '1' }}
                color={'pink.400'}
              />
            )
          }
          return <BsStar key={i} style={{ marginLeft: '1' }} />
        })}
      <Box as='span' ml='2' color='gray.600' fontSize='sm'>
        244 reviews
      </Box>
    </Box>
  )
}