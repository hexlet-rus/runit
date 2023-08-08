import Button from 'react-bootstrap/Button';
import { Github } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';

function GithubButton() {
  const { t } = useTranslation();

  return (
    <Button variant="outline-secondary">
      <Github className="bi me-1" />
      {t('formActions.withGithub')}
    </Button>
  );
}

export default GithubButton;
