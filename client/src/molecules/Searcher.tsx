import { IconButton } from '@mui/material'
import { useState } from 'react'
import { Input } from '../atoms/Input'
import { FilterSvg } from '../svg/FilterSvg'
import { useLanguage } from '../hooks/useLanguage'

export const Searcher: React.FC = () => {
  const [value, setValue] = useState('')
  const { whatSearch } = useLanguage()

  return (
    <div className="searcher">
      <Input isWithButton value={value} setValue={setValue} placeholder={whatSearch}>
        <IconButton>
          <FilterSvg />
        </IconButton>
      </Input>
    </div>
  )
}
