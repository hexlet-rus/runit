import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import { useSnippets } from '../../hooks';
import { actions as modalActions } from '../../slices/modalSlice.js';

import SnippetCardWrapper from './SnippetCardWrapper';

import icons from '../../utils/icons';

function NewSnippetForm() {
  const { t: tSA } = useTranslation('translation', { keyPrefix: 'snippetActions' });
  const { t: tL } = useTranslation('translation', { keyPrefix: 'languages' });
  const { t: tErr } = useTranslation('translation', { keyPrefix: 'errors' });
  const { t: tCT } = useTranslation('translation', { keyPrefix: 'codeTemplates' });
  const dispatch = useDispatch();
  const snippetApi = useSnippets();
  const navigate = useNavigate();
  const { supportedLanguages } = useSelector((state) => state.languages);
  const username = useSelector((state) => state.user.userInfo.username);

  const handleNewSnippet = (language) => async () => {
    const code = tCT(`${language}`);
    if (supportedLanguages.includes(language)) {
      try {
        const generatedName = await snippetApi.getDefaultSnippetName();
        const snippetName = `${generatedName}`;
        const id = await snippetApi.saveSnippet(code, snippetName, language);
        const { slug } = await snippetApi.getSnippetData(id);
        const url = new URL(snippetApi.genViewSnippetLink(username, slug));
        console.log(id, slug, url.pathname);
        navigate(url.pathname);
      } catch (error) {
        if (!error.isAxiosError) {
          console.log(tErr('unknown'));
          throw error;
        } else {
          console.log(tErr('network'));
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
        <div>{tSA('new')}</div>
        <div className="new-snippet-links flex-wrap">
          {supportedLanguages.map((language) => (
            <Button
              key={language}
              onClick={handleNewSnippet(language)}
              variant={null}
            >
              <Image
                alt={tL(`${language}`)}
                src={icons.get(language)}
              />
              <span className="visually-hidden">
                {tSA('snippetActions.createOnLanguage', {
                  language: tL(`${language}`),
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
