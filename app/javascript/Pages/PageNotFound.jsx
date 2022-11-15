import React from 'react';
import {useTranslation} from "react-i18next";

const PageNotFound = () => {
    const { t } = useTranslation();

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"><span className="text-danger">{t('pageNotFound.oops')}</span> {t('pageNotFound.notFound')}</p>
                <p className="lead">
                    {t('pageNotFound.noExist')}
                </p>
                <a href='/' className="btn btn-primary">{t('pageNotFound.returnButton')}</a>
            </div>
        </div>
    );
};

export default PageNotFound;
