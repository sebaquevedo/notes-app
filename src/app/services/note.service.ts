import { Injectable } from '@angular/core';
import { Note } from '../interfaces/note.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private storageKey = 'notes';

  constructor() {}

  private getNotes(): Note[] {
    const notes = localStorage.getItem(this.storageKey);
    return notes ? JSON.parse(notes) : [];
  }

  private saveNotes(notes: Note[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(notes));
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
