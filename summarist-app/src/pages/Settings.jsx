import React from 'react';
import LoginImg from '../assets/login.png';
import { useAuth } from '../context/AuthContext';

export default function Settings() {
  const { user, openAuth } = useAuth();

  return (
    <div className="container">
      <div className="row">
        <div className="section__title page__title">Settings</div>
        {!user ? (
          <div className="settings__login--wrapper">
            <img
              src={LoginImg}
              alt="login"
              className="settings__login--img"
            />
            <div className="settings__login--text">
              Log in to your account to see your details.
            </div>
            <button className="btn settings__login--btn" onClick={() => openAuth()}>
              Login
            </button>
          </div>
        ) : (
          <>
            <div className="setting__content">
              <div className="settings__sub--title">Your Subscription plan</div>
              <div className="settings__text">premium</div>
            </div>
            <div className="setting__content">
              <div className="settings__sub--title">Email</div>
              <div className="settings__text">{user.email}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}