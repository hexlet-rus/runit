import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLanguage } from '../../hooks';

function LanguageItem({ value, language }) {
  const { t } = useTranslation();
  return value === language ? (
    <option selected>{t(`profileSettings.${value}`)}</option>
  ) : (
    <option value={value}>{t(`profileSettings.${value}`)}</option>
  );
}

function ApperearanceForm() {
  const { t } = useTranslation();
  const { language, availableLanguages, setLanguage } = useLanguage();
  const userInfo = useSelector((state) => state.user.userInfo);
  const initialValues = {
    language: language,
    theme: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {},
  });
  return (
    <Form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
      <h5>{t('profileSettings.appearance')}</h5>
      <Form.Group>
        <Form.Label>{t('profileSettings.language')}</Form.Label>
        <Form.Select name='language' onChange={formik.handleChange}>
          {availableLanguages.map((lang) => {
            return <LanguageItem key={lang} language={language} value={lang} />;
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('profileSettings.theme')}</Form.Label>
        <Form.Select name='theme' onChange={formik.handleChange}>
          <option>{t('settings.themes.system')}</option>
          <option>{t('settings.themes.light')}</option>
          <option>{t('settings.themes.dark')}</option>
        </Form.Select>
      </Form.Group>
      <Button
        className="ms-auto"
        disabled={!formik.dirty || formik.isSubmitting}
        type="submit"
        variant="primary"
      >
        {t('profileSettings.changeButton')}
      </Button>
    </Form>
  );
}

export default ApperearanceForm;
