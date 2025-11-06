import { Spinner } from 'react-bootstrap';
import '@styles/components/page-loader.scss';

const PageLoader = () => {
  return (
    <div className="page-loader-container">
      <Spinner
        animation="border"
        variant="primary"
        className='page-loader-spinner'
      />
    </div>
  );
}

export default PageLoader;
