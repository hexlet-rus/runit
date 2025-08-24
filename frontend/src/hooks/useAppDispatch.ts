import type { AppDispatch } from 'src/slices';
import { useDispatch } from 'react-redux';

export default () => useDispatch<AppDispatch>();
