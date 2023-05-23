import React from 'react';
import { Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { actions as modalActions } from '../slices/modalSlice.js';
import classes from './Profile.module.css';

const AccountSettings = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);

  const parseDate = (date) => {
    try {
      return new Intl.DateTimeFormat().format(new Date(date));
    } catch {
      return t('profile.successfulLoading');
    }
  };

  const handleEditProfile = () => {
    dispatch(
      modalActions.openModal({
        type: 'editProfile',
        item: userInfo,
      }),
    );
  };

  const handleChangePassword = () => {
    dispatch(
      modalActions.openModal({
        type: 'changePassword',
        item: { id: userInfo.id },
      }),
    );
  };

  return (
    <Col className={`col-md-3 px-2 rounded ${classes.profileColumn}`}>
      <div className={`w-100 ${classes.profile}`}>
        <div>
          <h1 className="my-2">{userInfo.login}</h1>
          <div style={{ paddingTop: '10px' }}>
            <h5 className="my-2">
              {t('profile.email')}
              <span className="text-muted"> {userInfo.email}</span>
            </h5>
            <h5 className="my-2">
              {t('profile.createdAt')}
              <span className="text-muted">
                {' '}
                {parseDate(userInfo.created_at)}
              </span>
            </h5>
          </div>
          {/* <div>
            {`${t('profile.email')} `}
            <span className="text-muted">{userInfo.email}</span>
          </div> */}
          {/* "userdata.created_at", "userdata.id" are also available. Add if needed. */}
        </div>
        <div className={`${classes.profileButtons}`}>
          <Button className={`${classes.button}`} onClick={handleEditProfile}>
            <div>
              <span>{t('profile.editProfileButton')}</span>
            </div>
          </Button>
          {/* <Button
            className={`${classes.button}`}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
          >
            <div>
              <span>{t('profile.copyProfileButton')} </span>
            </div>
          </Button> */}
          <Button
            className={`${classes.button}`}
            onClick={handleChangePassword}
          >
            <div>
              <span>{t('modals.changePassword.header')}</span>
            </div>
          </Button>
        </div>
        <div className="gap" style={{ marginBottom: 'auto' }} />
        <div
          className="d-flex flex-md-column w-100"
          style={{ alignItems: 'center' }}
        >
          {/* <span>{t('profile.createdAt')}</span>
          <span>{parseDate(userInfo.created_at)}</span> */}
        </div>
      </div>
    </Col>
  );
};

export default AccountSettings;
