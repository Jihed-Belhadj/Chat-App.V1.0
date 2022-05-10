import { Skeleton, Stack } from '@mui/material'
import React from 'react'

function ConversationLoading() {
  return (
      <div>
          <Stack>
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
        <Skeleton variant="rectangular" width={200} height={70} />
          </Stack>
    </div>
  )
}

export default ConversationLoading