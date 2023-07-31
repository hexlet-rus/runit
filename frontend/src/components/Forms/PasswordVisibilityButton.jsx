import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Eye, EyeSlash } from 'react-bootstrap-icons';

function PasswordVisibilityButton({
  variant = 'nofill-secondary',
  onClick = () => null,
  enabled = false,
}) {
  const { t } = useTranslation();

  return (
    <Button onClick={onClick} variant={variant}>
      {enabled ? (
        <>
          <EyeSlash />
          <span className="visually-hidden">
            {t('formActions.hidePassword')}
          </span>
        </>
      ) : (
        <>
          <Eye />
          <span className="visually-hidden">
            {t('formActions.showPassword')}
          </span>
        </>
      )}
    </Button>
  );
}

export default PasswordVisibilityButton;
