import type { BoxProps } from '@mui/material/Box';

import { varAlpha } from 'minimal-shared/utils';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useDebounce } from 'src/hooks/use-debounce';

import { useAppDispatch } from 'src/app/hooks';
import { changeValue } from 'src/app/api/search/searchSlice';

import { Iconify } from 'src/components/iconify';
import SearchModeSwitch from 'src/components/switch/search-mode-switch';

// ----------------------------------------------------------------------

export function Searchbar({ sx, ...other }: BoxProps) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>('');

  const debouncedInput = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedInput || debouncedInput === '') {
      dispatch(changeValue({ value: debouncedInput }));
    }
  }, [debouncedInput, dispatch]);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClear = useCallback(() => {
    dispatch(changeValue({ value: '' }));
    setSearchValue('');
  }, [dispatch]);

  const [mode, setMode] = useState<'song' | 'artist'>('song');

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        <IconButton onClick={handleOpen}>
          <Iconify icon="eva:search-fill" sx={{ color: 'black' }} />
        </IconButton>

        <Slide direction="down" in={open} mountOnEnter unmountOnExit>
          <Box
            sx={{
              top: 0,
              left: 0,
              zIndex: 99,
              width: '100%',
              display: 'flex',
              position: 'absolute',
              alignItems: 'center',
              px: { xs: 3, md: 5 },
              boxShadow: theme.vars.customShadows.z8,
              height: {
                xs: 'var(--layout-header-mobile-height)',
                md: 'var(--layout-header-desktop-height)',
              },
              backdropFilter: `blur(6px)`,
              WebkitBackdropFilter: `blur(6px)`,
              backgroundColor: varAlpha(theme.vars.palette.background.defaultChannel, 0.8),
              ...sx,
            }}
            {...other}
          >
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <Iconify width={20} icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
              sx={{ fontWeight: 'fontWeightBold' }}
            />
              <SearchModeSwitch value={mode} onChange={(value) => setMode(value)} />
            <Button variant="contained" onClick={handleClear} color="inherit">
              Clear
            </Button>
          </Box>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
