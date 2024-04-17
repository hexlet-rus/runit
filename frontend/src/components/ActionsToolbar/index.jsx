import { useSelector } from 'react-redux';
import { DistributeHorizontal, DistributeVertical } from 'react-bootstrap-icons';

function DisplayIconView() {
    const { direction } = useSelector((state) => state.editor);
    switch (direction) {
        case 'horizontal':
            return <DistributeHorizontal />;
        case 'vertical':
            return <DistributeVertical />;
        default:
            return <DistributeHorizontal />;
    }
}

export default DisplayIconView