import React from 'react';
import { Photo, PhotoRecord } from '../../types/photo';
import { Divider } from 'primereact/divider';
import './OnePhoto.css';

export const OnePhoto = ({ id, title, photo, description, className }: PhotoRecord) => {
  return (
    <div className={`wrapper-one-photo ${className}`}>
      <div className="photo">
        <img className="img" src={photo} alt="" />
      </div>
      <div className="description">
        <h2>{title}</h2>
        <span>{description}</span>
      </div>
    </div>
  );
};
