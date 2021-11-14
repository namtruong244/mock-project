import { randomInt } from '../../../utils'
import { Box } from '@chakra-ui/react'
import { BsStar, BsStarFill } from 'react-icons/bs'
import React from 'react'

export function Rating() {
  const randomRating = randomInt(1, 5)
  const randomReview = randomInt(1, 50)
  return (
    <Box d="flex" alignItems="center">
      {Array(5)
        .fill('')
        .map((_, i) => {
          if (randomRating - i >= 1) {
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
      <Box as="span" ml="2" color="gray.600" fontSize="sm">
        {randomReview} review{randomReview > 1 && 's'}
      </Box>
    </Box>
  )
}