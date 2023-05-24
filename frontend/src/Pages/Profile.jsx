import React, { useEffect } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { fetchData } from '../slices/userSlice.js';
import classes from './Profile.module.css';
import Snippets from './Snippets.jsx';
import { Link, useLocation } from 'react-router-dom';
import routes from '../routes.js';
import AccountSettings from './AccountSettings.jsx';

const Profile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchData())
      .unwrap()
      .catch((serializedError) => {
        const error = new Error(serializedError.message);
        error.name = serializedError.name;
        throw error;
      });
  }, []);

  return (
    <div className="main-content">
      <div className={`${classes.upperLine}`} />
      <div className={`h-100 w-100 px-3 bg-dark ${classes.container}`}>
        <Row className={`${classes.profileContainer}`}>
          <Col className={`col-md-3 px-2 rounded ${classes.profileColumn}`}>
            <div className={`w-100 ${classes.profile}`}>
              <div>
                <h1 className="my-2" style={{ textAlign: 'center' }}>{`${t('navbar.profile')}`}</h1>
                {/* <div>
                  Текст: 
                  <span className="text-muted">описание</span>
                </div> */}
                {/* "userdata.created_at", "userdata.id" are also available. Add if needed. */}
              </div>
              <div className={`${classes.profileButtons}`}>
                <div>
                  <Link as={Link} to={routes.profileSettingsPagePath()}>
                    <Button className={`${classes.button}`}>
                      <div>
                        <span>{`${t('profile.settingsHeader')}`}</span>
                      </div>
                    </Button>
                  </Link>
                </div>
                <div>
                  <Link as={Link} to={routes.defaultProfilePagePath()}>
                    <Button
                      className={`${classes.button}`}
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    >
                      <div>
                        <span>{`${t('profile.replsHeader')}`}</span>
                      </div>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="gap" style={{ marginBottom: 'auto' }} />
              <div
                className="d-flex flex-md-column w-100"
                style={{ alignItems: 'center' }}
              ></div>
            </div>
          </Col>
          {location.pathname === routes.defaultProfilePagePath() && (
            <Snippets />
          )}
          {location.pathname === routes.profileSettingsPagePath() && (
            <AccountSettings />
          )}
        </Row>
      </div>
    </div>
  );
};

export default Profile;