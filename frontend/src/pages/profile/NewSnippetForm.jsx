import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { useSnippets } from '../../hooks';
import { actions as modalActions } from '../../slices/modalSlice.js';

import SnippetCardWrapper from './SnippetCardWrapper';
import JavaScriptIcon from '../../assets/images/icons/javascript.svg';
import PhpIcon from '../../assets/images/icons/php.svg';
import PythonIcon from '../../assets/images/icons/python.svg';
import HTMLIcon from '../../assets/images/icons/html.svg';

const icons = new Map()
  .set('javascript', JavaScriptIcon)
  .set('python', PythonIcon)
  .set('php', PhpIcon)
  .set('html', HTMLIcon);

const extensions = new Map()
  .set('javascript', 'js')
  .set('python', 'py')
  .set('php', 'php')
  .set('html', 'html');

function NewSnippetForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const snippetApi = useSnippets();
  const navigate = useNavigate();
  const { supportedLanguages } = useSelector((state) => state.languages);
  const username = useSelector((state) => state.user.userInfo.username);

  const handleNewSnippet = (language) => async () => {
    const code = t(`codeTemplates.${language}`);
    if (supportedLanguages.includes(language)) {
      try {
        const generatedName = await snippetApi.getDefaultSnippetName();
        const snippetName = `${generatedName}.${extensions.get(language)}`;
        const id = await snippetApi.saveSnippet(code, snippetName, language);
        const { slug } = await snippetApi.getSnippetData(id);
        const url = new URL(snippetApi.genViewSnippetLink(username, slug));
        console.log(id, slug, url.pathname);
        navigate(url.pathname);
      } catch (error) {
        if (!error.isAxiosError) {
          console.log(t('errors.unknown'));
          throw error;
        } else {
          console.log(t('errors.network'));
          throw error;
        }
      }
    } else {
      dispatch(modalActions.openModal({ type: 'inDevelopment' }));
    }
  };

  return (
    <SnippetCardWrapper>
      <div className="new-snippet h-100">
        <div>{t('snippetActions.new')}</div>
        <div className="new-snippet-links flex-wrap">
          {supportedLanguages.map((language) => (
            <Button
              key={language}
              onClick={handleNewSnippet(language)}
              variant={null}
            >
              <Image
                alt={t(`languages.${language}`)}
                src={icons.get(language)}
              />
              <span className="visually-hidden">
                {t('snippetActions.createOnLanguage', {
                  language: t(`languages.${language}`),
                })}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </SnippetCardWrapper>
  );
}

export default NewSnippetForm;
