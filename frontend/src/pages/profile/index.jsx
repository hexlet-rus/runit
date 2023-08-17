import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Link45deg } from 'react-bootstrap-icons';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import NotFoundPage from '../404';
import SnippetCard from './SnippetCard.jsx';
import NewSnippetForm from './NewSnippetForm.jsx';
import { fetchUserSnippets } from 'src/slices/snippetsSlice.js';
import { actions } from '../../slices/modalSlice.js';
import { useEffect } from 'react';

const ProfileLayout = ({ data, isEditable }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { user, snippets } = data;

  const handleInDevelopment = () => {
    dispatch(actions.openModal({ type: 'inDevelopment' }));
  };

  return (
    <div className="page-bg-image">
      <Container className="py-5">
        <div className="d-flex align-items-start">
          <h1 className="display-5">{user.username}</h1>
          <Button
            variant="nofill-body"
            size="sm"
            className="btn-icon-only"
            onClick={handleInDevelopment}
          >
            <Link45deg />
            <span className="visually-hidden">{t('profileActions.share')}</span>
          </Button>
        </div>

        <Row
          as={TransitionGroup}
          xs={1}
          sm={2}
          lg={3}
          xxl={4}
          className="g-4 py-3"
        >
          {isEditable ? <NewSnippetForm /> : null}
          {snippets.map((snippet) => (
            <CSSTransition key={snippet.id} timeout={250} classNames="width">
              <SnippetCard data={snippet} isEditable={isEditable} />
            </CSSTransition>
          ))}
        </Row>
      </Container>
    </div>
  );
};

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { username } = useParams();
  const user = useSelector((state) => state.user.userInfo);
  const snippetsSlice = useSelector((state) => state.snippets);

  const isMyProfile = username === user.username;

  useEffect(() => {
    dispatch(fetchUserSnippets())
      .unwrap()
      .catch((serializedError) => {
        const error = new Error(serializedError.message);
        error.name = serializedError.name;
        throw error;
      });
  }, []);

  // TODO: добавить возможность получать сниппеты другого пользователя, когда появится возможность делится профилем
  return isMyProfile ? (
    <ProfileLayout
      data={{ user, snippets: snippetsSlice.snippets }}
      isEditable={isMyProfile}
    />
  ) : (
    <NotFoundPage />
  );
};

export default ProfilePage;
