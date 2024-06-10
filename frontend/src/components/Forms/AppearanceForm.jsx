import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useTernaryDarkMode } from 'usehooks-ts';
import { useState } from 'react';
import { useLanguage } from '../../hooks';
import FormAlert from './FormAlert.jsx';

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
    selectedLanguage: language,
    selectedTheme: ternaryDarkMode,
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const { selectedLanguage, selectedTheme } = values;
      setFormState(initialFormState);
      setLanguage(selectedLanguage);
      setTernaryDarkMode(selectedTheme);
      setFormState({
        state: 'success',
        message: 'profileSettings.updateSuccessful',
      });
      formik.resetForm();
    },
  });
  return (
    <Form className="d-flex flex-column gap-3" onSubmit={formik.handleSubmit}>
      <h5>{t('profileSettings.appearance')}</h5>
      <FormAlert
        onClose={() => setFormState(initialFormState)}
        state={formState.state}
      >
        {t(formState.message)}
      </FormAlert>
      <Form.Group>
        <Form.Label>{t('profileSettings.language')}</Form.Label>
        <Form.Select name="selectedLanguage" onChange={formik.handleChange}>
          {availableLanguages.map((lang) => {
            return <LanguageItem key={lang} language={language} value={lang} />;
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('profileSettings.theme')}</Form.Label>
        <Form.Select name="selectedTheme" onChange={formik.handleChange}>
          {themes.map((item) => {
            return (
              <ThemeItem key={item} theme={ternaryDarkMode} value={item} />
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
