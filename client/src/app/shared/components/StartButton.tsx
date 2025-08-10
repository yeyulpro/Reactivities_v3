import { Box, Button } from '@mui/material'
import StarBorderPurple500SharpIcon from '@mui/icons-material/StarBorderPurple500Sharp';
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
type Props={
    selected: boolean
}
export default function StartButton({selected}:Props) {
  return (
    <Box  sx={{position:'relative'}}>
        <Button sx={{
            opacity: 0.8,
            transition:'opacity 0.3s',
            position:'relative',
            cursor:'pointer'
        }}>
            <StarBorderPurple500SharpIcon 
            sx={{
                fontSSize:32,
                color: 'white',
                position:'absoulte'

            }}/>

            <StarBorderSharpIcon
             sx={{fontSize:28,color:selected? 'yellow':'rgba(0,0,0,0,5)'}}/>
        </Button>
        
    </Box>
  )
}
