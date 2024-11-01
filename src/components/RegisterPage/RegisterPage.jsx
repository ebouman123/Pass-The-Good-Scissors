import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import { Button } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />

      <center>
        <Button
          type="button"
          className="btn btn_asLink"
          variant='contained'
          onClick={() => {
            history.push('/login');
          }}
        >
          Back to Login
        </Button>
      </center>
    </div>
  );
}

export default RegisterPage;
