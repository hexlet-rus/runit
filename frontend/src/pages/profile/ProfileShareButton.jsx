import Button from 'react-bootstrap/Button';
import { Link45deg } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

function ProfileShareButton({ onClick }) {
  const { t } = useTranslation();

  return (
    <Button
      className="btn-icon-only"
      onClick={onClick}
      size="sm"
      variant="nofill-body"
    >
      <Link45deg />
      <span className="visually-hidden">{t('profileActions.share')}</span>
    </Button>
  );
}

export default ProfileShareButton;
