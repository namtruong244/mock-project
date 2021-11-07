import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Stack,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import React, { useMemo, useRef, useState } from 'react'

export default function FormAvatarInput({
                                          label,
                                          buttonName,
                                          initImg = '',
                                          onChangeImage,
                                        }) {
  const inputFile = useRef(null)
  const [previewImg, setPreviewImg] = useState(initImg)

  const handleInputFile = () => {
    inputFile.current?.click()
  }

  const onChangeInputFileHandler = e => {
    if (e.target.files && e.target.files.length > 0) {
      setPreviewImg(e.target.files[0])
      onChangeImage(e.target.files[0])
    }
  }

  const getPreviewImg = useMemo(() => {
    if (typeof previewImg === 'string') {
      return previewImg
    }
    return previewImg ? URL.createObjectURL(previewImg) : null
  }, [previewImg])


  const removeImageHandler = () => {
    if (previewImg) {
      setPreviewImg(null)
      onChangeImage(null)
      inputFile.current.value = null
    }
  }

  return (
    <FormControl id='userName'>
      <FormLabel>{label}</FormLabel>
      <Stack direction={['column', 'row']} spacing={6}>
        <Center>
          <Avatar size='xl' src={getPreviewImg}>
            <AvatarBadge
              as={IconButton}
              onClick={removeImageHandler}
              size='sm'
              rounded='full'
              top='-10px'
              colorScheme='red'
              aria-label='remove Image'
              icon={<SmallCloseIcon />}
            />
          </Avatar>
        </Center>
        <Center w='full'>
          <Button
            bg='pink.400'
            color='white'
            w='full'
            onClick={handleInputFile}
            _hover={{
              bg: 'pink.500',
            }}
          >
            {buttonName}
          </Button>
          <Input
            type='file'
            accept='image/*'
            display={'None'}
            w='full'
            ref={inputFile}
            onChange={onChangeInputFileHandler}
          />
        </Center>
      </Stack>
    </FormControl>
  )
}
