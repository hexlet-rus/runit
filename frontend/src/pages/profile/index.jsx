import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchUserSnippets } from '../../slices/snippetsSlice.js';
import { fetchUserSettings } from '../../slices/userSettingsSlice';

import NotFoundPage from '../404';
import NewSnippetForm from './NewSnippetForm.jsx';
import SnippetCard from './SnippetCard.jsx';
import SnippetBadge from './SnippetBadge.jsx';
import SnippetCheck from './SnippetCheck.jsx';

function ProfileLayout({ data, isEditable }) {
  const { user, snippets } = data;

  const guestUser = localStorage.getItem('guestUserData');
  // TODO: добавить возможность делится профилем

  return (
    <div className="page-bg-image">
      <Container className="py-5">
        <div className="d-flex align-items-start">
          {!guestUser && <h1 className="display-5">{user.username}</h1>}
        </div>
        <SnippetCheck />

        <Row
          as={TransitionGroup}
          className="g-4 py-3"
          lg={3}
          sm={2}
          xs={1}
          xxl={4}
        >
          {isEditable ? <NewSnippetForm /> : null}
          {snippets.map((snippet) => (
            <CSSTransition key={snippet.id} classNames="width" timeout={250}>
              <SnippetCard data={snippet} isEditable={isEditable} />
            </CSSTransition>
          ))}
        </Row>
        <SnippetBadge />
      </Container>
    </div>
  );
}

function ProfilePage() {
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  // TODO: добавить возможность получать сниппеты другого пользователя, когда появится возможность делится профилем
  return isMyProfile ? (
    <ProfileLayout
      data={{ user, snippets: snippetsSlice.snippets }}
      isEditable={isMyProfile}
    />
  ) : (
    <NotFoundPage />
  );
}

export default ProfilePage;
