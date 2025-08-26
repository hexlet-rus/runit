import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useTernaryDarkMode } from 'usehooks-ts';
import { useState } from 'react';
import type { Themes, UILanguages } from 'src/types/slices';
import type { TypeInitialFormState } from 'src/types/components';
import { useLanguage } from '../../hooks';
import FormAlert from './FormAlert';

interface ILanguageItemArgs {
  value: UILanguages;
  language: UILanguages | string;
}

interface IThemeItemArgs {
  value: Themes;
  theme: Themes;
}

function LanguageItem({ value, language }: ILanguageItemArgs) {
  const { t } = useTranslation();
  if (value !== language) {
    return <option value={value}>{t(`profileSettings.${value}`)}</option>;
  }
}

function ThemeItem({ value, theme }: IThemeItemArgs) {
  const { t } = useTranslation();
  if (value !== theme) {
    return <option value={value}>{t(`settings.themes.${value}`)}</option>;
  }
}

function ApperearanceForm() {
  const { t } = useTranslation();
  const { language, availableLanguages, setLanguage } = useLanguage();
  const { ternaryDarkMode, setTernaryDarkMode } = useTernaryDarkMode();
  const themes: Themes[] = ['system', 'light', 'dark'];
  const initialFormState: TypeInitialFormState = {
    state: 'initial',
    message: '',
  };
  const [formState, setFormState] = useState(initialFormState);
  const initialValues = {
    selectedLanguage: '',
    selectedTheme: '',
  };
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const { selectedLanguage, selectedTheme } = values;
      setFormState(initialFormState);
      setLanguage(selectedLanguage !== '' ? selectedLanguage : language);
      setTernaryDarkMode(
        selectedTheme !== '' ? (selectedTheme as Themes) : ternaryDarkMode,
      );
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
          <option defaultValue={language}>
            {t(`profileSettings.${language}`)}
          </option>
          {availableLanguages.map((lang) => {
            return (
              <LanguageItem
                key={lang}
                language={language}
                value={lang as UILanguages}
              />
            );
          })}
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>{t('profileSettings.theme')}</Form.Label>
        <Form.Select name="selectedTheme" onChange={formik.handleChange}>
          <option defaultValue={ternaryDarkMode}>
            {t(`settings.themes.${ternaryDarkMode}`)}
          </option>
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
