import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import useAppDispatch from '../../hooks/useAppDispatch';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { fetchUserSnippets } from '../../slices/snippetsSlice';
import { fetchUserSettings } from '../../slices/userSettingsSlice';

import NotFoundPage from '../404/index';
import NewSnippetForm from './NewSnippetForm';
import SnippetCard from './SnippetCard';
import SnippetBadge from './SnippetBadge';
import SnippetCheck from './SnippetCheck';
import type { FetchedCurrentUser, FetchedSnippet, RootReducerType, SnippetOwnerType } from 'src/types/slices';

function ProfileLayout({ data, isEditable }: {
  data: 
    { 
      snippets: Array<FetchedSnippet & { user: SnippetOwnerType }>;
      user: FetchedCurrentUser;
    },
  isEditable: boolean 
}
) {
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
              <SnippetCard data={snippet} /> { /** Here was prop isEditable={isEditable} although SnippetCard do not accept this prop */ }
            </CSSTransition>
          ))}
        </Row>
        <SnippetBadge />
      </Container>
    </div>
  );
}

function ProfilePage() {
  const dispatch = useAppDispatch();
  const { username } = useParams();
  const user = useSelector((state: RootReducerType) => state.user.userInfo);
  const snippetsSlice = useSelector((state: RootReducerType) => state.snippets);

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
      data={{ user, snippets: snippetsSlice.snippets } as {
        user: FetchedCurrentUser,
        snippets: Array<FetchedSnippet & { user: SnippetOwnerType }>
      }} 
      isEditable={isMyProfile}
    />
  ) : (
    <NotFoundPage />
  );
}

export default ProfilePage;
