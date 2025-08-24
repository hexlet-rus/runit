import { useSelector } from 'react-redux';
import {
  DistributeHorizontal,
  DistributeVertical,
} from 'react-bootstrap-icons';
import type { RootReducerType } from 'src/types/slices';

function DisplayIconView() {
  const { direction } = useSelector((state: RootReducerType) => state.editor);
  switch (direction) {
    case 'horizontal':
      return <DistributeHorizontal />;
    case 'vertical':
      return <DistributeVertical />;
    default:
      return <DistributeHorizontal />;
  }
}

export default DisplayIconView;
