export interface Photo {
  type: string;
  data: number[];
}

export interface InputsAddForm {
  title: string;
  photo: string;
  description: string;
}

export interface PhotoRecord {
  id: string;
  title: string;
  photo: string;
  description: string;
  className?: string;
}
