import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  async uploadFile(
    event: Event,
    type: 'image' | 'video'
  ): Promise<string | null> {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return null;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload');

    const cloudName = 'dle2pvl2o';
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`;

    try {
      const res = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error?.message || 'Upload failed');
      }

      const data = await res.json();
      const optimizedUrl = data.secure_url.replace(
        '/upload/',
        '/upload/w_800,h_800,c_limit,f_auto,q_auto/'
      );

      return optimizedUrl;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      return null;
    }
  }
}
