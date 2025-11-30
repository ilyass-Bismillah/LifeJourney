import React from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from "next/link"
import { Separator } from '@/components/ui/separator'

const StoryPage = () => {
  return (
    <div className='flex flex-col space-y-5 w-full'>
      <div className='flex items-center justify-between'>
        <h1 className='font-semibold'>My stories</h1>
        <Link href="/story/new">
        <Button>
          <Plus className='mr-2 h-5 w-5'/>
          Create new story
        </Button>
        </Link>
      </div>
      <Separator/>
      
    </div>
  )
}

export default StoryPage
