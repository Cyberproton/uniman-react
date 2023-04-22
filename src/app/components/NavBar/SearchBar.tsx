import { SearchOutlined } from '@mui/icons-material';
import { FormControl, InputAdornment, OutlinedInput } from '@mui/material';

export const SearchBar = () => (
  <FormControl variant="filled">
    <OutlinedInput
      id="filled-adornment-amount"
      placeholder="Search Products"
      endAdornment={
        <InputAdornment position="end">
          <SearchOutlined />
        </InputAdornment>
      }
      style={{ height: '36px' }}
    />
  </FormControl>
);
