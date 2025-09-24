import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import type {
  FetchedCurrentUser,
  FetchedSnippet,
  RootReducerType,
  SnippetOwnerType,
} from 'src/types/slices';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTRPC } from '../../utils/trpc';
import useAppDispatch from '../../hooks/useAppDispatch';

import { actions as snippetActions } from '../../slices/snippetsSlice';
import { fetchUserSettings } from '../../slices/userSettingsSlice';

import NotFoundPage from '../404/index';
import NewSnippetForm from './NewSnippetForm';
import SnippetCard from './SnippetCard';
import SnippetBadge from './SnippetBadge';
import SnippetCheck from './SnippetCheck';

function ProfileLayout({
  data,
  isEditable,
}: {
  data: {
    snippets: Array<FetchedSnippet & { user: SnippetOwnerType }>;
    user: FetchedCurrentUser;
  };
  isEditable: boolean;
}) {
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
              <SnippetCard data={snippet} />
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
  const trpc = useTRPC();
  const { username } = useParams();
  const user = useSelector((state: RootReducerType) => state.user.userInfo);
  const snippetsSlice = useSelector((state: RootReducerType) => state.snippets);
  const snippets = useQuery(
    trpc.snippets.getSnippetsOfUser.queryOptions(user.id),
  );
  if (!user) {
    snippets.refetch();
  }

  const isMyProfile = username === user.username;

  // useEffect(() => {
  //   if (snippets.isSuccess) {
  //     dispatch(snippetActions.changeStatus('fulfilled'))
  //     // dispatch(snippetActions.addSnippets(snippets.data));
  //   };
  // }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserSettings());
  }, [dispatch]);

  // TODO: добавить возможность получать сниппеты другого пользователя, когда появится возможность делится профилем
  return isMyProfile ? (
    <ProfileLayout
      data={
        { user, snippets: snippetsSlice.snippets } as {
          user: FetchedCurrentUser;
          snippets: Array<FetchedSnippet & { user: SnippetOwnerType }>;
        }
      }
      isEditable={isMyProfile}
    />
  ) : (
    <NotFoundPage />
  );
}

export default ProfilePage;
