import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { object } from 'yup';
import { faker } from '@faker-js/faker';

import { Typeahead } from 'react-bootstrap-typeahead';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
import routes from '../../routes';

import { useAuth, useSnippets } from '../../hooks';
import { snippetName } from '../../utils/validationSchemas';
import { actions as modalActions } from '../../slices/modalSlice.js';
import JavaScriptIcon from '../../assets/images/icons/javascript.svg';
import PhpIcon from '../../assets/images/icons/php.svg';
import PythonIcon from '../../assets/images/icons/python.svg';

const icons = new Map()
  .set('javascript', JavaScriptIcon)
  .set('python', PythonIcon)
  .set('php', PhpIcon);

const extensions = new Map()
  .set('javascript', 'js')
  .set('python', 'py')
  .set('php', 'php');

const generateGuestUserData = () => {
  const username = `guest_${faker.string.alphanumeric(5)}`;
  const email = `${username}@hexlet.com`;
  const password = `guest_${faker.internet.password()}`;
  return { username, email, password };
};

function NewSnippet({ handleClose, isOpen }) {
  const { t } = useTranslation();
  const auth = useAuth();
  const dispatch = useDispatch();
  const snippetApi = useSnippets();
  const navigate = useNavigate();
  const inputRefTemplate = useRef(null);
  const inputRefName = useRef(null);
  const supportedLanguages = ['javascript']; // #TODO: later change it to a selector with data on support languages
  const username = useSelector((state) => state.user.userInfo.username);
  const [selectedLng, setSelectedLng] = useState([]);
  const [once, setOnce] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inputRefTemplate.current) {
      inputRefTemplate.current.focus();
    }
  }, [isOpen]);

  const validationSchema = object({
    name: snippetName(),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      const guestData = !auth.isLoggedIn && generateGuestUserData();
      const targetUsername = auth.isLoggedIn ? username : guestData.username;
      if (!auth.isLoggedIn) {
        try {
          await axios.post(routes.usersPath(), guestData);
          auth.signIn();
          localStorage.setItem(
            'guestUserData',
            JSON.stringify({
              guestId: guestData.password,
            }),
          );
        } catch (err) {
          if (!err.isAxiosError) {
            console.log('errors.unknown');
            throw err;
          }
          if (
            err.response?.status === 400 &&
            Array.isArray(err.response?.data?.errs?.message)
          ) {
            // случай, когда случайно сгенерировался username или email, который уже есть в базе
            console.log(t('errors.network'));
            throw err;
          } else {
            console.log(t('errors.network'));
            throw err;
          }
        }
      }
      const [language] = selectedLng;
      const code = t(`codeTemplates.${language}`);
      // TODO: Тут не должно быть проверок, нужно создать абстракцию сервиса, который будет работать с любыми языками
      if (language === 'javascript') {
        try {
          const snipName = `${values.name}.${extensions.get(language)}`;
          const id = await snippetApi.saveSnippet(code, snipName, language);
          const { slug } = await snippetApi.getSnippetData(id);
          const url = new URL(
            snippetApi.genViewSnippetLink(targetUsername, slug),
          );
          console.log(id, slug, url.pathname);
          formik.values.name = '';
          navigate(url.pathname);
          handleClose();
        } catch (error) {
          if (!error.isAxiosError) {
            console.log(t('errors.unknown'));
            throw error;
          } else {
            console.log(t('errors.network'));
            throw error;
          }
        } finally {
          setSelectedLng([]);
          setOnce(false);
          setSubmitting(false);
        }
      } else {
        dispatch(modalActions.openModal({ type: 'inDevelopment' }));
      }
    },
  });

  useEffect(() => {
    setTimeout(() => {
      if (inputRefName.current) {
        inputRefName.current.select();
      }
    }, 100);
  }, [formik.touched.name]);

  const handleModalClose = () => {
    setSelectedLng([]);
    setOnce(false);
    setIsLoading(false);
    formik.resetForm();
    handleClose();
  };

  const generateSnippetName = async () => {
    setIsLoading(true);
    try {
      const generatedName = await snippetApi.getDefaultSnippetName();
      formik.setFieldValue('name', generatedName);
      formik.setFieldTouched('name', true);
    } catch (error) {
      if (!error.isAxiosError) {
        console.log(t('errors.unknown'));
        throw error;
      } else {
        console.log(t('errors.network'));
        throw error;
      }
    }
    setIsLoading(false);
  };

  const handleInputLng = (inputValue) => {
    if (inputValue && inputValue.trim() !== '') {
      const filteredOptions = supportedLanguages.filter((language) =>
        language.toLowerCase().startsWith(inputValue.toLowerCase()),
      );
      setSelectedLng(filteredOptions.slice(0, 1));

      if (!once) {
        setOnce(true);
        generateSnippetName();
      }
    } else {
      setSelectedLng([]);
    }
  };

  return (
    <Modal centered onHide={handleModalClose} show={isOpen}>
      <Modal.Header className="py-3 pb-0" closeButton>
        <Modal.Title className="display-6 fs-3">
          {t('modals.newSnippet.title')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6">
            <Form.Label>{t('modals.newSnippet.template')}</Form.Label>
            <Typeahead
              id="template"
              labelKey="template"
              maxResults={3}
              onChange={([e]) => handleInputLng(e)}
              options={supportedLanguages}
              renderInput={({ referenceElementRef, ...inputProps }) => {
                return (
                  <Form.Control
                    ref={(node) => {
                      inputRefTemplate.current = node;
                      referenceElementRef(node);
                    }}
                    onBlur={(e) => handleInputLng(e.target.value)}
                    onChange={inputProps.onChange}
                    onFocus={inputProps.onFocus}
                    placeholder={inputProps.placeholder}
                    type={inputProps.type}
                    value={inputProps.value}
                  />
                );
              }}
              renderMenuItemChildren={(option) => (
                <div>
                  <Image
                    alt={t(`languages.${option}`)}
                    roundedCircle
                    src={icons.get(option)}
                    style={{
                      width: '15%',
                      height: 'auto',
                    }}
                  />
                  {`  ${option}`}
                </div>
              )}
              selected={selectedLng}
            />
          </div>
          <div className="col-md-6">
            <Form className="flex-fill" onSubmit={formik.handleSubmit}>
              <Form.Group className="position-relative">
                <Form.Label>{t('modals.newSnippet.snippetName')}</Form.Label>
                <Form.Control
                  ref={inputRefName}
                  autoComplete="off"
                  className="transition-padding"
                  disabled={selectedLng.length === 0 || isLoading}
                  id="name"
                  isInvalid={formik.errors.name && formik.touched.name}
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <Form.Control.Feedback tooltip type="invalid">
                  {t(formik.errors.name)}
                </Form.Control.Feedback>
              </Form.Group>
              <div className="d-flex flex-row-reverse pt-4">
                <Button
                  className="col-md-8"
                  disabled={!formik.values.name || formik.isSubmitting}
                  type="submit"
                  variant="primary"
                >
                  {t('modals.newSnippet.create')}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default NewSnippet;
