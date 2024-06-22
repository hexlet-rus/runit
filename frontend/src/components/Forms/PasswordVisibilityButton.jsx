import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function PasswordVisibilityButton({
  variant = 'nofill-body',
  onClick = () => null,
  enabled = false,
}) {
  const { t: tFA } = useTranslation('translation', {
    keyPrefix: 'formActions',
  });

  return (
    <Button onClick={onClick} variant={variant}>
      {enabled ? (
        <>
          <EyeSlash />
          <span className="visually-hidden">{tFA('hidePassword')}</span>
        </>
      ) : (
        <>
          <Eye />
          <span className="visually-hidden">{tFA('showPassword')}</span>
        </>
      )}
    </Button>
  );
}

export default PasswordVisibilityButton;
