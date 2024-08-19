import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private storageKey = 'notes';
  key = '123';

  constructor() {}

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(
      CryptoJS.enc.Utf8
    );
  }

  private getNotes(): Note[] {
    const encryptedData = localStorage.getItem(this.storageKey);
    if (encryptedData) {
      const notes = this.decrypt(encryptedData);
      return notes ? JSON.parse(notes) : [];
    } else {
      console.warn(`No data found for key: ${this.storageKey}`);
      return [];
    }
  }

  private saveNotes(notes: Note[]): void {
    console.log('servicio: ', notes);
    localStorage.setItem(this.storageKey, this.encrypt(JSON.stringify(notes)));
  }

  getAllNotes(): Note[] {
    return this.getNotes();
  }

  getNoteById(id: number): Note | undefined {
    return this.getNotes().find((note) => note.id === id);
  }

  addNote(title: string, content: string): void {
    const notes = this.getNotes();
    const newNote: Note = {
      id: notes.length ? Math.max(...notes.map((note) => note.id)) + 1 : 1,
      title,
      content,
    };
    notes.push(newNote);
    this.saveNotes(notes);
  }

  updateNote(id: number, title: string, content: string): void {
    const notes = this.getNotes();
    const noteIndex = notes.findIndex((note) => note.id === id);
    if (noteIndex !== -1) {
      notes[noteIndex] = { id, title, content };
      this.saveNotes(notes);
    }
  }

  deleteNote(id: number): void {
    const notes = this.getNotes();
    this.saveNotes(notes.filter((note) => note.id !== id));
  }
}
