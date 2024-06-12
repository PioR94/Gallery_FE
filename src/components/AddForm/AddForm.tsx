import React, { SyntheticEvent, useEffect, useState } from 'react';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import './AddForm.css';
import { Button } from 'primereact/button';
import { sendDt } from '../../api';
import { useNavigate } from 'react-router-dom';

export const AddForm = () => {
  const [form, setForm] = useState({
    title: '',
    photo: '',
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(form);
  }, [form]);

  const updateForm = (key: string, value: any) => {
    setForm((form) => ({
      ...form,
      [key]: value,
    }));
  };

  const resizeImage = (
    file: File,
    maxWidth: number,
    maxHeight: number,
    callback: (dataUrl: string) => void,
  ) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height *= maxWidth / width));
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width *= maxHeight / height));
            height = maxHeight;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          callback(canvas.toDataURL(file.type));
        } else {
          console.error('Unable to get canvas context');
        }
      };
      if (event.target && event.target.result) {
        img.src = event.target.result as string;
      } else {
        console.error('FileReader event target or result is null');
      }
    };
    reader.readAsDataURL(file);
  };

  const onFileSelect = (e: FileUploadSelectEvent) => {
    const file = e.files[0];
    resizeImage(file, 720, 480, (resizedDataUrl) => {
      updateForm('photo', resizedDataUrl);
    });
  };

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(form);
    sendDt(form, 'insert');
  };

  return (
    <div className="form-wrapper">
      <i
        className=" pi pi-arrow-left arrow"
        onClick={() => navigate('../table')}
      ></i>

      <form className="add-form" onSubmit={onSubmit}>
        <div className="div-form">
          <label htmlFor="title">Title</label>
          <InputText
            id="title"
            value={form.title}
            onChange={(e) => updateForm('title', e.target.value)}
            form="."
            maxLength={20}
          />
        </div>
        <div className="div-form">
          <FileUpload
            name="demo[]"
            onSelect={onFileSelect}
            accept="image/*"
            auto
          />
        </div>
        <div className="div-form">
          <label htmlFor="description">Description</label>
          <InputTextarea
            id="description"
            value={form.description}
            onChange={(e) => updateForm('description', e.target.value)}
            rows={5}
            cols={30}
            maxLength={300}
          />
        </div>
        <Button label="Submit" />
      </form>
    </div>
  );
};
