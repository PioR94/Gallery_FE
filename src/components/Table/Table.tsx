import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { baseUrl, downloadData, updateData, sendDt } from '../../api';
import { PhotoRecord } from '../../types/photo';
import './Table.css';
import { useNavigate } from 'react-router-dom';

export const Table: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoRecord[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await downloadData(`${baseUrl}/get-all`);
      
        setPhotos(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Download data error', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onRowEditComplete = async (e: any) => {
    const { newData, index } = e;
    let updatedPhotos = [...photos];
    updatedPhotos[index] = newData;
    setPhotos(updatedPhotos);
    try {
      const response = await updateData(newData, '/update-photo');
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  const handleDelete = async (rowData: PhotoRecord) => {
    try {
      const response = await sendDt({ id: rowData.id }, '/delete-photo');
      setPhotos((prevPhotos) =>
        prevPhotos.filter((photo) => photo.id !== rowData.id),
      );
    } catch (error) {
      console.error('Photo deletion error::', error);
    }
  };

  const textEditor = (options: any, maxLength: number) => {
    return (
      <InputText
        type="text"
        value={options.value}
        onChange={(e) => {
          const newValue = e.target.value.slice(0, maxLength);
          options.editorCallback(newValue);
        }}
      />
    );
  };

  const actionBodyTemplate = (rowData: PhotoRecord) => {
    return (
      <Button
        label="Delete"
        icon="pi pi-times"
        className="p-button-danger"
        onClick={() => handleDelete(rowData)}
      />
    );
  };

  if (loading) {
    return <div>Ładowanie danych...</div>;
  }

  return (
    <div className="wrapper-table">
      <DataTable
        value={photos}
        editMode="row"
        dataKey="id"
        onRowEditComplete={onRowEditComplete}
        style={{ width: '100%' }}
      >
        <Column field="id" header="ID" />
        <Column
          field="title"
          header="Title"
          editor={(options) => textEditor(options, 20)}
        />
        <Column
          field="description"
          header="Description"
          editor={(options) => textEditor(options, 300)}
        />
        <Column
          rowEditor
          headerStyle={{ width: '7rem' }}
          bodyStyle={{ textAlign: 'center' }}
        />
        <Column
          body={actionBodyTemplate}
          headerStyle={{ width: '7rem' }}
          bodyStyle={{ textAlign: 'center' }}
          header="Actions"
        />
      </DataTable>
      <div className="buttons">
        <Button
          label="Back"
          className="add"
          severity="secondary"
          onClick={() => navigate('../')}
        />
        <Button
          label="Add"
          className="add"
          onClick={() => navigate('../add')}
        />
      </div>
    </div>
  );
};
