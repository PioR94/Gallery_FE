import React, { useEffect, useState } from 'react';
import { baseUrl, downloadData } from '../../api';
import { PhotoRecord } from '../../types/photo';
import { OnePhoto } from '../OnePhoto/OnePhoto';
import { Paginator } from 'primereact/paginator';
import './AllPhotos.css';
import { useNavigate } from 'react-router-dom';

export const AllPhotos = () => {
  const [photosData, setPhotosData] = useState<PhotoRecord[]>([]);

  const [currentPage, setCurrentPage] = useState(0);

  const [photos, setPhotos] = useState<JSX.Element[]>([]);

  const photosPerPage = 4;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await downloadData(`${baseUrl}get-all`);
        setPhotosData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (photosData.length > 0) {
      const start = currentPage * photosPerPage;
      const end = start + photosPerPage;
      const currentPhotos = photosData
        .slice(start, end)
        .map((el, index) => (
          <OnePhoto
            key={el.id}
            id={el.id}
            title={el.title}
            photo={el.photo}
            description={el.description}
            className={index % 2 === 0 ? 'photo-left' : 'photo-right'}
          />
        ));
      setPhotos(currentPhotos);
    }
  }, [photosData, currentPage]);

  const onPageChange = (event: any) => {
    setCurrentPage(event.page);
  };

  return (
    <div className="wrapper-all-photos">
      <header className="header-all-photos">
        <i
          className="pi pi-plus-circle plus"
          onClick={() => navigate('../table')}
        ></i>
      </header>
      {photos}
      <Paginator
        first={currentPage * photosPerPage}
        rows={photosPerPage}
        totalRecords={photosData.length}
        onPageChange={onPageChange}
        style={{ marginTop: 20 }}
      />
    </div>
  );
};
