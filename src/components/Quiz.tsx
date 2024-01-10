import { useEffect, useState } from 'react'
import { Button, Container, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveResult } from '../redux/slices';
const Quiz = () => {
  const [result, setResult] = useState<string[]>([]);

  const [count, setCount] = useState<number>(0);

  const [ans, setAns] = useState<string>("");
  const navigate = useNavigate()
  const { words  } = useSelector((state: { root: StateType }) => state.root);

  const nextHandler = (): void => {
    setResult(prev => [...prev, ans])
    setCount((prev) => prev + 1);
    setAns("");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    if(count + 1 > words.length) { navigate('/result')}
    dispatch(saveResult(result));
  }, [result])
  return (
    <Container maxWidth='sm' sx={{ padding: '1rem' }}>
      <Typography m={'2rem 0'}>Quiz</Typography>
      <Typography variant='h3'> {count + 1} - {words[count]?.word}</Typography>
      <FormControl>
        <FormLabel sx={{ mt: "2rem", mb: "1rem" }}>Meaning</FormLabel>
        <RadioGroup value={ans} onChange={(e) => setAns(e.target.value)} >
          {words[count]?.options.map(i => (
            <FormControlLabel
              key={i}
              value={i}
              control={<Radio />}
              label={i}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button sx={{ margin: '3rem 0' }} variant='contained' fullWidth onClick={nextHandler} disabled={ans === ""}>
        {count === words.length - 1 ? "Submit" : "Next"}
      </Button>
    </Container>
  )
}

export default Quiz
