import { useEffect } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { increment, decrement, reset } from '../store/counterSlice';

// Use `animated(Box)` instead of `animated.div`
const AnimatedBox = animated(Box);

const Counter = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch();

  // Animate background color based on count.
  const animationProps = useSpring({
    backgroundColor: `rgba(0, 150, 136, ${Math.min(1, count / 10)})`,
    config: { tension: 120, friction: 14 },
  });

  // Persist counter to localStorage.
  useEffect(() => {
    localStorage.setItem('counter', count.toString());
  }, [count]);

  return (
    <AnimatedBox style={{ ...animationProps, padding: '20px', textAlign: 'center' }}>
      <Typography variant="h4">Counter: {count}</Typography>
      <Box mt={2} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => dispatch(increment())}>
          Increment
        </Button>
        <Button variant="contained" onClick={() => dispatch(decrement())} disabled={count === 0}>
          Decrement
        </Button>
        <Button variant="contained" onClick={() => dispatch(reset())}>
          Reset
        </Button>
      </Box>
    </AnimatedBox>
  );
};

export default Counter;
