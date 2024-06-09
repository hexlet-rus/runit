import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useTernaryDarkMode } from 'usehooks-ts';
import { useLanguage } from '../../hooks';
import FormAlert from './FormAlert.jsx';
import { useState } from 'react';

function LanguageItem({ value, language }) {
  const { t } = useTranslation();
  return value === language ? (
    <option selected>{t(`profileSettings.${value}`)}</option>
  ) : (
    <option value={value}>{t(`profileSettings.${value}`)}</option>
  );
}

function ThemeItem({ value, theme }) {
  const { t } = useTranslation();
  return value === theme ? (
    <option selected>{t(`settings.themes.${value}`)}</option>
  ) : (
    <option value={value}>{t(`settings.themes.${value}`)}</option>
  );
}

function ApperearanceForm() {
  const { t } = useTranslation();
  const { language, availableLanguages, setLanguage } = useLanguage();
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();
  const themes = ['system', 'light', 'dark'];
  const initialFormState = { state: 'initial', message: '' };
  const [formState, setFormState] = useState(initialFormState);
  const initialValues = {
    language,
    theme: ternaryDarkMode,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const {language, theme } = values; 
      setFormState(initialFormState);
      setLanguage(language);
      setTernaryDarkMode(theme);
      setFormState({
        state: 'success',
        message: 'profileSettings.updateSuccessful',
      })
      formik.resetForm();
    },
  });
  return (
    <Form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
      <h5>{t('profileSettings.appearance')}</h5>
      <FormAlert onClose={() => setFormState(initialFormState)} state={formState.state}>
        {t(formState.message)}
      </FormAlert>
      <Form.Group>
        <Form.Label>{t('profileSettings.language')}</Form.Label>
        <Form.Select name="language" onChange={formik.handleChange}>
          {availableLanguages.map((lang) => {
            return <LanguageItem key={lang} language={language} value={lang} />;
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('profileSettings.theme')}</Form.Label>
        <Form.Select name="theme" onChange={formik.handleChange}>
          {themes.map((theme) => {
            return (
              <ThemeItem key={theme} theme={ternaryDarkMode} value={theme} />
            );
          })}
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
